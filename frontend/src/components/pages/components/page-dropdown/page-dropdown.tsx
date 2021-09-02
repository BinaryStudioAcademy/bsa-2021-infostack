import { Dropdown, NavLink } from 'react-bootstrap';
import { useAppSelector } from 'hooks/hooks';
import { PermissionType } from 'common/enums';
import { getAllowedClasses } from 'helpers/helpers';
import { RootState } from 'common/types/types';
import styles from './styles.module.scss';

interface Props {
  className?: string;
  onAssign(): void;
  onEditing(): void;
  onPageFollow(): void;
  onPagePin(): void;
  onDelete(): void;
  onShare(): void;
  onExportPDF(): void;
  isCurrentPageFollowed: boolean;
  isCurrentPagePinned: boolean;
}

export const PageActionsDropdown: React.FC<Props> = ({
  className,
  onAssign,
  onEditing,
  onPageFollow,
  onPagePin,
  onDelete,
  onShare,
  onExportPDF,
  isCurrentPageFollowed,
  isCurrentPagePinned,
}) => {
  const currentPage = useAppSelector(
    (state: RootState) => state.pages.currentPage,
  );

  const isPageAdmin = currentPage?.permission === PermissionType.ADMIN;
  const canEdit =
    currentPage?.permission === PermissionType.ADMIN ||
    currentPage?.permission === PermissionType.WRITE;

  return (
    <Dropdown
      className={getAllowedClasses(className, styles.dropdown)}
      bsPrefix="w-0"
    >
      <Dropdown.Toggle
        as={NavLink}
        className={getAllowedClasses(styles.dropdownButton)}
      >
        <i className="bi bi-three-dots"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {isPageAdmin && (
          <Dropdown.Item
            className={getAllowedClasses(styles.dropdownItem)}
            onClick={onAssign}
          >
            Assign permissions
          </Dropdown.Item>
        )}
        <Dropdown.Item
          className={getAllowedClasses(styles.dropdownItem)}
          onClick={onPageFollow}
        >
          {isCurrentPageFollowed ? 'Unfollow' : 'Follow'}
        </Dropdown.Item>
        <Dropdown.Item
          className={getAllowedClasses(styles.dropdownItem)}
          onClick={onPagePin}
        >
          {isCurrentPagePinned ? 'Unpin' : 'Pin'}
        </Dropdown.Item>
        <Dropdown.Item
          className={getAllowedClasses(styles.dropdownItem)}
          onClick={onShare}
        >
          Share
        </Dropdown.Item>
        <Dropdown.Item
          className={getAllowedClasses(styles.dropdownItem)}
          onClick={onExportPDF}
        >
          Export PDF
        </Dropdown.Item>
        {canEdit && (
          <>
            <Dropdown.Item
              className={getAllowedClasses(styles.dropdownItem)}
              onClick={onEditing}
            >
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              className={getAllowedClasses(styles.dropdownItem)}
              onClick={onDelete}
            >
              Delete
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
