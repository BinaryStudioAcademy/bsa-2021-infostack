import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ITeam } from 'common/interfaces/team';
import { ActionType } from './common';

type State = {
  teams: ITeam[];
  currentTeam: ITeam | null;
  editingError: string;
  creatingError: string;
};

const initialState: State = {
  teams: [],
  currentTeam: null,
  editingError: '',
  creatingError: '',
};

const { reducer, actions } = createSlice({
  name: ReducerName.TEAMS,
  initialState,
  reducers: {
    [ActionType.SetTeams]: (state, action: PayloadAction<ITeam[]>) => {
      state.teams = action.payload;
    },
    [ActionType.SetCurrentTeam]: (state, action: PayloadAction<ITeam>) => {
      state.currentTeam = action.payload;
    },
    [ActionType.AddTeam]: (state, action: PayloadAction<ITeam>) => {
      state.teams.push(action.payload);
    },
    [ActionType.UpdateTeam]: (state, action: PayloadAction<ITeam>) => {
      const id = action.payload.id;
      state.teams = state.teams.map((team: ITeam) =>
        team.id === id ? action.payload : team,
      );
    },
    [ActionType.DeleteTeam]: (state, action: PayloadAction<string>) => {
      state.teams = state.teams.filter(
        (team: ITeam) => team.id !== action.payload,
      );
    },
    [ActionType.SetCreatingError]: (state, action: PayloadAction<string>) => {
      state.creatingError = action.payload;
    },
    [ActionType.RemoveCreatingError]: (state) => {
      state.creatingError = '';
    },
    [ActionType.SetEditingError]: (state, action: PayloadAction<string>) => {
      state.editingError = action.payload;
    },
    [ActionType.RemoveEditingError]: (state) => {
      state.editingError = '';
    },
  },
});

export { reducer, actions };
