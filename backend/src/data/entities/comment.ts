import {
  Entity,
  Column,
  RelationId,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { Page } from './page';
import { User } from './user';
import { Reaction } from './reaction';

@Entity()
@Tree('closure-table')
export class Comment extends AbstractEntity {
  @Column()
  text: string;

  @Column({ nullable: true })
  voiceRecord: string;

  @RelationId((comment: Comment) => comment.author)
  @Column()
  readonly authorId: string;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @RelationId((comment: Comment) => comment.page)
  @Column()
  readonly pageId: string;

  @ManyToOne(() => Page, (page) => page.comments, {
    onDelete: 'CASCADE',
  })
  page: Page;

  @RelationId((comment: Comment) => comment.parentComment)
  @Column({ nullable: true })
  readonly parentCommentId: string;

  @TreeChildren()
  childComments: Comment[];

  @TreeParent({ onDelete: 'CASCADE' })
  parentComment: Comment;

  @OneToMany(() => Reaction, (reaction) => reaction.comment)
  reactions: Reaction[];
}
