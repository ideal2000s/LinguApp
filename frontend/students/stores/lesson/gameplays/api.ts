import {
  ILesson,
  ILessonGameplaysApiResponse,
  IGameplay,
  IGameplayParams
} from 'students/models';
import { BaseApiService } from 'students/utils/apiService';

class GameplaysApi extends BaseApiService {
  async fetchCreateGameplay(
    lessonId: ILesson['id']
  ): Promise<ILessonGameplaysApiResponse> {
    const { data } = await this.apiService(`/lessons/${lessonId}/gameplays`, {
      method: 'POST'
    });

    return data;
  }

  async fetchPlayStudentWord(wordId: number, solved: boolean): Promise<void> {
    await this.apiService(`/words/${wordId}/student_words/play`, {
      method: 'POST',
      data: { solved }
    });
  }

  async fetchFinishGameplay(
    lessonId: ILesson['id'],
    gameplayId: IGameplay['id'],
    gameplay: IGameplayParams
  ): Promise<void> {
    await this.apiService(`/lessons/${lessonId}/gameplays/${gameplayId}/finish`, {
      method: 'PUT',
      data: { gameplay }
    });
  }
}

export default GameplaysApi;
