import { useEffect } from 'react';
import { IProfile } from 'students/models';

import { FILTER_LANGUAGE, FILTER_LEVEL, FILTER_SUPPORT_LANGUAGE } from '../Config';

function useInitialFiltersState(userProfile: IProfile, fetchCatalog: () => void): void {
  useEffect(() => {
    if (userProfile) {
      const url = new URL(window.location.href);

      if (
        !url.searchParams.get(FILTER_LANGUAGE) &&
        userProfile.studentTargetLanguages.length
      ) {
        url.searchParams.append(
          FILTER_LANGUAGE,
          String(userProfile.studentTargetLanguages[0].languageId)
        );
      }

      if (
        !url.searchParams.get(FILTER_LEVEL) &&
        userProfile.studentTargetLanguages.length
      ) {
        url.searchParams.append(
          FILTER_LEVEL,
          String(userProfile.studentTargetLanguages[0].level)
        );
      }

      if (
        !url.searchParams.get(FILTER_SUPPORT_LANGUAGE) &&
        userProfile.studentSupportLanguages.length
      ) {
        userProfile.studentSupportLanguages.forEach((lang) => {
          url.searchParams.append(FILTER_SUPPORT_LANGUAGE, String(lang.languageId));
        });
      }

      window.history.pushState({}, '', url.toString());

      fetchCatalog();
    }
    // eslint-disable-next-line
  }, [userProfile]);
}

export default useInitialFiltersState;
