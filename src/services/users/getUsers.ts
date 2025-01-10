import { User } from '../../types/users';

const getUsersFromLocalStorage = (): User[] => {
  const storedUsers = localStorage.getItem('contacthub@user');
  if (!storedUsers) {
    // Se não existir, cria um array vazio e armazena no localStorage
    localStorage.setItem('contacthub@user', JSON.stringify([]));
    return [];
  }
  return JSON.parse(storedUsers);
};

export default getUsersFromLocalStorage;
