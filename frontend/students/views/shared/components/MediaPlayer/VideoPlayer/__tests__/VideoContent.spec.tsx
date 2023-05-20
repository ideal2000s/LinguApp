import React from 'react';
import { renderWithAppProviders } from 'students/utils/testUtils';
import VideoContent from '../VideoContent';

jest.mock('../hooks', () => ({
  useVideoResizeFallback: jest.fn((resizeFn: () => void) => {
    resizeFn();
    return jest.fn();
  }),
  useCheckForResize: jest.fn(() => [jest.fn(), jest.fn()])
}));

describe('<VideoContent>', () => {
  const resizeHandler = jest.fn();

  it('Resize handler is being called', () => {
    renderWithAppProviders(
      <VideoContent
        videoURL="https://www.youtube.com/watch?v=000000000"
        onResizeEnd={resizeHandler}
      />
    );
    expect(resizeHandler).toBeCalledTimes(1);
  });
});
