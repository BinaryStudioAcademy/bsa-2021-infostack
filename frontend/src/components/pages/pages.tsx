import Header from 'components/header/header';
import PageContent from './components/page-content/page-content';
import Toolbar from '../toolbar/toolbar';
import styles from './pages.module.scss';

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
