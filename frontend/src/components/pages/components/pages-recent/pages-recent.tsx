import { Card } from 'react-bootstrap';
import { AppRoute } from 'common/enums';
import { Link } from 'components/common/common';
import { IPageRecent } from 'common/interfaces';
import { getAllowedClasses, replaceIdParam } from 'helpers/helpers';
import styles from './styles.module.scss';

interface Props {
  className?: string;
  pages: IPageRecent[] | undefined;
}

export const PagesRecent: React.FC<Props> = ({ pages, className }) => {
  return (
    <div className="p-4">
      <Card
        border="light"
        className={getAllowedClasses(styles.card, className)}
      >
        <Card.Header className="bg-white border-0 d-flex align-items-center">
          Recent pages
        </Card.Header>
        <Card.Body>
          {pages &&
            pages.map(({ pageId, title, visited }) => (
              <Link
                key={pageId}
                to={replaceIdParam(AppRoute.PAGE, pageId || '') as AppRoute}
                className={getAllowedClasses(
                  styles.recentlink,
                  'text-decoration-none',
                )}
              >
                <div
                  className={getAllowedClasses(styles.recentItem, 'text-break')}
                >
                  {title}
                </div>
                <div className={getAllowedClasses(styles.visited)}>
                  {visited}
                </div>
              </Link>
            ))}
        </Card.Body>
      </Card>
    </div>
  );
};
