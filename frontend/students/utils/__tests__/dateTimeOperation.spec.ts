import { dateTimeSubtraction } from '../';

describe('sentence2array', () => {
  it('should extract correct array of words', () => {
    const fromTime = new Date(2020, 1, 1);
    const toTime = new Date(2020, 1, 2);

    const timeDifference = dateTimeSubtraction(fromTime, toTime);

    expect(timeDifference).toEqual(24 * 60 * 60 * 1000);
  });
});
