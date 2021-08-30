import React from 'react';
import GoogleButton from 'react-google-button';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums';
import { authApi } from 'services';
import { getAllowedClasses } from 'helpers/helpers';
import logo from 'assets/img/logo_dark.svg';
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
}) => {
  const googleSignIn = async (): Promise<void> => {
    const { url } = await authApi.getLoginGoogleUrl();
    window.location.assign(url);
  };

  const githubSignIn = async (): Promise<void> => {
    const { url } = await authApi.getLoginGitHubUrl();
    window.location.assign(url);
  };

  return (
    <div className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center bg-light text-center">
      <img src={logo} alt="Infostack logo" className={styles.logo}></img>
      <div className={styles.container}>
        <h1 className={getAllowedClasses('h4', styles.header)}>{header}</h1>
        <p className="text-secondary">{secondaryText}</p>
        <Form className="text-start text-secondary bg-white shadow-sm rounded p-5">
          {children}
          <div className="text-center">
            <Button
              variant="success"
              type="submit"
              size="lg"
              onClick={onSubmit}
              disabled={isSubmitDisabled}
              className="my-3"
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
            <Button
              onClick={githubSignIn}
              className={getAllowedClasses('mx-auto mt-4', styles.github)}
            >
              <div>
                <i className="bi bi-github" />
              </div>
              <span>Sign in with Github</span>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
