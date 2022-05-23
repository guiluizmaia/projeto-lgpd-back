import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';
import IHistoricClientsRepository from '@modules/clients/repositories/IHistoricClientsRepository';
import IHistoricClientsDtos from '@modules/clients/dtos/IHistoricClientsDtos';
import HistoricClients from '../schemas/HistoricClients';

class HistoricClientsRepository implements IHistoricClientsRepository {
  private ormRepository: MongoRepository<HistoricClients>;

  constructor() {
    this.ormRepository = getMongoRepository(HistoricClients);
  }

  async create(data: IHistoricClientsDtos): Promise<HistoricClients> {
    const create = this.ormRepository.create(data);
    return this.ormRepository.save(create);
  }
}

export default HistoricClientsRepository;
