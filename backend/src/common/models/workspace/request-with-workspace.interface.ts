import { Request } from 'express';

export interface IRequestWithWorkspace extends Request {
  workspaceId?: string;
}
