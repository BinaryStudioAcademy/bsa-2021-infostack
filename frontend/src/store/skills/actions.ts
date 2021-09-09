import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { skillApi } from 'services';
import { ISkill } from 'common/interfaces/skill';

const SKILL_EMPTY_NAME = 'Empty skill name is not allowed';
const SKILL_SINGLE_SPEC_CHAR = 'Special characters are not allowed as skills';
const noSingleSpecCharRegex = new RegExp(/(?:(?=.*[A-Za-zа-я\d]))/g);

const loadSkills = createAsyncThunk(
  ActionType.SET_SKILLS,
  async (_, { dispatch }): Promise<ISkill[]> => {
    const response = await skillApi.getAllSkills();
    dispatch(actions.setSkills(response));
    return response;
  },
);

const requestUpdate = createAsyncThunk(
  ActionType.UPDATE_SKILL,
  async (skill: { id: string; name: string }, { dispatch }): Promise<void> => {
    try {
      if (skill.name) {
        await skillApi.update(skill.id, skill.name);
        dispatch(
          actions.updateSkill({ id: skill.id, updatedName: skill.name }),
        );
        dispatch(actions.setEditName(null));
      } else {
        dispatch(actions.setEditSkillError(SKILL_EMPTY_NAME));
      }
    } catch (err) {
      dispatch(actions.setEditSkillError(err.message));
    }
  },
);

const requestAdd = createAsyncThunk(
  ActionType.ADD_SKILL,
  async (name: string, { dispatch }): Promise<void> => {
    try {
      if (!noSingleSpecCharRegex.test(name)) {
        dispatch(actions.setAddSkillError(SKILL_SINGLE_SPEC_CHAR));
      } else if (name) {
        const response = await skillApi.createSkill(name);
        dispatch(actions.addSkill(response));
        dispatch(actions.setAddName(null));
      } else {
        dispatch(actions.setAddSkillError(SKILL_EMPTY_NAME));
      }
    } catch (err) {
      dispatch(actions.setAddSkillError(err.message));
    }
  },
);

const requestDelete = createAsyncThunk(
  ActionType.DELETE_SKILL,
  async (id: string, { dispatch }): Promise<void> => {
    await skillApi.delete(id);
    dispatch(actions.deleteSkill(id));
  },
);

const skillActions = {
  ...actions,
  loadSkills,
  requestUpdate,
  requestAdd,
  requestDelete,
};

export { skillActions };
