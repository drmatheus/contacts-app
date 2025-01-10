import { FaIdCard, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Contact } from '../../schemas/contact/contact';
import { Link } from 'react-router-dom';

const ContactCard = ({ contact }: { contact: Contact }) => {
  return (
    <li>
      <Link
        to={`/home/contact/${contact.id}`}
        className="w-full cursor-pointer bg-primary/90 flex flex-row hover:bg-primary text-offwhite border-2 justify-between flex-wrap border-gray-100 p-2 rounded-lg"
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
        <FaMapMarkerAlt
          className="my-auto mr-4 hover:text-red-500 "
          size={20}
        />
      </Link>
    </li>
  );
};

export default ContactCard;
