/* eslint-disable import/prefer-default-export */
export const findAttributeInEvent = (event, attr) => {
  const end = event.currentTarget;

  let temp = event.target;
  let dataId = temp.getAttribute(attr);

  while (temp !== end && !dataId) {
    temp = temp.parentElement;
    if (temp === null) {
      break;
    }
    dataId = temp.getAttribute(attr);
  }
  return dataId;
};
