import { ITaskSectionProgress } from 'students/models';

export const mockSectionData: ITaskSectionProgress = {
  title: 'test',
  progress: 50,
  tasks: [
    {
      id: 1,
      progress: 100,
      title: 'task1'
    },
    {
      id: 2,
      progress: 0,
      title: 'task2'
    }
  ]
};
