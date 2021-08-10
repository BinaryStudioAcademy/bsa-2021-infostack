import React from 'react';
import Avatar, { ReactAvatarProps } from 'react-avatar';
import styles from './styles.module.scss';

const DEFAULT_MAX_AVATARS = 5;

interface IStackedAvatarsProps {
  round: boolean;
  size: string;
  maxAvatars?: number;
  avatars?: ReactAvatarProps[];
  style?: React.CSSProperties;
}

const renderRemaining: React.FC<IStackedAvatarsProps> = (props) => {
  const { avatars = [], maxAvatars = DEFAULT_MAX_AVATARS, ...other } = props;
  const remaining = avatars.length - maxAvatars;

  if (remaining < 1) return null;

  return (
    <Avatar
      {...other}
      className={styles.avatar}
      value={`+${remaining}`}
      color="gray"
    />
  );
};

const StackedAvatars: React.FC<IStackedAvatarsProps> = (
  props: IStackedAvatarsProps,
) => {
  const { avatars = [], maxAvatars = DEFAULT_MAX_AVATARS, ...others } = props;

  const style = {
    border: '4px solid white',
    ...props.style,
    marginLeft: -(+props.size / 2) + 'px',
  };

  return (
    <div style={{ marginLeft: +props.size / 2 }}>
      {avatars.slice(0, maxAvatars).map((avatar, idx) => (
        <Avatar
          {...avatar}
          {...others}
          className={styles.avatar}
          key={idx}
          style={style}
        />
      ))}
      {renderRemaining({ ...props, style })}
    </div>
  );
};

export default StackedAvatars;
