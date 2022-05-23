import ClientsRepositoryMock from '@tests/mocks/ClientsRepositoryMock';
import FindClientsByIdService from '@modules/clients/services/FindClientsByIdService';
import Clients from '@modules/clients/infra/typeorm/schemas/Clients';
import { IDataGenerator } from '@infra/utils/DataGenerator/IDataGenerator';
import DataGenerator from '@infra/utils/DataGenerator/DataGenerator';
import IClientsBasicDtos from '@modules/clients/dtos/IClientsBasicDtos';
import AppError from '@infra/http/errors/AppError';
import { ObjectId } from 'mongodb';

let clientsRepository: ClientsRepositoryMock;
let findClientsByIdService: FindClientsByIdService;
let dataGenerator: IDataGenerator;
let clientTest: Clients;

describe('FindClientsByIdService', () => {
  beforeEach(async () => {
    dataGenerator = new DataGenerator();

    clientsRepository = new ClientsRepositoryMock();
    findClientsByIdService = new FindClientsByIdService(clientsRepository);

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

  it('should be able find client by id', async () => {
    const clientFind = clientTest;

    const expected = await findClientsByIdService.execute(clientFind.id);

    expect(expected).not.toBeNull();
  });

  it('should be able find a client with id wrong and return null', async () => {
    const idWrong = new ObjectId().toString();

    await expect(findClientsByIdService.execute(idWrong)).rejects.toEqual(
      new AppError('Client not found', 404),
    );
  });
});
