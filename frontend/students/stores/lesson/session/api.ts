import { ILesson, ILessonSessionApiResponse } from 'students/models';
import { BaseApiService } from 'students/utils/apiService';

class LessonSessionApi extends BaseApiService {
  async fetchLessonSession(lessonId: ILesson['id']): Promise<ILessonSessionApiResponse> {
    const { data } = await this.apiService(`/lessons/${lessonId}/session`);

    return data;
  }

  async startLessonSession(lessonId: ILesson['id']): Promise<ILessonSessionApiResponse> {
    const { data } = await this.apiService(`/lessons/${lessonId}/session`, {
      method: 'POST',
      data: {}
    });

    return data;
  }
}

export default LessonSessionApi;
