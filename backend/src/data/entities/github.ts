import { Entity, Column, RelationId, OneToOne } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { Workspace } from './workspace';

@Entity()
export class Github extends AbstractEntity {
  @RelationId((github: Github) => github.workspace)
  @Column()
  readonly workspaceId: string;

  @OneToOne(() => Workspace, (workspace) => workspace.tags)
  workspace: Workspace;

  @Column({
    nullable: true,
  })
  username: string;

  @Column({
    nullable: true,
  })
  repo: string;

  @Column()
  token: string;
}
