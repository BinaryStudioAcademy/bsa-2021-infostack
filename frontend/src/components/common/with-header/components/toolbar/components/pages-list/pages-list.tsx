import { PageItem } from '../components';
import { IPageNav } from 'common/interfaces/pages';

type Props = {
  pages: IPageNav[] | null;
  allowSubPageAdd: boolean;
  allowRemoveAction: boolean;
};

export const PagesList: React.FC<Props> = ({
  pages,
  allowSubPageAdd,
  allowRemoveAction,
}) => {
  return (
    <>
      {pages &&
        pages.map(({ title, id, childPages }) => (
          <PageItem
            id={id}
            key={id}
            title={title}
            allowSubPageAdd={allowSubPageAdd}
            allowRemoveAction={allowRemoveAction}
            childPages={childPages}
          />
        ))}
    </>
  );
};
