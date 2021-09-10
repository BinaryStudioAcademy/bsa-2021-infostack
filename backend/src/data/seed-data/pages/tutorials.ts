import { Page } from './page.type';

export const tutorials: Page = {
  id: '928476ef-832c-42d3-a8f1-a68d92aedc1f',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-08-31T10:30:59+0000',
  parentPageId: null,
};

export const quickStart = {
  id: '86c9bd38-c756-481f-b5cc-bb982529ce4a',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-08-31T14:45:48+0000',
  parentPageId: tutorials.id,
};

export const typeScriptQuickStart = {
  id: 'bcf6e515-eb14-43fc-96be-d68e22e77df4',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-03T14:45:48+0000',
  parentPageId: tutorials.id,
};

export const queryQuickStart = {
  id: '3c3700da-8fe8-4c1c-80a3-2bfe87840470',
  authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
  workspaceId: '4b422d96-2b58-474c-9902-6450810da8ca',
  createdAt: '2021-09-04T14:45:48+0000',
  parentPageId: tutorials.id,
};

export const tutorialPages = [
  tutorials,
  quickStart,
  typeScriptQuickStart,
  queryQuickStart,
];
