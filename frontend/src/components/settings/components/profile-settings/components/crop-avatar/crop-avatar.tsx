import { useState } from 'hooks/hooks';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import styles from './styles.module.scss';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ICropData } from 'common/interfaces/components/crop-data';

interface IProps {
  isShown: boolean;
  src: string;
  imageName: string | undefined;
  handleClose: () => void;
  updateAvatar: (croppedImage: File) => void;
}

export const CropAvatar: React.FC<IProps> = ({
  isShown,
  src,
  imageName,
  handleClose,
  updateAvatar,
}) => {
  const [crop, setCrop] = useState<ReactCrop.Crop>({
    unit: '%',
    height: 100,
    aspect: 1,
  });
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [croppedAvatarLoading, setCroppedAvatarLoading] = useState(false);

  const onCropChange = (newCrop: ReactCrop.Crop): void => {
    setCrop(newCrop);
  };

  const onImageLoaded = (img: HTMLImageElement): void => {
    setImage(img);
  };

  const getCroppedImg = (
    img: HTMLImageElement,
    cropData: ICropData,
  ): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    canvas.width = cropData.width;
    canvas.height = cropData.height;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.drawImage(
      img,
      cropData.x * scaleX,
      cropData.y * scaleY,
      cropData.width * scaleX,
      cropData.height * scaleY,
      0,
      0,
      cropData.width,
      cropData.height,
    );

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        resolve(blob);
      }, 'image/jpeg');
    });
  };

  // const blobToFile = (croppedBlob: Blob, fileName: string): File => { ..croppedBlob, fileName: fileName, lastModified: new Date() }

  // const blobToFile = (croppedBlob: Blob, fileName: string): File => { retyrn
  //   let blob: File = croppedBlob;
  //   blob.name = fileName;
  //   blob.lastModifiedDate = new Date();

  //   //Cast to a File() type
  //   return <File>theBlob;
  // };

  const onSave = async (): Promise<void> => {
    try {
      setCroppedAvatarLoading(true);
      const croppedImage = await getCroppedImg(
        image as HTMLImageElement,
        crop as ICropData,
      );
      const newImageName = imageName + '_cropped';
      const croppedFile = new File([croppedImage], newImageName, {
        type: 'image/jpeg',
      });
      updateAvatar(croppedFile);
      // clearAvatarData();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      setCroppedAvatarLoading(false);
    }
  };

  return (
    <Modal
      className="d-flex align-items-center"
      dialogClassName="w-25 rounded"
      show={isShown}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className={styles.header}>
        <Modal.Title className="fs-6">Crop the avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.cropAvatar}>
        <div className={styles.imgWrp}>
          <ReactCrop
            src={src}
            onChange={onCropChange}
            crop={crop}
            keepSelection
            circularCrop
            minHeight={100}
            onImageLoaded={onImageLoaded}
            imageStyle={{ maxWidth: '460px', maxHeight: '460px' }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          // disabled={cancelButton.disabled}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={onSave}
          disabled={!image || croppedAvatarLoading}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
