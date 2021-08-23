import { Card } from 'react-bootstrap';
import { ConnectButton } from './components/components';
import { authApi } from 'services';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

export const IntegrationSettings: React.FC = () => {
  const onConnectButtonClick = async (): Promise<void> => {
    const { url } = await authApi.getLoginGitHubUrl();
    window.location.assign(url);
  };

  return (
    <Card className={getAllowedClasses(styles.cardItem)}>
      <Card.Header
        className={getAllowedClasses(
          styles.cardHeader,
          'd-flex justify-content-between',
        )}
      >
        <Card.Title as="h5" className={getAllowedClasses(styles.cardTitle)}>
          Integrations
        </Card.Title>
        <ConnectButton onClick={onConnectButtonClick} />
      </Card.Header>
      <Card.Body className={getAllowedClasses(styles.cardBody)}></Card.Body>
    </Card>
  );
};
