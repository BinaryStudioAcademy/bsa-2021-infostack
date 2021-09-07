import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { IPageContributor } from 'common/interfaces/pages';
import { AppRoute } from 'common/enums';
import { UserAvatar } from 'components/common/common';
import { replaceIdParam } from 'helpers/helpers';

interface IPageEditorsProps {
  className?: string;
  editors: IPageContributor[];
  avatarSize?: number;
}

const DEFAULT_AVATAR_SIZE = 40;

export const PageEditors: React.FC<IPageEditorsProps> = ({
  editors,
  avatarSize = DEFAULT_AVATAR_SIZE,
}) => {
  const history = useHistory();

  const avatarWrapperStyle: React.CSSProperties = {
    marginLeft: -(+avatarSize / 2.2) + 'px',
  };

  const avatarStyles: React.CSSProperties = {
    boxSizing: 'content-box',
    cursor: 'pointer',
  };

  const handleAvatarClick = (userId: string): void => {
    history.push(replaceIdParam(AppRoute.PROFILE, userId));
  };

  return (
    <Card.Body className="px-1">
      {editors ? (
        <div
          className="d-flex justify-content-start"
          style={{ marginLeft: +avatarSize / 2 }}
        >
          {editors.map(({ id, fullName, avatar }) => (
            <div key={id} style={avatarWrapperStyle}>
              <UserAvatar
                style={avatarStyles}
                name={fullName}
                src={avatar}
                round={true}
                size={avatarSize.toString()}
                onClick={handleAvatarClick.bind(null, id)}
              />
            </div>
          ))}
        </div>
      ) : null}
    </Card.Body>
  );
};
