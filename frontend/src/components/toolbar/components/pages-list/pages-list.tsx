import PageItem from '../page-item/page-item';
import { IPageNav } from 'common/interfaces/pages';

type Props = {
  pages: IPageNav[] | null;
};

const PagesList: React.FC<Props> = ({ pages }) => {
  return (
    <>
      {pages &&
        pages.map(({ title, id, childPages }) => (
          <PageItem
            id={id}
            key={id}
            title={title}
            childPages={childPages}
          />
        ))}
    </>
  );
};

export default PagesList;
