export const getElement = (meta) => {
  return {};
};

export const createElementId = (prefix="", length=8) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return prefix+result;
};

/**
 * My Billiion dollar Code...
 */
export const evaluateCellTemplate = new Function('row', 'template', `
  const evaluate = new Function('row', template);
  return evaluate(row);
`); /*eslint no-new-func: */
