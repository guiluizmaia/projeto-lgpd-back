import ClientsRepositoryMock from '@tests/mocks/ClientsRepositoryMock';

import AuthenticateService from '@modules/clients/services/AuthenticateService';
import DataGenerator from '@infra/utils/DataGenerator/DataGenerator';
import { IDataGenerator } from '@infra/utils/DataGenerator/IDataGenerator';
import ICryptHash from '@infra/utils/CryptHash/ICryptHash';
import CryptHash from '@infra/utils/CryptHash/CryptHash';
import IClientsBasicDtos from '@modules/clients/dtos/IClientsBasicDtos';
import AppError from '@infra/http/errors/AppError';

let clientsRepository: ClientsRepositoryMock;
let cryptHash: ICryptHash;
let authenticateService: AuthenticateService;
let dataGenerator: IDataGenerator;

let email: string;
let password: string;

describe('CreateClientsWithBasicsService', () => {
  beforeAll(async () => {
    dataGenerator = new DataGenerator();
    clientsRepository = new ClientsRepositoryMock();
    cryptHash = new CryptHash();
    authenticateService = new AuthenticateService(clientsRepository, cryptHash);

    email = dataGenerator.email();
    password = dataGenerator.password();
    const passwordHash = await cryptHash.create(password);

    const clientTestDtos: IClientsBasicDtos = {
      document: dataGenerator.cpf(),
      name: dataGenerator.completeName(),
      phone: dataGenerator.phone(),
      email,
      password: passwordHash,
      sex: 'M',
      birthDay: new Date(new Date().setFullYear(1999)),
    };

    await clientsRepository.create(clientTestDtos);
  });

  it('should be able login', async () => {
    const client = await authenticateService.execute({ email, password });

    expect(client).toHaveProperty('token');
  });

  it('should be able login with a email wrong', async () => {
    await expect(
      authenticateService.execute({
        email: 'test@test.com',
        password,
      }),
    ).rejects.toEqual(new AppError('Email or password not correct!', 401));
  });

  it('should be able login with a password wrong', async () => {
    await expect(
      authenticateService.execute({
        email,
        password: 'Wrong Pass',
      }),
    ).rejects.toEqual(new AppError('Email or password not correct!', 401));
  });
});
