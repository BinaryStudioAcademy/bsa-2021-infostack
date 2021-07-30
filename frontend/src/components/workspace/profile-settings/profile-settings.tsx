import { TabPane } from 'react-bootstrap';

const ProfileSettings: React.FC = () => {
  return (
    <>
      <p className="content-header">Profile</p>
      <TabPane role="tabpanel">
        <p className="settings-content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Nihil odit magnam minima, soluta doloribus reiciendis
          molestiae placeat unde eos molestias. Quisquam aperiam,
          pariatur. Tempora, placeat ratione porro voluptate odit
          minima.
        </p>
      </TabPane>
    </>
  );
};

export default ProfileSettings;
