import { renderHook } from '@testing-library/react-hooks';
import useTaskProgressCollapse from '../useTaskProgressCollapse';
import { mockSectionData } from './__mocks__/TaskProgressCollapseMock';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/lessons/1' })
}));
describe('useTaskProgressCollapse', () => {
  const mockTasks = mockSectionData.tasks;

  it('Should return correct taskPath', () => {
    const { result } = renderHook(() => useTaskProgressCollapse());
    expect(result.current.taskPath).toBe('/lessons/1/tasks/');
  });

  it('Should return correct progress', () => {
    const { result, rerender } = renderHook(
      (mockTasks) => useTaskProgressCollapse(mockTasks),
      { initialProps: mockTasks }
    );
    expect(result.current.progress).toBe(50);

    mockTasks[1].progress = 100;
    rerender([...mockTasks]);
    expect(result.current.progress).toBe(100);
  });
});
