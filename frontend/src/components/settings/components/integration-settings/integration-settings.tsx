import { Card } from 'react-bootstrap';
import { ConnectButton } from './components/components';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

export const IntegrationSettings: React.FC = () => {
  const onConnectButtonClick = (): void => {
    setIsPopUpVisible(true);
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
