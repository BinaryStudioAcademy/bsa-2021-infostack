import * as dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(isLeapYear);
dayjs.extend(relativeTime);
const toDayJS = dayjs.default;

export { toDayJS };
