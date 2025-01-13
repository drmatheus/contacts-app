import { Contact } from '../../types/contact';

type ConfigOptions = {
  searchTerm?: string;
  orderBy?: 'asc' | 'desc';
};

const listContacts = (userId: string, config?: ConfigOptions) => {
  const contacts = localStorage.getItem('contacthub@contacts') || '[]';

  let filteredContacts = JSON.parse(contacts).filter(
    (c: Contact) => c.userId === userId
  );

  // Filtrar os contatos pelo termo de pesquisa
  if (config?.searchTerm?.trim()) {
    const searchTerm = config.searchTerm
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ''); // Remove tudo que não for letra ou número

    filteredContacts = filteredContacts.filter((c: Contact) => {
      const cleanedName = c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanedCpf = c.cpf.replace(/\D/g, '');

      return (
        cleanedName.includes(searchTerm) || cleanedCpf.includes(searchTerm)
      ); // Verifica se o termo está no nome ou CPF
    });
  }

  // Ordenar os contatos caso config.orderBy seja definido
  if (config?.orderBy) {
    filteredContacts = filteredContacts.sort((a: Contact, b: Contact) => {
      if (config.orderBy === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }

  return filteredContacts;
};

export default listContacts;
