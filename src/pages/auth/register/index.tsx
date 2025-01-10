import RegisterForm from '../../../components/register/registerForm';

const RegisterPage = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex brightness-100 lg:bg-transparent bg-primary order-2 lg:order-1">
        <div className="z-10 w-1/2 lg:h-72 m-auto">
          <h1 className="text-4xl font-semibold text-offwhite">ContactHub</h1>
          <p className="text-offwhite mt-2 font-thin text-xl">
            Crie sua conta para começar a gerenciar seus contatos em um só lugar
          </p>
        </div>

        <img
          src="/images/bg/login_bg.jpg"
          alt="Cadastro"
          className="absolute brightness-50 h-screen w-full rounded-r-[96px] object-cover object-right hidden lg:block"
        />
      </div>

      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
