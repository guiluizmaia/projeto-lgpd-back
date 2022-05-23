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

    if (clientUpdated.name) {
      clientUpdated.name = criptografar(clientUpdated.name);
    }

    if (clientUpdated.sex) {
      clientUpdated.sex = criptografar(clientUpdated.sex);
    }

    if (clientUpdated.genrer) {
      clientUpdated.genrer = criptografar(clientUpdated.genrer);
    }

    if (clientUpdated.document) {
      clientUpdated.document = criptografar(clientUpdated.document);
    }

    if (clientUpdated.rg) {
      clientUpdated.rg = criptografar(clientUpdated.rg);
    }

    if (clientUpdated.address && clientUpdated.address.cep) {
      clientUpdated.address.cep = criptografar(clientUpdated.address.cep);
    }

    if (clientUpdated.address && clientUpdated.address.street) {
      clientUpdated.address.street = criptografar(clientUpdated.address.street);
    }

    if (clientUpdated.address && clientUpdated.address.district) {
      clientUpdated.address.district = criptografar(
        clientUpdated.address.district,
      );
    }

    if (clientUpdated.address && clientUpdated.address.city) {
      clientUpdated.address.city = criptografar(clientUpdated.address.city);
    }

    if (clientUpdated.address && clientUpdated.address.state) {
      clientUpdated.address.state = criptografar(clientUpdated.address.state);
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
