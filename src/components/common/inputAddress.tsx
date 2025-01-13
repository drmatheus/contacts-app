import React, { useState } from 'react';
import Input from './input';
import { Address, AddressDetails } from '../../schemas/googleApi/address';
import { Suggestion, Suggestions } from '../../schemas/googleApi/suggestions';

type InputAddressProps = {
  containerClassName?: string;
  setAddressSuggestion: (address: Address) => void;
};

const InputAddress = ({
  containerClassName,
  setAddressSuggestion,
}: InputAddressProps) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([] as Suggestions);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = e.target.value;
      setInput(value);

      if (value.length > 2) {
        const results: Suggestions = await fetchSuggestions(value);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handleSelect = async (suggestion: Suggestion) => {
    const address = await fetchPlaceDetails(suggestion.place_id);
    setAddressSuggestion(address);
    setInput(suggestion.description);
    setSuggestions([]);
  };

  return (
    <div className={`${containerClassName} relative `}>
      <Input
        label="Buscar endereço"
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Digite um endereço"
      />
      <ul className="absolute top-16 w-full rounded-md max-h-40 overflow-y-auto bg-white shadow-lg z-10">
        {suggestions.map((suggestion: any) => (
          <li
            key={suggestion.place_id}
            onClick={() => handleSelect(suggestion)}
            className="cursor-pointer p-2 border-b border-gray-200 hover:bg-gray-100"
          >
            {suggestion.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

const fetchSuggestions = async (input: string) => {
  //Usando o heroku para resolver o CORS
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const endpoint = `${proxy}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=pt-BR`;

  try {
    //Buscar as sugestões de endereço
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.predictions;
  } catch (error) {
    return [];
  }
};

export default InputAddress;

const fetchPlaceDetails = async (placeId: string) => {
  //Usando o heroku para resolver o CORS
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const endpoint = `${proxy}https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=pt-BR`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Erro na API: ${data.status}`);
    }

    const addressComponents: AddressDetails = data.result.address_components;

    console.log(addressComponents);

    // Função auxiliar para pegar o componente do endereço
    const getAddressComponent = (type: string): string | undefined => {
      const component = addressComponents.find((c) => c.types.includes(type));

      // Caso seja componente de estado retorna o short_name
      if (type === 'administrative_area_level_1') {
        return component ? component.short_name : undefined;
      }

      // Em outros casos retorna o long_name
      return component ? component.long_name : undefined;
    };

    // Extraindo informações do endereço
    const number = getAddressComponent('street_number');
    const street = getAddressComponent('route');
    const city = getAddressComponent('administrative_area_level_2');
    const state = getAddressComponent('administrative_area_level_1');
    const neighborhood = getAddressComponent('sublocality_level_1');
    const country = getAddressComponent('country');
    const postalCode = getAddressComponent('postal_code');

    // Retornando os dados formatados
    return {
      street,
      number,
      city,
      state,
      country,
      postalCode,
      neighborhood,
    };
  } catch (error) {
    console.error('Erro ao buscar detalhes do endereço:', error);
    throw error;
  }
};
