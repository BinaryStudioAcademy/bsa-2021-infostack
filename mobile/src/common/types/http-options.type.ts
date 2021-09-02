import { ContentType, HttpMethod } from 'common/enums';

export type HttpOptions = {
  method: HttpMethod;
  contentType: ContentType;
  payload: string | null;
};
