import { AppRoute } from 'common/enums/enums';

const replaceIdParam = (route: AppRoute, id: string): string =>
  route.replace(':id', id);

const replacePageIdParamAndVersionId = (
  route: AppRoute,
  id: string,
  versionId: string,
): string => route.replace(':id', id).replace(':versionId', versionId);

export { replaceIdParam, replacePageIdParamAndVersionId };
