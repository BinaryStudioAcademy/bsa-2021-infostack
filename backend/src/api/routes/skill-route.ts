import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { getAllSkills, addNewSkill } from '../../services/skill.service';

const router: Router = Router();

router.get(
  '/',
  run(() => getAllSkills()),
);

router.post(
  '/',
  run((req) => addNewSkill(req.body.name)),
);

export default router;
