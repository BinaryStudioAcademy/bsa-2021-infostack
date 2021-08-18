import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { PageApi } from 'services';
import { IParticipant } from 'common/interfaces/participant';

const loadParticipants = createAsyncThunk(
  ActionType.SET_PARTICIPANTS,
  async (payload: string, { dispatch }): Promise<void> => {
    const response = await new PageApi().getPermissions(payload);
    dispatch(actions.setParticipants(response));
  },
);

const createParticipant = createAsyncThunk(
  ActionType.ADD_PARTICIPANT,
  async (
    payload: { pageId: string; participant: IParticipant },
    { dispatch },
  ): Promise<void> => {
    const response = await new PageApi().setPermission(
      payload.pageId,
      payload.participant,
    );
    dispatch(actions.addParticipant(response));
  },
);

const chageRole = createAsyncThunk(
  ActionType.UPDATE_PARTICIPANT,
  async (
    payload: { pageId: string; participant: IParticipant },
    { dispatch },
  ): Promise<void> => {
    const response = await new PageApi().setPermission(
      payload.pageId,
      payload.participant,
    );
    dispatch(actions.updateParticipant(response));
  },
);

const deleteParticipant = createAsyncThunk(
  ActionType.REMOVE_PARTICIPANT,
  async (
    payload: { pageId: string; participantType: string; participantId: string },
    { dispatch },
  ): Promise<void> => {
    await new PageApi().deletePermission(
      payload.pageId,
      payload.participantType,
      payload.participantId,
    );
    dispatch(actions.removeParticipant(payload.participantId));
  },
);

const participantsActions = {
  ...actions,
  loadParticipants,
  createParticipant,
  chageRole,
  deleteParticipant,
};

export { participantsActions };
