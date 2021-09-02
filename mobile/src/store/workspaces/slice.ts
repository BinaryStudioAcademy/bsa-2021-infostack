import { createSlice } from '@reduxjs/toolkit';

import { IWorkspace } from 'common/interfaces';
import { ReducerName, RequestStatus } from 'common/enums';
import { fetchWorkspaces } from './async-actions';

type State = {
  workspaces: IWorkspace[];
  workspacesLoadingStatus: RequestStatus;
};

const initialState: State = {
  workspaces: [],
  workspacesLoadingStatus: RequestStatus.IDLE,
};

const { reducer, actions } = createSlice({
  name: ReducerName.WORKSPACES,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.pending, (state) => {
        state.workspacesLoadingStatus = RequestStatus.LOADING;
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.workspacesLoadingStatus = RequestStatus.SUCCEEDED;
        state.workspaces = action.payload;
      })
      .addCase(fetchWorkspaces.rejected, (state) => {
        state.workspacesLoadingStatus = RequestStatus.FAILED;
      });
  },
});

export { reducer, actions };
