import Image from 'react-bootstrap/Image';
import { useSelector } from 'hooks/hooks';
import { RootState } from 'common/types/types';

const PageContent: React.FC = () => {
  const { currentPage } = useSelector((state: RootState) => state.pages);

  return (
    <div className="page-content">
      <h1 className="page-content-title">{currentPage ? currentPage.name : 'New Page'}</h1>
      {currentPage ? <div className="content">{currentPage.content}</div>
        : <Image src="https://infostack.io/wp-content/uploads/2019/08/Infostack-Logo-900px.png" fluid />}
    </div>
  );
};

export default PageContent;
