import { InviteStatus } from '../../enums';

interface IWorkspace {
  id: string;
  title: string;
  description?: string;
  status?: InviteStatus;
}

export type { IWorkspace };
