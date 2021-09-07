import Picker from 'emoji-picker-react';
import { MutableRefObject, SyntheticEvent } from 'react';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { useAppSelector, useEffect, useState, useRef } from 'hooks/hooks';
import { commentReactionApi } from 'services';
import { ICommentReaction, IEmoji } from 'common/interfaces';

import './styles.scss';

type Props = {
  reactions?: ICommentReaction[];
  commentId?: string;
};

export const Emoji: React.FC<Props> = ({ reactions = [], commentId = '' }) => {
  const [chosenEmoji, setChosenEmoji] = useState<IEmoji[]>([]);
  const [isDropdownShown, setIsDropdownShown] = useState(false);
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

      const users = reactions
        .filter((item) => {
          return item.reaction === reaction;
        })
        .map((reaction) => {
          return reaction.user?.fullName;
        }) as string[];

      return {
        unified: reaction,
        emoji: String.fromCodePoint(...emoji),
        id: reaction,
        counter,
        isActive,
        users,
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
    <>
      {chosenEmoji && (
        <div className="emoji emoji--reactions">
          <div className="emoji__container">
            {chosenEmoji.map(({ id, emoji, counter, isActive, users = [] }) => (
              <OverlayTrigger
                placement="top"
                trigger={['hover', 'click']}
                overlay={
                  <Tooltip id="users-tooltip" className="emoji__users">
                    {users ? users.join(', ') : ''}
                  </Tooltip>
                }
                key={id}
              >
                <div
                  className={`emoji__item ${isActive ? 'active' : ''}`}
                  onClick={(event): void =>
                    onEmojiClick(event, { unified: id })
                  }
                >
                  <span className="emoji__symbol">{emoji}</span>{' '}
                  <span className="emoji__counter">{counter}</span>
                </div>
              </OverlayTrigger>
            ))}
          </div>
        </div>
      )}
      {chosenEmoji && (
        <div className="emoji">
          <Dropdown
            drop="up"
            align="start"
            autoClose="outside"
            show={isDropdownShown}
          >
            <OverlayTrigger
              placement="top"
              trigger={['hover', 'click']}
              overlay={<Tooltip id="reaction-tooltip">Add reaction...</Tooltip>}
            >
              <Dropdown.Toggle
                onClick={(): void => setIsDropdownShown(!isDropdownShown)}
              >
                react
              </Dropdown.Toggle>
            </OverlayTrigger>

            <Dropdown.Menu ref={dropdownRef}>
              <Dropdown.Item>
                <Picker
                  onEmojiClick={onEmojiClick}
                  disableSkinTonePicker={true}
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </>
  );
};
