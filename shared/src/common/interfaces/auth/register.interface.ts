import { ILogin } from './login.interface';

interface IRegister extends ILogin {
  fullName: string;
}

export type { IRegister };
