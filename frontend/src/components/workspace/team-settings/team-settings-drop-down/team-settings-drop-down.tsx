import { ITeam } from 'common/interfaces/team';
import { Dropdown, NavItem, NavLink }  from 'react-bootstrap';
import { Popup } from '../../../common/popup/popup';
import { teamsActions } from 'store/teams';
import {
  useState,
  useAppDispatch,
  useEffect,
  useAppSelector,
} from 'hooks/hooks';
import './styles.scss';

interface IDropDownProps {
  team: ITeam;
}

const TeamSettingsDropDown: React.FC<IDropDownProps> = ({ team }) => {
  const { editingError } = useAppSelector((state) => state.teamSettings);
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

  const onDeleteTeamButtonClick = (): void  => {
    dispatch(teamsActions.deleteTeam(team.id));
  };

  return (
    <div>
      <Dropdown as={NavItem} align="end" className="team-settings-dropdown">
        <Dropdown.Toggle as={NavLink} id="dropdown-team-details">
          <p className="p-0 m-0">...</p>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu">
          <Dropdown.Item className="dropdown-item" onClick={onEditTeamButtonClick}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item">
            Invite user
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item" onClick={onDeleteTeamButtonClick}>
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
export default TeamSettingsDropDown;
