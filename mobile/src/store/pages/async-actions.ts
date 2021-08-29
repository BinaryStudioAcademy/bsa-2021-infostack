import { createAsyncThunk } from '@reduxjs/toolkit';

import { pageService } from 'src/services';
import { IPageNav } from 'src/common/interfaces';
import { ActionType } from './action-type.enum';

export const fetchPages = createAsyncThunk<IPageNav[]>(
  ActionType.FETCH_PAGES,
  () => pageService.getAll(),
);
