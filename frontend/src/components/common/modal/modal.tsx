import { Modal as BSModal, Button } from 'react-bootstrap';

import { getAllowedClasses } from 'helpers/dom/dom';
import { Child } from 'common/types/types';

import styles from './styles.module.scss';

type Props = {
  show?: boolean;
  title?: string;
  children?: Child | Child[];
  actions?: Action[];
  isDisabled?: boolean;
};

type Action = {
  text: string;
  buttonVariant: string;
  handler: () => void;
};

export const Modal: React.FC<Props> = ({
  show = false,
  title = '',
  children,
  actions,
  isDisabled = false,
}) => (
  <BSModal show={show} contentClassName="border-0" centered>
    <BSModal.Header className={styles.header}>
      <BSModal.Title className={getAllowedClasses('h5 m-0', styles.title)}>
        {title}
      </BSModal.Title>
    </BSModal.Header>

    <BSModal.Body className={styles.body}>{children}</BSModal.Body>

    {actions && (
      <BSModal.Footer className={styles.footer}>
        {actions.map(({ text, buttonVariant, handler }, index) => (
          <Button
            key={`${index}${text}`}
            variant={buttonVariant}
            onClick={handler}
            disabled={isDisabled}
            className={styles.button}
          >
            {text}
          </Button>
        ))}
      </BSModal.Footer>
    )}
  </BSModal>
);
