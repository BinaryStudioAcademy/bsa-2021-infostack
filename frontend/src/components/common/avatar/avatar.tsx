import Avatar from 'react-avatar';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import React, { SyntheticEvent } from 'react';
import { ReactElement } from 'react-markdown';

type Props = {
  size: string;
  name: string | undefined;
  src: string | undefined;
  round: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: SyntheticEvent) => void;
  showTooltip?: boolean;
};

export const UserAvatar: React.FC<Props> = ({
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
          size={size}
          name={name}
          title={' '}
          src={src}
          round={round}
          className={className}
          style={style}
          onClick={onClick}
        />
      </div>
    )}
  </OverlayTrigger>
);
