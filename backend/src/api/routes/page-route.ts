import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
// import { authenticateToken } from '../middlewares/authorization-middleware';
import { createPage, createVersionPage, getPages, getPage } from '../../services/page.service';

const router: Router = Router();

router
  .post('/',
    run(req => {
      // authenticateToken(req.headers);
      return createPage(req);
    }));

router
  .post('/:id/version',
    run(req => {
      // authenticateToken(req.headers);
      return createVersionPage(req);
    }));

router
  .get('/',
    run(req => {
      // authenticateToken(req.headers);
      return getPages(req);
    }));

router
  .get('/:id',
    run(req => {
      // authenticateToken(req.headers);
      return getPage(req);
    }));

export default router;
