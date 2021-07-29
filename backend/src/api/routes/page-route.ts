import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { authenticateToken } from '../middlewares/authorization-middleware';
import { createPage, createVersionPage, getPages, getPage } from '../../services/page.service'

const router: Router = Router();

router
  .post('/pages',
    run(req => {
      authenticateToken(req.headers);
      createPage(req);
    }));

router
  .post('/pages/:id/version',
    run(req => {
      authenticateToken(req.headers);
      createVersionPage(req);
    }));

router
  .get('/pages',
    run(req => {
      authenticateToken(req.headers);
      getPages(req);
    }));

router
  .get('/pages/:id',
    run(req => {
      authenticateToken(req.headers);
      getPage(req);
    }));

export default router;
