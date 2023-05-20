import React from 'react';
import styled from 'styled-components';
import { Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Page from '../Page';
import character404 from 'students/views/shared/assets/character-404.svg';
import { Translate } from 'i18n';

const Page404: React.FC = () => {
  return (
    <Page background="#f3f3f8">
      <S404Page>
        <SImageBlock>
          <Image src={character404} />
        </SImageBlock>
        <SH1>
          <Translate str="frontend.page404.ooops" />
        </SH1>
        <p>
          <Translate str="frontend.page404.sorry_message" />
        </p>
        <Link to="/students/lessons">
          <SButton>
            <Translate str="frontend.page404.goToStartLessonPage" />
          </SButton>
        </Link>
      </S404Page>
    </Page>
  );
};

export default Page404;

const S404Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    margin-top: 5.75rem;
  }
`;

const SImageBlock = styled.article`
  margin-top: -1rem;
  max-width: 100vw;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SH1 = styled.h1`
  margin-top: 3rem;
  font-size: 1.25rem;
  line-height: 2.25rem;
  font-weight: bold;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    font-size: 1.75rem;
  }
`;

const SButton = styled(Button)`
  border-radius: 0.625rem;
  padding: 1rem 2rem;
  width: 100%;
  max-width: 18.75rem;
  min-height: 3.375rem;
  font-weight: bold;
  line-height: initial;
  margin-top: 3rem;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    margin-top: 4rem;
  }
`;
