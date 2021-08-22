import { EntityRepository, Repository } from 'typeorm';
import { PageContent } from '../entities/page-content';
import { User } from '../entities/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public findByEmail(email: string): Promise<User> {
    return this.findOne({ email }, { relations: ['skills', 'followingPages'] });
  }

  public findById(id: string): Promise<User> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.skills', 'skills')
      .leftJoinAndSelect('user.teams', 'teams')
      .leftJoinAndSelect('user.followingPages', 'pages')
      .leftJoin(
        (qb) =>
          qb
            .from(PageContent, 'content')
            .select('MAX("content"."createdAt")', 'created_at')
            .addSelect('"content"."pageId"', 'page_id')
            .groupBy('"page_id"'),
        'last_version',
        '"last_version"."page_id" = pages.id',
      )
      .leftJoinAndSelect(
        'pages.pageContents',
        'pageContents',
        '"pageContents"."createdAt" = "last_version"."created_at"',
      )
      .where('user.id = :id', { id })
      .getOne();
  }

  public findUserTeams(userId: string): Promise<User> {
    return this.findOne({ relations: ['teams'], where: { id: userId } });
  }

  public findUserTeamsInWorkspace(
    userId: string,
    workspaceId: string,
  ): Promise<User[]> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.teams', 'teams')
      .leftJoinAndSelect('user.userWorkspaces', 'userWorkspaces')
      .where('userWorkspaces.workspaceId = :workspaceId', { workspaceId })
      .andWhere('teams.workspaceId = :workspaceId', { workspaceId })
      .andWhere('user.id = :userId', { userId })
      .getMany();
  }

  public findUserPermissions(userId: string): Promise<User> {
    return this.findOne({
      relations: ['userPermissions'],
      where: { id: userId },
    });
  }

  public updatePasswordById(id: string, password: string): Promise<User> {
    return this.save({ id, password });
  }

  public updateAvatarById(id: string, avatar: string): Promise<User> {
    return this.save({ id, avatar });
  }
}

export default UserRepository;
