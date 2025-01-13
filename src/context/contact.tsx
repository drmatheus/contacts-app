import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Contact } from '../types/contact';
import listContacts from '../services/contacts/listContacts';

interface ContactContextType {
  contact: Contact | null;
  setContact: React.Dispatch<React.SetStateAction<Contact | null>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  contacts: Contact[];
  getData: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

interface ContactProviderProps {
  children: ReactNode;
}

export const ContactProvider: React.FC<ContactProviderProps> = ({
  children,
}) => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('asc');
  const [contacts, setContacts] = useState<Contact[]>([]);

  const getData = () => {
    const token = localStorage.getItem('contacthub@authToken');
    if (!token) return null;

    const config = {
      searchTerm,
      orderBy: orderBy as 'asc' | 'desc',
    };

    setContacts(listContacts(token!.split('_')[0], config));
  };

  useEffect(() => {
    // Buscar contatos no localStorage
    getData();
  }, [searchTerm, orderBy]);

  return (
    <ContactContext.Provider
      value={{
        contact,
        setContact,
        setSearchTerm,
        setOrderBy,
        contacts,
        getData,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useContact = (): ContactContextType => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
};
