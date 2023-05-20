import '@testing-library/jest-dom';
import 'jest-canvas-mock'; //mock for lottie

window.HTMLMediaElement.prototype.load = () => {
  /* do nothing */
};
window.HTMLMediaElement.prototype.play = () => Promise.resolve();
window.HTMLMediaElement.prototype.pause = () => {
  /* do nothing */
};
