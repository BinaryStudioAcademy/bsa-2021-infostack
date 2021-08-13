import { AppRoute } from 'common/enums/enums';
import { Dropdown } from 'react-bootstrap';
import { VersionItem } from '../version-item/version-item';

const VersionDropdown: React.FC = () => {
  return (
    <Dropdown className="me-3 d-inline-flex sm">
      <Dropdown.Toggle className="sm" id="dropdown-page-version">
        Version:
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <VersionItem to={AppRoute.WORKSPACES}>
          11.11.2011 Dan Abramovvvvvvvv
        </VersionItem>
        <VersionItem to={AppRoute.WORKSPACES}>11.11.2011 John Doe</VersionItem>
        <VersionItem to={AppRoute.WORKSPACES}>11.11.2011 Evan You</VersionItem>
        <VersionItem to={AppRoute.WORKSPACES}>11.11.2011 Evan You</VersionItem>
        <VersionItem to={AppRoute.WORKSPACES}>11.11.2011 Evan You</VersionItem>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default VersionDropdown;
