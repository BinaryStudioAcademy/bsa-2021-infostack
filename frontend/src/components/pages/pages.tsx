import PageContent from './components/page-content/page-content';
import styles from './pages.module.scss';

const Pages: React.FC = () => {

  return (
    <div className={styles.content}>
      <PageContent />
    </div>
  );
};

export default Pages;
