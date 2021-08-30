import { InviteStatus } from '../../enums';

interface IWorkspace {
  id: string;
  title: string;
  logo?: string;
  role?: string;
  description?: string;
  status?: InviteStatus;
}

export type { IWorkspace };
