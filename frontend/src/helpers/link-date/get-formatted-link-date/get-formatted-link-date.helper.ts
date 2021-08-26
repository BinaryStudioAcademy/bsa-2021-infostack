const getFormattedLinkDate = (createdAt: string): string => {
  const formattedDate = new Date(createdAt),
    year = formattedDate.getFullYear();
  let day = '' + formattedDate.getDate(),
    month = '' + (formattedDate.getMonth() + 1);
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  const baseDate = [day, month, year].join('.');
  let hour = '' + formattedDate.getHours();
  if (hour.length < 2) hour = '0' + hour;
  let min = '' + formattedDate.getMinutes();
  if (min.length < 2) min = '0' + min;
  return `${baseDate} ${hour}:${min}`;
};

export { getFormattedLinkDate };
