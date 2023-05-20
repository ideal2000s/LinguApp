import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { coursePageActions, publicPageSelectors } from 'students/stores/public';
import { tAppState } from 'students/stores/rootStore';
import useScrollToTopOnMount from 'students/views/shared/hooks/useScrollToTopOnMount';

import Course from './Course';

type tProps = ConnectedProps<typeof connector>;

const CourseContainer: FC<tProps> = ({ course, getCourse }) => {
  const { slug } = useParams<{ slug: string }>();
  useScrollToTopOnMount();

  useEffect(() => {
    getCourse(slug);
  }, [getCourse, slug]);

  return course && <Course course={course} />;
};

const mapStateToProps = (state: tAppState) => ({
  course: publicPageSelectors.selectCourse(state)
});

const mapDispatchToProps = {
  getCourse: coursePageActions.getCourse
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CourseContainer);
