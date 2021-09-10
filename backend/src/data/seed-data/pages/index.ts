import { tutorialPages } from './tutorials';
import { gettingStartedPages } from './getting-started';
import { usagePages } from './usage';
import { apiPages } from './api';

export * from './tutorials';
export * from './getting-started';
export * from './usage';
export * from './api';

export const pages = [
  ...tutorialPages,
  ...gettingStartedPages,
  ...usagePages,
  ...apiPages,
];
