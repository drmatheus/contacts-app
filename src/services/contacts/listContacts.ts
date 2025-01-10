import { Contact } from '../../schemas/contact/contact';

const listContacts = (userId: string) => {
  const contacts = localStorage.getItem('contacthub@contacts') || '[]';
  return JSON.parse(contacts).filter((c: Contact) => c.userId === userId);
};

export default listContacts;
