import Header from 'components/header/header';
import PageContent from './components/page-content/page-content';
import Toolbar from '../toolbar/toolbar';
// import Button from 'react-bootstrap/Button';
// import { pagesActions } from 'store/actions';
import './pages.scss';
// import { useAppDispatch } from 'hooks/hooks';
// import { useEffect } from 'react';
// import { IPageRequest } from 'common/interfaces/pages';
import styles from './styles.module.scss';

const Pages: React.FC = () => {

  return (
    <div className={styles.grid}>
      <div className={styles.header}>
        <Header  />
      </div>
      <div className={styles.toolbar}>
        <Toolbar />
      </div>
      <div className={styles.content}>
        <PageContent />
      </div>
    </div>
  );
};

export default Pages;
