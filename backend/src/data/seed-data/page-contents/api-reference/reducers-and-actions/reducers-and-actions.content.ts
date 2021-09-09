import { createPageContent } from '../../../../../common/utils';
import * as pages from '../../../pages';

const content = [
  `# Reducers and Actions
- [createReducer](https://redux-toolkit.js.org/)
- [createAction](https://redux-toolkit.js.org/)
- [createSlice](https://redux-toolkit.js.org/)
- [createAsyncThunk](https://redux-toolkit.js.org/)
- [createEntityAdapter](https://redux-toolkit.js.org/)
`,
];

const startDate = new Date('2021-09-10T14:20:00+0000');

export const reducersAndActions = createPageContent(
  content,
  pages.reducersAndActions.id,
  'Reducers and Actions',
  startDate,
);
