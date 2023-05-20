import { checkString } from '../checkString';

describe('Utils functions test', () => {
  it('should detect if it is special character or not exactly', () => {
    const string1 = 'Test';
    expect(checkString(string1)).toEqual(true);
  });
});
