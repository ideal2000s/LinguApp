import React, { FC } from 'react';

import LessonsCatalog from './LessonsCatalog';
import LessonsCatalogProvider from './LessonsCatalogProvider';

const LessonsCatalogContainer: FC = () => {
  return (
    <LessonsCatalogProvider>
      <LessonsCatalog />
    </LessonsCatalogProvider>
  );
};

export default LessonsCatalogContainer;
