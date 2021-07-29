import { ILogin } from './login';

interface IRegister extends ILogin {
  fullName: string;
}

export type { IRegister };
