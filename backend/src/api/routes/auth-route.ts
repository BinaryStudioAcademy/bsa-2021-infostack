import { Router } from 'express';
import { login } from '../../services/user.service';

const router: Router = Router();

router
  .post('/', login);

export default router;
