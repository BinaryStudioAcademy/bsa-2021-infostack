import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ITeam } from 'common/interfaces/team';
import {
  fetchTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  addUser,
  deleteUser,
} from './actions';

type State = {
  teams: ITeam[];
  isLoading: boolean;
};

const initialState: State = {
  teams: [],
  isLoading: false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.TEAMS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.teams = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTeams.rejected, (state) => {
        toast.error('Error happened while loading teams.');
        state.isLoading = false;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.teams.push(action.payload);
      })
      .addCase(createTeam.rejected, () => {
        toast.error('Error happened while creating a team.');
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        const id = action.payload.id;
        state.teams = state.teams.map((team) =>
          team.id === id ? action.payload : team,
        );
      })
      .addCase(updateTeam.rejected, () => {
        toast.error('Error happened while updating the team.');
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.teams = state.teams.filter((team) => team.id !== id);
      })
      .addCase(deleteTeam.rejected, () => {
        toast.error('Error happened while deleting the team.');
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.teams = action.payload;
      })
      .addCase(addUser.rejected, (state) => {
        toast.error('Error happened while adding user to team.');
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.teams = action.payload;
      })
      .addCase(deleteUser.rejected, () => {
        toast.error('Error happened while deleting the user.');
      });
  },
});

export { reducer, actions };
