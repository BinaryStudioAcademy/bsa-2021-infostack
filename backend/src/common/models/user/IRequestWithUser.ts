import { Request } from 'express';

export interface IRequestWithUser extends Request {
  userId?: string;
  role?: string;
}
