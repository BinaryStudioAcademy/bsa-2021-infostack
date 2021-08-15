import { Dropdown } from 'react-bootstrap';
import { VersionItem } from '../version-item/version-item';
import { BlueCircle } from '../version-item/blue-circle/blue-circle';
import { useAppSelector, useParams } from 'hooks/hooks';
import { IPageContent } from 'infostack-shared';
import styles from './styles.module.scss';
import { getAllowedClasses } from 'helpers/dom/dom';
import NavLink from 'react-bootstrap/NavLink';

type Props = {
  currContent?: IPageContent | undefined;
};

const VersionDropdown: React.FC<Props> = ({ currContent }) => {
  const pageId = useParams<{ id: string }>().id;

  const pageContents = useAppSelector(
    (state) => state.pages.currentPage?.pageContents,
  );
  const { currentPage } = useAppSelector((state) => state.pages);
  // eslint-disable-next-line no-console
  console.log('VersionDropdown pageId', pageId);
  const currVersionId = useParams<{ versionId: string }>().versionId;

  const latestVersion = currentPage?.pageContents[0];

  const formattedVersionDate = (createdAt: string): string => {
    const formattedDate = new Date(createdAt),
      year = formattedDate.getFullYear();
    let day = '' + formattedDate.getDate(),
      month = '' + (formattedDate.getMonth() + 1);
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('.');
  };

  const versionButtonValue =
    !currVersionId || currentPage?.pageContents[0]?.id === currVersionId
      ? 'Latest'
      : formattedVersionDate(currContent ? currContent.createdAt : '');
  return (
    <Dropdown as={NavLink} className="me-3 d-inline-flex sm">
      <Dropdown.Toggle
        as={NavLink}
        className={getAllowedClasses('sm', styles.dropdownButton)}
      >
        Version: {versionButtonValue}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {pageContents ? (
          pageContents.map((version) => (
            <>
              <VersionItem
                id={version.id}
                versionId={version.id}
                key={version.id}
                pageId={pageId}
                latest={version.createdAt === latestVersion?.createdAt}
              >
                {version.createdAt === latestVersion?.createdAt ? (
                  <>
                    {' '}
                    {currVersionId === version.id || !currVersionId ? (
                      <BlueCircle />
                    ) : null}
                    {formattedVersionDate(version.createdAt)} (Latest)
                  </>
                ) : (
                  <>
                    {currVersionId === version.id ? <BlueCircle /> : null}
                    {formattedVersionDate(version.createdAt)}
                  </>
                )}
              </VersionItem>
            </>
          ))
        ) : (
          <p>no versions</p>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default VersionDropdown;
