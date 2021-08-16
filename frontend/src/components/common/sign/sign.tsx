import { Form, Button } from 'react-bootstrap';
import React from 'react';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type AlternativeRoute = {
  question: string;
  linkText: string;
  route: AppRoute;
};

type Props = {
  header: string;
  secondaryText: string;
  submitText: string;
  children: JSX.Element | JSX.Element[];
  onSubmit: (e: React.SyntheticEvent) => void;
  isSubmitDisabled?: boolean;
  altRoute?: AlternativeRoute;
};

export const Sign: React.FC<Props> = ({
  header,
  secondaryText,
  submitText,
  children,
  onSubmit,
  isSubmitDisabled,
  altRoute,
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
            disabled={isSubmitDisabled}
          >
            {submitText}
          </Button>
          {altRoute && (
            <div className="text-secondary mt-3">
              {altRoute.question}
              <Link className="text-decoration-none mx-2" to={altRoute.route}>
                {altRoute.linkText}
              </Link>
            </div>
          )}
        </div>
      </Form>
    </div>
  </div>
);
