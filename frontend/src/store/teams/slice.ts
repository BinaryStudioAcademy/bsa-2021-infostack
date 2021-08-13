import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ITeam } from 'common/interfaces/team';
import { ActionType } from './common';

type State = {
  teams: ITeam[];
  error: string;
};

const initialState: State = {
  teams: [],
  error: '',
};

const { reducer, actions } = createSlice({
  name: ReducerName.TEAMS,
  initialState,
  reducers: {
    [ActionType.SET_TEAMS]: (state, action: PayloadAction<ITeam[]>) => {
      state.teams = action.payload;
    },
    [ActionType.ADD_TEAM]: (state, action: PayloadAction<ITeam>) => {
      state.teams.push(action.payload);
    },
    [ActionType.UPDATE_TEAM]: (state, action: PayloadAction<ITeam>) => {
      const id = action.payload.id;
      state.teams = state.teams.map((team: ITeam) =>
        team.id === id ? action.payload : team,
      );
    },
    [ActionType.DELETE_TEAM]: (state, action: PayloadAction<string>) => {
      state.teams = state.teams.filter(
        (team: ITeam) => team.id !== action.payload,
      );
    },
    [ActionType.SET_CONFLICT_ERROR]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    [ActionType.REMOVE_CONFLICT_ERROR]: (state) => {
      state.error = '';
    },
  },
});

export { reducer, actions };
