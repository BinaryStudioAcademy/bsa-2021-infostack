import Image from 'react-bootstrap/Image';
import { useAppSelector } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import './page-content.scss';
import { Card } from 'react-bootstrap';

const PageContent: React.FC = () => {
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const pageTitle = currentPage?.pageContents[0].title;
  const content = currentPage?.pageContents[0].content;

  const Content: React.FC = () => {
    return (
      <div className="content">
        <div className="container-fluid p-0">
          <h1 className="h3 mb-3">{pageTitle || 'New Page'}</h1>
          <div className="row">
            <div className="col-12">

              <Card>
                <Card.Header>{content || 'Empty page'}</Card.Header>
                <Card.Title></Card.Title>
                <Card.Body>
                  <Card.Text>
                  </Card.Text>
                </Card.Body>
              </Card>

            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {currentPage ? <Content />
        : <Image src="https://infostack.io/wp-content/uploads/2019/08/Infostack-Logo-900px.png" fluid />}
    </>
  );
};

export default PageContent;
