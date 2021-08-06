import PageItem from '../page-item/page-item';
import { IPage } from 'common/interfaces/page';

type Props = {
  pages: IPage[] | null;
};

const PagesList: React.FC<Props> = ({ pages }) => {

  return (
    <>
      {pages && pages.map(({ pageContents, id, childPages }) => <PageItem id={id} key={id} title={pageContents?.[0]?.title} childPages={childPages} />)}
    </>
  );
};

export default PagesList;
