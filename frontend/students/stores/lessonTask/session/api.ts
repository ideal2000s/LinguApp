import {
  tLessonTask,
  ILesson,
  ILessonSession,
  ITaskSessionApiResponse,
  ITaskSession,
  tAnswer,
  ITaskSessionAnswerRequest
} from 'students/models';
import { BaseApiService } from 'students/utils/apiService';

class LessonTaskApi extends BaseApiService {
  async fetchTaskSession(
    lessonId: ILesson['id'],
    taskId: tLessonTask['id']
  ): Promise<ITaskSessionApiResponse> {
    const { data } = await this.apiService(
      `/lessons/${lessonId}/tasks/${taskId}/session`
    );
    return data;
  }

  async completeLessonTask(
    lessonSessionId: ILessonSession['id'],
    taskSessionId: ITaskSession['id']
  ): Promise<ITaskSessionApiResponse> {
    const { data } = await this.apiService(
      `/lesson_sessions/${lessonSessionId}/task_sessions/${taskSessionId}/complete`,
      {
        method: 'POST'
      }
    );

    return data;
  }

  async nextLessonTaskSession(
    lessonSessionId: ILessonSession['id']
  ): Promise<ITaskSessionApiResponse> {
    const { data } = await this.apiService(
      `/lesson_sessions/${lessonSessionId}/task_sessions/next`,
      {
        method: 'POST'
      }
    );
    return data;
  }

  async submitAnswersLessonTask(
    taskSessionUrl: string,
    answer: tAnswer
  ): Promise<unknown> {
    const body: ITaskSessionAnswerRequest = { answer };
    const { data } = await this.apiService(`${taskSessionUrl}/answer`, {
      method: 'PUT',
      data: body,
      noUrlPrefix: true
    });
    return data;
  }

  async heartBeat(taskSessionUrl: string): Promise<void> {
    await this.apiService(`${taskSessionUrl}/heartbeat`, {
      method: 'PUT',
      noUrlPrefix: true
    });
  }
}

export default LessonTaskApi;
