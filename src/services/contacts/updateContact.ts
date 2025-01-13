import { v4 as uuidv4 } from 'uuid';
import { ContactSchema } from '../../schemas/contact/contact';
import { Contact } from '../../types/contact';
import fetchCoordinates from '../../utils/getCoordinates';
import getContact from './getContact';

const updateContact = async (
  token: string,
  contact: ContactSchema,
  contactId: string
) => {
  // Extrair o ID do usuário do token
  const userId = token.split('_')[0];

  // Obter os contatos do localStorage e verificar se o CPF ja foi cadastrado
  const existingContacts: Contact[] = JSON.parse(
    localStorage.getItem('contacthub@contacts') || '[]'
  );
  const contactCpfAndUserId = existingContacts.find((c: Contact) => {
    return c.cpf === contact.cpf && c.userId === userId && c.id !== contactId;
  });

  if (contactCpfAndUserId) {
    throw new Error('CPF já cadastrado');
  }

  const contactToUpdate = getContact(contactId);

  if (!contactToUpdate || contactToUpdate.userId !== userId) {
    throw new Error('Contato não encontrado');
  }

  let lat = contactToUpdate.latitude;
  let lng = contactToUpdate.longitude;

  //Somente se os dados do contato foram alterados
  //Busca os dados na API do Google novamente
  if (
    contact.address.zipcode !== contactToUpdate.address.zipcode ||
    contact.address.street !== contactToUpdate.address.street ||
    contact.address.number !== Number(contactToUpdate.address.number) ||
    contact.address.neighborhood !== contactToUpdate.address.neighborhood ||
    contact.address.city !== contactToUpdate.address.city ||
    contact.address.state !== contactToUpdate.address.state
  ) {
    const fullAddress = `${contact.address.street}, ${contact.address.number}, ${contact.address.neighborhood}, ${contact.address.city}, ${contact.address.state}, ${contact.address.zipcode}`;
    const addressData = await fetchCoordinates(fullAddress);
    //Atualiza os dados do contato
    lat = addressData.lat;
    lng = addressData.lng;
  }

  let updatedContact;
  //Loop no array de contatos e atualiza o contato
  const updatedContacts = existingContacts.map((c: Contact) => {
    if (c.id === contactId) {
      updatedContact = { ...c, ...contact, latitude: lat, longitude: lng };
      return updatedContact;
    }
    return c;
  });

  // Atualiza os contatos no localStorage
  localStorage.setItem('contacthub@contacts', JSON.stringify(updatedContacts));

  return updatedContact;
};

export default updateContact;
