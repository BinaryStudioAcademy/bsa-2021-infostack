import { IWorkspaceUser } from './workspace-user.interface';

interface IWorkspace {
  id: string;
  title: string;
  role?: string;
  description?: string;
  users?: IWorkspaceUser[];
}

export type { IWorkspace };
