import { ILesson, ILessonPhrasesApiResponse } from 'students/models';
import { BaseApiService } from 'students/utils/apiService';

class LessonPhrasesApi extends BaseApiService {
  async fetchLessonPhrases(lessonId: ILesson['id']): Promise<ILessonPhrasesApiResponse> {
    const { data } = await this.apiService(`/lessons/${lessonId}/phrases`);

    return data;
  }
}

export default LessonPhrasesApi;
