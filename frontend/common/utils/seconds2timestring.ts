export const seconds2timestring = (seconds: number, ceilSeconds?: boolean): string => {
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${Math[ceilSeconds ? 'ceil' : 'floor'](seconds % 60)
    .toString()
    .padStart(2, '0')}`;
};
