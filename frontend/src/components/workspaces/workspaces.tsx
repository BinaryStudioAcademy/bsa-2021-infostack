import Spinner from 'react-bootstrap/Spinner';
import { RootState } from 'common/types/types';
import { IWorkspace } from 'common/interfaces/workspace';
import WorkspaceItem from './components/workspace-item/workspace-item';
import CreateWorkspaceButton from './components/create-workspace-button/create-workspace-button';
import PopUp from './components/create-workspace-popup/create-workspace-popup';
import { workspacesActions } from 'store/actions';
import { useState, useEffect, useSelector, useDispatch, useCookies } from 'hooks/hooks';
import './styles.scss';

const Workspaces: React.FC = () => {
  const { workspaces, currentWorkspaceID } = useSelector((state: RootState) => state.workspaces);
  const dispatch = useDispatch();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpText, setPopUpText] = useState('');

  const [cookies, setCookie, removeCookie] = useCookies(['workspaceID']);

  useEffect(() => {
    dispatch(workspacesActions.loadWorkspaces());
    const workspaceID = cookies.workspaceID;
    if (workspaceID) dispatch(workspacesActions.SetCurrentWorkspaceID(workspaceID));
  }, []);

  useEffect(() => {
    if (currentWorkspaceID) {
      setCookie('workspaceID', currentWorkspaceID);
      alert(currentWorkspaceID);
    } else {
      removeCookie('workspaceID');
    }
  }, [currentWorkspaceID]);

  const renderWorkspaceItem = ({ id, title, description }: IWorkspace): JSX.Element => {
    return <WorkspaceItem key={id} title={title} description={description} />;
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
    <div className={`workspaces text-secondary bg-light d-flex flex-column align-items-start p-4${!workspaces ? ' vh-100' : ''}`}>
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
