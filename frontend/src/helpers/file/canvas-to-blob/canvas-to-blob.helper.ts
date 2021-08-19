const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
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

export { canvasToBlob };
