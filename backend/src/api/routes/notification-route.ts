import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { getNotifications } from '../../services/notification.service';

const router: Router = Router();

router.get(
  '/',
  run((req) => getNotifications(req.userId)),
);

export default router;
