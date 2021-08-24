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

export { getAccessToken, getUser, getRepositories };
