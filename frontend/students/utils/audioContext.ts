const AudioContext =
  window.AudioContext || // Default
  (window as any).webkitAudioContext || // Safari and old versions of Chrome
  false;

export default AudioContext;
