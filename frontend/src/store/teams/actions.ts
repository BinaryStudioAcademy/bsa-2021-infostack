import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { TeamApi } from 'services';
import { ITeamEditing } from 'common/interfaces/team';
import { HttpCode } from 'common/enums/enums';

const loadTeams = createAsyncThunk(
  ActionType.SetTeams,
  async (_, { dispatch }): Promise<void> => {
    const response = await new TeamApi().getTeams();
    dispatch(actions.setTeams(response));
  },
);

const createTeam = createAsyncThunk(
  ActionType.SetCurrentTeam,
  async (payload: string, { dispatch }) => {
    try {
      const team = await new TeamApi().createTeam(payload);
      dispatch(actions.setCurrentTeam(team));
      dispatch(actions.addTeam(team));
      dispatch(actions.removeCreatingError());
    } catch (err) {
      if (err.status === HttpCode.CONFLICT) {
        dispatch(actions.setCreatingError(err.message));
      }
    }
  },
);

const updateTeam = createAsyncThunk(
  ActionType.UpdateTeam,
  async (payload: ITeamEditing, { dispatch }) => {
    try {
      const team = await new TeamApi().updateTeam(payload);
      dispatch(actions.updateTeam(team));
      dispatch(actions.removeEditingError());
    } catch (err) {
      if (err.status === HttpCode.CONFLICT) {
        dispatch(actions.setEditingError(err.message));
      }
    }
  },
);

const deleteTeam = createAsyncThunk(
  ActionType.DeleteTeam,
  async (payload: string, { dispatch }) => {
    try {
      await new TeamApi().deleteTeam(payload);
      dispatch(actions.deleteTeam(payload));
    } catch (err) {
      alert(err);
    }
  },
);

const loadTeam = createAsyncThunk(
  ActionType.SetCurrentTeam,
  async (id: string, { dispatch }) => {
    const workspace = await new TeamApi().getTeam(id);
    dispatch(actions.setCurrentTeam(workspace));
  },
);

const teamsActions = {
  ...actions,
  loadTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  loadTeam,
};

export { teamsActions };
