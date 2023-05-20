import { Preferences } from '../models';

export const getPreference = (
  key: Preferences,
  def: string | number | boolean
): string => {
  try {
    return localStorage.getItem(key) || def.toString();
  } catch {
    return def.toString();
  }
};

export const setPreference = (
  key: Preferences,
  value: string | number | boolean
): string => {
  try {
    localStorage.setItem(key, value.toString());
  } catch {
    // do nothing
  }

  return value.toString();
};
