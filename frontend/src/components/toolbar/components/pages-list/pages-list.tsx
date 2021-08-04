import PageItem from '../page-item/page-item';
import { IPage } from 'common/interfaces/page';

type Props = {
  pages: IPage[] | null;
};

const PagesList: React.FC<Props> = ({ pages }) => {

  return (
    <>
      {pages && pages.map(({ pageContents, id, children }) => <PageItem id={id} key={id} title={pageContents[0]?.title} childrenPages={children} />)}
    </>
  );
};

export default PagesList;
