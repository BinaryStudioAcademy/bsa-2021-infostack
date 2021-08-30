import { AppRoute } from 'common/enums';

const replaceIdParam = (route: AppRoute, id: string): string =>
  route.replace(':id', id);

export { replaceIdParam };
