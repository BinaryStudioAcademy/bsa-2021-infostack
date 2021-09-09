import { Button, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import { useAppDispatch, useAppSelector, useEffect, useHistory } from 'hooks';
import { activitiesActions } from 'store/activities';
import { IUserActivity } from 'common/interfaces/user';
import { getAllowedClasses, replaceIdParam } from 'helpers';
import { FilterOption, FILTER_OPTIONS } from 'store/activities/slice';
import { Spinner, UserAvatar } from 'components/common';
import { AppRoute } from 'common/enums';
import styles from './styles.module.scss';
import ReactMarkdown from 'react-markdown';

const Activities: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activities, filter, totalItems, isLoading } = useAppSelector(
    (state) => state.activities,
  );

  useEffect(() => {
    dispatch(activitiesActions.fetchActivities());
  }, [filter]);

  const updateFilter = (filter: FilterOption): void => {
    dispatch(activitiesActions.updateFilter(filter));
  };

  const loadMore = (): void => {
    dispatch(activitiesActions.loadMoreActivities());
  };

  return (
    <div>
      <Card.Title
        className={getAllowedClasses(styles.title, 'profile-card-title')}
      >
        <span>Activities</span>

        <DropdownButton
          title={filter}
          id="activity-filter"
          size="sm"
          variant="success"
          className={styles.menu}
        >
          {FILTER_OPTIONS.map((option) => {
            return (
              <Dropdown.Item
                key={option}
                onClick={(): void => updateFilter(option)}
              >
                {option}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </Card.Title>

      <div className={styles.container}>
        {isLoading && !activities.length ? (
          <Spinner height={'8rem'} width={'8rem'} />
        ) : (
          <>
            {activities.map((activity) => {
              return <Activity key={activity.id} activity={activity} />;
            })}

            {totalItems > activities.length && (
              <>
                <Button
                  variant="success"
                  className={styles.loadMore}
                  onClick={loadMore}
                >
                  {isLoading ? 'Loading...' : 'Load more'}
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const Activity: React.FC<{ activity: IUserActivity }> = ({ activity }) => {
  const history = useHistory();
  const { user, page, type, isNew, createdAtTimestamp } = activity;

  const handleClick = (): void => {
    history.push(replaceIdParam(AppRoute.PAGE, page.id));
  };

  const getMessage = (): string => {
    if (isNew && type === 'page') {
      return ' created a new page ';
    } else if (!isNew && type === 'page') {
      return ' updated the ';
    } else {
      return ' added a comment to the ';
    }
  };

  const getMessageEnding = (): string => {
    if (isNew && type === 'page') {
      return '.';
    } else {
      return ' page.';
    }
  };

  const getDate = (): string => {
    const today = new Date().getDate();
    const createdAt = new Date(createdAtTimestamp * 1000);
    const createdAtDay = createdAt.getDate();
    const createdAtHour = createdAt.getUTCHours();
    const createdAtMinutes = createdAt.getMinutes();

    switch (createdAtDay) {
      case today:
        return `Today ${createdAtHour}:${createdAtMinutes}`;
      case today - 1:
        return `Yesterday ${createdAtHour}:${createdAtMinutes}`;
      default: {
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
        const month = createdAt.getMonth();

        return `${MONTH_NAMES[month]} ${createdAtDay}`;
      }
    }
  };

  return (
    <div className={styles.activity} onClick={handleClick}>
      <UserAvatar
        size="40"
        name={user.fullName}
        src={user.avatar}
        round={true}
      />

      <div className={styles.infoContainer}>
        <span className={styles.heading}>
          <b>{user.fullName}</b>
          {getMessage()}
          <b>{page.title}</b>
          {getMessageEnding()}
        </span>
        <span className={styles.createdAt}>{getDate()}</span>

        {page.content.trim() && (
          <Card className={styles.contentContainer}>
            <Card.Body>
              <span className={styles.content}>
                {type === 'page' ? (
                  <ReactMarkdown className={styles.markdown}>
                    {page.content}
                  </ReactMarkdown>
                ) : (
                  page.content
                )}
              </span>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export { Activities };
