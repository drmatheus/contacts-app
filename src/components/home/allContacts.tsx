import ContactCard from './contactCard';
import Input from '../common/input';
import Select from '../common/select';
import { useContact } from '../../context/contact';

const ListContacts = () => {
  const { contacts, setOrderBy, setSearchTerm } = useContact();

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-2 text-primary">Contatos</h1>
      <div className="grid grid-cols-3 gap-2 my-2">
        <Input
          label="Pesquisa"
          type="text"
          placeholder="Pesquisar contato"
          containerClass="col-span-2"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          label="Ordenar"
          options={[
            { value: 'asc', label: 'A-Z' },
            { value: 'desc', label: 'Z-A' },
          ]}
          defaultValue={'asc'}
          onChange={(e) => setOrderBy(e.target.value)}
        />
      </div>
      <ul className="flex flex-col gap-y-2 ">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}

        {contacts.length === 0 && (
          <p className="text-offblack bg-offwhite2 p-2 py-4 rounded-lg text-center font-semibold ">
            Nenhum contato cadastrado
          </p>
        )}
      </ul>
    </div>
  );
};

export default ListContacts;
