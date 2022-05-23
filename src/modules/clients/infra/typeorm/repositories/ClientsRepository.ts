import IClientsBasicDtos from '@modules/clients/dtos/IClientsBasicDtos';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';
import Clients from '@modules/clients/infra/typeorm/schemas/Clients';

class ClientsRepository implements IClientsRepository {
  private ormRepository: MongoRepository<Clients>;

  constructor() {
    this.ormRepository = getMongoRepository(Clients);
  }

  public async create(dataBasics: IClientsBasicDtos): Promise<Clients> {
    const create = this.ormRepository.create(dataBasics);
    return this.ormRepository.save(create);
  }

  public async findById(id: string): Promise<Clients | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<Clients | null> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async save(client: Clients): Promise<Clients> {
    return this.ormRepository.save(client);
  }

  public async index(): Promise<Clients[]> {
    return this.ormRepository.find();
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.deleteOne({ id });
  }
}

export default ClientsRepository;
