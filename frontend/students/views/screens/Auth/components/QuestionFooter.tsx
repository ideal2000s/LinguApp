import React from 'react';
import { Button } from 'react-bootstrap';
import { Translate } from 'i18n';

import { SFooter, SFaddedText } from '../styled';
import { getTextForVariant } from '../helpers';

interface IProps {
  onActionClick: () => void;
}
const QuestionFooter: React.FC<IProps> = ({ onActionClick }) => {
  const { footer, footerQuestion } = getTextForVariant(false);

  return (
    <SFooter>
      <SFaddedText>
        <Translate str={footerQuestion} />
      </SFaddedText>
      <Button variant="link" onClick={onActionClick} className="font-weight-bold">
        <Translate str={footer} />
      </Button>
    </SFooter>
  );
};

export default QuestionFooter;
