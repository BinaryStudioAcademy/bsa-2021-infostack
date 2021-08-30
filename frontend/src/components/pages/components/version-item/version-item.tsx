import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppRoute } from 'common/enums';
import {
  getAllowedClasses,
  replaceIdParam,
  replacePageIdParamAndVersionId,
} from 'helpers/helpers';
import styles from './styles.module.scss';

type Child = string | JSX.Element;

type Props = {
  id: string;
  versionId: string;
  pageId: string;
  onClick?: () => void;
  children?: Child | Child[];
  latest: boolean;
};

export const VersionItem: React.FC<Props> = ({
  onClick,
  children,
  id,
  versionId,
  pageId,
  latest,
}) => (
  <Dropdown.Item
    id={id}
    as={Link}
    to={
      latest
        ? (replaceIdParam(AppRoute.PAGE, pageId || '') as AppRoute)
        : (replacePageIdParamAndVersionId(
            AppRoute.PAGE_PREVIOUS_VERSION,
            pageId || '',
            versionId || '',
          ) as AppRoute)
    }
    className={getAllowedClasses(styles.versionItem, 'text-secondary')}
    onClick={onClick}
  >
    {children}
  </Dropdown.Item>
);
