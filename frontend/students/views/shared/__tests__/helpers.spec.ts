import { getLessonPathFromUrl } from '../helpers';

describe('getLessonPathFromUrl', () => {
  describe('lesson show url', () => {
    it('returns same lesson url if no lesson ID passed', () => {
      const url = 'https://lingu.com/lessons/123123';
      expect(getLessonPathFromUrl(url)).toBe(url);
    });

    it('returns same url with number lesson ID', () => {
      const url = 'https://lingu.com/lessons/123123';
      const lessonId = 123123;
      expect(getLessonPathFromUrl(url, lessonId)).toBe(url);
    });

    it('returns lesson url with another number lesson ID', () => {
      const url = 'https://lingu.com/lessons/123123';
      const lessonId = 456;
      const expectation = 'https://lingu.com/lessons/456';
      expect(getLessonPathFromUrl(url, lessonId)).toBe(expectation);
    });

    it('returns same url with string lesson ID', () => {
      const url = 'https://lingu.com/lessons/123123';
      const lessonId = '123123';
      expect(getLessonPathFromUrl(url, lessonId)).toBe(url);
    });

    it('returns lesson url with another string lesson ID', () => {
      const url = 'https://lingu.com/lessons/123123';
      const lessonId = '456';
      const expectation = 'https://lingu.com/lessons/456';
      expect(getLessonPathFromUrl(url, lessonId)).toBe(expectation);
    });
  });

  describe('lesson member sub-url', () => {
    it('returns same lesson url if no lesson ID passed', () => {
      const url = 'https://lingu.com/lessons/123123/phrases';
      const expectation = 'https://lingu.com/lessons/123123';
      expect(getLessonPathFromUrl(url)).toBe(expectation);
    });
    it('returns same url with number lesson ID', () => {
      const url = 'https://lingu.com/lessons/123123/phrases';
      const expectation = 'https://lingu.com/lessons/123321';
      const lessonId = 123321;
      expect(getLessonPathFromUrl(url, lessonId)).toBe(expectation);
    });

    it('returns same url with string lesson ID', () => {
      const url = 'https://lingu.com/lessons/123123/phrases';
      const expectation = 'https://lingu.com/lessons/123321';
      const lessonId = '123321';
      expect(getLessonPathFromUrl(url, lessonId)).toBe(expectation);
    });
  });

  describe('lesson with bad ID', () => {
    it('returns lessons root url', () => {
      const url = 'https://lingu.com/lessons/bad';
      const expectation = 'https://lingu.com/lessons';
      expect(getLessonPathFromUrl(url)).toBe(expectation);
    });

    it('returns lessons root url', () => {
      const url = 'https://lingu.com/lessons/0123456';
      const expectation = 'https://lingu.com/lessons';
      expect(getLessonPathFromUrl(url)).toBe(expectation);
    });

    it('returns lessons root url', () => {
      const url = 'https://lingu.com/lessons/0123456';
      const lessonId = 234;
      const expectation = 'https://lingu.com/lessons/234';
      expect(getLessonPathFromUrl(url, lessonId)).toBe(expectation);
    });

    it('returns same root url when bad ID passed', () => {
      const url = 'https://lingu.com/lessons/wrong';
      const lessonId = 'bad';
      const expectation = 'https://lingu.com/lessons';
      expect(getLessonPathFromUrl(url, lessonId)).toBe(expectation);
    });

    it('returns same root url when -1 ID passed', () => {
      const url = 'https://lingu.com/lessons/wrong';
      const lessonId = -1;
      const expectation = 'https://lingu.com/lessons';
      expect(getLessonPathFromUrl(url, lessonId)).toBe(expectation);
    });

    it('returns same lessons url with passed lesson ID', () => {
      const url = 'https://lingu.com/lessons/wrong';
      const lessonId = 123;
      const expectation = 'https://lingu.com/lessons/123';
      expect(getLessonPathFromUrl(url, lessonId)).toBe(expectation);
    });
  });
});
