import { Contact } from '../../schemas/contact/contact';

const deleteContact = async (token: string, contactId: string) => {
  // Extrair o ID do usuário do token
  const userId = token.split('_')[0];

  const contacts = JSON.parse(
    localStorage.getItem('contacthub@contacts') || '[]'
  );
  const updatedContacts = contacts.filter(
    (contact: Contact) => contact.id !== contactId && contact.userId === userId
  );
  localStorage.setItem('contacthub@contacts', JSON.stringify(updatedContacts));
};

export default deleteContact;
