import React from 'react';
import styled from 'styled-components';
import { customMediaQuery, SButton } from 'students/views/shared/styled';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';
import { Translate } from 'i18n';

interface IProps {
  isLoading: boolean;
  onClick: () => void;
  noMore?: boolean;
}
const ShowMoreButton: React.FC<IProps> = ({ onClick, noMore, isLoading }) => {
  return (
    <SShowMoreBlock>
      {noMore ? null : (
        <SShowMoreButton onClick={onClick} disabled={isLoading}>
          <Translate str="frontend.course.show_more" />{' '}
        </SShowMoreButton>
      )}
    </SShowMoreBlock>
  );
};

export default ShowMoreButton;

const SShowMoreBlock = styled.div`
  display: flex;
  justify-content: center;
`;

const SShowMoreButton = styled(SButton)`
  color: #00a5d7;
  border: 2px solid #00a5d7;
  border-radius: 10px;
  background: transparent;
  height: 44px;
  flex-grow: 1;

  ${styleInnerButton()} {
    padding: 16px 84px;
  }

  ${customMediaQuery('tablet')} {
    flex-grow: 0;
  }
`;
