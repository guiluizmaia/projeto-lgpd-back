import { inject, injectable } from 'tsyringe';
import { ObjectID } from 'typeorm';
import Clients from '../infra/typeorm/schemas/Clients';
import IClientsRepository from '../repositories/IClientsRepository';

@injectable()
class IndexClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(): Promise<Clients[]> {
    return this.clientsRepository.index();
  }
}
export default IndexClientsService;
