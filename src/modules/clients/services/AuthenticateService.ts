import AppError from '@infra/http/errors/AppError';
import auth from '@configs/auth';
import { inject, injectable } from 'tsyringe';

import IClientsRepository from '../repositories/IClientsRepository';
import { sign } from 'jsonwebtoken';
import ICryptHash from '@infra/utils/CryptHash/ICryptHash';

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

    const tokenReturn: IResponse = {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export default AuthenticateService;
