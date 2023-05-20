import { BaseApiService } from 'students/utils/apiService';
import { ILanguage } from './';
class PreferencesApi extends BaseApiService {
  async getAllSupportedLanguages(): Promise<ILanguage[]> {
    const { data } = await this.apiService(`/languages`);

    return data;
  }

  async getAllTargetLanguages(): Promise<ILanguage[]> {
    const { data } = await this.apiService(`/languages/active`);

    return data;
  }
}
export default PreferencesApi;
