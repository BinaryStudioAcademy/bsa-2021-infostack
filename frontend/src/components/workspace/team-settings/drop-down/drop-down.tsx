import { Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { ITeam } from 'common/interfaces/team';
import { Popup } from 'components/common/popup/popup';
import { teamsActions } from 'store/actions';
import {
  useState,
  useAppDispatch,
  useEffect,
  useAppSelector,
} from 'hooks/hooks';
import './styles.scss';

interface Props {
  team: ITeam;
}

const DropDown: React.FC<Props> = ({ team }) => {
  const { editingError } = useAppSelector((state) => state.teams);
  const dispatch = useAppDispatch();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpText, setPopUpText] = useState('');

  useEffect(() => {
    if (team) {
      setPopUpText(team.name);
    }
  }, [team]);

  const onEditTeamButtonClick = (): void => {
    setIsPopUpVisible(true);
  };

  const handleEditingCancel = (): void => {
    setIsPopUpVisible(false);
  };

  const handleEditingConfirm = (): void => {
    if (popUpText) {
      dispatch(teamsActions.updateTeam({ ...team, name: popUpText }));
    }
  };

  const handleDeleting = (): void => {
    dispatch(teamsActions.deleteTeam(team.id));
  };

  return (
    <div>
      <Dropdown as={NavItem} align="end" className="team-settings-dropdown">
        <Dropdown.Toggle as={NavLink} className="dropdown-team-details p-0">
          <p className="p-0 m-0">...</p>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu">
          <Dropdown.Item
            className="dropdown-item"
            onClick={onEditTeamButtonClick}
          >
            Edit
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item">Invite user</Dropdown.Item>
          <Dropdown.Item className="dropdown-item" onClick={handleDeleting}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Popup
        query="Edit name of team:"
        isVisible={isPopUpVisible}
        inputValue={popUpText}
        error={editingError}
        setPopUpText={setPopUpText}
        cancelButton={{
          text: 'Cancel',
          onClick: handleEditingCancel,
        }}
        confirmButton={{
          text: 'Save',
          onClick: handleEditingConfirm,
          disabled: !popUpText,
        }}
      />
    </div>
  );
};
export default DropDown;
