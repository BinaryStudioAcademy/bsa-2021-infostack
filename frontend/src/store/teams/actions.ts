import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { TeamApi } from 'services';

const loadTeams = createAsyncThunk(
  ActionType.SetTeams,
  async (payload: undefined, { dispatch }) => {
    try {
      const getResponse = await new TeamApi().get();
      dispatch(actions.SetTeams(getResponse));
    } catch (err) {
      alert(err);
    }
  },
);

const teamsActions = {
  ...actions,
  loadTeams,
};

export {
  teamsActions,
};
