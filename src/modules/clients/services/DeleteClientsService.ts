import { inject, injectable } from 'tsyringe';
import { ObjectID } from 'typeorm';
import Clients from '../infra/typeorm/schemas/Clients';
import IClientsRepository from '../repositories/IClientsRepository';
import IHistoricClientsRepository from '../repositories/IHistoricClientsRepository';

@injectable()
class DeleteClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('HistoricClientsRepository')
    private historicClientsRepository: IHistoricClientsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.historicClientsRepository.create({
      id_client: id,
      type: 'DELETED',
    });
    await this.clientsRepository.delete(id);
  }
}
export default DeleteClientsService;
