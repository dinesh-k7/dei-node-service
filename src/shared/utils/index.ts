// Strip html element from Quote data
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const sanitizeInput = (data: any): any => {
  const keys = data && Object.keys(data).length;

  if (keys) {
    Object.keys(data).forEach(k => {
      data[k] =
        typeof data[k] === 'string'
          ? data[k].replace(/(<([^>]+)>)/gi, '')
          : data[k];
    });
  }
  return data;
};
