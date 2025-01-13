import { UpdatePasswordData } from '../../schemas/user/updatePassword';
import { User } from '../../types/users';
import getUsersFromLocalStorage from './getUsers';

const updatePassword = (token: string, data: UpdatePasswordData) => {
  const userId = token.split('_')[0];

  const allUsers = getUsersFromLocalStorage();

  const userIndex = allUsers.findIndex((user: User) => user.id === userId);

  if (userIndex === -1) {
    throw new Error('Usuário não encontrado');
  }

  if (allUsers[userIndex].password !== data.oldPassword) {
    throw new Error('Senha incorreta');
  }

  allUsers[userIndex].password = data.password;
  localStorage.setItem('contacthub@user', JSON.stringify(allUsers));
};

export default updatePassword;
