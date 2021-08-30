import { IWorkspaceUpdate as IWorkspaceUpd } from 'infostack-shared';

interface IWorkspaceUpdate extends Omit<IWorkspaceUpd, 'logo'> {
  title: string;
  logo?: Blob;
}

export type { IWorkspaceUpdate };
