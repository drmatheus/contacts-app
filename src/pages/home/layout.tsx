import { Outlet } from 'react-router-dom';
import Header from '../../components/common/header';
import Container from '../../components/common/container';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import validateToken from '../../services/auth/validateToken';
import ListContacts from '../../components/home/allContacts';

const HomeLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //Valida se o token existe
    const token = localStorage.getItem('contacthub@authToken');

    if (!token) {
      toast.error('Usuário não autenticado. Redirecionando para login...');
      navigate('/auth/login');
      return;
    }

    // Se o token existir, valida ele
    try {
      const isValid = validateToken(token);
      if (!isValid) {
        toast.error('Token inválido. Redirecionando para login...');
        navigate('/auth/login');
      }
    } catch (error) {
      toast.error('Erro ao validar token. Redirecionando para login...');
      navigate('/auth/login');
    }
  }, []);

  return (
    <>
      <Header />

      <Container>
        <ListContacts />
        <Outlet />
      </Container>
    </>
  );
};

export default HomeLayout;
