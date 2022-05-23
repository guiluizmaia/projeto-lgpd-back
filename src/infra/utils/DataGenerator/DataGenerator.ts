import faker from 'faker-br';
import { IDataGenerator } from '@infra/utils/DataGenerator/IDataGenerator';

class DataGenerator implements IDataGenerator {
  password(): string {
    faker.locale = 'pt_BR';

    return faker.internet.password();
  }

  email(): string {
    faker.locale = 'pt_BR';

    return faker.internet.email();
  }

  cpf(): string {
    faker.locale = 'pt_BR';

    return faker.br.cpf({ format: true });
  }

  completeName(): string {
    faker.locale = 'pt_BR';
    return faker.name.findName();
  }

  phone(): string {
    faker.locale = 'pt_BR';
    return faker.phone.phoneNumber();
  }

  numberRandom(min: number, max: number): number {
    faker.locale = 'pt_BR';
    return faker.random.number({ min, max });
  }
}

export default DataGenerator;
