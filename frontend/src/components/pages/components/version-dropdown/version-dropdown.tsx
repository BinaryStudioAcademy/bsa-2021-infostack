import { AppRoute } from 'common/enums/enums';
import { Dropdown } from 'react-bootstrap';
import { VersionItem } from '../version-item/version-item';
import { BlueCircle } from '../version-item/blue-circle/blue-circle';
import { useAppSelector } from 'hooks/hooks';
// import { IPageContent } from 'infostack-shared';

const VersionDropdown: React.FC = () => {
  const pageContents = useAppSelector(
    (state) => state.pages.currentPage?.pageContents,
  );
  const { currentPage } = useAppSelector((state) => state.pages);
  // eslint-disable-next-line no-console
  console.log('pageContents', pageContents);

  // eslint-disable-next-line no-console
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

  // eslint-disable-next-line no-console
  console.log(formattedVersionDate);

  return (
    <Dropdown className="me-3 d-inline-flex sm">
      <Dropdown.Toggle className="sm" id="dropdown-page-version">
        Version: {}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {pageContents ? (
          pageContents.map((version) => (
            <>
              <VersionItem key={version.id} to={AppRoute.PAGE}>
                {version.createdAt === latestVersion?.createdAt ? (
                  <>
                    <BlueCircle /> {formattedVersionDate(version.createdAt)}{' '}
                    (Latest)
                  </>
                ) : (
                  formattedVersionDate(version.createdAt)
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
