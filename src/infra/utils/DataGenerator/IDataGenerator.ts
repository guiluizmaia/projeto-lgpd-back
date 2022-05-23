export interface IDataGenerator {
  cpf(): string;
  completeName(): string;
  phone(): string;
  numberRandom(min: number, max: number): number;
  email(): string;
  password(): string;
}
