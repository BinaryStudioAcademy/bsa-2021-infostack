import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { User } from './user';

@Entity()
export class RefreshToken {
  @PrimaryColumn()
  token: string;

  @RelationId((refreshToken: RefreshToken) => refreshToken.user)
  @Column()
  readonly userId: string;

  @ManyToOne(() => User, user => user.refreshTokens)
  user: User;
}
