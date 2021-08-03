import PageContent from './components/page-content/page-content';
import Button from 'react-bootstrap/Button';
import { pageActions } from 'store/actions';
import './pages.scss';
import { useAppDispatch } from 'hooks/hooks';
import { useEffect } from 'react';
import { IPageRequest } from 'common/interfaces/pages';

const Pages: React.FC = () => {
  const dispatch = useAppDispatch();
  const mockId = '86c9f59f-844d-4b29-bdef-0ede65ffce37';
  //this button handler for toolbar
  const addPage = async(): Promise<void> => {
    const payload: IPageRequest = { title: 'New Page', content: '', parentPageId: null };
    await dispatch(pageActions.createPage(payload));
    // await dispatch(pageActions.getPages());
  };
  //this button handler for toolbar
  const addSubPage = async ( id: string ): Promise<void> => {
    const payload: IPageRequest = { title: 'New Page', content: '', parentPageId: id };
    await dispatch(pageActions.createPage(payload));
    // await dispatch(pageActions.getPages());
  };
  //this button handler for toolbar
  const getPageById = async ( id: string ): Promise<void> => {
    const payload: string = id;
    await dispatch(pageActions.getPage(payload));
  };

  useEffect(() => {
    dispatch(pageActions.getPages());
  }, []);

  return (
    <main className="main">
      <div className="toolbar">Infostack{' '}
        <Button variant="primary" onClick={addPage}>Add ROOTpage</Button>
        <Button variant="primary" onClick={(): Promise<void> => addSubPage(mockId)}>Add SUBpage</Button>
        <Button variant="primary" onClick={(): Promise<void> => getPageById(mockId)}>GET page</Button>
      </div>
      <PageContent />
    </main>
  );
};

export default Pages;
