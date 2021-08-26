import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  getAllLinksByUserAndPage,
  extendExpirationDate,
  deactivateLinkById,
} from '../../services/link.service';

const router: Router = Router();

router.get(
  '/page/:pageId/user/:userId',
  run((req) => getAllLinksByUserAndPage(req.params.userId, req.params.pageId)),
);

router.put(
  '/:id',
  run((req) => extendExpirationDate(req.params.id, req.body)),
);

router.delete(
  '/:id',
  run((req) => deactivateLinkById(req.params.id)),
);

export default router;
