import { useParams } from 'react-router-dom';
import getContact from '../../../services/contacts/getContact';
import GoogleMap from '../../../components/common/map';

const ContactPage = () => {
  const { contactId } = useParams();

  const contact = getContact(contactId);

  return (
    <>
      {contact ? (
        <div className="grid grid-cols-1 gap-4 bg-primary/5 p-4 rounded-lg lg:grid-cols-2 text-offblack font-semibold text-lg">
          <h1 className="col-span-2 text-2xl pb-1 border-b-2 border-primary  font-bold ">
            {contact.name}
          </h1>
          <div>
            <p>Telefone:</p>
            <p>{contact.phone}</p>
          </div>
          <div>
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
            className="col-span-2"
            latitude={contact.latitude}
            longitude={contact.longitude}
          />
        </div>
      ) : (
        <h1>Contato não encontrado</h1>
      )}
    </>
  );
};

export default ContactPage;
