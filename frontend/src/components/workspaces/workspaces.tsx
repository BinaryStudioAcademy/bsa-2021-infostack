import Spinner from 'react-bootstrap/Spinner';
import { RootState } from 'common/types/types';
import { IWorkspace } from 'common/interfaces/workspace';
import WorkspaceItem from './components/workspace-item/workspace-item';
import CreateWorkspaceButton from './components/create-workspace-button/create-workspace-button';
import PopUp from './components/create-workspace-popup/create-workspace-popup';
import { workspacesActions } from 'store/actions';
import {
  useState,
  useEffect,
  useAppSelector,
  useAppDispatch,
  useCookies,
  useHistory,
} from 'hooks/hooks';
import { AppRoute, CookieVariable } from 'common/enums/enums';
import './styles.scss';

const Workspaces: React.FC = () => {
  const { workspaces, currentWorkspaceID } = useAppSelector(
    (state: RootState) => state.workspaces,
  );
  const dispatch = useAppDispatch();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpText, setPopUpText] = useState('');
  const [isWorkspaceSelected, setIsWorkspaceSelected] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies([
    CookieVariable.WORKSPACE_ID,
  ]);

  const history = useHistory();

  useEffect(() => {
    dispatch(workspacesActions.RemoveCurrentWorkspaceID());
    if (cookies[CookieVariable.WORKSPACE_ID]) {
      removeCookie(CookieVariable.WORKSPACE_ID);
    }
    dispatch(workspacesActions.loadWorkspaces());
  }, []);

  useEffect(() => {
    if (isWorkspaceSelected) {
      if (currentWorkspaceID) {
        setCookie(CookieVariable.WORKSPACE_ID, currentWorkspaceID, { path: '/' });
        history.push(AppRoute.ROOT);
      } else if (cookies[CookieVariable.WORKSPACE_ID]) {
        removeCookie(CookieVariable.WORKSPACE_ID, { path: '/' });
      }
    }
  }, [currentWorkspaceID]);

  const renderWorkspaceItem = (workspace: IWorkspace): JSX.Element => {
    return (
      <WorkspaceItem
        key={workspace.id}
        workspace={workspace}
        onClick={onWorkspaceItemClick}
      />
    );
  };

  const onWorkspaceItemClick = (id: string): void => {
    dispatch(workspacesActions.SetCurrentWorkspaceID(id));
    setIsWorkspaceSelected(true);
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
    if (popUpText) {
      dispatch(workspacesActions.createWorkspace({ title: popUpText }));
      setIsWorkspaceSelected(true);
    }
  };

  return (
    <div className="workspaces d-flex align-items-center bg-light d-flex flex-column align-items-start p-4 min-vh-100">
      <h3 className="mt-2 mb-5 text-secondary">Select workspace</h3>
      {!workspaces && (
        <div className="d-flex flex-grow-1 align-items-center justify-content-center w-100">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
      {workspaces && (
        <div className="workspaces-container py-2 w-100">
          {workspaces.map((workspace: IWorkspace) =>
            renderWorkspaceItem(workspace),
          )}
          <CreateWorkspaceButton onClick={onCreateWorkspaceButtonClick} />
        </div>
      )}
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
