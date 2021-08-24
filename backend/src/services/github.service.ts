import {
  getAccessToken,
  getUser,
  getRepositories,
} from '../common/utils/github.util';

let accessToken: string;
let currentRepo: string;
let username: string;

export const createAccessToken = async (code: string): Promise<void> => {
  accessToken = await getAccessToken(code);
};

export const getUsername = async (): Promise<{ username: string }> => {
  if (username) {
    return { username };
  }
  if (!accessToken) {
    return { username: undefined };
  }
  const user = await getUser(accessToken);

  return { username: user.name };
};

export const getRepos = async (): Promise<{ repos: string[] }> => {
  if (!accessToken) {
    return { repos: undefined };
  }
  const repos = await getRepositories(accessToken);
  return { repos: repos.map((repo: { name: string }) => repo.name) };
};

export const addCurrentRepo = async (repo: string): Promise<void> => {
  currentRepo = repo;
};

export const getCurrentRepo = async (): Promise<{ currentRepo: string }> => {
  return { currentRepo };
};
