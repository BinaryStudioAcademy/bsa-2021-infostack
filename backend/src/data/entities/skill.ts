import {
  Entity,
  Column,
  JoinTable,
  RelationId,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { User } from './user';
import { Workspace } from './workspace';

@Entity()
export class Skill extends AbstractEntity {
  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => User, (user) => user.skills, { cascade: true })
  @JoinTable({ name: 'user_skills' })
  users: User[];

  @RelationId((skill: Skill) => skill.workspace)
  @Column()
  readonly workspaceId: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.skills)
  workspace: Workspace;
}
