import { ITeam } from 'common/interfaces/team';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { useState, useAppDispatch, useEffect } from 'hooks/hooks';
import EditTeamPopUp from '../edit-team-popup/edit-team-popup';
import { settingsActions } from 'store/settings';
import './styles.scss';

interface IDropDownProps {
  team: ITeam;
}

const TeamSettingsDropDown: React.FC<IDropDownProps> = ({ team }) => {
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

  const onCancelEditing = (): void => {
    setIsPopUpVisible(false);
  };

  const onConfirmEditing = (): void => {
    onCancelEditing();
    dispatch(settingsActions.updateTeam({ ...team, name: popUpText }));
  };

  const onDeleteTeamButtonClick = (): void  => {
    dispatch(settingsActions.deleteTeam(team.id));
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
      <EditTeamPopUp
        query="Edit name of team:"
        isVisible={isPopUpVisible}
        inputValue={popUpText}
        setPopUpText={setPopUpText}
        cancelButton={{
          text: 'Cancel',
          onClick: onCancelEditing,
        }}
        confirmButton={{
          text: 'Save',
          onClick: onConfirmEditing,
        }}
      />
    </div>
  );
};
export default TeamSettingsDropDown;
