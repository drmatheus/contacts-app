import GoogleMap from '../../../components/common/map';
import { useContact } from '../../../context/contact';

const Home = () => {
  const { contact } = useContact();

  if (contact)
    return (
      <GoogleMap
        className="mb-4"
        latitude={contact.latitude}
        longitude={contact.longitude}
        zoom={15}
      />
    );

  return (
    <GoogleMap
      className="mb-4"
      latitude={-23.5479}
      longitude={-46.6358}
      zoom={15}
    />
  );
};

export default Home;
