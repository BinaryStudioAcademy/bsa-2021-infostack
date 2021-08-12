import { IPage } from '../pages/page.interface';
import { ISkill } from '../skill/skill.interface';

interface IUser {
  id: string;
  fullName: string;
  email: string;
  title?: string;
  skills?: ISkill[];
  avatar: string;
  followingPages?: IPage[];
}

export type { IUser };
