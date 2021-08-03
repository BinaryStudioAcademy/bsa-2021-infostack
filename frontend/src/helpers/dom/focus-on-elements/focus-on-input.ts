const focusOnInput = (element: HTMLInputElement | null): void => {
  if (element) {
    element.focus();
  }
};

export { focusOnInput };
