import { User } from '../../types/users';
import getUsersFromLocalStorage from '../users/getUsers';

const login = (email: string, password: string): string | null => {
  const users = getUsersFromLocalStorage();

  const user = users.find((user) => user.email === email);
  if (!user) {
    throw new Error('Email não encontrado');
  }

  if (user.password !== password) {
    throw new Error('Senha incorreta');
  }

  const token = generateToken(user);
  return token;
};

const generateToken = (user: User): string => {
  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const token = `${user.id}_${expirationTime}`;
  return token;
};

export default login;
