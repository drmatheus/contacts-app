import { useForm } from 'react-hook-form';
import Input from '../../../components/common/input';
import Button from '../../../components/common/button';
import validateToken from '../../../services/auth/validateToken';
import { useEffect, useState } from 'react';
import { User } from '../../../types/users';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        className="col-span-2 "
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <Input
          label="Senha atual"
          {...register('oldPassword')}
          placeholder="********"

          //   error={errors.address?.neighborhood?.message}
        />
        <Input
          label="Nova senha"
          {...register('password')}
          placeholder="********"

          //   error={errors.address?.city?.message}
        />

        <Input
          label="Confirmar nova senha"
          {...register('confirmPassword')}
          placeholder="********"
          //   error={errors.address?.city?.message}
        />

        <div className="col-span-2 mt-2 ">
          <Button className="w-full" text="Enviar" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Profile;
