import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { SettingsApi, WorkspaceApi } from 'services';
import { ITeamCreation } from 'common/interfaces/team';

const loadUsers = createAsyncThunk(
  ActionType.SetUsers,
  async (_, { dispatch }): Promise<void> => {
    const response = await new WorkspaceApi().loadUsers();
    dispatch(actions.setUsers(response));
  },
);

const loadTeams = createAsyncThunk(
  ActionType.SetTeams,
  async (_, { dispatch }): Promise<void> => {
    const response = await new SettingsApi().loadTeams();
    dispatch(actions.SetTeams(response));
  },
);

const createTeam = createAsyncThunk(
  ActionType.SetCurrentTeamID,
  async (payload: ITeamCreation, { dispatch }) => {
    try {
      const { id } = await new SettingsApi().createTeam(payload);
      dispatch(actions.SetCurrentTeamID(id));
    } catch (err) {
      alert(err);
    }
  },
);

const settingsActions = {
  ...actions,
  loadUsers,
  loadTeams,
  createTeam,
};

export { settingsActions };
