import IClientsBasicDtos from '@modules/clients/dtos/IClientsBasicDtos';
import Clients from '@modules/clients/infra/typeorm/schemas/Clients';
import { ObjectID } from 'typeorm';

interface IClientsRepository {
  create(dataBasics: IClientsBasicDtos): Promise<Clients>;
  findById(id: String): Promise<Clients | null>;
  findByEmail(email: String): Promise<Clients | null>;
  save(client: Clients): Promise<Clients>;
  index(): Promise<Clients[]>;
  delete(id: String): Promise<void>;
}

export default IClientsRepository;
