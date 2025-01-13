import { v4 as uuidv4 } from 'uuid';
import { ContactSchema } from '../../schemas/contact/contact';
import { Contact } from '../../types/contact';
import fetchCoordinates from '../../utils/getCoordinates';

const createContact = async (token: string, contact: ContactSchema) => {
  // Extrair o ID do usuário do token
  const userId = token.split('_')[0];

  // Obter os contatos do localStorage e verificar se o CPF ja foi cadastrado
  const existingContacts: Contact[] = JSON.parse(
    localStorage.getItem('contacthub@contacts') || '[]'
  );
  const contactCpfAndUserId = existingContacts.find((c: Contact) => {
    return c.cpf === contact.cpf && c.userId === userId;
  });

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
  localStorage.setItem('contacthub@contacts', JSON.stringify(updatedContacts));

  return newContact;
};

export default createContact;
