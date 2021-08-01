import fs from 'fs';
import S3 from 'aws-sdk/clients/s3';
import { getOsEnv } from './path.helper';

class S3FileStorage {
  _s3: S3;

  constructor() {
    const accessKeyId = getOsEnv('AWS_ACCESS_KEY');
    const secretAccessKey = getOsEnv('AWS_SECRET_KEY');
    this._s3 = new S3({ accessKeyId, secretAccessKey });
  }

  uploadFile(file: Express.Multer.File): any {
    const fileStream = fs.createReadStream(file.path);
    const bucketName = getOsEnv('AWS_BUCKET_NAME');
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename,
      ACL: 'public-read',
    };

    return this._s3.upload(uploadParams).promise();
  }
}

export { S3FileStorage };
