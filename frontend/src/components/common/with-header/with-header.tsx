import React from 'react';
import { useAppSelector } from 'hooks/hooks';
import { Header, Toolbar } from './components/components';
import styles from './styles.module.scss';

export const WithHeader: React.FC<{ Component: React.FC }> = ({
  Component,
}) => {
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
