import useLessonTaskPath from './hooks/useLessonTaskPath';
import useProgressValue from './hooks/useProgressValue';
import { ITaskSectionProgress, tSectionType } from 'students/models';

interface IReturnedObject {
  taskPath: string;
  progress: number;
}

export default function useTaskProgressCollapse(
  sectionTasks?: ITaskSectionProgress<tSectionType>['tasks']
): IReturnedObject {
  const taskPath = useLessonTaskPath();
  const progress = useProgressValue(sectionTasks);

  return { taskPath, progress };
}
