import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithAppProviders } from 'students/utils/testUtils';

import { mockSectionData, mockLesson } from './__mocks__/LessonSectionItemMock';
import LessonSectionItem from '../LessonSectionItem';

jest.mock('students/views/shared/hooks', () => ({
  useBreakPoint: () => false
}));

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => ({
    pathname: 'localhost/lessons/1/finished'
  })),
  Link: ({ props, children }: { props: any; children: any }) => (
    <a {...props}>{children}</a>
  )
}));

describe('<LessonSectionItem />', () => {
  beforeEach(() => {
    renderWithAppProviders(
      <LessonSectionItem
        sectionData={mockSectionData}
        icon="icon"
        textLocaleKey="frontend.lesson_page.section_learn"
        infoLocaleKey="frontend.lesson_page.section_learn"
        index={1}
        lesson={mockLesson}
        sectionKey="teach"
      />
    );
  });

  it('Component should contains all tasks', () => {
    const button = screen.getByRole('button');
    userEvent.click(button);

    const tasks = screen.getAllByRole('listitem');
    expect(tasks.length === mockSectionData.tasks.length);
  });
});
