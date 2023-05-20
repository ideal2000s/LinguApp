import { useLocation } from 'react-router-dom';
import { getLessonPathFromUrl } from 'students/stores/_utils/helpers';

export default function useLessonTaskPath(): string {
  const { pathname } = useLocation();
  const lessonPath = getLessonPathFromUrl(pathname);
  return lessonPath + '/tasks/';
}
