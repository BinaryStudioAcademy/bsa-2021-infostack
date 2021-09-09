const getFormattedVersionDate = (createdAt: string): string => {
  const formattedDate = new Date(createdAt),
    year = formattedDate.getFullYear();
  let day = '' + formattedDate.getDate(),
    month = '' + (formattedDate.getMonth() + 1),
    hours = '' + formattedDate.getHours(),
    minutes = '' + formattedDate.getMinutes();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hours.length < 2) hours = '0' + hours;
  if (minutes.length < 2) minutes = '0' + minutes;

  const formedDate =
    [day, month, year].join('.') + ' at ' + [hours, minutes].join(':');

  return formedDate;
};

export { getFormattedVersionDate };
