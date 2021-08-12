import { PermissionType } from '../../common/enums/permission-type';

const permissions = {
  [PermissionType.ADMIN]: 3,
  [PermissionType.WRITE]: 2,
  [PermissionType.READ]: 1,
};

export const maximum = (array: PermissionType[]): PermissionType | void => {
  const nums = array.map(item => permissions[item]);
  const maxValue = Math.max.apply(null, nums);
  if (maxValue === permissions[PermissionType.ADMIN]) return PermissionType.ADMIN;
  if (maxValue === permissions[PermissionType.WRITE]) return PermissionType.WRITE;
  if (maxValue === permissions[PermissionType.READ]) return PermissionType.READ;
};
