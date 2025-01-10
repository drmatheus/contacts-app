import getUsersFromLocalStorage from './getUsers';

const deleteUserAccount = (email: string, password: string) => {
  const users = getUsersFromLocalStorage();

  // Busca o usuário pelo email
  const userIndex = users.findIndex(
    (user: { email: string; password: string }) => user.email === email
  );
  if (userIndex === -1) {
    throw new Error('Usuário não encontrado');
  }

  if (users[userIndex].password !== password) {
    throw new Error('Senha incorreta');
  }

  // Remove o usuário do array e atualiza o localStorage
  users.splice(userIndex, 1);
  localStorage.setItem('contacthub@user', JSON.stringify(users));

  return 'Conta deletada com sucesso';
};

export default deleteUserAccount;
