import { Response } from 'express';
import { IRequestWithUser } from '~/common/models/user/IRequestWithUser';
import { HttpCode } from 'infostack-shared/common/enums';
import jwt from 'jsonwebtoken';
import { expiresIn, expiresHours } from '../config/jwt-config';

export const getSomething = <T>(data: T): Promise<T> => Promise.resolve(data);

export const login = async (req: IRequestWithUser, res: Response): Promise<void> => {
  const { login, password } = req.body;
  const { userId } = req;

  if(login && password) {
    return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: expiresIn }, (err, token) => {

      if(err) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: 'Something wrong', error: err });
      }

      const currentDate = new Date();
      const expiredDate = new Date(currentDate.setHours(currentDate.getHours() + expiresHours));
      res.json({ token: token, exp: expiredDate });
    });
  }

  res.status(HttpCode.NOT_FOUND).json({ msg: 'Not found' });
};
