import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { User } from './user';

@Entity()
export class Skill extends AbstractEntity {
  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => User, user => user.skills, { cascade: true })
  @JoinTable({ name: 'user_skills' })
  users: User[];
}
