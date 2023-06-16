export const filterKeys = (
  object: Record<string, any>,
  acceptedKeys: readonly string[],
) =>
  Object.keys(object)
    .filter((key) => acceptedKeys.includes(key))
    .reduce((obj: Record<string, any>, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
