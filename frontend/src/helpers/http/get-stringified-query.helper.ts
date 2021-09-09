import { stringify } from 'query-string';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStringifiedQuery = (query: any): string => stringify(query);

export { getStringifiedQuery };
