import { TagType } from '../../enums';

interface ITagSelect {
  id?: string;
  name?: string;
  type: TagType;
  __isNew__?: boolean;
  value?: string;
  label?: string;
  icon?: string;
}

export type { ITagSelect };
