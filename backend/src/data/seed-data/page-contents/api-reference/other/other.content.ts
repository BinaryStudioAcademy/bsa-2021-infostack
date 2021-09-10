import { createPageContent } from '../../../../../common/utils';
import * as pages from '../../../pages';

const content = [
  `# Other
- [createSelector](https://redux-toolkit.js.org/)
- [Matching Utilities](https://redux-toolkit.js.org/)
- [Other Exports](https://redux-toolkit.js.org/)`,
];

const startDate = new Date('2021-09-11T07:30:00+0000');

export const other = createPageContent(
  content,
  pages.other.id,
  'Other',
  startDate,
);
