import { v4 as uuidv4 } from 'uuid';
import { ContactSchema } from '../../schemas';

const fetchCoordinates = async (address: string) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );
  const data = await response.json();
  console.log(data);
  if (data.results.length > 0) {
    const location = data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  }
  throw new Error('Endereço não encontrado.');
};

const createContact = async (token: string, contact: ContactSchema) => {
  // Extrair o ID do usuário do token
  const userId = token.split('_')[0];

  try {
    // Obtemer os contatos do localStorage e verificar se o CPF ja foi cadastrado
    const existingContacts = JSON.parse(
      localStorage.getItem('contacthub@contacts') || '[]'
    );
    const contactCpfAndUserId = existingContacts.find(
      (c: any) => c.cpf === contact.cpf && c.userId === userId
    );
    if (contactCpfAndUserId) {
      throw new Error('CPF já cadastrado');
    }

    // Obter latitude e longitude usando a API do Google e adicionar ao contato
    const fullAddress = `${contact.address.street}, ${contact.address.number}, ${contact.address.neighborhood}, ${contact.address.city}, ${contact.address.state}, ${contact.address.zipcode}`;
    const { lat, lng } = await fetchCoordinates(fullAddress);

    const newContact = {
      ...contact,
      id: uuidv4(),
      userId,
      latitude: lat,
      longitude: lng,
    };

    // Adicionar o novo contato ao array e salva
    const updatedContacts = [...existingContacts, newContact];
    localStorage.setItem(
      'contacthub@contacts',
      JSON.stringify(updatedContacts)
    );

    return newContact;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao salvar o contato:', error.message);
    }
  }
};

export default createContact;
