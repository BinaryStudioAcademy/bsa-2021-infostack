import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  getNotificationsSettings,
  createNotificationSettings,
  deleteNotificationSettings,
} from '../../services/notification-settings.service';

const router: Router = Router();

router.get(
  '/',
  run((req) => getNotificationsSettings(req.userId)),
);

router.post(
  '/',
  run((req) => createNotificationSettings(req.userId, req.body)),
);

router.delete(
  '/',
  run((req) => deleteNotificationSettings(req.userId, req.body)),
);

export default router;
