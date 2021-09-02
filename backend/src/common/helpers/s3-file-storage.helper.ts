import fs from 'fs';
import S3 from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWSError } from 'aws-sdk/lib/error';
import { env } from '../../env';
import mime from 'mime-types';

const accessKeyId = env.s3.accessKeyId;
const secretAccessKey = env.s3.secretAccessKey;
const bucketName = env.s3.bucketName;

const s3 = new S3({
  accessKeyId,
  secretAccessKey,
});

export const isFileExists = async (
  fileName: string,
): Promise<PromiseResult<S3.HeadObjectOutput, AWSError>> => {
  const params = { Bucket: bucketName, Key: fileName };
  return s3.headObject(params).promise();
};

export const deleteFile = async (
  fileName: string,
): Promise<PromiseResult<S3.DeleteObjectOutput, AWSError>> => {
  const params = { Bucket: bucketName, Key: fileName };
  return s3.deleteObject(params).promise();
};

export const uploadFile = (
  file: Express.Multer.File,
): Promise<S3.ManagedUpload.SendData> => {
  const fileStream = fs.createReadStream(file.path);

  const type = mime.contentType(file.path) as string;

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    ACL: 'public-read',
    ContentType: type,
  };
  return s3.upload(uploadParams).promise();
};
