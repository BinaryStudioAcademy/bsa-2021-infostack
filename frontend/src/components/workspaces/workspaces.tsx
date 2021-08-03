import Spinner from 'react-bootstrap/Spinner';
import { RootState } from 'common/types/types';
import { IWorkspace } from 'common/interfaces/workspace';
import WorkspaceItem from './components/workspace-item/workspace-item';
import CreateWorkspaceButton from './components/create-workspace-button/create-workspace-button';
import PopUp from './components/create-workspace-popup/create-workspace-popup';
import { workspacesActions } from 'store/actions';
import { useState, useEffect, useAppSelector, useAppDispatch, useCookies, useHistory } from 'hooks/hooks';
import { AppRoute, CookieVariable } from 'common/enums/enums';
import './styles.scss';

const Workspaces: React.FC = () => {
  const { workspaces, currentWorkspaceID } = useAppSelector((state: RootState) => state.workspaces);
  const dispatch = useAppDispatch();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpText, setPopUpText] = useState('');

  const [cookies, setCookie, removeCookie] = useCookies([CookieVariable.WORKSPACE_ID]);

  const history = useHistory();

  useEffect(() => {
    dispatch(workspacesActions.loadWorkspaces());
    removeCookie(CookieVariable.WORKSPACE_ID);
  }, []);

  useEffect(() => {
    if (currentWorkspaceID) {
      setCookie(CookieVariable.WORKSPACE_ID, currentWorkspaceID);
      history.push(AppRoute.PAGES);
    } else if (cookies.workspaceID){
      removeCookie(CookieVariable.WORKSPACE_ID);
    }
  }, [currentWorkspaceID]);

  const renderWorkspaceItem = (workspace: IWorkspace): JSX.Element => {
    return <WorkspaceItem key={workspace.id} workspace={workspace} onClick={ onWorkspaceItemClick }/>;
  };

  const onWorkspaceItemClick = (id: string): void => {
    dispatch(workspacesActions.SetCurrentWorkspaceID(id));
  };

  const onCreateWorkspaceButtonClick = (): void => {
    setIsPopUpVisible(true);
  };

  const onCancelCreationWorkspace = (): void => {
    setIsPopUpVisible(false);
    setPopUpText('');
  };

  const onConfirmCreationWorkspace = (): void => {
    onCancelCreationWorkspace();
    dispatch(workspacesActions.createWorkspace({ title: popUpText }));
  };

  return (
    <div
      className={
        `workspaces text-secondary bg-light d-flex flex-column align-items-start p-4${!workspaces ? ' vh-91' : ''}`
      }>
      <h1 className="pageTitle">Workspaces</h1>
      {
        !workspaces && <div className="d-flex flex-grow-1 align-items-center justify-content-center w-100">
          <Spinner animation="border" variant="secondary" />
        </div>
      }
      {
        workspaces && <div className="workspaces-container py-2 w-100">
          {workspaces.map((workspace: IWorkspace) => renderWorkspaceItem(workspace))}
          <CreateWorkspaceButton onClick={onCreateWorkspaceButtonClick}/>
        </div>
      }
      <PopUp
        query="Enter name of workspace:"
        isVisible={isPopUpVisible}
        inputValue={popUpText}
        setPopUpText={setPopUpText}
        cancelButton={{
          text: 'Cancel',
          onClick: onCancelCreationWorkspace,
        }}
        confirmButton={{
          text: 'Save',
          onClick: onConfirmCreationWorkspace,
        }}
      />
    </div>
  );
};

export default Workspaces;
