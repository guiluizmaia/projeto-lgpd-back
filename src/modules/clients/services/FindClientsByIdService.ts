import AppError from '@infra/http/errors/AppError';
import { descriptografar } from '@infra/utils/cryptografar';
import { inject, injectable } from 'tsyringe';
import { ObjectID } from 'typeorm';
import Clients from '../infra/typeorm/schemas/Clients';
import IClientsRepository from '../repositories/IClientsRepository';

@injectable()
class FindClientsByIdService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(id: string): Promise<Clients | null> {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    return client;
  }
}
export default FindClientsByIdService;
