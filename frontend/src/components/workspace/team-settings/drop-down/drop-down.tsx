import { Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { ITeam, ITeamCreation } from 'common/interfaces/team';
import { Popup } from '../popup/popup';
import { teamsActions } from 'store/actions';
import { useState, useAppDispatch, useEffect } from 'hooks/hooks';
import './styles.scss';

interface Props {
  team: ITeam;
}

const DropDown: React.FC<Props> = ({ team }) => {
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

  const handleEditing = async (data: ITeamCreation): Promise<void> => {
    dispatch(teamsActions.updateTeam({ ...team, name: data.name }));
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
        title="Enter new name of team:"
        showPopup={isPopUpVisible}
        handleFunction={handleEditing}
        onPopupClose={handleEditingCancel}
        inputValue={popUpText}
      />
    </div>
  );
};
export default DropDown;
