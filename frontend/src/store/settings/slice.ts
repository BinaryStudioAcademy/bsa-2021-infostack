import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IWorkspaceUser } from 'common/interfaces/workspace';
import { ITeam } from 'common/interfaces/team';
import { ActionType } from './common';

type State = {
  users: IWorkspaceUser[];
  teams: ITeam[];
  SetCurrentTeamID: string;
};

const initialState: State = {
  users: [],
  teams: [],
  SetCurrentTeamID: '',
};

const { reducer, actions } = createSlice({
  name: ReducerName.SETTINGS,
  initialState,
  reducers: {
    [ActionType.SetUsers]: (state, action: PayloadAction<IWorkspaceUser[]>) => {
      state.users = action.payload;
    },
    [ActionType.SetTeams]: (state, action: PayloadAction<ITeam[]>) => {
      state.teams = action.payload;
    },
    [ActionType.SetCurrentTeamID]: (state, action: PayloadAction<string>) => {
      state.SetCurrentTeamID = action.payload;
    },
    [ActionType.AddTeam]: (state, action: PayloadAction<ITeam>) => {
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
  },
});

export { reducer, actions };
