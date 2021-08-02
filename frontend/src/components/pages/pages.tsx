import PageContent from './components/page-content/page-content';
import Button from 'react-bootstrap/Button';
import { pageActions } from 'store/actions';
import Header from '../header/header';
import './pages.scss';
import { useAppDispatch } from 'hooks/hooks';
import { useEffect } from 'react';
import { IPageRequest } from 'common/interfaces/pages';

const Pages: React.FC = () => {
  const dispatch = useAppDispatch();
  const mockId = '125';
  //this button handler for toolbar
  const addPage = async(): Promise<void> => {
    const payload: IPageRequest = { title: 'New Page', content: '', parentPageId: null };
    await dispatch(pageActions.createPage(payload));
    dispatch(pageActions.getPages());
  };
  //this button handler for toolbar
  const addSubPage = async (id: string ): Promise<void> => {
    const payload: IPageRequest = { title: 'New Page', content: '', parentPageId: id };
    await dispatch(pageActions.createPage(payload));
    dispatch(pageActions.getPages());
  };

  useEffect(() => {
    dispatch(pageActions.getPages());
  }, []);

  return (
    <main className="main">
      <div className="toolbar">Infostack{' '}
        <Button variant="primary" onClick={addPage}>Add page</Button>
        <Button variant="primary" onClick={(): Promise<void> => addSubPage(mockId)}>Add page</Button>
      </div>
      <div className="container">
        <Header />
        <PageContent />
      </div>
    </main>
  );
};

export default Pages;
