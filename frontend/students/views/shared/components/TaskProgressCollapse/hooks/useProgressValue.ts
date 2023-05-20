import reduce from 'lodash/reduce';
import { useMemo } from 'react';
import { ITaskSectionProgress, tSectionType } from 'students/models';

export default function useProgressValue(
  sectionTasks?: ITaskSectionProgress<tSectionType>['tasks']
): number {
  const progress = useMemo(() => {
    if (!sectionTasks || sectionTasks.length === 0) return 0;
    const sectionTasksLength = sectionTasks.length;
    const progressSum =
      reduce(sectionTasks, (sum, task) => sum + task.progress, 0) / sectionTasksLength;
    return Math.floor(progressSum);
  }, [sectionTasks]);

  return progress;
}
