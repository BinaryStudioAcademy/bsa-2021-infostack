import useContextMenu from './useContextMenu';
import styles from './styles.module.scss';
import { getAllowedClasses } from 'helpers/helpers';

const ContextMenu: React.FC = () => {
  const { anchorPoint, show } = useContextMenu();

  if (show) {
    return (
      <ul
        className={getAllowedClasses(styles.menu)}
        style={{ top: anchorPoint.y, left: anchorPoint.x }}
      >
        <li>Share to..</li>
        <li>Cut</li>
        <li>Copy</li>
        <li>Paste</li>
        <hr />
        <li>Refresh</li>
        <li>Exit</li>
      </ul>
    );
  }
  return <></>;
};

export default ContextMenu;
