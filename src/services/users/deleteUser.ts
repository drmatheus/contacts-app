import { Contact } from '../../types/contact';
import getUsersFromLocalStorage from './getUsers';

const deleteUserAccount = (token: string, password: string) => {
  const userId = token.split('_')[0];

  const users = getUsersFromLocalStorage();

  // Busca o usuário pelo email
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    throw new Error('Usuário não encontrado');
  }

  if (users[userIndex].password !== password) {
    throw new Error('Senha incorreta');
  }

  // Remove o usuário do array e atualiza o localStorage
  users.splice(userIndex, 1);
  localStorage.setItem('contacthub@user', JSON.stringify(users));

  // Remove os contatos relacionados ao usuário
  const contacts: Contact[] = JSON.parse(
    localStorage.getItem('contacthub@contacts') || '[]'
  );

  const updatedContacts = contacts.filter(
    (contact) => contact.userId !== userId
  );
  localStorage.setItem('contacthub@contacts', JSON.stringify(updatedContacts));

  return 'Conta deletada com sucesso';
};

export default deleteUserAccount;
