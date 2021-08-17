import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  getNotifications,
  getNotificationsCount,
} from '../../services/notification.service';

const router: Router = Router();

router.get(
  '/',
  run((req) => getNotifications(req.userId)),
);

router.get(
  '/count',
  run((req) => getNotificationsCount(req.userId)),
);

export default router;
