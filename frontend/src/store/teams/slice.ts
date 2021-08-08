import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IWorkspaceUser } from 'common/interfaces/workspace';
import { ITeam } from 'common/interfaces/team';
import { ActionType } from './common';

type State = {
  users: IWorkspaceUser[];
  teams: ITeam[];
  SetCurrentTeamID: string;
  editingError: string;
  creatingError: string;
};

const initialState: State = {
  users: [],
  teams: [],
  SetCurrentTeamID: '',
  editingError: '',
  creatingError: '',
};

const { reducer, actions } = createSlice({
  name: ReducerName.TEAMS,
  initialState,
  reducers: {
    [ActionType.setTeams]: (state, action: PayloadAction<ITeam[]>) => {
      state.teams = action.payload;
    },
    [ActionType.setCurrentTeamID]: (state, action: PayloadAction<string>) => {
      state.SetCurrentTeamID = action.payload;
    },
    [ActionType.addTeam]: (state, action: PayloadAction<ITeam>) => {
      state.teams.push(action.payload);
    },
    [ActionType.updateTeam]: (state, action: PayloadAction<ITeam>) => {
      const id = action.payload.id;
      state.teams = state.teams.map((team: ITeam) =>
        team.id === id ? action.payload : team,
      );
    },
    [ActionType.deleteTeam]: (state, action: PayloadAction<string>) => {
      state.teams = state.teams.filter(
        (team: ITeam) => team.id !== action.payload,
      );
    },
    [ActionType.setCreatingError]: (state, action: PayloadAction<string>) => {
      state.creatingError = action.payload;
    },
    [ActionType.removeCreatingError]: (state) => {
      state.creatingError = '';
    },
    [ActionType.setEditingError]: (state, action: PayloadAction<string>) => {
      state.editingError = action.payload;
    },
    [ActionType.removeEditingError]: (state) => {
      state.editingError = '';
    },
  },
});

export { reducer, actions };
