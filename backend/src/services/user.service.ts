import { Request, Response } from 'express';
import { HttpCode } from 'infostack-shared/common/enums';
import jwt from 'jsonwebtoken';
import { expiresIn, expiresHours } from '../config/jwt-config';

export const getSomething = <T>(data: T): Promise<T> => Promise.resolve(data);

export const login = async (req: Request, res: Response): Promise<void> => {
  const { login, password } = req.body;

  // TODO: replace real data
  if(login === 'qwe' && password === 'qweqwe') {
    // TODO : replace real data
    return jwt.sign({ email: 'bar@bar.com', permission: 'admin', name: 'den' }, process.env.SECRET_KEY, { expiresIn: expiresIn }, (err, token) => {

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
