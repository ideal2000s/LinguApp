import React from 'react';
import cn from 'classnames';
import styled, { StyledComponent } from 'styled-components';
import { SPageContainer, SPage } from 'students/views/shared/styled';

export const PLAY_PAGE_DEFAULT_COLOR = '#4f398e';

export interface IPlayPage {
  className?: string;
  backgroundComponent?: StyledComponent<'div', any, any, never>;
}

const PlayPage: React.FC<IPlayPage> = ({ children, className, backgroundComponent }) => {
  const BackgroundComponent = backgroundComponent || defaultDiv;

  return (
    <SPage className={cn(className)}>
      <BackgroundComponent className="d-flex flex-column flex-grow-1">
        <SPageContainer>{children}</SPageContainer>
      </BackgroundComponent>
    </SPage>
  );
};

const defaultDiv = styled.div`
  background-color: ${PLAY_PAGE_DEFAULT_COLOR};
`;

export default PlayPage;
