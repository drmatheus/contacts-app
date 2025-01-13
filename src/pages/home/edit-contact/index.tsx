import { useParams } from 'react-router-dom';
import EditContactForm from '../../../components/contact/editContactForm';
import getContact from '../../../services/contacts/getContact';

const EditContactPage = () => {
  const { contactId } = useParams();

  const contact = getContact(contactId);

  if (!contact) {
    return <div>Contato não encontrado</div>;
  }

  return (
    <div>
      <EditContactForm contact={contact} />
    </div>
  );
};

export default EditContactPage;
