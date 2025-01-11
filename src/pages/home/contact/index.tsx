import { useNavigate, useParams } from 'react-router-dom';
import getContact from '../../../services/contacts/getContact';
import GoogleMap from '../../../components/common/map';
import { useState } from 'react';
import deleteContact from '../../../services/contacts/deleteContact';
import { toast } from 'react-toastify';

const ContactPage = () => {
  const { contactId } = useParams();

  const [isDeletingConfirmation, setIsDeletingConfirmation] = useState(false);

  const navigate = useNavigate();

  const contact = getContact(contactId);

  const toogleDelete = () => {
    setIsDeletingConfirmation(!isDeletingConfirmation);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('contacthub@authToken');
    if (!token || !contactId) return;
    {
      deleteContact(token, contactId);
      navigate('/home');
      toast.success('Contato excluido com sucesso!');
    }
  };

  return (
    <>
      {contact ? (
        <div className="grid grid-cols-1 gap-4 bg-primary/5 p-4 rounded-lg lg:grid-cols-2 text-offblack font-semibold text-lg">
          <h1 className="col-span-2 text-2xl pb-1 border-b-2 border-primary  font-bold ">
            {contact.name}
          </h1>
          <div
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(contact.phone);
              toast.success(
                'Número de telefone copiado para a área de transferência!'
              );
            }}
          >
            <p>Telefone:</p>
            <p>{contact.phone}</p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(contact.cpf);
              toast.success('CPF copiado para a área de transferência!');
            }}
          >
            <p>CPF:</p>
            <p>{contact.cpf}</p>
          </div>

          <h2 className="col-span-2 text-xl pb-1 border-b-2 border-primary  font-bold ">
            Endereço
          </h2>

          <div>
            <p>Cidade:</p>
            <p>{contact.address.city}</p>
          </div>

          <div>
            <p>Estado:</p>
            <p>{contact.address.state}</p>
          </div>

          <div>
            <p>Rua:</p>
            <p>{contact.address.street}</p>
          </div>
          <div>
            <p>CEP:</p>
            <p>{contact.address.zipcode}</p>
          </div>
          <div>
            <p>Número:</p>
            <p>{contact.address.number}</p>
          </div>
          <div>
            <p>Bairro:</p>
            <p>{contact.address.neighborhood}</p>
          </div>

          <div>
            <p>Complemento:</p>
            <p>{contact.address.complement || 'Não informado'}</p>
          </div>
          <GoogleMap
            className="lg:col-span-2"
            latitude={contact.latitude}
            longitude={contact.longitude}
          />
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
                  Nao
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
        </div>
      ) : (
        <h1>Contato não encontrado</h1>
      )}
    </>
  );
};

export default ContactPage;
