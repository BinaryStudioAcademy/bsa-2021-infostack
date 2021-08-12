import React from 'react';
import { useAppSelector } from 'hooks/hooks';
import Header from 'components/header/header';
import Toolbar from 'components/toolbar/toolbar';
import styles from './styles.module.scss';

const WithHeader = (Component: React.FC): React.FC => {
  const componentWithHeader: React.FC = () => {
    const { currentWorkspace } = useAppSelector((state) => state.workspaces);
    return (
      <div className={styles.grid}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.toolbar}>
          <Toolbar title={currentWorkspace?.title} />
        </div>
        <div className={styles.content}>
          <Component />
        </div>
      </div>
    );
  };
  return componentWithHeader;
};

export default WithHeader;
