import { EntityRepository, Repository } from 'typeorm';
import { Github } from './../entities/github';

@EntityRepository(Github)
class GitHubRepository extends Repository<Github> {
  public createAndSave(
    workspaceId: string,
    token: string,
    username?: string,
    repo?: string,
  ): Promise<Github> {
    const github = this.create({
      workspaceId,
      username,
      repo,
      token,
    });

    return this.manager.save(github);
  }

  public findByWorkspaceId(workspaceId: string): Promise<Github> {
    return this.findOne({
      where: { workspaceId },
    });
  }
}

export default GitHubRepository;
