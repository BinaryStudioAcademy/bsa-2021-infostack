const formattedVersionDate = (createdAt: string): string => {
  const formattedDate = new Date(createdAt),
    year = formattedDate.getFullYear();
  let day = '' + formattedDate.getDate(),
    month = '' + (formattedDate.getMonth() + 1);
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [day, month, year].join('.');
};

export { formattedVersionDate };
