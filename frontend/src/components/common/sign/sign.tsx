import { Form, Button } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';
import React from 'react';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import GoogleButton from 'react-google-button';
import { AuthApi } from 'services';

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

const Sign: React.FC<Props> = ({
  header,
  secondaryText,
  submitText,
  children,
  onSubmit,
  isSubmitDisabled,
  altRoute,
}) => {
  const googleSignIn = async (): Promise<void> => {
    const { url } = await new AuthApi().getLoginGoogleUrl();
    window.location.assign(url);
  };

  return (
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
            <hr className={getAllowedClasses('text-secondary', styles.line)} />
            <span className={getAllowedClasses('text-secondary', styles.or)}>
              or
            </span>
            <hr className={getAllowedClasses('text-secondary', styles.line)} />
            <GoogleButton
              onClick={googleSignIn}
              type="light"
              className="mx-auto"
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Sign;
