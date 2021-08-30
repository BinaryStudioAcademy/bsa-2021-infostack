import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useAppSelector, useParams, useState } from 'hooks/hooks';
import { AppRoute } from 'common/enums';
import { getAllowedClasses, replaceIdParam } from 'helpers/helpers';
import { IPageNav } from 'common/interfaces';
import { useEffect } from 'react';
import styles from './styles.module.scss';

interface Breadcrumb {
  title: string;
  href?: string;
  id: string;
}

export const Breadcrumbs: React.FC = () => {
  const paramsId = useParams<{ id: string }>().id;
  const { pages } = useAppSelector((state) => state.pages);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  const getBreadcrumbs = (
    breadcrumbs: Breadcrumb[],
    pages: IPageNav[],
    id: string,
  ): void => {
    const currentPage = pages.find((page) => page.id === id);
    if (!currentPage) {
      for (const page of pages) {
        getBreadcrumbs(breadcrumbs, page.childPages, id);
        if (
          page.childPages
            .map((child) => child.id)
            .includes(breadcrumbs[breadcrumbs.length - 1].id)
        ) {
          breadcrumbs.push({
            title: page.title,
            href: replaceIdParam(AppRoute.PAGE, page.id || '') as AppRoute,
            id: page.id,
          });
        }
      }
    } else {
      breadcrumbs.push({
        title: currentPage.title,
        id: currentPage.id,
      });
    }
  };

  useEffect(() => {
    if (pages) {
      const breadcrumbs = [] as Breadcrumb[];
      getBreadcrumbs(breadcrumbs, pages, paramsId);
      console.log(breadcrumbs);
      setBreadcrumbs(breadcrumbs);
    }
  }, []);

  return (
    <Breadcrumb className={getAllowedClasses(styles.breadcrumb)}>
      <Breadcrumb.Item href={AppRoute.ROOT}>Home</Breadcrumb.Item>
      {[...breadcrumbs].reverse().map((breadcrumb, i, breadcrumbs) => (
        <Breadcrumb.Item
          key={breadcrumb.id}
          href={breadcrumb.href}
          active={i === breadcrumbs.length - 1}
        >
          {breadcrumb.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
