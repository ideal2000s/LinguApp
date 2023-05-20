import {
  ICourseDetails,
  ICourseApiResponse,
  ICourseDetailsReviewsApiResponse
} from 'students/models';
import { BaseApiService } from 'students/utils/apiService';

class CourseApi extends BaseApiService {
  async fetchCourse(courseSlug: ICourseDetails['slug']): Promise<ICourseApiResponse> {
    const { data } = await this.apiService(`/courses/${courseSlug}`);

    return data;
  }

  async fetchCourseReviews(
    courseSlug: ICourseDetails['slug']
  ): Promise<ICourseDetailsReviewsApiResponse> {
    const { data } = await this.apiService(`/courses/${courseSlug}/reviews`);

    return data;
  }
}

export default CourseApi;
