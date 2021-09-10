import { apiReference } from './api-reference.content';
import { storeSetupContent } from './store-setup';
import { reducersAndActionsContent } from './reducers-and-actions';
import { otherContent } from './other';

export const apiReferenceContent = [
  ...apiReference,
  ...storeSetupContent,
  ...reducersAndActionsContent,
  ...otherContent,
];
