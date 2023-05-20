// check if string provided is special string or just english character or number
export const checkString = (string: string): boolean => {
  const pattern = new RegExp(/[A-Za-z0-9-]/);
  return pattern.test(string);
};
