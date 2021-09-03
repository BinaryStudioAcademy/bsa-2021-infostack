import multer, { Multer } from 'multer';
import { Request } from 'express';
import path from 'path';
import util from 'util';
import fs from 'fs';

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: (err: Error, result: boolean) => void,
): void => {
  if (
    [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'audio/webm',
    ].includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only jpg, png and gif allowed'), false);
  }
};

export const upload = (): Multer => {
  const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      const dirPath = './uploads/';

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }

      cb(null, dirPath);
    },
    filename: function (req, file, cb) {
      const fileName =
        req.params.id + '.' + Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    },
  });
  return multer({ fileFilter, storage });
};

export const unlinkFile = (filePath: string): Promise<void> => {
  return util.promisify(fs.unlink)(filePath);
};
