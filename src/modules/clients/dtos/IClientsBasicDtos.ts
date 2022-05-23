interface IClientsBasicDtos {
  email: string;
  password: string;
  name: string;
  birthDay: Date;
  sex: string;
  genrer: string;
  document: string;
  rg: string;
  phone: string;
  address: {
    cep: string;
    street: string;
    district: string;
    city: string;
    state: string;
  };
}

export default IClientsBasicDtos;
