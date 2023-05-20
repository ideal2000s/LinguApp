export { default, preferencesActions } from './slice';

export interface ILanguage {
  active: boolean;
  code: string;
  id: number;
  support: boolean;
  systemName: string;
}

export interface IPreferences {
  allLangs: ILanguage[];
  targetLangs: ILanguage[];
}
