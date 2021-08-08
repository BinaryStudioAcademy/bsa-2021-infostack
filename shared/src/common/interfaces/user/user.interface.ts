import { ISkill } from '../skill/skill.interface';

interface IUser {
  id: string;
  fullName: string;
  email: string;
  title?: string;
  skills?: ISkill[];
  avatar: string;
}

export type { IUser };
