import { tutorials } from './tutorials';
import { quickStart } from './quick-start';
import { typeScriptQuickStart } from './typescript-quick-start';
import { queryQuickStart } from './query-quick-start';

export const tutorialsContent = [
  ...tutorials,
  ...quickStart,
  ...typeScriptQuickStart,
  ...queryQuickStart,
];
