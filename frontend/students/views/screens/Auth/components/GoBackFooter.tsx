import React, { FC, useMemo } from 'react';
import { Translate } from 'i18n';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import ArrowIcon from 'students/views/shared/assets/icons/back_arrow_icon.svg';

import { SFooter, SFooterButton } from '../styled';

interface IGoBackFooter {
  isFaded?: boolean;
  str: string;
  onChangeVariant: () => void;
}

const GoBackFooter: FC<IGoBackFooter> = ({ isFaded = false, str, onChangeVariant }) => {
  const color = useMemo(() => (isFaded ? '#A7AAB6' : '#5e5d71'), [isFaded]);

  return (
    <SFooter>
      <SFooterButton variant="link" onClick={onChangeVariant} color={color}>
        <UrlIcon url={ArrowIcon} color={color} height="1rem" width="1rem" />

        <Translate str={str} />
      </SFooterButton>
    </SFooter>
  );
};

export default GoBackFooter;
