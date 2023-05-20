import camelCase from 'lodash/camelCase';

type tOptions = {
  keysMap?: {
    [key: string]: string;
  };
};

const defaultOptions = {};

const camelizeKeys = <T extends Record<string, any>>(
  object: T,
  options: tOptions = defaultOptions
): T | T[] | null => {
  if (!object) return null;

  const { keysMap } = options;

  if (Array.isArray(object)) {
    return object.map((v) => camelizeKeys(v, options));
  } else if (object.constructor === Object) {
    return Object.keys(object).reduce((result, key) => {
      const calculatedKey = keysMap && keysMap[key] ? keysMap[key] : camelCase(key);

      return {
        ...result,
        [calculatedKey]: camelizeKeys(object[key], options)
      } as T;
    }, {}) as T;
  }

  return object;
};

export default camelizeKeys;
