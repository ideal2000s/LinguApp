import Axios, { AxiosError, CancelTokenSource } from 'axios';
import {
  ILessonsCatalogApiResponse,
  ICoursesCatalogApiResponse,
  ISkillResponse,
  ICoursesCatalog,
  ILessonsCatalog
} from 'students/models';
import { BaseApiService } from 'students/utils/apiService';

const LESSONS_PER_PAGE = '20';
const COURSES_PER_PAGE = '4';
const CancelToken = Axios.CancelToken;

let lessonCatalogCancelToken: CancelTokenSource;
let courseCatalogCancelToken: CancelTokenSource;

class LessonsCatalogApi extends BaseApiService {
  async fetchCoursesCatalog(
    filterUrlString: string,
    page?: ICoursesCatalog['nextPage']
  ): Promise<ICoursesCatalogApiResponse> {
    if (courseCatalogCancelToken !== undefined) {
      courseCatalogCancelToken.cancel(
        'Fetching course catalog canceled due to a new request'
      );
    }

    courseCatalogCancelToken = CancelToken.source();

    const searchParams = new URLSearchParams(filterUrlString);
    if (page !== null && page !== undefined) {
      searchParams.append('page', page.toString());
    }
    searchParams.append('per_page', COURSES_PER_PAGE);

    const { data } = await this.apiService('/courses', {
      params: searchParams,
      cancelToken: courseCatalogCancelToken.token
    }).catch((error: AxiosError) => {
      if (Axios.isCancel(error)) {
        console.warn(error.message);
      }

      return { data: null };
    });

    return { coursesCatalog: data };
  }

  async fetchLessonsCatalog(
    filterUrlString: string,
    page?: ILessonsCatalog['nextPage']
  ): Promise<ILessonsCatalogApiResponse> {
    if (lessonCatalogCancelToken !== undefined) {
      lessonCatalogCancelToken.cancel(
        'Fetching lesson catalog canceled due to a new request'
      );
    }

    lessonCatalogCancelToken = CancelToken.source();

    const searchParams = new URLSearchParams(filterUrlString);

    if (page !== null && page !== undefined) {
      searchParams.append('page', page.toString());
    }
    searchParams.append('per_page', LESSONS_PER_PAGE);

    const { data } = await this.apiService('/lessons', {
      params: searchParams,
      cancelToken: lessonCatalogCancelToken.token
    }).catch((error: AxiosError) => {
      if (Axios.isCancel(error)) {
        console.warn(error.message);
      }

      return { data: null };
    });

    return { lessonsCatalog: data };
  }

  async fetchSkills(): Promise<ISkillResponse> {
    const { data } = await this.apiService(`/skills`);

    return data;
  }
}

export default LessonsCatalogApi;
