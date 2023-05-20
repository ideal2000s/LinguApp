import {
  IAssignmentTask,
  IDocumentApiRequest,
  IDocumentApiResponse
} from 'students/models';
import { BaseApiService } from 'students/utils/apiService';

class DocumentApi extends BaseApiService {
  async fetchDocument(
    lessonId: IAssignmentTask['lessonId'],
    taskId: IAssignmentTask['id']
  ): Promise<IDocumentApiResponse> {
    const { data } = await this.apiService(
      `/lessons/${lessonId}/tasks/${taskId}/document`
    );

    return data;
  }

  async createDocument(
    lessonId: IAssignmentTask['lessonId'],
    taskId: IAssignmentTask['id'],
    document: IDocumentApiRequest | FormData
  ): Promise<IDocumentApiResponse> {
    const { data } = await this.apiService(
      `/lessons/${lessonId}/tasks/${taskId}/document`,
      {
        method: 'POST',
        data: document instanceof FormData ? document : { document },
        headers: {
          'Content-Type':
            document instanceof FormData ? 'multipart/form-data' : 'application/json'
        }
      }
    );

    return data;
  }
}

export default DocumentApi;
