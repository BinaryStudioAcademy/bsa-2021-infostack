import { Page } from './page.type';

export const apiReference: Page = {
  id: 'ee44550f-f995-493c-bbb6-d6ba3c2d0ba4',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-06T09:45:48+0000',
  parentPageId: null,
};

export const storeSetup = {
  id: 'ddbea4f8-8cd1-42bb-bc35-42572b3ea9ca',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-06T10:45:48+0000',
  parentPageId: apiReference.id,
};

export const configureStore = {
  id: 'bf3fae1b-5b67-43b0-8aed-753e5c505255',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-06T11:45:48+0000',
  parentPageId: storeSetup.id,
};

export const getDefaultMiddleware = {
  id: '2c0097a8-91c8-46d6-80b1-52ae7559ae2c',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-06T14:45:48+0000',
  parentPageId: storeSetup.id,
};

export const immutabilityMiddleware = {
  id: '519e49e5-c02b-439f-8f17-2b043da74310',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-06T13:45:48+0000',
  parentPageId: storeSetup.id,
};

export const serializabilityMiddleware = {
  id: '21d96ac6-2ddd-4789-98f9-15ea0d3bed2c',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-06T12:45:48+0000',
  parentPageId: storeSetup.id,
};

export const reducersAndActions = {
  id: '327aca06-6177-4338-9ac2-048841c92257',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-07T08:45:48+0000',
  parentPageId: apiReference.id,
};

export const createReducer = {
  id: 'e14cbb3d-1e61-4a58-9492-dfe773b040ff',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-07T13:45:48+0000',
  parentPageId: reducersAndActions.id,
};

export const createAction = {
  id: 'f81d623f-adaa-4c46-8ef8-951eccc8c153',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-07T12:45:48+0000',
  parentPageId: reducersAndActions.id,
};

export const createSlice = {
  id: '51553ff3-a5b3-4cb9-98fa-1c32b43255fc',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-07T11:45:48+0000',
  parentPageId: reducersAndActions.id,
};

export const createAsyncThunk = {
  id: 'c841a5ce-9cfb-487a-8419-6885ff3380cb',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-07T10:45:48+0000',
  parentPageId: reducersAndActions.id,
};

export const createEntityAdapter = {
  id: 'e3a79af9-a1a5-4cf8-bdc2-4fa73eb8655c',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-07T09:45:48+0000',
  parentPageId: reducersAndActions.id,
};

export const other = {
  id: 'fafae44b-8c57-4a69-a729-e92be4037eb4',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-08T08:45:48+0000',
  parentPageId: apiReference.id,
};

export const createSelector = {
  id: 'fae6db5b-49ff-4ec6-aff4-bd0cc1393d90',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-08T09:45:48+0000',
  parentPageId: other.id,
};

export const matchingUtilities = {
  id: '5773a2e6-e2ae-4b03-81ce-bdafd0256c3a',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-08T10:45:48+0000',
  parentPageId: other.id,
};

export const otherExports = {
  id: '40ec743c-f1c9-41af-8c81-bb9e1958675b',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-08T11:45:48+0000',
  parentPageId: other.id,
};

export const apiPages = [
  apiReference,
  storeSetup,
  configureStore,
  getDefaultMiddleware,
  immutabilityMiddleware,
  serializabilityMiddleware,
  reducersAndActions,
  createReducer,
  createAction,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  other,
  createSelector,
  matchingUtilities,
  otherExports,
];
