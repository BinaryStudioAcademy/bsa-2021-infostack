import { Card } from 'react-bootstrap';
import { AppRoute } from 'common/enums';
import { Link } from 'components/common/common';
import { IPageStatistic } from 'common/interfaces';
import { Spinner } from 'components/common/common';
import { getAllowedClasses, replaceIdParam } from 'helpers/helpers';
import styles from './styles.module.scss';

interface Props {
  className?: string;
  title: string;
  pages: IPageStatistic[] | undefined;
  loading: boolean;
  placeholder: string;
}

export const PagesStatistic: React.FC<Props> = ({
  pages,
  className,
  title,
  loading,
  placeholder,
}) => {
  return (
    <Card border="light" className={getAllowedClasses(styles.card, className)}>
      <Card.Header className="bg-white border-0 d-flex align-items-center text-secondary">
        {title}
      </Card.Header>
      <Card.Body className={pages?.length ? '' : 'px-3'}>
        {pages?.length ? (
          pages.map((page) => (
            <Link
              key={page.pageId}
              to={replaceIdParam(AppRoute.PAGE, page.pageId || '') as AppRoute}
              className={getAllowedClasses(
                styles.recentlink,
                'text-decoration-none',
              )}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div
                  className={getAllowedClasses(styles.recentItem, 'text-break')}
                >
                  {page.title}
                </div>
                <div className={getAllowedClasses(styles.info)}>
                  {page.visited || page.count}
                </div>
              </div>
            </Link>
          ))
        ) : loading ? (
          <Spinner />
        ) : (
          <div className={getAllowedClasses(styles.placeholder)}>
            {placeholder}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
