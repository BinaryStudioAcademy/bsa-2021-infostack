import { PageItem } from '../components';
import { IPageNav } from 'common/interfaces/pages';

type Props = {
  pages: IPageNav[] | null;
  allowSubPageAdd: boolean;
};

export const PagesList: React.FC<Props> = ({ pages, allowSubPageAdd }) => {
  return (
    <>
      {pages &&
        pages.map(({ title, id, childPages }) => (
          <PageItem
            id={id}
            key={id}
            title={title}
            allowSubPageAdd={allowSubPageAdd}
            childPages={childPages}
          />
        ))}
    </>
  );
};
