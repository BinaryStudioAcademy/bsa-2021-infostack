import Image from 'react-bootstrap/Image';
import { useAppSelector } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import './page-content.scss';

const PageContent: React.FC = () => {
  const { currentPage } = useAppSelector((state: RootState) => state.pages);

  const Content: React.FC = () => {
    return (
      <div className="content">
        <div className="container-fluid p-0">
          <h1 className="h3 mb-3">{currentPage ? currentPage.name : 'New Page'}</h1>
          <div className="row">
            <div className="col-12">

              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">{currentPage?.content ? currentPage.content : 'Empty page'}</h5>
                </div>
                <div className="card-body">
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {!currentPage ? <Content />
        : <Image src="https://infostack.io/wp-content/uploads/2019/08/Infostack-Logo-900px.png" fluid />}
    </>
  );
};

export default PageContent;
