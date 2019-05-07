export const objectMap = (object, keyName, valueName) => {
  let result = [];
  for(let i in object) {
    result.push({ [keyName]: i,  [valueName]: object[i] })
  }
  return result;
};
