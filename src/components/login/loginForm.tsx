import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '../../schemas/auth/login';
import Button from '../common/button';
import Input from '../common/input';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import login from '../../services/auth/login';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = useCallback((data: LoginSchema) => {
    try {
      const token = login(data.email, data.password);
      localStorage.setItem('contacthub@authToken', token!);
      console.log(token);
      toast.success('Login efetuado com sucesso!');
      navigate('/home');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, []);

  return (
    <form
      className="flex flex-col gap-y-5 max-w-[95vw] bg-primary/20 p-4 py-8 rounded-xl w-96 h-fit m-auto  lg:order-2 order-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold text-primary">Login</h1>
      <Input
        label="Email"
        type="email"
        {...register('email')}
        placeholder="email@mail.com"
        error={errors.email?.message}
      />
      <Input
        label="Senha"
        type="password"
        {...register('password')}
        placeholder="********"
        error={errors.password?.message}
      />
      <Button className="mt-2" text="Entrar" type="submit" />
      <p className="text-sm text-center mt-2 text-primary">
        Ainda não tem uma conta?{' '}
        <Link to="/auth/register" className="text-primary font-semibold">
          Cadastre-se
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
