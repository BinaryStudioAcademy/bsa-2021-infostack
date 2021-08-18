const canvasToDataURL = (canvas: HTMLCanvasElement): string => {
  const croppedImageDataURL = canvas.toDataURL('image/jpeg');
  return croppedImageDataURL;
};

export { canvasToDataURL };
