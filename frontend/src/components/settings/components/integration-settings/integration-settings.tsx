import { Card } from 'react-bootstrap';

import { authApi } from 'services';
import { IOption } from 'common/interfaces';
import { githubActions } from 'store/actions';
import { Spinner } from 'components/common/common';
import { getAllowedClasses } from 'helpers/helpers';
import { useAppSelector, useAppDispatch, useEffect } from 'hooks/hooks';
import { ConnectButton, SelectRepo } from './components/components';

import styles from './styles.module.scss';

export const IntegrationSettings: React.FC = () => {
  const { username, repos, currentRepo } = useAppSelector(
    (state) => state.github,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!username) {
      dispatch(githubActions.loadUsername());
    }
  }, []);

  useEffect(() => {
    if (username && !currentRepo) {
      dispatch(githubActions.loadCurrentRepo());
    }
  }, [username]);

  const onConnectButtonClick = async (): Promise<void> => {
    const { url } = await authApi.getLoginGitHubUrl(null);
    window.location.assign(url);
  };

  const handleSelectChange = (selectedOption: IOption | null): void => {
    if (selectedOption) {
      dispatch(githubActions.setCurrentRepo(selectedOption.value));
    }
  };

  const getOptions = (): IOption[] | undefined => {
    if (!repos) {
      return;
    }
    return repos.map((repo) => ({
      value: repo,
      label: repo,
    }));
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
        {!username && <ConnectButton onClick={onConnectButtonClick} />}
      </Card.Header>
      <Card.Body className={getAllowedClasses(styles.cardBody, 'text-dark')}>
        {!username && !repos && (
          <span className={getAllowedClasses(styles.emptyMessage)}>
            There are no integrations in this workspace. Start adding
          </span>
        )}
        {username &&
          (repos || currentRepo ? (
            <>
              <hr />
              <div className={getAllowedClasses(styles.title)}>Github</div>
              <div
                className={getAllowedClasses(styles.label)}
              >{`Username:  ${username}`}</div>
              {repos && !currentRepo && (
                <>
                  <div className={getAllowedClasses(styles.label)}>
                    Select repository:
                  </div>
                  <SelectRepo
                    handleSelectChange={handleSelectChange}
                    options={getOptions()}
                  />
                </>
              )}
              {currentRepo && (
                <div
                  className={getAllowedClasses(styles.label)}
                >{`Repository:  ${currentRepo}`}</div>
              )}
              <hr />
            </>
          ) : (
            <Spinner height={'6rem'} width={'6rem'} />
          ))}
      </Card.Body>
    </Card>
  );
};
