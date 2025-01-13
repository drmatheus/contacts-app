import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import deleteContact from '../../services/contacts/deleteContact';
import { toast } from 'react-toastify';

type DeleteContactProps = {
  contactId: string;
};

const DeleteContact = ({ contactId }: DeleteContactProps) => {
  const navigate = useNavigate();

  const [isDeletingConfirmation, setIsDeletingConfirmation] = useState(false);

  const toogleDelete = () => {
    setIsDeletingConfirmation(!isDeletingConfirmation);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('contacthub@authToken');
      if (!token || !contactId) return;
      deleteContact(token, contactId);
      navigate('/home');
      toast.success('Contato excluido com sucesso!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="ml-auto col-span-2 flex gap-2">
      {isDeletingConfirmation ? (
        <>
          <p className="text-sm">
            Tem certeza que deseja excluir esse contato?
          </p>
          <button
            onClick={handleDelete}
            className="text-primary hover:underline hover:bold text-sm px-2"
          >
            Sim
          </button>

          <p className="text-sm">/</p>
          <button
            onClick={toogleDelete}
            className="text-primary hover:underline hover:bold text-sm px-2"
          >
            Não
          </button>
        </>
      ) : (
        <button
          onClick={toogleDelete}
          className="text-primary hover:underline hover:bold text-sm"
        >
          Excluir contato
        </button>
      )}
    </div>
  );
};

export default DeleteContact;
