import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Translate } from 'i18n';
import { userSelectors } from 'students/stores/user';
import { useFilterEventListener } from '../../hooks';

import { FILTER_LANGUAGE } from '../../Config';
import { getAllFilterConditions } from '../../helpers/filter';

const LanguageFilterStatus: React.FC = () => {
  const [values, setValues] = useState<string[]>([]);
  const languages = useSelector(userSelectors.selectSortedTargetLangs);

  useEffect(() => {
    if (languages.length) {
      setValues(
        getAllFilterConditions(FILTER_LANGUAGE).map((item) => {
          return languages.find((lang) => String(lang.id) === item)?.systemName || '';
        })
      );
    }
  }, [languages]);

  useFilterEventListener(FILTER_LANGUAGE, ({ data }) => {
    setValues(
      data.map((item) => {
        return languages.find((lang) => String(lang.id) === item)?.systemName || '';
      })
    );
  });

  const render = () => {
    if (!values.length) {
      return <Translate str="frontend.course.i_want_to_learn" />;
    }

    return <span>{values.join(', ')}</span>;
  };

  return render();
};

export default LanguageFilterStatus;
