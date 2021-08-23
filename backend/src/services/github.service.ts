import axios from 'axios';
import { env } from '../env';

export const getAccessToken = async (
  code: string,
): Promise<{ githubAccessToken: string }> => {
  const { clientId, clientSecret } = env.github;
  const response = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
    headers: {
      accept: 'application/json',
    },
  });
  return { githubAccessToken: response.data.access_token };
};
