import AppError from '@infra/http/errors/AppError';
import { criptografar } from '@infra/utils/cryptografar';
import { inject, injectable } from 'tsyringe';
import Clients from '../infra/typeorm/schemas/Clients';
import IClientsRepository from '../repositories/IClientsRepository';
import IHistoricClientsRepository from '../repositories/IHistoricClientsRepository';

@injectable()
class UpdateClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('HistoricClientsRepository')
    private historicClientsRepository: IHistoricClientsRepository,
  ) {}

  public async execute(clientUpdated: Clients): Promise<Clients> {
    const client = await this.clientsRepository.findById(clientUpdated.id);

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    if (client.name) {
      client.name = criptografar(client.name);
    }

    if (client.sex) {
      client.sex = criptografar(client.sex);
    }

    if (client.genrer) {
      client.genrer = criptografar(client.genrer);
    }

    if (client.document) {
      client.document = criptografar(client.document);
    }

    if (client.rg) {
      client.rg = criptografar(client.rg);
    }

    if (client.address && client.address.cep) {
      client.address.cep = criptografar(client.address.cep);
    }

    if (client.address && client.address.street) {
      client.address.street = criptografar(client.address.street);
    }

    if (client.address && client.address.district) {
      client.address.district = criptografar(client.address.district);
    }

    if (client.address && client.address.city) {
      client.address.city = criptografar(client.address.city);
    }

    if (client.address && client.address.state) {
      client.address.state = criptografar(client.address.state);
    }

    Object.assign(client, clientUpdated);

    await this.clientsRepository.delete(client.id);

    const updated = await this.clientsRepository.save(client);

    await this.historicClientsRepository.create({
      id_client: updated.id,
      type: 'UPDATED',
      client: updated,
    });
    return updated;
  }
}
export default UpdateClientsService;
