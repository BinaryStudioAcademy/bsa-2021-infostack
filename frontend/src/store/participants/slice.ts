import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IParticipant } from 'common/interfaces/participant';
import { ActionType } from './common';

type State = {
  participants: IParticipant[];
};

const initialState: State = {
  participants: [],
};

const { reducer, actions } = createSlice({
  name: ReducerName.PARTICIPANTS,
  initialState,
  reducers: {
    [ActionType.SET_PARTICIPANTS]: (
      state,
      action: PayloadAction<IParticipant[]>,
    ) => {
      state.participants = action.payload;
    },
    [ActionType.ADD_PARTICIPANT]: (
      state,
      action: PayloadAction<IParticipant>,
    ) => {
      state.participants.push(action.payload);
    },
    [ActionType.UPDATE_PARTICIPANT]: (
      state,
      action: PayloadAction<IParticipant>,
    ) => {
      state.participants = state.participants.map((participant) => {
        if (participant.id === action.payload.id) {
          return action.payload;
        }
        return participant;
      });
    },
    [ActionType.REMOVE_PARTICIPANT]: (state, action: PayloadAction<string>) => {
      state.participants = state.participants.filter(
        (participant) => participant.id !== action.payload,
      );
    },
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export { reducer, actions };
