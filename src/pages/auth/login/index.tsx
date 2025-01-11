import { useNavigate } from 'react-router-dom';
import LoginForm from '../../../components/login/loginForm';
import validateToken from '../../../services/auth/validateToken';
import { useEffect } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem('contacthub@authToken');
      if (!token) return;

      const tokenIsValid = validateToken(token);
      if (tokenIsValid) {
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2  ">
      <div className="flex brightness-100 lg:bg-transparent bg-primary order-2 lg:order-1 ">
        <div className="z-10 w-1/2 lg:h-72  m-auto  ">
          <h1 className="text-4xl font-semibold text-offwhite">ContactHub</h1>
          <p className=" text-offwhite mt-2 font-thin text-xl">
            Faça login para gerenciar todos os seus contatos em um só lugar
          </p>
        </div>

        <img
          src="/images/bg/login_bg.jpg"
          alt="Login"
          className="absolute brightness-50 h-screen w-full rounded-r-[96px] object-cover object-right hidden lg:block"
        />
      </div>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
