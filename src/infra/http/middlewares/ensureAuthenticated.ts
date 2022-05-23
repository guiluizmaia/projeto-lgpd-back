import { NextFunction, Request, Response } from 'express';
import AppError from '@infra/http/errors/AppError';

import jwt from 'jsonwebtoken';
import CryptHash from '@infra/utils/CryptHash/CryptHash';
import auth from '@configs/auth';

interface ITokenDecodeProps {
  iat: number;
  exp: number;
  sub: string;
  token_validator: string;
}

export default async function ensureAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('token not found in header', 401);
  }

  const [bearer, token] = authorization.split(' ');

  if (
    bearer.toLowerCase() !== 'bearer' ||
    !token ||
    token.split('.').length !== 3
  ) {
    throw new AppError('The custom token format is incorrect', 401);
  }

  try {
    const { sub: user_id } = jwt.verify(
      token,
      auth.secretKey,
    ) as ITokenDecodeProps;

    const bcrypt = new CryptHash();

    req.user = {
      id: user_id,
      token: authorization as string,
    };

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new AppError('This token is inspired, login again.', 401);
    }
    throw err;
  }
}
