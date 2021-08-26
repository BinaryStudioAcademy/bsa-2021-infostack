import { IPage } from '../pages/page.interface';
import { ISkill } from '../skill/skill.interface';
import { ILink } from '../links/link.interface';

interface IUser {
  id: string;
  fullName: string;
  email: string;
  title?: string;
  skills?: ISkill[];
  avatar: string;
  followingPages?: IPage[];
  links?: ILink[];
}

export type { IUser };
