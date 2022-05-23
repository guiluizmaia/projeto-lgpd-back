import CryptHash from '@infra/utils/CryptHash/CryptHash';
import ICryptHash from '@infra/utils/CryptHash/ICryptHash';
import DataGenerator from '@infra/utils/DataGenerator/DataGenerator';
import { IDataGenerator } from '@infra/utils/DataGenerator/IDataGenerator';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import { DependencyContainer } from 'tsyringe';

class DataGeneratorUtils {
  static Configure(container: DependencyContainer): void {
    container
      .registerSingleton<IDataGenerator>('DataGenerator', DataGenerator)
      .registerSingleton<ICryptHash>('CryptHash', CryptHash);
  }
}

export default DataGeneratorUtils;
