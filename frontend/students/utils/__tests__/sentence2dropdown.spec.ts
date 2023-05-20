import { sentence2dropdown } from '../';

describe('Sentence to Dropdown', () => {
  it('should return correct blocks and dropdown options', () => {
    const sentence = 'Lisa *select:wrote/written/writes* a letter to her friend.';

    expect(sentence2dropdown(sentence)).toEqual({
      blocks: ['Lisa ', ' a letter to her friend.'],
      options: [['wrote', 'written', 'writes']]
    });
  });
});
