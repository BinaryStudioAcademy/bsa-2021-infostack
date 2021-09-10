import { createPageContent } from '../../../../../common/utils';
import * as pages from '../../../pages';

const content = [
  `# Store Setup
- [\`configureStore\`](https://redux-toolkit.js.org/)
- [\`getDefaultMiddleware\`](https://redux-toolkit.js.org/)
- [\`Immutability Middleware\`](https://redux-toolkit.js.org/)
- [\`Serializability Middleware\`](https://redux-toolkit.js.org/)`,
];

const startDate = new Date('2021-09-09T07:21:19+0000');

export const storeSetup = createPageContent(
  content,
  pages.storeSetup.id,
  'Store Setup',
  startDate,
);
