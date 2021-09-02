import { Entity, Column, RelationId, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { User } from './user';
import { Comment } from './comment';

@Entity()
export class Reaction extends AbstractEntity {
  @Column({ length: 50 })
  reaction: string;

  @RelationId((reaction: Reaction) => reaction.user)
  @Column()
  readonly userId: string;

  @ManyToOne(() => User, (user) => user.reactions)
  user: User;

  @RelationId((reaction: Reaction) => reaction.comment)
  @Column()
  readonly commentId: string;

  @ManyToOne(() => Comment, (comment) => comment.reactions, {
    onDelete: 'CASCADE',
  })
  comment: Comment;
}
