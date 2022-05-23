import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import HistoricClientsRepository from '@modules/clients/infra/typeorm/repositories/HistoricClientsRepository';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import IHistoricClientsRepository from '@modules/clients/repositories/IHistoricClientsRepository';
import { DependencyContainer } from 'tsyringe';

class ClientsModules {
  static Configure(container: DependencyContainer): void {
    container
      .registerSingleton<IClientsRepository>(
        'ClientsRepository',
        ClientsRepository,
      )
      .registerSingleton<IHistoricClientsRepository>(
        'HistoricClientsRepository',
        HistoricClientsRepository,
      );
  }
}

export default ClientsModules;
