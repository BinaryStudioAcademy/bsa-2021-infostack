import PageContent from './components/page-content/page-content';
import Toolbar from './components/toolbar/toolbar';
// import Button from 'react-bootstrap/Button';
// import { pagesActions } from 'store/actions';
import './pages.scss';
// import { useAppDispatch } from 'hooks/hooks';
// import { useEffect } from 'react';
// import { IPageRequest } from 'common/interfaces/pages';

const Pages: React.FC = () => {
  // const dispatch = useAppDispatch();
  // const mockId = '86c9f59f-844d-4b29-bdef-0ede65ffce37';
  //this button handler for toolbar
  // const addPage = async(): Promise<void> => {
  //   const payload: IPageRequest = { title: 'New Page', content: '', parentPageId: null };
  //   await dispatch(pagesActions.createPage(payload));
  //   // await dispatch(pageActions.getPages());
  // };
  // //this button handler for toolbar
  // const addSubPage = async ( id: string ): Promise<void> => {
  //   const payload: IPageRequest = { title: 'New Page', content: '', parentPageId: id };
  //   await dispatch(pagesActions.createPage(payload));
  //   // await dispatch(pageActions.getPages());
  // };
  // //this button handler for toolbar
  // const getPageById = async ( id: string ): Promise<void> => {
  //   const payload: string = id;
  //   await dispatch(pagesActions.getPage(payload));
  // };

  // useEffect(() => {
  //   dispatch(pagesActions.getPages());
  // }, []);

  return (
    <main className="main">
      <Toolbar />
      {/* <div className="toolbar">Infostack{' '}
        <Button variant="primary" onClick={addPage}>Add ROOTpage</Button>
        <Button variant="primary" onClick={(): Promise<void> => addSubPage(mockId)}>Add SUBpage</Button>
        <Button variant="primary" onClick={(): Promise<void> => getPageById(mockId)}>GET page</Button>
      </div> */}
      <PageContent />
    </main>
  );
};

export default Pages;
