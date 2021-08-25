import { getCustomRepository } from 'typeorm';
import TagRepository from '../data/repositories/tag.repository';
import GitHubRepository from '../data/repositories/github.repository';
import {
  getAccessToken,
  getUser,
  getRepositories,
  getRepoLabels,
  createWebhook,
} from '../common/utils/github.util';
import {
  generateGithubAccessToken,
  decodeToken,
} from '../common/utils/tokens.util';
import { TagType } from '../common/enums/tag-type';

export const createAccessToken = async (
  workspaceId: string,
  code: string,
): Promise<void> => {
  const accessToken = await getAccessToken(code);
  const hashedToken = await generateGithubAccessToken(accessToken);
  const gitHubRepository = getCustomRepository(GitHubRepository);
  await gitHubRepository.createAndSave(workspaceId, hashedToken);
};

export const getUsername = async (
  workspaceId: string,
): Promise<{ username: string }> => {
  const gitHubRepository = getCustomRepository(GitHubRepository);
  const github = await gitHubRepository.findByWorkspaceId(workspaceId);
  if (github?.username) {
    return { username: github.username };
  }
  if (!github?.token) {
    return { username: undefined };
  }

  const { token } = decodeToken(github.token) as { token: string };
  const user = await getUser(token);
  await gitHubRepository.update({ workspaceId }, { username: user.login });

  return { username: user.login };
};

export const getRepos = async (
  workspaceId: string,
): Promise<{ repos: string[] }> => {
  const gitHubRepository = getCustomRepository(GitHubRepository);
  const github = await gitHubRepository.findByWorkspaceId(workspaceId);
  if (!github?.token) {
    return { repos: undefined };
  }
  const { token } = decodeToken(github.token) as { token: string };
  const repos = await getRepositories(token);
  return { repos: repos.map((repo: { name: string }) => repo.name) };
};

export const addCurrentRepo = async (
  workspaceId: string,
  currentRepo: string,
): Promise<void> => {
  const gitHubRepository = getCustomRepository(GitHubRepository);
  const github = await gitHubRepository.findByWorkspaceId(workspaceId);
  if (!github?.token || !github?.username) {
    return;
  }

  await gitHubRepository.update({ workspaceId }, { repo: currentRepo });

  const { token } = decodeToken(github.token) as { token: string };
  const labels = await getRepoLabels(github.username, currentRepo, token);
  const tagRepository = getCustomRepository(TagRepository);
  const tags = await tagRepository.findAllByWorkspaceId(workspaceId);
  const tagsNames = tags.map((tag) => tag.name);
  const mappedLabels = labels
    .map((label: any) => label.name)
    .filter((labelName: string) => !tagsNames.includes(labelName))
    .map((labelName: string) => ({
      name: labelName,
      workspaceId,
      type: TagType.GITHUB,
    }));
  await tagRepository.save(mappedLabels);

  await createWebhook(github.username, currentRepo, token);
};

export const getCurrentRepo = async (
  workspaceId: string,
): Promise<{ currentRepo: string }> => {
  const gitHubRepository = getCustomRepository(GitHubRepository);
  const { repo } = await gitHubRepository.findByWorkspaceId(workspaceId);
  return { currentRepo: repo };
};
