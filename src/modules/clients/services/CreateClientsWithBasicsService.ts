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
