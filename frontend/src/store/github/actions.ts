import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { githubApi } from 'services';

const loadUsername = createAsyncThunk(
  ActionType.SET_USERNAME,
  async (_, { dispatch }) => {
    const { username } = await githubApi.getUsername();

    dispatch(actions.setUsername(username));
  },
);

const loadRepos = createAsyncThunk(
  ActionType.SET_REPOS,
  async (_, { dispatch }) => {
    const { repos } = await githubApi.getRepos();
    dispatch(actions.setRepos(repos));
  },
);

const setCurrentRepo = createAsyncThunk(
  ActionType.SET_CURRENT_REPO,
  async (repo: string, { dispatch }) => {
    await githubApi.addCurrentRepo(repo);
    dispatch(actions.setCurrentRepo(repo));
    dispatch(actions.removeRepos());
  },
);

const loadCurrentRepo = createAsyncThunk(
  ActionType.SET_CURRENT_REPO,
  async (_, { dispatch }) => {
    const { currentRepo } = await githubApi.getCurrentRepo();
    if (!currentRepo) {
      dispatch(loadRepos());
      return;
    }
    dispatch(actions.setCurrentRepo(currentRepo));
  },
);

const githubActions = {
  ...actions,
  loadUsername,
  loadRepos,
  setCurrentRepo,
  loadCurrentRepo,
};

export { githubActions };
