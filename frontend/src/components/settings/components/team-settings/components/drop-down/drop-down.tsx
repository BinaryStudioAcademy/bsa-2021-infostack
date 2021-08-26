import { Dropdown, NavLink } from 'react-bootstrap';
import { ITeam, ITeamCreation } from 'common/interfaces/team';
import { CreateTeamModal } from '../modal/modal';
import { teamsActions } from 'store/actions';
import { useState, useAppDispatch } from 'hooks/hooks';
import { Popup } from '../popup-invite/popup-invite';
import { getAllowedClasses } from 'helpers/helpers';
import { ConfirmModal } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  team: ITeam;
};

export const DropDown: React.FC<Props> = ({ team }) => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [showDeleteTeamModal, setshowDeleteTeamModal] = useState(false);

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

  const showInvitePopup = (): void => {
    setIsPopUpVisible(true);
  };

  const handleInviteCancel = (): void => {
    setIsPopUpVisible(false);
  };

  return (
    <div>
      <Dropdown
        align="end"
        className={getAllowedClasses(styles.teamSettingsDropdown)}
      >
        <Dropdown.Toggle
          as={NavLink}
          className={getAllowedClasses(styles.dropdownButton)}
        >
          <i className="bi bi-three-dots"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            className={getAllowedClasses(styles.teamSettingsItem)}
            onClick={onEditTeamButtonClick}
          >
            Edit
          </Dropdown.Item>
          <Dropdown.Item
            className={getAllowedClasses(styles.teamSettingsItem)}
            onClick={showInvitePopup}
          >
            Manage users
          </Dropdown.Item>
          <Dropdown.Item
            className={getAllowedClasses(styles.teamSettingsItem)}
            onClick={(): void => setshowDeleteTeamModal(true)}
          >
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
      <ConfirmModal
        title="Delete confirmation"
        showModal={showDeleteTeamModal}
        modalText={`Are you sure you want to delete team ${team.name}?`}
        confirmButton={{
          text: 'Yes',
          onClick: handleDeleting,
          variant: 'danger',
        }}
        cancelButton={{
          text: 'No',
          onClick: (): void => setshowDeleteTeamModal(false),
        }}
      />
      <Popup
        owner={team.owner}
        teamId={team.id}
        teamUsers={team.users}
        query={team.name}
        isVisible={isPopUpVisible}
        cancelButton={{
          text: 'Cancel',
          onClick: handleInviteCancel,
        }}
      />
    </div>
  );
};
