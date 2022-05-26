import AppError from '@infra/http/errors/AppError';
import auth from '@configs/auth';
import { inject, injectable } from 'tsyringe';

import IClientsRepository from '../repositories/IClientsRepository';
import { sign } from 'jsonwebtoken';
import ICryptHash from '@infra/utils/CryptHash/ICryptHash';
import { descriptografar } from '@infra/utils/cryptografar';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('CryptHash')
    private cryptHash: ICryptHash,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.clientsRepository.findByEmail(email);
    const { secretKey, expiresIn, token_validator } = auth;

    if (!user) {
      throw new AppError('Email or password not correct!', 401);
    }

    const passwordMatch = await this.cryptHash.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password not correct!', 401);
    }

    const token = sign({}, secretKey, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    if (user.name) {
      user.name = descriptografar(user.name);
    }

    if (user.sex) {
      user.sex = descriptografar(user.sex);
    }

    if (user.genrer) {
      user.genrer = descriptografar(user.genrer);
    }

    if (user.document) {
      user.document = descriptografar(user.document);
    }

    if (user.rg) {
      user.rg = descriptografar(user.rg);
    }

    if (user.address && user.address.cep) {
      user.address.cep = descriptografar(user.address.cep);
    }

    if (user.address && user.address.street) {
      user.address.street = descriptografar(user.address.street);
    }

    if (user.address && user.address.district) {
      user.address.district = descriptografar(user.address.district);
    }

    if (user.address && user.address.city) {
      user.address.city = descriptografar(user.address.city);
    }

    if (user.address && user.address.state) {
      user.address.state = descriptografar(user.address.state);
    }

    const tokenReturn: IResponse = {
      token,
      user,
    };

    return tokenReturn;
  }
}

export default AuthenticateService;
