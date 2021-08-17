import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  getNotifications,
  getNotificationsCount,
  updateRead,
  updateReadForAll,
} from '../../services/notification.service';

const router: Router = Router();

router.get(
  '/',
  run((req) => getNotifications(req.userId, req.query.limit, req.query.from)),
);

router.get(
  '/count',
  run((req) => getNotificationsCount(req.userId)),
);

router.put(
  '/:id',
  run((req) => updateRead(req.params.id, req.body)),
);

router.put(
  '/',
  run((req) => updateReadForAll(req.userId, req.body)),
);

export default router;
