import React, { useCallback, useContext, useEffect } from 'react';
import { ThemeProvider, ThemeContext } from 'styled-components';
import { useAnimation, motion as m } from 'framer-motion';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Page from 'students/views/pages/Page';
import { ILesson, ILessonSession } from 'students/models';
import { isLightFontNeeded, isLightColor } from 'students/views/shared/helpers';
import { withFade } from 'students/views/shared/HOCs';
import PageTitle from 'students/views/shared/components/PageTitle';
import lessonPlaceholder from 'students/views/shared/assets/lesson_placeholder.png';
import lessonColoredPlaceholder from 'students/views/shared/assets/lesson_colored_placeholder.png';
import lessonPlaceholderWebp from 'students/views/shared/assets/lesson_placeholder.webp';
import lessonColoredPlaceholderWebp from 'students/views/shared/assets/lesson_colored_placeholder.webp';

// import LessonNumbers from './LessonNumbers';
import LessonAuthor from './LessonAuthor';
import { getBackgroundColorIfLoaded } from './helpers';
import {
  SLesson,
  SLessonTitle,
  SDescriptionList,
  SLessonBtnBlock,
  SPicture
} from './styled';
import LessonStartButtons, { ILessonStartButtons } from './LessonStartButtons';
import { LessonSectionItems } from './LessonSectionItems';

interface IProps extends ILessonStartButtons {
  lesson: ILesson;
  lessonSession: ILessonSession | null;
}

const LessonPage: React.FC<IProps> = ({
  lesson,
  status,
  startLesson,
  restartLesson,
  lessonSession,
  startLessonIsLoading
}) => {
  const { title, imageURL, objectives, id, color } = lesson;
  const { gradient, background } = getBackgroundColorIfLoaded(color, !!id);
  const themeContext = useContext(ThemeContext);
  const lessonFontColor = isLightFontNeeded(background)
    ? themeContext.linguLightFont
    : themeContext.linguDarkFont;
  const lessonPlaceholderImg = isLightColor(background)
    ? lessonColoredPlaceholder
    : lessonPlaceholder;
  const lessonPlaceholderImgWebp = isLightColor(background)
    ? lessonColoredPlaceholderWebp
    : lessonPlaceholderWebp;
  const lessonSections = lessonSession?.summary;

  const lessonBtnControls = useAnimation();

  const startAnimation = useCallback(
    (): Promise<any> =>
      lessonBtnControls.start({
        opacity: [0, 1],
        transition: {
          opacity: { duration: 0.5 }
        }
      }),
    [lessonBtnControls]
  );

  useEffect(() => {
    startAnimation();
  }, [lessonBtnControls, startAnimation, status]);

  return (
    <>
      <PageTitle pageName={`${lesson.title} | ${lesson.language.code.toUpperCase()}`} />

      <Page background={background} gradient={gradient} hasNavbar noPadding>
        <ThemeProvider theme={{ ...themeContext, linguLessonColor: lessonFontColor }}>
          <SLesson>
            <SLessonTitle>{title}</SLessonTitle>

            <Container fluid className="p-0">
              <Row>
                <Col
                  sm={{ span: 12, order: 2 }}
                  md={{ span: 8, order: 1, offset: 2 }}
                  lg={{ span: 6, order: 1, offset: 3 }}
                >
                  {/* TODO: uncomment when it will make any sense */}
                  {/*<LessonNumbers lesson={lesson} />*/}
                </Col>

                <Col xs={{ span: 12, order: 6 }} md={{ span: 12, order: 2 }}>
                  <LessonAuthor lesson={lesson} />
                </Col>

                <Col
                  xs={{ span: 12, order: 3 }}
                  md={{ span: 6, order: 4 }}
                  className="d-flex flex-column justify-content-center"
                >
                  <SDescriptionList>
                    {objectives.map((text, index) => (
                      <div key={index} className="description_item">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="description_check-icon"
                        />
                        <p>{text}</p>
                      </div>
                    ))}
                  </SDescriptionList>
                </Col>

                <Col
                  className="d-flex justify-content-center"
                  xs={{ span: 12, order: 1 }}
                  md={{ span: 6, order: 4 }}
                >
                  {imageURL ? (
                    // remove String(imageURL) when lesson image will be tImageCollection
                    <SPicture src={String(imageURL)} alt={lesson.title} />
                  ) : (
                    <SPicture
                      srcSet={lessonPlaceholderImgWebp}
                      src={lessonPlaceholderImg}
                      alt={lesson.title}
                    />
                  )}
                </Col>

                <Col xs={{ span: 12, order: 4 }} md={{ span: 12, order: 5 }}>
                  <SLessonBtnBlockAnimate
                    animate={lessonBtnControls}
                    initial={{ opacity: 0 }}
                  >
                    <LessonStartButtons
                      status={status}
                      startLesson={startLesson}
                      restartLesson={restartLesson}
                      startLessonIsLoading={startLessonIsLoading}
                    />
                  </SLessonBtnBlockAnimate>
                </Col>

                <Col
                  xs={{ span: 12, order: 5 }}
                  md={{ span: 12, order: 6 }}
                  className="d-flex flex-column justify-content-center"
                >
                  <LessonSectionItems
                    lesson={lesson}
                    lessonSessionSection={lessonSections}
                  />
                </Col>
              </Row>
            </Container>
          </SLesson>
        </ThemeProvider>
      </Page>
    </>
  );
};

export default withFade(LessonPage);

const SLessonBtnBlockAnimate = m.custom(SLessonBtnBlock);
