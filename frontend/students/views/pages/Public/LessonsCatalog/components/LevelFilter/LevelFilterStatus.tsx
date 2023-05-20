import React, { useCallback, useEffect, useState } from 'react';
import { Translate } from 'i18n';

import { FILTERS_CONFIG } from './Config';
import { FILTER_LEVEL } from '../../Config';
import { useFilterEventListener } from '../../hooks';
import { getAllFilterConditions } from '../../helpers/filter';

const LevelFilterStatus: React.FC = () => {
  const [values, setValues] = useState<string[]>([]);

  const toStringValue = useCallback(() => {
    return getAllFilterConditions(FILTER_LEVEL)
      .sort()
      .map((item) => {
        const status = FILTERS_CONFIG.longList.filter(
          (level) => String(level.fields) === item
        )[0].prefix;

        return status.charAt(0).toUpperCase() + status.slice(1);
      });
  }, []);

  useEffect(() => {
    setValues(toStringValue());
  }, [toStringValue]);

  useFilterEventListener(FILTER_LEVEL, () => {
    setValues(toStringValue());
  });

  const render = () => {
    if (!values.length) {
      return <Translate str="frontend.course.level" />;
    }

    return <span>{values.join(', ')}</span>;
  };

  return render();
};

export default LevelFilterStatus;
