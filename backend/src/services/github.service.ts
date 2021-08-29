/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCustomRepository } from 'typeorm';
import { Server } from 'socket.io';
import TagRepository from '../data/repositories/tag.repository';
import GitHubRepository from '../data/repositories/github.repository';
import PageRepository from '../data/repositories/page.repository';
import { NotificationRepository } from '../data/repositories';
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
import { prNotification } from '../common/utils/notifications';
import { prMail } from '../common/utils/mail';
import { isNotify } from '../common/helpers/is-notify.helper';
import { sendMail } from '../common/utils/mailer.util';
import { TagType } from '../common/enums/tag-type';
import { HttpCode } from '../common/enums/http-code';
import { EntityType } from '../common/enums/entity-type';
import { NotificationType } from '../common/enums/notification-type';
import { SocketEvents } from '../common/enums/socket';
import { env } from '../env';

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
  const tagRepository = getCustomRepository(TagRepository);

  const github = await gitHubRepository.findByWorkspaceId(workspaceId);
  if (!github?.token || !github?.username) {
    return;
  }

  const { token } = decodeToken(github.token) as { token: string };

  await gitHubRepository.update({ workspaceId }, { repo: currentRepo });

  const labels = await getRepoLabels(github.username, currentRepo, token);
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

  const { prWebhookCallbackUrl, labelWebhookCallbackUrl } = env.github;
  try {
    await createWebhook(
      github.username,
      currentRepo,
      token,
      'pull_request',
      prWebhookCallbackUrl,
    );
    await createWebhook(
      github.username,
      currentRepo,
      token,
      'label',
      labelWebhookCallbackUrl,
    );
  } catch (e) {
    if (e.response.status !== HttpCode.UNPROCESSABLE_ENTITY) {
      throw e;
    }
  }
};

export const getCurrentRepo = async (
  workspaceId: string,
): Promise<{ currentRepo: string }> => {
  const gitHubRepository = getCustomRepository(GitHubRepository);
  const github = await gitHubRepository.findByWorkspaceId(workspaceId);
  return { currentRepo: github?.repo };
};

export const prWebhookHandler = async (io: Server, pr: any): Promise<void> => {
  if (
    !pr?.merged_at ||
    !pr?.labels?.length ||
    !pr?.user?.login ||
    !pr?.head?.repo?.name
  ) {
    return;
  }

  const gitHubRepository = getCustomRepository(GitHubRepository);
  const pageRepository = getCustomRepository(PageRepository);
  const notificationRepository = getCustomRepository(NotificationRepository);

  const labelsNames = pr.labels.map((label: any) => label.name);

  const githubIntegrations = await gitHubRepository.findByUsernameAndRepo(
    pr.user.login,
    pr.head.repo.name,
  );
  for (const integration of githubIntegrations) {
    const pages = await pageRepository.findByWorkspaceIdWithTagsAndFollowers(
      integration.workspaceId,
    );
    const filteredPages = pages.filter((page) => {
      const tagsNames = page.tags.map((tag) => tag.name);
      return tagsNames.some((tag) => labelsNames.includes(tag));
    });
    for (const page of filteredPages) {
      const { followingUsers } = page;
      for (const followingUser of followingUsers) {
        const { id, email } = followingUser;

        const isNotifyPage = await isNotify(id, NotificationType.PAGE);
        const isNotifyEmail = await isNotify(id, NotificationType.PAGE_EMAIL);
        if (isNotifyPage) {
          io.to(id).emit(SocketEvents.NOTIFICATION_NEW);
          const { title, body } = prNotification(pr.title);
          await notificationRepository.createAndSave(
            title,
            body,
            EntityType.PAGE,
            page.id,
            id,
            integration.workspaceId,
            false,
          );
        }

        if (isNotifyEmail) {
          const { app } = env;
          const { text, subject } = prMail(pr.title, app.url);
          await sendMail({
            to: email,
            subject: subject,
            text: text,
          });
        }
      }
    }
  }
};

export const labelWebhookHandler = async (payload: any): Promise<void> => {
  if (
    payload?.action !== 'created' ||
    !payload?.repository?.name ||
    !payload?.repository?.owner?.login
  ) {
    return;
  }

  const gitHubRepository = getCustomRepository(GitHubRepository);
  const tagRepository = getCustomRepository(TagRepository);

  const githubIntegrations = await gitHubRepository.findByUsernameAndRepo(
    payload.repository.owner.login,
    payload.repository.name,
  );
  for (const integration of githubIntegrations) {
    const { workspaceId } = integration;

    const tags = await tagRepository.findAllByWorkspaceId(workspaceId);
    const tagsNames = tags.map((tag) => tag.name);
    if (!tagsNames.includes(payload.label.name)) {
      await tagRepository.save({
        name: payload.label.name,
        workspaceId,
        type: TagType.GITHUB,
      });
    }
  }
};
