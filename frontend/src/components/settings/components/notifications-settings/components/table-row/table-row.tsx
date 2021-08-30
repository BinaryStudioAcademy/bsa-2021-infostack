import { Form } from 'react-bootstrap';
import {
  useEffect,
  useState,
  useAppDispatch,
  useAppSelector,
} from 'hooks/hooks';
import { notificationsSettingsActions } from 'store/actions';
import { NotificationType, GeneralNotificationType } from 'common/enums';
import { RootState } from 'common/types/types';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  heading: string;
  description: string;
  notificationTypeSystem: NotificationType;
  notificationTypeEmail: NotificationType;
};

export const TableRow: React.FC<Props> = ({
  heading,
  description,
  notificationTypeSystem,
  notificationTypeEmail,
}) => {
  const [checkedSystem, setCheckedSystem] = useState(true);
  const [checkedEmail, setCheckedEmail] = useState(true);

  const dispatch = useAppDispatch();

  const { disabledNotificationTypes, isPending } = useAppSelector(
    (state: RootState) => state.notificationsSettings,
  );

  const loadNotificationsSettings = (
    generalNotificationType: GeneralNotificationType,
  ): void => {
    switch (generalNotificationType) {
      case GeneralNotificationType.SYSTEM: {
        const isNotificationSettingFound = disabledNotificationTypes.find(
          (item) => {
            return item === notificationTypeSystem;
          },
        );

        if (isNotificationSettingFound) {
          setCheckedSystem(false);

          return;
        }

        setCheckedSystem(true);

        break;
      }

      case GeneralNotificationType.EMAIL: {
        const isNotificationSettingFound = disabledNotificationTypes.find(
          (item) => {
            return item === notificationTypeEmail;
          },
        );

        if (isNotificationSettingFound) {
          setCheckedEmail(false);

          return;
        }

        setCheckedEmail(true);

        break;
      }
    }
  };

  useEffect(() => {
    loadNotificationsSettings(GeneralNotificationType.SYSTEM);
    loadNotificationsSettings(GeneralNotificationType.EMAIL);
  }, [disabledNotificationTypes]);

  const handleNotification = (
    e: React.ChangeEvent<HTMLInputElement>,
    generalNotificationType: GeneralNotificationType,
  ): void => {
    let isChecked;
    let type;

    switch (generalNotificationType) {
      case GeneralNotificationType.SYSTEM: {
        setCheckedSystem(!checkedSystem);

        isChecked = e.target.checked;
        type = e.target.name as NotificationType;

        break;
      }

      case GeneralNotificationType.EMAIL: {
        setCheckedEmail(!checkedEmail);

        isChecked = e.target.checked;
        type = e.target.name as NotificationType;

        break;
      }
    }

    if (type) {
      if (isChecked) {
        dispatch(notificationsSettingsActions.deleteNotificationSetting(type));
        return;
      }

      dispatch(notificationsSettingsActions.createNotificationSetting(type));
    }
  };

  const handleSystemNotification = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    handleNotification(e, GeneralNotificationType.SYSTEM);
  };

  const handleEmailNotification = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    handleNotification(e, GeneralNotificationType.EMAIL);
  };

  return (
    <tr>
      <td>
        <h3 className={getAllowedClasses(styles.heading)}>{heading}</h3>
        <span className={getAllowedClasses(styles.description)}>
          {description}
        </span>
      </td>
      <td>
        <Form.Check
          type="checkbox"
          id="default-checkbox"
          className={getAllowedClasses(styles.checkbox)}
          checked={checkedSystem}
          onChange={handleSystemNotification}
          name={notificationTypeSystem}
          disabled={isPending}
        />
      </td>
      <td>
        <Form.Check
          type="checkbox"
          id="default-checkbox"
          className={getAllowedClasses(styles.checkbox)}
          checked={checkedEmail}
          onChange={handleEmailNotification}
          name={notificationTypeEmail}
          disabled={isPending}
        />
      </td>
    </tr>
  );
};
