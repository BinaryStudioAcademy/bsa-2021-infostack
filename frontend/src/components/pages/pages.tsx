import { useAppSelector } from 'hooks/hooks';
import { RootState } from 'common/types/types';
import PageContent from './components/page-content/page-content';
import Button from 'react-bootstrap/Button';
import { pageActions } from 'store/actions';
import Header from '../header/header';
import './pages.scss';
import { useAppDispatch } from 'hooks/hooks';
import { useEffect } from 'react';

const Pages: React.FC = () => {
  const { pages } = useAppSelector((state: RootState) => state.pages);
  const dispatch = useAppDispatch();
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
        <Header />
        <PageContent />
      </div>
    </main>
  );
};

export default Pages;
