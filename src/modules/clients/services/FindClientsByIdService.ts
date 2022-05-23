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

    if (client.name) {
      client.name = descriptografar(client.name);
    }

    if (client.sex) {
      client.sex = descriptografar(client.sex);
    }

    if (client.genrer) {
      client.genrer = descriptografar(client.genrer);
    }

    if (client.document) {
      client.document = descriptografar(client.document);
    }

    if (client.rg) {
      client.rg = descriptografar(client.rg);
    }

    if (client.address && client.address.cep) {
      client.address.cep = descriptografar(client.address.cep);
    }

    if (client.address && client.address.street) {
      client.address.street = descriptografar(client.address.street);
    }

    if (client.address && client.address.district) {
      client.address.district = descriptografar(client.address.district);
    }

    if (client.address && client.address.city) {
      client.address.city = descriptografar(client.address.city);
    }

    if (client.address && client.address.state) {
      client.address.state = descriptografar(client.address.state);
    }

    return client;
  }
}
export default FindClientsByIdService;
