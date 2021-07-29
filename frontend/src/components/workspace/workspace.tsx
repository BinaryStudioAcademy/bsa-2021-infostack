import { Tabs, Tab, TabPane } from 'react-bootstrap';
import './styles.scss';

const Workspace: React.FC = () => {
  return (
    <div className="settings-container">
      <h1 className="title">Workspace name Settings</h1>
      <Tabs className="tabs" defaultActiveKey="users">
        <Tab eventKey="users" className="settings-tab" title="Users">
          <p className="content-header">Users</p>
          <TabPane role="tabpanel">
            <p className="settings-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Nihil odit magnam minima, soluta doloribus reiciendis
              molestiae placeat unde eos molestias. Quisquam aperiam,
              pariatur. Tempora, placeat ratione porro voluptate odit
              minima.
            </p>
          </TabPane>
        </Tab>
        <Tab eventKey="teams" className="settings-tab" title="Teams">
          <p className="content-header">Teams</p>
          <TabPane role="tabpanel">
            <p className="settings-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Nihil odit magnam minima, soluta doloribus reiciendis
              molestiae placeat unde eos molestias. Quisquam aperiam,
              pariatur. Tempora, placeat ratione porro voluptate odit
              minima.
            </p>
          </TabPane>
        </Tab>
        <Tab eventKey="tags" className="settings-tab" title="Tags">
          <p className="content-header">Tags</p>
          <TabPane role="tabpanel">
            <p className="settings-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Nihil odit magnam minima, soluta doloribus reiciendis
              molestiae placeat unde eos molestias. Quisquam aperiam,
              pariatur. Tempora, placeat ratione porro voluptate odit
              minima.
            </p>
          </TabPane>
        </Tab>
        <Tab eventKey="integrations" className="settings-tab" title="Integrations">
          <p className="content-header">Integrations</p>
          <TabPane role="tabpanel">
            <p className="settings-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Nihil odit magnam minima, soluta doloribus reiciendis
              molestiae placeat unde eos molestias. Quisquam aperiam,
              pariatur. Tempora, placeat ratione porro voluptate odit
              minima.
            </p>
          </TabPane>
        </Tab>
        <Tab eventKey="profile" className="settings-tab" title="Workspace profile">
          <p className="content-header">Workspace profile</p>
          <TabPane role="tabpanel">
            <p className="settings-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Nihil odit magnam minima, soluta doloribus reiciendis
              molestiae placeat unde eos molestias. Quisquam aperiam,
              pariatur. Tempora, placeat ratione porro voluptate odit
              minima.
            </p>
          </TabPane>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Workspace;
