import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import './styles.scss';

import UsersSettings from './users-settings/users-settings';
import TeamSettings from './team-settings/team-settings';
import TagSettings from './tag-settings/tag-settings';
import IntegrationSettings from './integration-settings/integration-settings';
import WorkspaceProfileSettings from './profile-settings/profile-settings';

const Workspace: React.FC = () => {
  const [cookies] = useCookies(['workspaceName']);

  return (
    <div className="settings-container">
      <h1 className="title">{cookies.workspaceName} Settings</h1>
      <Tabs className="tabs">
        <Tab eventKey="/users" className="settings-tab" title="Users">
          <UsersSettings />
        </Tab>
        <Tab eventKey="/teams" className="settings-tab" title="Teams">
          <TeamSettings />
        </Tab>
        <Tab eventKey="/tags" className="settings-tab" title="Tags">
          <TagSettings />
        </Tab>
        <Tab eventKey="/integrations" className="settings-tab" title="Integrations">
          <IntegrationSettings />
        </Tab>
        <Tab eventKey="/profile" className="settings-tab" title="Workspace profile">
          <WorkspaceProfileSettings />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Workspace;
