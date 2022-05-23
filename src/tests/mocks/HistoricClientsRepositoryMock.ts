import IClientsBasicDtos from '@modules/clients/dtos/IClientsBasicDtos';
import IHistoricClientsDtos from '@modules/clients/dtos/IHistoricClientsDtos';
import HistoricClients from '@modules/clients/infra/typeorm/schemas/HistoricClients';
import IHistoricClientsRepository from '@modules/clients/repositories/IHistoricClientsRepository';
import { ObjectID } from 'typeorm';

class HistoricClientsRepositoryMock implements IHistoricClientsRepository {
  private inMemory: HistoricClients[] = [];

  async create(data: IHistoricClientsDtos): Promise<HistoricClients> {
    const create = new HistoricClients();
    Object.assign(create, data);
    this.inMemory.push(create);
    return create;
  }
}

export default HistoricClientsRepositoryMock;
