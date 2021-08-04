import { ITeam } from 'common/interfaces/team';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ActionType } from './common';

type State = {
  teams: ITeam[] | null;
  currentTeamID: string;
};

const initialState: State = {
  teams: null,
  currentTeamID: '',
};

const { reducer, actions } = createSlice({
  name: ReducerName.TEAMS,
  initialState,
  reducers: {
    [ActionType.SetTeams]: (state, action: PayloadAction<ITeam[]>) => {
      state.teams = action.payload;
    },
    [ActionType.SetCurrentTeamID]: (state, action: PayloadAction<string>) => {
      state.currentTeamID = action.payload;
    },
  },
});

export { reducer, actions };
