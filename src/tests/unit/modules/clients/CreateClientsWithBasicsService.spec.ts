import ClientsRepositoryMock from '@tests/mocks/ClientsRepositoryMock';
import HistoricClientsRepositoryMock from '@tests/mocks/HistoricClientsRepositoryMock';

import CreateClientsWithBasicsService from '@modules/clients/services/CreateClientsWithBasicsService';
import DataGenerator from '@infra/utils/DataGenerator/DataGenerator';
import { IDataGenerator } from '@infra/utils/DataGenerator/IDataGenerator';
import ICryptHash from '@infra/utils/CryptHash/ICryptHash';
import CryptHash from '@infra/utils/CryptHash/CryptHash';

let clientsRepository: ClientsRepositoryMock;
let historicRepository: HistoricClientsRepositoryMock;
let cryptHash: ICryptHash;
let createClientsWithBasicsService: CreateClientsWithBasicsService;
let dataGenerator: IDataGenerator;

describe('CreateClientsWithBasicsService', () => {
  beforeEach(() => {
    dataGenerator = new DataGenerator();
    clientsRepository = new ClientsRepositoryMock();
    historicRepository = new HistoricClientsRepositoryMock();
    cryptHash = new CryptHash();
    createClientsWithBasicsService = new CreateClientsWithBasicsService(
      clientsRepository,
      historicRepository,
      cryptHash,
    );
  });

  it('should be able create a clients with basics information', async () => {
    const client = await createClientsWithBasicsService.execute({
      document: dataGenerator.cpf(),
      name: dataGenerator.completeName(),
      phone: dataGenerator.phone(),
      email: dataGenerator.email(),
      password: dataGenerator.password(),
      sex: 'M',
      birthDay: new Date(new Date().setFullYear(1999)),
    });
    expect(client).toHaveProperty('id');
  });
});
