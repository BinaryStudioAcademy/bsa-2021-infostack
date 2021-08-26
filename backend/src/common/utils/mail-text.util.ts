const getSubjectPRMerged = (): string => {
  return 'A pull request was merged';
};

const getTextPRMerged = (url: string): string => {
  return `
  Hello,

  A page you are following has such tags as merged pull request. Maybe you should update the page.

  ${url}`;
};

const getBodyPRMerged = (): string => {
  return 'Maybe you should update the page';
};

export { getSubjectPRMerged, getTextPRMerged, getBodyPRMerged };
