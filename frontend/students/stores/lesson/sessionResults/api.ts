import { BaseApiService } from 'students/utils/apiService';
import { ITaskResultsResponse } from 'students/models/lessonTasks/results';

class LessonSessionResultsApi extends BaseApiService {
  async fetchLessonSessionResults(sessionId: number): Promise<ITaskResultsResponse> {
    const { data } = await this.apiService(`/lesson_sessions/${sessionId}/results`);

    return data;
  }
}

export default LessonSessionResultsApi;
