import { AppRoute } from 'common/enums';

const replacePageIdParamAndVersionId = (
  route: AppRoute,
  id: string,
  versionId: string,
): string => route.replace(':id', id).replace(':versionId', versionId);

export { replacePageIdParamAndVersionId };
