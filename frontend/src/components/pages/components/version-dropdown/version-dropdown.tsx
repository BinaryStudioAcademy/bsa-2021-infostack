import { Dropdown } from 'react-bootstrap';
import { VersionItem } from '../version-item/version-item';
import { BlueCircle } from '../version-item/blue-circle/blue-circle';
import { useAppSelector, useParams } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/dom/dom';
import NavLink from 'react-bootstrap/NavLink';
import { replaceIdParam } from 'helpers/helpers';
import { AppRoute } from 'common/enums/enums';
import { useHistory } from 'react-router-dom';
import {
  IPageContributor,
  IPageContent,
  IPageContentWithAuthor,
} from 'common/interfaces/pages';
import Avatar from 'react-avatar';
import styles from './styles.module.scss';

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

  pageContentsCopy.forEach((contentVersion: IPageContent, index): void => {
    const authorId = contentVersion?.authorId;
    const contributorInState = contributors.find(
      (contributor) => authorId === contributor.id,
    );

    if (contributorInState) {
      const { avatar, fullName, id } = contributorInState;
      const versionAuthor = {
        authorId: id,
        avatar: avatar || 'unavailable',
        fullName: fullName || 'unavailable',
      };

      if (index >= 0) {
        pageContentsCopy[index] = {
          ...pageContentsCopy[index],
          author: { ...versionAuthor },
        };
      }
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
      : formattedVersionDate(
          currContent ? currContent?.createdAt : new Date().toString(),
        );
  return (
    <Dropdown as={NavLink} className="me-3 d-inline-flex sm">
      <Dropdown.Toggle
        as={NavLink}
        className={getAllowedClasses('sm text-secondary')}
      >
        Version: {versionButtonValue}
      </Dropdown.Toggle>
      <Dropdown.Menu className={getAllowedClasses(styles.dropDownMenu)}>
        {pageContentsCopy ? (
          pageContentsCopy.map(({ id, createdAt, author, authorId }) => (
            <div className="d-flex" key={id}>
              <VersionItem
                id={id}
                versionId={id}
                key={id}
                pageId={pageId}
                latest={createdAt === latestVersion?.createdAt}
              >
                {createdAt === latestVersion?.createdAt ? (
                  <div className="d-flex">
                    {' '}
                    {currVersionId === id || !currVersionId ? (
                      <BlueCircle />
                    ) : null}
                    {formattedVersionDate(createdAt)} (Latest)
                  </div>
                ) : (
                  <div className="d-flex">
                    {currVersionId === id ? <BlueCircle /> : null}
                    {formattedVersionDate(createdAt)}
                  </div>
                )}
              </VersionItem>
              <div
                onClick={handleAvatarClick.bind(
                  null,
                  author ? author?.authorId : authorId,
                )}
                className="d-flex align-items-center"
              >
                <Avatar
                  key={id}
                  name={author ? author?.fullName : 'not found'}
                  src={author ? author?.avatar : ''}
                  round={true}
                  size="20"
                />
                <p
                  className={getAllowedClasses(
                    'my-0 text-secondary',
                    styles.authorFullName,
                  )}
                >{`${author.fullName}`}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="fs-6"> no versions </p>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default VersionDropdown;