import { inject, injectable } from 'tsyringe';
import IClientsBasicDtos from '@modules/clients/dtos/IClientsBasicDtos';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import Clients from '@modules/clients/infra/typeorm/schemas/Clients';
import IHistoricClientsRepository from '../repositories/IHistoricClientsRepository';
import ICryptHash from '@infra/utils/CryptHash/ICryptHash';
import { criptografar } from '@infra/utils/cryptografar';

@injectable()
class CreateClientsWithBasicsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('HistoricClientsRepository')
    private historicClientsRepository: IHistoricClientsRepository,
    @inject('CryptHash')
    private cryptHash: ICryptHash,
  ) {}

  public async execute(data: IClientsBasicDtos): Promise<Clients> {
    data.password = await this.cryptHash.create(data.password);

    if (data.name) {
      data.name = criptografar(data.name);
    }

    if (data.sex) {
      data.sex = criptografar(data.sex);
    }

    if (data.genrer) {
      data.genrer = criptografar(data.genrer);
    }

    if (data.document) {
      data.document = criptografar(data.document);
    }

    if (data.rg) {
      data.rg = criptografar(data.rg);
    }

    if (data.address && data.address.cep) {
      data.address.cep = criptografar(data.address.cep);
    }

    if (data.address && data.address.street) {
      data.address.street = criptografar(data.address.street);
    }

    if (data.address && data.address.district) {
      data.address.district = criptografar(data.address.district);
    }

    if (data.address && data.address.city) {
      data.address.city = criptografar(data.address.city);
    }

    if (data.address && data.address.state) {
      data.address.state = criptografar(data.address.state);
    }

    const created = await this.clientsRepository.create(data);
    this.historicClientsRepository.create({
      type: 'CREATED',
      id_client: created.id,
      client: created,
    });

    return created;
  }
}

export default CreateClientsWithBasicsService;
