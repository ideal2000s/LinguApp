import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Translate } from 'i18n';
import { userSelectors } from 'students/stores/user';
import { useFilterEventListener } from '../../hooks';

import { FILTER_SUPPORT_LANGUAGE } from '../../Config';
import { getAllFilterConditions } from '../../helpers/filter';

const SupportLanguageFilterStatus: React.FC = () => {
  const [values, setValues] = useState<string[]>([]);
  const languages = useSelector(userSelectors.selectSortedAllLangs);

  useEffect(() => {
    if (languages.length) {
      setValues(
        getAllFilterConditions(FILTER_SUPPORT_LANGUAGE).map((item) => {
          return languages.find((lang) => String(lang.id) === item)?.systemName || '';
        })
      );
    }
  }, [languages]);

  useFilterEventListener(FILTER_SUPPORT_LANGUAGE, ({ data }) => {
    setValues(
      data.map((item) => {
        return languages.find((lang) => String(lang.id) === item)?.systemName || '';
      })
    );
  });

  const render = () => {
    if (!values.length) {
      return <Translate str="frontend.course.i_understand" />;
    }

    return <span>{values.join(', ')}</span>;
  };

  return render();
};

export default SupportLanguageFilterStatus;
