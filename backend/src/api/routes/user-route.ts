import { Request, Router } from 'express';
import { Response } from 'express';
import { User } from '../../data/entities/user';
import { s3fileStorage } from '../../common/helpers/s3-file-storage.helper';
import { multerHelper } from '../../common/helpers/multer.helper';

const router: Router = Router();

router.get('/:id/profile', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findOneOrFail({ id });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({ error: err });
  }
});

router.put('/:id/profile', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { fullName } = req.body;
    const user = await User.findOneOrFail({ id });
    user.fullName = fullName || user.fullName;
    await user.save();
    return res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.put(
  '/:id/avatar',
  multerHelper.upload().single('image'),
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const file = req.file;
      const uploadedFile = await s3fileStorage.uploadFile(file);
      multerHelper.unlinkFile(file.path);
      const { Location } = uploadedFile;
      const user = await User.findOneOrFail({ id });
      user.avatar = Location || user.avatar;
      await user.save();
      return res.status(200).json({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
      });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
);

export default router;
