import { parseISO, format, formatDistanceToNow, isThisWeek } from 'date-fns';

type Props = {
  timestamp: string;
  className?: string;
};

export const TimeAgo: React.FC<Props> = ({ timestamp, className }) => {
  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    timeAgo = isThisWeek(date)
      ? `${formatDistanceToNow(date)} ago`
      : format(date, 'MMM. dd, y');
  }

  return (
    <span title={timestamp} className={className}>
      &nbsp; {timeAgo}
    </span>
  );
};
