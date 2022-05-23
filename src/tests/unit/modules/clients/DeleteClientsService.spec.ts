import ClientsRepositoryMock from '@tests/mocks/ClientsRepositoryMock';
import Clients from '@modules/clients/infra/typeorm/schemas/Clients';
import { IDataGenerator } from '@infra/utils/DataGenerator/IDataGenerator';
import DataGenerator from '@infra/utils/DataGenerator/DataGenerator';
import IClientsBasicDtos from '@modules/clients/dtos/IClientsBasicDtos';
import AppError from '@infra/http/errors/AppError';
import { ObjectId } from 'mongodb';
import DeleteClientsService from '@modules/clients/services/DeleteClientsService';
import HistoricClientsRepositoryMock from '@tests/mocks/HistoricClientsRepositoryMock';

let clientsRepository: ClientsRepositoryMock;
let deleteClientsService: DeleteClientsService;
let historicRepository: HistoricClientsRepositoryMock;

let dataGenerator: IDataGenerator;
let clientTest: Clients;

describe('DeleteClientsService', () => {
  beforeEach(async () => {
    dataGenerator = new DataGenerator();

    clientsRepository = new ClientsRepositoryMock();
    historicRepository = new HistoricClientsRepositoryMock();

    deleteClientsService = new DeleteClientsService(
      clientsRepository,
      historicRepository,
    );
  });

  it('should be able delete client by id', async () => {
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

    const created = await clientsRepository.create(clientTestDtos);
    await clientsRepository.create(clientTestDtos2);

    await deleteClientsService.execute(created.id);
    const index = await clientsRepository.index();
    expect(index.length).toBe(1);
  });
});
