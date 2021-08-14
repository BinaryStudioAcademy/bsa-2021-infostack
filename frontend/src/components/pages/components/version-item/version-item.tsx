import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';
import { AppRoute } from 'common/enums/enums';
import { replacePageIdParamAndVersionId } from 'helpers/helpers';
// import { replacePageIdParamAndVersionId } from 'helpers/helpers';
// import { AppRoute } from 'common/enums/enums';

type Child = string | JSX.Element;

type Props = {
  id: string;
  versionId: string;
  pageId: string;
  onClick?: () => void;
  children?: Child | Child[];
};

export const VersionItem: React.FC<Props> = ({
  onClick,
  children,
  id,
  versionId,
  pageId,
}) => (
  <Dropdown.Item
    id={id}
    as={Link}
    to={
      replacePageIdParamAndVersionId(
        AppRoute.PAGE_PREVIOUS_VERSION,
        pageId || '',
        versionId || '',
      ) as AppRoute
    }
    className={getAllowedClasses(
      styles.versionItem,
      'd-flex align-items-center',
    )}
    onClick={onClick}
  >
    {children}
  </Dropdown.Item>
);
