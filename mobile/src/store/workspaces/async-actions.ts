import { createAsyncThunk } from '@reduxjs/toolkit';

import { ActionType } from './common';
import { workspaceService } from 'services';
import { IWorkspace } from 'common/interfaces';

const fetchWorkspaces = createAsyncThunk(
  ActionType.FETCH_WORKSPACES,
  async (): Promise<IWorkspace[]> => workspaceService.getWorkspaces(),
);

export { fetchWorkspaces };
