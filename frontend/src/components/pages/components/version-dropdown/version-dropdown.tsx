import { Dropdown } from 'react-bootstrap';
import { VersionItem } from '../version-item/version-item';
import { BlueCircle } from '../version-item/blue-circle/blue-circle';
import { useAppSelector, useParams } from 'hooks/hooks';
import { IPageContent, IPageContentWithAuthor } from 'infostack-shared';
import { getAllowedClasses } from 'helpers/dom/dom';
import NavLink from 'react-bootstrap/NavLink';
import { replaceIdParam } from 'helpers/helpers';
import { AppRoute } from 'common/enums/enums';
import { useHistory } from 'react-router-dom';
import { IPageContributor } from 'common/interfaces/pages';
import Avatar from 'react-avatar';

type Props = {
  currContent?: IPageContent | undefined;
  contributors: IPageContributor[];
};

const VersionDropdown: React.FC<Props> = ({ currContent, contributors }) => {
  const pageId = useParams<{ id: string }>().id;
  const history = useHistory();

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

  const handleAvatarClick = (userId: string): void => {
    history.push(replaceIdParam(AppRoute.PROFILE, userId));
  };

  const pageContentsCopy: IPageContentWithAuthor[] = JSON.parse(
    JSON.stringify(pageContents),
  );
  // eslint-disable-next-line no-console
  console.log(
    'contributors',
    contributors,
    'pageContentsCopy',
    pageContentsCopy,
  );

  pageContentsCopy.forEach((contentVersion: IPageContent, index): void => {
    const authorId = contentVersion?.authorId;
    const contributorInState = contributors.find(
      (contributor) => authorId === contributor.id,
    );
    // eslint-disable-next-line no-console
    console.log('contributorInState', contributorInState);

    if (contributorInState) {
      const { avatar, fullName, id } = contributorInState;
      const versionAuthor = {
        authorId: id,
        avatar: avatar || 'unavailable',
        fullName: fullName || 'unavailable',
      };

      // const pageVersionIndex = pageContentsCopy.findIndex((version: IPageContent) => version.authorId === id);

      if (index >= 0) {
        pageContentsCopy[index] = {
          ...pageContentsCopy[index],
          author: { ...versionAuthor },
        };
        // eslint-disable-next-line no-console
        // console.log('pageContentsCopy[pageVersionIndex]', pageContentsCopy[pageVersionIndex]);
        // } else {
        //   pageContentsCopy[index] = {
        //     ...pageContentsCopy[index],
        //     author: {
        //       authorId: 'unavailable',
        //       avatar: 'unavailable',
        //       fullName: 'unavailable',
        //     },
        //   };
      }
      // eslint-disable-next-line no-console
      console.log('pageContentsCopy before Render', pageContentsCopy);
    } else {
      pageContentsCopy[index] = {
        ...pageContentsCopy[index],
        author: {
          authorId: 'unavailable',
          avatar: 'unavailable',
          fullName: 'unavailable',
        },
      };
    }
  });

  const versionButtonValue =
    !currVersionId || currentPage?.pageContents[0]?.id === currVersionId
      ? 'Latest'
      : formattedVersionDate(currContent ? currContent.createdAt : '');
  return (
    <Dropdown as={NavLink} className="me-3 d-inline-flex sm">
      <Dropdown.Toggle as={NavLink} className={getAllowedClasses('sm')}>
        Version: {versionButtonValue}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {pageContentsCopy ? (
          pageContentsCopy.map(({ id, createdAt, author, authorId }) => (
            <>
              <VersionItem
                id={id}
                versionId={id}
                key={id}
                pageId={pageId}
                latest={createdAt === latestVersion?.createdAt}
              >
                {createdAt === latestVersion?.createdAt ? (
                  <>
                    {' '}
                    {currVersionId === id || !currVersionId ? (
                      <BlueCircle />
                    ) : null}
                    {formattedVersionDate(createdAt)} (Latest)
                    <Avatar
                      key={authorId}
                      name={author ? author?.fullName : 'not found'}
                      src={author ? author?.avatar : ''}
                      round={true}
                      size="20"
                      onClick={handleAvatarClick.bind(null, id)}
                    />
                    <p className="my-0">{`${author.fullName}`}</p>
                  </>
                ) : (
                  <>
                    {currVersionId === id ? <BlueCircle /> : null}
                    {formattedVersionDate(createdAt)}
                    <>
                      <Avatar
                        className="float-right"
                        key={id}
                        name={author ? author?.fullName : 'not found'}
                        src={author ? author?.avatar : ''}
                        round={true}
                        size="20"
                        onClick={handleAvatarClick.bind(null, id)}
                      />
                      <p className="my-0">{`${author.fullName}`}</p>
                    </>
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
