const canvasToDataURL = (canvas: HTMLCanvasElement): string => {
  const imageDataURL = canvas.toDataURL('image/jpeg');
  return imageDataURL;
};

export { canvasToDataURL };
