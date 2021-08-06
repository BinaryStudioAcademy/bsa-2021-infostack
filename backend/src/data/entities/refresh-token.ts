import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  RelationId,
  BaseEntity,
} from 'typeorm';
import { User } from './user';

@Entity()
export class RefreshToken extends BaseEntity {
  @PrimaryColumn()
  token: string;

  @RelationId((refreshToken: RefreshToken) => refreshToken.user)
  @Column()
  readonly userId: string;

  @ManyToOne(() => User, user => user.refreshTokens)
  user: User;
}
