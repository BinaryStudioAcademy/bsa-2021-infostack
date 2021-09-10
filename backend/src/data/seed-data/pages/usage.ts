import { Page } from './page.type';

export const usingReduxToolkit: Page = {
  id: '4d90f052-c392-4c37-a325-034a49c27254',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-05T14:45:48+0000',
  parentPageId: null,
};

export const usageWithTypeScript = {
  id: '713ae19e-60b1-492e-8e22-f80f6d0501f7',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-05T15:45:48+0000',
  parentPageId: usingReduxToolkit.id,
};

export const reducersWithImmer = {
  id: '7f005fd4-1493-4705-9f0b-89c82cbf1792',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-05T16:45:48+0000',
  parentPageId: usingReduxToolkit.id,
};

export const usagePages = [
  usingReduxToolkit,
  usageWithTypeScript,
  reducersWithImmer,
];
