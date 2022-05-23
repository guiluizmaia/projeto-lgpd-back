import ClientsRepositoryMock from '@tests/mocks/ClientsRepositoryMock';
import IndexClientsService from '@modules/clients/services/IndexClientsService';
import Clients from '@modules/clients/infra/typeorm/schemas/Clients';
import { IDataGenerator } from '@infra/utils/DataGenerator/IDataGenerator';
import DataGenerator from '@infra/utils/DataGenerator/DataGenerator';
import IClientsBasicDtos from '@modules/clients/dtos/IClientsBasicDtos';
import AppError from '@infra/http/errors/AppError';
import { ObjectId } from 'mongodb';

let clientsRepository: ClientsRepositoryMock;
let indexClientsService: IndexClientsService;
let dataGenerator: IDataGenerator;
let clientTest: Clients;

describe('IndexClientsService', () => {
  beforeEach(async () => {
    dataGenerator = new DataGenerator();

    clientsRepository = new ClientsRepositoryMock();
    indexClientsService = new IndexClientsService(clientsRepository);
  });

  it('should be able index many clients', async () => {
    const clientTestDtos: IClientsBasicDtos = {
      document: dataGenerator.cpf(),
      name: dataGenerator.completeName(),
      phone: dataGenerator.phone(),
      email: dataGenerator.email(),
      password: dataGenerator.password(),
      sex: 'M',
      birthDay: new Date(new Date().setFullYear(1999)),
    };

    const clientTestDtos2: IClientsBasicDtos = {
      document: dataGenerator.cpf(),
      name: dataGenerator.completeName(),
      phone: dataGenerator.phone(),
      email: dataGenerator.email(),
      password: dataGenerator.password(),
      sex: 'M',
      birthDay: new Date(new Date().setFullYear(1999)),
    };

    await clientsRepository.create(clientTestDtos);
    await clientsRepository.create(clientTestDtos2);

    const expected = await indexClientsService.execute();

    expect(expected.length).not.toBe(0);
  });

  it('should not be able find a client with id wrong', async () => {
    const expected = await indexClientsService.execute();

    expect(expected.length).toBe(0);
  });
});
