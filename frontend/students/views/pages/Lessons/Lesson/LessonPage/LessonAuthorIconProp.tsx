import React from 'react';
import { Translate } from 'i18n';

import {
  SLessonAuthorIcon,
  SLessonAuthorImg,
  SLessonAuthorIconNum,
  SLessonAuthorIconDesc
} from './styled';

interface IProps {
  icon: string;
  localeTextKey?: string;
  value?: number | string;
}

const LessonAuthorIconProp: React.FC<IProps> = ({ icon, localeTextKey, value }) => {
  return (
    <SLessonAuthorIcon>
      <SLessonAuthorImg src={icon} alt="" />

      <SLessonAuthorIconNum>{value} </SLessonAuthorIconNum>

      {!!localeTextKey && (
        <SLessonAuthorIconDesc>
          <Translate str={localeTextKey} />
        </SLessonAuthorIconDesc>
      )}
    </SLessonAuthorIcon>
  );
};

export default LessonAuthorIconProp;
