import Avatar from 'react-avatar';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import React from 'react';
import { ReactElement } from 'react-markdown';

type Props = {
  key?: string;
  size: string;
  name: string | undefined;
  src: string | undefined;
  round: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (userId?: string | undefined) => void;
  showTooltip?: boolean;
};

const UserAvatar: React.FC<Props> = ({
  key,
  size,
  name,
  src,
  round,
  className,
  style,
  onClick,
  showTooltip,
}) => (
  <OverlayTrigger
    key="bottom"
    placement="top"
    show={showTooltip}
    overlay={<Tooltip id={'tooltip-top'}>{name}</Tooltip>}
  >
    {({ ref, ...triggerHandler }): ReactElement => (
      <div {...triggerHandler} ref={ref}>
        <Avatar
          key={key}
          size={size}
          name={name}
          src={src}
          round={round}
          className={className}
          style={style}
          onClick={onClick ? (): void => onClick() : undefined}
        />
      </div>
    )}
  </OverlayTrigger>
);

export default UserAvatar;
