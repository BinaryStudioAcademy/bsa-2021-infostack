import { MutableRefObject, SyntheticEvent } from 'react';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useAppSelector, useEffect, useState, useRef } from 'hooks/hooks';
import { CommentReactionApi } from 'services';
import Picker from 'emoji-picker-react';
import { ICommentReaction } from '../../../../common/interfaces/comment-reaction';
import { IEmoji } from '../../../../common/interfaces/emoji';
import './styles.scss';

type Props = {
  reactions?: ICommentReaction[];
  commentId?: string;
};

export const Emoji: React.FC<Props> = ({ reactions = [], commentId = '' }) => {
  const [chosenEmoji, setChosenEmoji] = useState<IEmoji[]>([]);
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const commentReactionApi = new CommentReactionApi();
  const user = useAppSelector((store) => store.auth.user);
  const dropdownRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleReactions = (reactions: ICommentReaction[]): void => {
    const uniqueReactions = reactions.reduce((arr: string[], emoji) => {
      const { reaction = '' } = emoji;

      if (arr.includes(reaction)) {
        return arr;
      } else {
        arr.push(reaction);
        return arr;
      }
    }, []);

    const mappedReactions = uniqueReactions.map((reaction) => {
      const emoji = reaction
        .split('-')
        .map((reaction) => Number('0x' + reaction));
      const counter = reactions.filter(
        (item) => item.reaction === reaction,
      ).length;
      const isActive = !!(
        user &&
        reactions.findIndex(
          (userReaction) =>
            userReaction.userId === user.id &&
            reaction === userReaction.reaction,
        ) !== -1
      );

      return {
        unified: reaction,
        emoji: String.fromCodePoint(...emoji),
        id: reaction,
        counter,
        isActive,
      };
    });

    setChosenEmoji(mappedReactions);
    setIsDropdownShown(false);
  };

  useEffect(() => {
    const handleDropdown = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (!dropdownRef.current?.contains(target)) {
        setIsDropdownShown(false);
      }
    };

    document.addEventListener('mousedown', handleDropdown);

    return (): void => {
      document.removeEventListener('mousedown', handleDropdown);
    };
  });

  useEffect(() => {
    handleReactions(reactions);
  }, [reactions]);

  const onEmojiClick = (
    event: SyntheticEvent<EventTarget>,
    emojiObject: ICommentReaction,
  ): void => {
    commentReactionApi
      .handleCommentReaction(commentId, emojiObject.unified ?? '')
      .then((reactions: ICommentReaction[]) => {
        handleReactions(reactions);
      });
  };

  return (
    <div className="emoji">
      {chosenEmoji && (
        <div className="emoji__container">
          {chosenEmoji.map(({ id, emoji, counter, isActive }) => (
            <div
              className={`emoji__item ${isActive ? 'active' : ''}`}
              key={id}
              onClick={(event): void => onEmojiClick(event, { unified: id })}
            >
              <span className="emoji__symbol">{emoji}</span>{' '}
              <span className="emoji__counter">{counter}</span>
            </div>
          ))}

          <Dropdown
            drop="up"
            align="start"
            autoClose="outside"
            show={isDropdownShown}
          >
            <OverlayTrigger
              placement="top"
              trigger={['hover', 'click']}
              overlay={<Tooltip id="test">Add reaction...</Tooltip>}
            >
              <Dropdown.Toggle
                onClick={(): void => setIsDropdownShown(!isDropdownShown)}
              >
                <i className="bi bi-plus-circle"></i>
              </Dropdown.Toggle>
            </OverlayTrigger>

            <Dropdown.Menu ref={dropdownRef}>
              <Dropdown.Item>
                <Picker onEmojiClick={onEmojiClick} />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};
