import multer from 'multer';
import { Request } from 'express';
import path from 'path';
import util from 'util';
import fs from 'fs';

class Multer {
  upload(): any {
    const fileFilter = this.fileFilter;
    const storage = multer.diskStorage({
      destination: function (_req, _file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, req.params.id + path.extname(file.originalname));
      },
    });
    return multer({ fileFilter, storage });
  }

  unlinkFile(filePath: string): any {
    return util.promisify(fs.unlink)(filePath);
  }

  private fileFilter(
    _req: Request,
    file: Express.Multer.File,
    cb: (arg0: Error, arg1: boolean) => void,
  ): void {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/gif'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only jpeg, png and gif allowed'), false);
    }
  }
}

export { Multer };
