import { tLessonTask, ILesson, ILessonTaskApiResponse } from 'students/models';
// import { Answer } from 'students/models';
import { BaseApiService } from 'students/utils/apiService';

class LessonTaskApi extends BaseApiService {
  async fetchLessonTask(
    lessonId: ILesson['id'],
    taskId: tLessonTask['id']
  ): Promise<ILessonTaskApiResponse> {
    const { data } = await this.apiService(`/lessons/${lessonId}/tasks/${taskId}`);
    return data;
  }
}

export default LessonTaskApi;
