import React from 'react';
import { getByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithAppProviders } from 'students/utils/testUtils';
import TaskProgressCollapse from '../TaskProgressCollapse';
import { mockSectionData } from './__mocks__/TaskProgressCollapseMock';

jest.mock('react-router-dom', () => ({
  Link: ({ props, children }: { props: any; children: any }) => (
    <a {...props}>{children}</a>
  )
}));
jest.mock('students/views/shared/hooks', () => ({
  useBreakPoint: () => false
}));
jest.mock('../useTaskProgressCollapse', () => ({
  __esModule: true,
  default: () => ({ taskPath: '', progress: 10 })
}));
describe('<TaskProgressCollapse />', () => {
  const handleOpenChange = jest.fn(() => {});
  const handleTaskOpen = jest.fn(() => {});

  beforeEach(() => {
    renderWithAppProviders(
      <TaskProgressCollapse
        opened
        sectionData={mockSectionData}
        textLocaleKey="collapse"
        defaultIcon="icon"
        onOpenChange={handleOpenChange}
        onOpenTask={handleTaskOpen}
        activityCount={5}
      />
    );
  });

  it('Component should contain all tasks', async () => {
    const listItems = await screen.findAllByRole('listitem');
    listItems.forEach((item, index) => {
      expect(getByText(item, mockSectionData.tasks[index].title)).toBeInTheDocument();
    });
  });

  it('Component should fire onOpenChange event', async () => {
    const button = await screen.findByRole('button');
    userEvent.click(button);
    expect(handleOpenChange).toHaveBeenCalled();
  });
});
