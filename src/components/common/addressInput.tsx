import { useRef, useEffect } from 'react';
import useGoogleMapsApi from '../../hooks/useGoogleMapsApi';

const LocationInput = ({
  onSelectLocation,
}: {
  onSelectLocation: (location: any) => void;
}) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const googleMapsApi = useGoogleMapsApi();

  useEffect(() => {
    if (googleMapsApi && inputRef.current) {
      // Inicializa o Autocomplete do Google Maps
      autocompleteRef.current = new googleMapsApi.places.Autocomplete(
        inputRef.current,
        { types: ['(cities)'] }
      );
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef?.current?.getPlace();
        if (place && onSelectLocation) {
          // Salva os dados no state
          console.log(place);
          onSelectLocation({
            name: place.name,
            address: place.formatted_address,
            location: place.geometry?.location?.toJSON(), // Latitude e Longitude
          });
        }
      });
    }
  }, [googleMapsApi, onSelectLocation]);

  return (
    <div>
      <input
        ref={inputRef}
        placeholder="Digite uma cidade"
        autoComplete="off"
        aria-label="Search locations"
        className="w-full"
      />
    </div>
  );
};

export default LocationInput;
