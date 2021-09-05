import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ISkill } from 'common/interfaces/skill';
import { ActionType } from './common';

type State = {
  skills: ISkill[] | null;
  skillAddName: string | null;
  skillEditId: string | null;
  skillEditName: string | null;
  skillAddError: string | null;
  skillEditError: string | null;
};

const initialState: State = {
  skills: null,
  skillAddName: null,
  skillAddError: null,
  skillEditId: null,
  skillEditName: null,
  skillEditError: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.SKILLS,
  initialState,
  reducers: {
    [ActionType.SET_SKILLS]: (state, action: PayloadAction<ISkill[]>) => {
      state.skills = action.payload;
    },
    [ActionType.RESET_SKILLS]: (state, _action: PayloadAction<void>) => {
      state.skills = null;
      state.skillAddName = null;
      state.skillAddError = null;
      state.skillEditId = null;
      state.skillEditName = null;
      state.skillEditError = null;
    },
    [ActionType.SET_ADD_SKILL_ERROR]: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.skillAddError = action.payload;
    },
    [ActionType.ADD_SKILL]: (state, action: PayloadAction<ISkill>) => {
      state.skills?.push(action.payload);
      state.skillAddName = null;
      state.skillAddError = null;
      state.skillEditId = null;
      state.skillEditName = null;
      state.skillEditError = null;
    },
    [ActionType.SET_ADD_NAME]: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.skillAddName = action.payload;
    },
    [ActionType.SET_SKILL_TO_EDIT]: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.skillEditId = action.payload;
      state.skillAddName = null;
      state.skillAddError = null;
      state.skillEditError = null;
      if (state.skills && state.skillEditId) {
        const skillEdit = state.skills.find(
          (skill) => skill.id === action.payload,
        );
        if (skillEdit) {
          state.skillEditName = skillEdit.name as string;
        }
      } else {
        state.skillEditName = null;
      }
    },
    [ActionType.DELETE_SKILL]: (state, action: PayloadAction<string>) => {
      if (state.skills) {
        const indexToDelete = state.skills.findIndex(
          (skill) => skill.id === action.payload,
        );
        state.skills.splice(indexToDelete, 1);
      }
    },
    [ActionType.SET_EDIT_SKILL_ERROR]: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.skillEditError = action.payload;
    },
    [ActionType.SET_EDIT_NAME]: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.skillEditName = action.payload;
    },
    [ActionType.UPDATE_SKILL]: (
      state,
      action: PayloadAction<{ id: string; updatedName: string }>,
    ) => {
      const updatedSkill = state.skills?.find(
        (skill) => skill.id === action.payload.id,
      );
      if (updatedSkill) {
        updatedSkill.name = action.payload.updatedName;
      }
      state.skillEditId = null;
    },
  },
});

export { reducer, actions };
