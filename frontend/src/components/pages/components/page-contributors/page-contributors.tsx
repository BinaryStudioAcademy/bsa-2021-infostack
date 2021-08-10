import { IPageContributor } from 'common/interfaces/page';
import StackedAvatars from './stacked-avatars';
import styles from './styles.module.scss';

interface IPageContributorsProps {
  contributors: IPageContributor[];
}

const PageContributors: React.FC<IPageContributorsProps> = ({
  contributors,
}) => {
  const formatDate = (timestamp: number): string => {
    const MONTH_NAMES = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const date = new Date(timestamp);
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth();

    return `${MONTH_NAMES[month]} ${day}, ${year}`;
  };

  const findAuthor = (): IPageContributor | undefined => {
    return contributors.find((contributor) => contributor.isAuthor);
  };

  const findLastContributor = (): IPageContributor | undefined => {
    return contributors.sort(
      (a, b) => b.contributedAtTimestamp - a.contributedAtTimestamp,
    )[0];
  };

  const authorName = findAuthor()?.fullName || 'Unknown';
  const lastContributor = findLastContributor();
  const lastUpdatedAt = formatDate(
    lastContributor?.contributedAtTimestamp || Date.now(),
  );

  return (
    <div className={styles.container}>
      <div className={styles.stackedAvatars}>
        <StackedAvatars
          round={true}
          size={'40'}
          avatars={contributors.map((user) => {
            return { name: user.fullName };
          })}
        />
      </div>

      <div>
        <p>Author: {authorName}</p>
        <p>Last updated on {lastUpdatedAt}</p>
      </div>
    </div>
  );
};

export default PageContributors;
