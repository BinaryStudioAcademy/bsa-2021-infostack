import { createPageContent } from '../../../../common/utils';
import * as pages from '../../pages';

export const content = [
  `# API Reference
- [Store Setup](https://redux-toolkit.js.org/)
- [Reducers and Actions](https://redux-toolkit.js.org/)
- [Other](https://redux-toolkit.js.org/)`,
];

const startDate = new Date('2021-09-09T06:21:19+0000');

export const apiReference = createPageContent(
  content,
  pages.apiReference.id,
  'API Reference',
  startDate,
);
