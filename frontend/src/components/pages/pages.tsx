import { useSelector } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import PageContent from './components/page-content/page-content';
import Button from 'react-bootstrap/Button';
import { pageActions } from 'store/actions';
// import { IPage } from 'common/interfaces/pages';
import './pages.scss';
import { useDispatch } from 'hooks/hooks';
import { useEffect } from 'react';

const Pages: React.FC = () => {
  const { pages } = useSelector((state: RootState) => state.pages);
  const dispatch = useDispatch();
  const addRootPage = (): void => {
    dispatch(pageActions.createPage({ title: 'Page', content: '' }));
  };

  useEffect(() => {
    dispatch(pageActions.getPages());
  }, []);

  return (
    <main className="main">
      <div className="toolbar">Infostack{' '}
        {!pages && <Button variant="primary" onClick={addRootPage}>Add page</Button>}
      </div>
      <div className="container">
        <div className="header"></div>
        <PageContent />
      </div>
    </main>
  );
};

export default Pages;
