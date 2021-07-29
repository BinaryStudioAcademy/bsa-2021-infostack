import { Form, Button } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';

type Props = {
  header: string;
  secondaryText: string;
  children: JSX.Element | JSX.Element[];
  onSubmit: () => void;
};

const Sign: React.FC<Props> = ({
  header,
  secondaryText,
  children,
  onSubmit,
}) => (
  <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light text-center">
    <div className={styles.container}>
      <h1 className={getAllowedClasses('h4', styles.header)}>{header}</h1>
      <p className="text-secondary">{secondaryText}</p>
      <Form className="text-start text-secondary bg-white shadow-sm rounded p-5">
        {children}
        <div className="text-center">
          <Button
            className={styles.button}
            variant="primary"
            type="submit"
            onClick={onSubmit}
          >
            Sign up
          </Button>
        </div>
      </Form>
    </div>
  </div>
);

export default Sign;
