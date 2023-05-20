import Axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosPromise,
  AxiosResponse
} from 'axios';
import { API_URI } from 'students/constants';

type tCustomApiConfig = AxiosRequestConfig & { noUrlPrefix?: boolean };
export type tApiService = (url: string, opts?: tCustomApiConfig) => AxiosPromise<any>;

export default function apiServiceCreator({
  authFailureAction
}: {
  authFailureAction: (
    error: Pick<AxiosResponse, 'status' | 'statusText' | 'data'>
  ) => void;
}): tApiService {
  function apiService(url: string, opts?: tCustomApiConfig) {
    const options = {
      ...opts,
      headers: { 'X-INFLECT-WITH': 'camel', ...opts?.headers }
    };
    const finalUrl = opts?.noUrlPrefix ? url : `${API_URI}${url}`;
    return Axios({ url: finalUrl, ...options }).catch(function (error: AxiosError) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        const { status, statusText, data } = error.response;
        authFailureAction({ status, statusText, data });
      }
      throw error;
    });
  }

  return apiService;
}

export abstract class BaseApiService {
  constructor(protected apiService: tApiService) {}
}
