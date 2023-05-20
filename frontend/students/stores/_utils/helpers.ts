export function getLessonPathFromUrl(url: string, lessonId?: number | string): string {
  if (!lessonId) {
    const match = url.match(/^.*\/lessons(?:\/[1-9]\d*)?/);
    return match ? match[0] : '';
  }

  const lessonIdString = String(lessonId);
  const match = url.match(/^.*\/lessons/);
  let result = match ? match[0] : '';
  if (!isNaN(parseInt(lessonIdString))) {
    const replacer = lessonId === -1 ? '' : `/${lessonIdString}`;
    result += replacer;
  }
  return result;
}
