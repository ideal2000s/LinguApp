import { sentence2array } from '../';

describe('sentence2array', () => {
  it('should extract correct array of words', () => {
    const sentence = 'This is my first self-assesment test.';
    const result = sentence2array(sentence);
    expect(result).toEqual([
      {
        word: 'This',
        disabled: false
      },
      {
        word: ' ',
        disabled: true
      },
      {
        word: 'is',
        disabled: false
      },
      {
        word: ' ',
        disabled: true
      },
      {
        word: 'my',
        disabled: false
      },
      {
        word: ' ',
        disabled: true
      },
      {
        word: 'first',
        disabled: false
      },
      {
        word: ' ',
        disabled: true
      },
      {
        word: 'self-assesment',
        disabled: false
      },
      {
        word: ' ',
        disabled: true
      },
      {
        word: 'test',
        disabled: false
      },
      {
        word: '.',
        disabled: true
      }
    ]);
  });
});
