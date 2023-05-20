import React, { FC, useContext } from 'react';
import styled, { ThemeContext, ThemeProvider } from 'styled-components';
import { StickyContainer } from 'react-sticky';
import { ICourseDetails, ICourseDetailsSection } from 'students/models';
import PageTitle from 'students/views/shared/components/PageTitle';
import { customMediaQuery, SPageContainer } from 'students/views/shared/styled';

import CourseInformation from './components/CourseInformation';
import CourseSection from './components/CourseSection';
import { Navbar, Footer } from '../components';

const PAGE_COLOR = 'rgba(246, 247, 251, 0.8)';

interface IProps {
  course: ICourseDetails;
}

const Course: FC<IProps> = ({ course }) => {
  const themeContext = useContext(ThemeContext);
  const linguLessonColor = themeContext.linguDarkFont;

  return (
    <PageWrapper>
      <PageTitle
        pageName={`${course.title} | ${course.languageCode.toUpperCase()}`}
        language={course.languageCode}
        canonicalUrl={window.location.href}
        description={course.metaDescription}
      />

      <Navbar darkBurger />

      <CustomSPageContainer>
        <ThemeProvider theme={{ ...themeContext, linguLessonColor }}>
          <StickyContainer>
            <CourseInformation course={course} />

            {course.courseSections.map((section: ICourseDetailsSection) => (
              <CourseSection section={section} key={section.id} />
            ))}

            {/*<CourseReviews reviews={course.reviews} />*/}
          </StickyContainer>
        </ThemeProvider>
      </CustomSPageContainer>

      <Footer />
    </PageWrapper>
  );
};

export default Course;

const PageWrapper = styled.div`
  background-color: ${PAGE_COLOR};
`;

const CustomSPageContainer = styled(SPageContainer)`
  ${customMediaQuery('tablet')} {
    margin-top: 56px;
  }
`;
