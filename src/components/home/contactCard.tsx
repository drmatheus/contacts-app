import { FaArrowRight, FaIdCard, FaPhoneAlt } from 'react-icons/fa';
import { Contact } from '../../types/contact';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContact } from '../../context/contact';

const ContactCard = ({ contact }: { contact: Contact }) => {
  const { setContact, contact: contactContext } = useContact();

  const navigate = useNavigate();
  const location = useLocation();

  // Altera o contato selecionado
  const handleClickContact = (e: React.MouseEvent) => {
    //Caso não esteja na home, redireciona para home
    if (location.pathname !== '/home') navigate('/home');
    setContact(contact);
  };

  return (
    <li>
      <button
        onClick={handleClickContact}
        className={`w-full cursor-pointer text-sm bg-primary/90 flex flex-row hover:bg-primary text-offwhite border-4 justify-between flex-wrap border-gray-100 p-2 rounded-lg ${
          contact.id === contactContext?.id ? 'border-secondary bg-primary' : ''
        } `}
      >
        <h2 className="text-xl border-b mb-2 border-offwhite font-semibold w-full flex justify-between items-center">
          {contact.name}
        </h2>
        <div className="flex flex-col font-medium ">
          <p className="flex gap-2 items-center">
            <FaPhoneAlt size={14} /> {contact.phone}
          </p>
          <p className="flex gap-2 items-center">
            <FaIdCard size={14} />
            {contact.cpf}
          </p>
        </div>
        <Link
          onClick={(e) => e.stopPropagation()}
          to={`/home/contact/${contact.id}`}
          className="flex gap-2 z-10 my-auto p-2  justify-center hover:bg-secondary/50 rounded-lg"
        >
          <p className="text-sm">Detalhes</p>
          <FaArrowRight className=" hover:text-red-500 mt-0.5 " size={16} />
        </Link>
      </button>
    </li>
  );
};

export default ContactCard;
