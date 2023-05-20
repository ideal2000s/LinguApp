export const dateTimeSubtraction = (from: Date, to: Date = new Date()): number => {
  const fromInMilliseconds = from.getTime();
  const toInMilliseconds = to.getTime();

  return toInMilliseconds - fromInMilliseconds;
};
