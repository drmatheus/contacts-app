import { useForm } from 'react-hook-form';
import Input from '../../../components/common/input';
import Button from '../../../components/common/button';
import validateToken from '../../../services/auth/validateToken';
import { useEffect, useState } from 'react';
import { User } from '../../../types/users';
import {
  newPasswordSchema,
  NewPasswordSchema,
} from '../../../schemas/auth/newPassword';
import {
  deleteAccountSchema,
  DeleteAccountSchema,
} from '../../../schemas/auth/deleteAccount';
import { zodResolver } from '@hookform/resolvers/zod';
import deleteUserAccount from '../../../services/users/deleteUser';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import updatePassword from '../../../services/users/updatePassword';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewPasswordSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(newPasswordSchema),
  });

  const {
    register: registerDeleteAccount,
    handleSubmit: handleSubmitDeleteAccount,
    formState: { errors: errorsDeleteAccount },
  } = useForm<DeleteAccountSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(deleteAccountSchema),
  });

  const toogleDelete = () => setIsDeleting(!isDeleting);

  const navigate = useNavigate();

  const handleDeleteAccount = (data: DeleteAccountSchema) => {
    try {
      const token = localStorage.getItem('contacthub@authToken');
      deleteUserAccount(token!, data.password);
      localStorage.removeItem('contacthub@authToken');
      toast.success('Conta excluida com sucesso!');
      navigate('/auth/login');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleUpdatePassword = (data: NewPasswordSchema) => {
    try {
      const token = localStorage.getItem('contacthub@authToken');
      if (!token) return;
      updatePassword(token, data);
      toast.success('Senha atualizada com sucesso!');
      reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem('contacthub@authToken');
      if (!token) return;

      const userData = validateToken(token);
      setUser(userData);
    } catch (error) {}
  }, []);

  return (
    <div className="grid  grid-cols-2  gap-5  bg-primary/5 p-4  w-full rounded-xl ">
      <h1 className="text-2xl font-bold col-span-2 text-primary">Perfil</h1>
      <h2 className="col-span-2 text-primary font-semibold text-lg border-b-2 border-primary">
        Meu dados
      </h2>

      <div className="col-span-2 lg:col-span-1 font-medium">
        <p>Nome:</p>
        <p>
          {user?.firstName} {user?.lastName}
        </p>
      </div>

      <div className="col-span-2 lg:col-span-1 font-medium">
        <p>Email:</p>
        <p>{user?.email}</p>
      </div>

      <h2 className="col-span-2 text-primary font-semibold text-lg border-b-2 border-primary">
        Atualizar senha
      </h2>

      <form
        className="col-span-2 flex flex-col gap-2 "
        onSubmit={handleSubmit(handleUpdatePassword)}
      >
        <Input
          label="Senha atual"
          type="password"
          {...register('oldPassword')}
          placeholder="********"
          error={errors.oldPassword?.message}
        />
        <Input
          label="Nova senha"
          type="password"
          {...register('password')}
          placeholder="********"
          error={errors.password?.message}
        />
        <Input
          label="Confirmar nova senha"
          type="password"
          {...register('confirmPassword')}
          placeholder="********"
          error={errors.confirmPassword?.message}
        />

        <Button className="w-full mt-2" text="Enviar" type="submit" />
      </form>

      <h2 className="col-span-2 text-primary font-semibold text-lg border-b-2 border-primary">
        Excluir conta
      </h2>

      <form
        className="col-span-2 "
        onSubmit={handleSubmitDeleteAccount(handleDeleteAccount)}
      >
        {isDeleting ? (
          <>
            <Input
              label="Senha"
              {...registerDeleteAccount('password')}
              placeholder="********"
              error={errorsDeleteAccount.password?.message}
              type="password"
            />
            <div className="p-4 bg-yellow-300/75 rounded-lg mt-4">
              <p className="font-semibold text-offblack">
                Tem certeza que deseja excluir sua conta?
              </p>
              <p className="font-semibold mt-2 text-offblack">
                Ao excluir sua conta, todos os seus contatos serão apagados de
                forma permanente.
              </p>
            </div>
            <div className="flex wrap gap-4">
              <Button
                className="w-full mt-2 bg-red-600"
                text="Excluir"
                type="submit"
              />
              <Button
                className="w-full mt-2"
                text="Cancelar"
                type="button"
                onClick={toogleDelete}
              />
            </div>
          </>
        ) : (
          <Button
            className="w-full mt-2"
            onClick={toogleDelete}
            text="Excluir conta"
            type="button"
          />
        )}
      </form>
    </div>
  );
};

export default Profile;
