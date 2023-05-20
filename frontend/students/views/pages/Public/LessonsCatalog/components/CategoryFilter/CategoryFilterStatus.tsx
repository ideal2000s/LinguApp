import React, { useEffect, useState } from 'react';
import { Translate } from 'i18n';

import { FILTERS_CONFIG } from './Config';
import { FILTER_CATEGORY } from '../../Config';
import { useFilterEventListener } from '../../hooks';
import { getAllFilterConditions } from '../../helpers/filter';

const CategoryFilterStatus: React.FC = () => {
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    setValues(
      getAllFilterConditions(FILTER_CATEGORY).map(
        (item) =>
          FILTERS_CONFIG.find((category) => String(category.fields) === item)?.title || ''
      )
    );
  }, []);

  useFilterEventListener(FILTER_CATEGORY, ({ data }) => {
    setValues(
      data.map(
        (item) =>
          FILTERS_CONFIG.find((category) => String(category.fields) === item)?.title || ''
      )
    );
  });

  const render = () => {
    if (!values.length) {
      return <Translate str="frontend.course.category" />;
    }

    return <span>{values.join(', ')}</span>;
  };

  return render();
};

export default CategoryFilterStatus;
