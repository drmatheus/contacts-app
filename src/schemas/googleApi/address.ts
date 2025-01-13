export type Address = {
  city?: string;
  country?: string;
  state?: string;
  street?: string;
  postalCode?: string;
  neighborhood?: string;
  number?: string;
  complement?: string;
};

export type AddressDetails = {
  long_name: string;
  short_name: string;
  types: string[];
}[];
