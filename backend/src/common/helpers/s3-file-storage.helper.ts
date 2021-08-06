import fs from 'fs';
import S3 from 'aws-sdk/clients/s3';
import { env } from '../../env';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWSError } from 'aws-sdk/lib/error';

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
  try {
    return await s3.headObject(params).promise();
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteFile = async (
  fileName: string,
): Promise<PromiseResult<S3.DeleteObjectOutput, AWSError>> => {
  const params = { Bucket: bucketName, Key: fileName };
  try {
    return await s3.deleteObject(params).promise();
  } catch (err) {
    throw new Error(err);
  }
};

export const uploadFile = (
  file: Express.Multer.File,
): Promise<S3.ManagedUpload.SendData> => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    ACL: 'public-read',
  };

  return s3.upload(uploadParams).promise();
};
