export interface Contact {
  id: string;
  name: string;
  userId: string;
  phone: string;
  address: {
    street: string;
    zipcode: string;
    city: string;
    state: string;
    neighborhood: string;
    number: string;
    complement: string;
  };
  latitude: number;
  longitude: number;
  cpf: string;
}
