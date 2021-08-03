import { Form, Button } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';
import React from 'react';

type Props = {
  header: string;
  secondaryText: string;
  submitText: string;
  children: JSX.Element | JSX.Element[];
  onSubmit: (e: React.SyntheticEvent) => void;
};

const Sign: React.FC<Props> = ({
  header,
  secondaryText,
  submitText,
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
            {submitText}
          </Button>
        </div>
      </Form>
    </div>
  </div>
);

export default Sign;
