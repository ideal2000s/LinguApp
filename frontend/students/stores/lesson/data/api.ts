import { ILesson, ILessonApiResponse } from 'students/models';
import { BaseApiService } from 'students/utils/apiService';

class LessonApi extends BaseApiService {
  async fetchLesson(lessonId: ILesson['id']): Promise<ILessonApiResponse> {
    const { data } = await this.apiService(`/lessons/${lessonId}`);

    return data;
  }

  async followTeam(teamId: number): Promise<void> {
    this.apiService(`/teams/${teamId}/follow`, {
      method: 'PATCH'
    });
  }

  async unfollowTeam(teamId: number): Promise<void> {
    this.apiService(`/teams/${teamId}/unfollow`, {
      method: 'PATCH'
    });
  }
}

export default LessonApi;
