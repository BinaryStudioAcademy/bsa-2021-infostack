import { Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { ITeam, ITeamCreation } from 'common/interfaces/team';
import { CreateTeamModal } from '../modal/modal';
import { teamsActions } from 'store/actions';
import { useState, useAppDispatch } from 'hooks/hooks';
import './styles.scss';

interface Props {
  team: ITeam;
}

const DropDown: React.FC<Props> = ({ team }) => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onEditTeamButtonClick = (): void => {
    setIsModalVisible(true);
  };

  const handleEditingCancel = (): void => {
    setIsModalVisible(false);
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
      <CreateTeamModal
        showModal={isModalVisible}
        handleFunction={handleEditing}
        onModalClose={handleEditingCancel}
        inputValue={team.name}
      />
    </div>
  );
};
export default DropDown;
