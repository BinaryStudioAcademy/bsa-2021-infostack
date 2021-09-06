import { RootState } from 'common/types';

export const selectUser = (state: RootState) => state.auth.user;
