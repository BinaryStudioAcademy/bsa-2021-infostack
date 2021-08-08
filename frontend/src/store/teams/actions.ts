import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { TeamApi } from 'services';
import { ITeamCreation, ITeamEditing } from 'common/interfaces/team';
import { HttpCode } from 'common/enums/enums';

const loadTeams = createAsyncThunk(
  ActionType.setTeams,
  async (_, { dispatch }): Promise<void> => {
    const response = await new TeamApi().loadTeams();
    dispatch(actions.setTeams(response));
  },
);

const createTeam = createAsyncThunk(
  ActionType.setCurrentTeamID,
  async (payload: ITeamCreation, { dispatch }) => {
    try {
      const team = await new TeamApi().createTeam(payload);
      dispatch(actions.setCurrentTeamID(team.id));
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
  ActionType.updateTeam,
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
  ActionType.deleteTeam,
  async (payload: string, { dispatch }) => {
    try {
      await new TeamApi().deleteTeam(payload);
      dispatch(actions.deleteTeam(payload));
    } catch (err) {
      alert(err);
    }
  },
);

const teamsActions = {
  ...actions,
  loadTeams,
  createTeam,
  updateTeam,
  deleteTeam,
};

export { teamsActions };
