import { PermissionType } from '../../enums/index';

interface IPageNav {
  id: string;
  title: string;
  permission?: PermissionType;
  childPages: IPageNav[];
}
export type { IPageNav };
