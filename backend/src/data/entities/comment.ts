import {
  Entity,
  Column,
  // OneToMany,
  RelationId,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { Page } from './page';
import { User } from './user';

@Entity()
@Tree('closure-table')
export class Comment extends AbstractEntity {
  @Column()
  text: string;

  @RelationId((comment: Comment) => comment.author)
  @Column()
  readonly authorId: string;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @RelationId((comment: Comment) => comment.page)
  @Column()
  readonly pageId: string;

  @ManyToOne(() => Page, (page) => page.comments)
  page: Page;

  @RelationId((comment: Comment) => comment.parentComment)
  @Column({ nullable: true })
  readonly parentCommentId: string;

  @TreeChildren()
  childComments: Comment[];

  @TreeParent()
  parentComment: Comment;
  // @ManyToOne(() => Comment, comment => comment.childComments)
  // parentComment: Comment;

  // @OneToMany(() => Comment, comment => comment.parentComment)
  // childComments: Comment[];
}
