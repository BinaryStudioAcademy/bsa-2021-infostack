import { PermissionType } from '../enums/permissions';

const permissions = {
  [PermissionType.ADMIN]: 3,
  [PermissionType.WRITE]: 2,
  [PermissionType.READ]: 1,
};

export const getMaxPermission = (
  array: PermissionType[],
): PermissionType | void => {
  const nums = array.map((item) => permissions[item]);
  const maxValue = Math.max.apply(null, nums);
  switch (maxValue) {
    case permissions[PermissionType.ADMIN]: {
      return PermissionType.ADMIN;
    }
    case permissions[PermissionType.WRITE]: {
      return PermissionType.WRITE;
    }
    case permissions[PermissionType.READ]: {
      return PermissionType.READ;
    }
  }
};
