// Strip html element from Quote data
export const sanitizeInput = (data): any => {
  const keys = data && Object.keys(data).length;

  if (keys) {
    Object.keys(data).map(k => {
      data[k] =
        typeof data[k] === 'string'
          ? data[k].replace(/(<([^>]+)>)/gi, '')
          : data[k];
    });
  }
  return data;
};
