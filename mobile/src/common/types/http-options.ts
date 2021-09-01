import { ContentType, HttpMethod } from 'common/enums';

type HttpOptions = {
  method: HttpMethod;
  contentType: ContentType;
  payload: string | null;
};

export type { HttpOptions };
