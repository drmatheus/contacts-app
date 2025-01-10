import { Contact } from '../../schemas/contact/contact';

const getContact = (contactId: string | undefined) => {
  // Extrair o ID do usuário do token
  const token = localStorage.getItem('contacthub@authToken');
  const userId = token!.split('_')[0];

  const contacts = JSON.parse(
    localStorage.getItem('contacthub@contacts') || '[]'
  );

  return contacts.find(
    (contact: Contact) => contact.id === contactId && contact.userId === userId
  ) as Contact | undefined;
};

export default getContact;
