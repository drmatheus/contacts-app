import getUsersFromLocalStorage from '../users/getUsers';

const validateToken = (token: string) => {
  try {
    const users = getUsersFromLocalStorage();

    const [userId, expirationTime] = token.split('_');

    const user = users.find((u) => u.id === userId);

    if (!user) {
      throw new Error('Token inválido');
    }

    if (parseInt(expirationTime) * 1000 < Date.now()) {
      throw new Error('Token expirado');
    }

    return user;
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
};

export default validateToken;
