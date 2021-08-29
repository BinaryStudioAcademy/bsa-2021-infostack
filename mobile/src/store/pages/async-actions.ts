import { createAsyncThunk } from '@reduxjs/toolkit';

import { pageService } from 'services';
import { IPageNav } from 'common/interfaces';
import { ActionType } from './action-type.enum';

export const fetchPages = createAsyncThunk<IPageNav[]>(
  ActionType.FETCH_PAGES,
  () => pageService.getAll(),
);
