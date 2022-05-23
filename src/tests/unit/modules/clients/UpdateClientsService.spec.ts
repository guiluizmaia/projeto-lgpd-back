import ClientsRepositoryMock from '@tests/mocks/ClientsRepositoryMock';
import UpdateClientsService from '@modules/clients/services/UpdateClientsService';
import Clients from '@modules/clients/infra/typeorm/schemas/Clients';
import { IDataGenerator } from '@infra/utils/DataGenerator/IDataGenerator';
import DataGenerator from '@infra/utils/DataGenerator/DataGenerator';
import IClientsBasicDtos from '@modules/clients/dtos/IClientsBasicDtos';
import AppError from '@infra/http/errors/AppError';
import HistoricClientsRepositoryMock from '@tests/mocks/HistoricClientsRepositoryMock';

let clientsRepository: ClientsRepositoryMock;
let updateClientsService: UpdateClientsService;
let historicRepository: HistoricClientsRepositoryMock;

let dataGenerator: IDataGenerator;
let clientTest: Clients;

describe('UpdateClientsService', () => {
  beforeEach(async () => {
    dataGenerator = new DataGenerator();

    clientsRepository = new ClientsRepositoryMock();
    historicRepository = new HistoricClientsRepositoryMock();

    updateClientsService = new UpdateClientsService(
      clientsRepository,
      historicRepository,
    );

    const clientTestDtos: IClientsBasicDtos = {
      document: dataGenerator.cpf(),
      name: dataGenerator.completeName(),
      phone: dataGenerator.phone(),
      email: dataGenerator.email(),
      password: dataGenerator.password(),
      sex: 'M',
      birthDay: new Date(new Date().setFullYear(1999)),
    };

    clientTest = await clientsRepository.create(clientTestDtos);
  });

  it('should be able update client', async () => {
    const clientUpdated = clientTest;
    clientUpdated.name = 'Name Test';

    const expected = await updateClientsService.execute(clientUpdated);

    expect(expected.name).toBe('Name Test');
  });

  it('should not be able update without client', async () => {
    const clientUpdated = new Clients();
    clientUpdated.name = 'Name Test';

    await expect(updateClientsService.execute(clientUpdated)).rejects.toEqual(
      new AppError('Client not found', 404),
    );
  });
});
