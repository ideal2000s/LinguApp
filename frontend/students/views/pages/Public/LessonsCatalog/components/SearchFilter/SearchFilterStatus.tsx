import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Translate } from 'i18n';

import { FILTER_SEARCH } from '../../Config';
import { useFilterEventListener } from '../../hooks';
import { getAllFilterConditions } from '../../helpers/filter';

const SearchFilterStatus: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(getAllFilterConditions(FILTER_SEARCH)[0]);
  }, []);

  useFilterEventListener(FILTER_SEARCH, ({ data }) => {
    setValue(data[0]);
  });

  const render = () => {
    if (!value) {
      return <Translate str="frontend.course.search" />;
    }

    return <SStatus>{value}</SStatus>;
  };

  return render();
};

export default SearchFilterStatus;

const SStatus = styled.span`
  color: #2d2d3a;
`;
