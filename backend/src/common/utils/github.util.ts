/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { env } from '../../env';

const getAccessToken = async (code: string): Promise<string> => {
  const { clientId, clientSecret } = env.github;
  const response = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
    headers: {
      accept: 'application/json',
    },
  });
  return response.data.access_token;
};

const getUser = async (accessToken: string): Promise<any> => {
  const response = await axios({
    method: 'get',
    url: 'https://api.github.com/user',
    headers: {
      Authorization: 'token ' + accessToken,
    },
  });
  return response.data;
};

const getRepositories = async (accessToken: string): Promise<any> => {
  const response = await axios({
    method: 'get',
    url: 'https://api.github.com/user/repos',
    headers: {
      Authorization: 'token ' + accessToken,
    },
  });
  return response.data;
};

const getRepoLabels = async (
  user: string,
  repo: string,
  accessToken: string,
): Promise<any> => {
  const response = await axios({
    method: 'get',
    url: `https://api.github.com/repos/${user}/${repo}/labels`,
    headers: {
      Authorization: 'token ' + accessToken,
    },
  });
  return response.data;
};

const createWebhook = async (
  user: string,
  repo: string,
  accessToken: string,
  type: string,
  url: string,
): Promise<any> => {
  const response = await axios({
    method: 'post',
    url: `https://api.github.com/repos/${user}/${repo}/hooks`,
    data: {
      name: 'web',
      config: {
        url: url,
        content_type: 'json',
      },
      events: [type],
    },
    headers: {
      Authorization: 'token ' + accessToken,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  return response;
};

export {
  getAccessToken,
  getUser,
  getRepositories,
  getRepoLabels,
  createWebhook,
};
