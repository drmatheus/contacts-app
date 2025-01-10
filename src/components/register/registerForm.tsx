import { useForm } from 'react-hook-form';
import { registerSchema, RegisterSchema } from '../../schemas/auth/register';
import Button from '../common/button';
import Input from '../common/input';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import createUserInLocalStorage from '../../services/users/createUser';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    mode: 'onBlur',
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit = useCallback((data: RegisterSchema) => {
    try {
      createUserInLocalStorage(data);
      toast.success('Usuário cadastrado com sucesso!');
      navigate('/auth/login');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, []);

  return (
    <form
      className="flex flex-col gap-y-5 max-w-[95vw] bg-primary/20 p-4 py-8 rounded-xl w-96 h-fit m-auto lg:order-2 order-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold text-primary">Cadastro</h1>
      <Input
        label="Nome"
        type="text"
        {...register('firstName')}
        placeholder="Nome"
        error={errors.firstName?.message}
      />
      <Input
        label="Sobrenome"
        type="text"
        {...register('lastName')}
        placeholder="Sobrenome"
        error={errors.lastName?.message}
      />
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
      <Input
        label="Confirmação de Senha"
        type="password"
        {...register('confirmPassword')}
        placeholder="********"
        error={errors.confirmPassword?.message}
      />
      <Button className="mt-2" text="Cadastrar" type="submit" />
      <p className="text-sm text-center mt-2 text-primary">
        Já tem uma conta?{' '}
        <Link to="/auth/login" className="text-primary font-semibold">
          Faça login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
