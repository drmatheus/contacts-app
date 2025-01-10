import { User } from '../../types/users';
import getUsersFromLocalStorage from './getUsers';
import { v4 as uuidv4 } from 'uuid';

const createUserInLocalStorage = (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): User => {
  const users = getUsersFromLocalStorage();

  // Verificar se o email já está cadastrado
  const existingUserEmail = users.find((user) => user.email === userData.email);
  if (existingUserEmail) {
    throw new Error('Email já cadastrado');
  }

  const newUser: User = {
    id: uuidv4(), // Gerando um UUID único para o usuário
    ...userData,
  };

  // Atualiza o localStorage
  users.push(newUser);
  localStorage.setItem('contacthub@user', JSON.stringify(users));

  return newUser;
};

export default createUserInLocalStorage;
