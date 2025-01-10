import { Contact } from '../../schemas/contact/contact';
import listContacts from '../../services/contacts/listContacts';
// import AutocompleteAddressInput from '../common/addressInput';
import ContactCard from './contactCard';

const ListContacts = () => {
  const token = localStorage.getItem('contacthub@authToken');
  const contacts: Contact[] = listContacts(token!.split('_')[0]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-2 text-primary">Contatos</h1>
      <ul className="flex flex-col gap-y-2 ">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </ul>
    </div>
  );
};

export default ListContacts;
