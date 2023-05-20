import { useState, useEffect, useRef, useCallback } from 'react';
import AudioRecorder from 'audio-recorder-polyfill';
import { useStopwatch2 } from './useStopwatch';

const mpegEncoder = require('audio-recorder-polyfill/mpeg-encoder/index.cjs');

AudioRecorder.encoder = mpegEncoder;
AudioRecorder.prototype.mimeType = 'audio/mpeg';
window.MediaRecorder = AudioRecorder;

export enum recordingStatusEnum {
  EMPTY,
  RECORDING,
  PAUSED,
  FINISHED
}

type tUseAudioRecorderReturnType = [
  recordingStatusEnum,
  number | undefined,
  Blob | null,
  {
    startRecording: () => void;
    pauseRecording: () => void;
    finishRecording: () => void;
    resetRecording: () => void;
    getVolume: () => number;
  }
];

type tUseAudioRecorderArgsType = {
  onRecordChange?: (audioUrl: string | null, blob?: Blob | null) => void;
};

export function useAudioRecorder({
  onRecordChange
}: tUseAudioRecorderArgsType): tUseAudioRecorderReturnType {
  const [status, setStatus] = useState(recordingStatusEnum.EMPTY);
  const statusRef = useRef<recordingStatusEnum | null>(recordingStatusEnum.EMPTY);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const getVolumeRef = useRef<ReturnType<typeof volumeMeter>>(() => 0);
  const [stopwatch, seconds] = useStopwatch2();
  const audioBlob = useRef<Blob | null>(null);

  const initRecorder = async () => {
    let mRec;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      getVolumeRef.current = volumeMeter(stream);
      mRec = new MediaRecorder(stream);
    } catch (err) {
      console.log(err);
    }
    stopwatch.reset();
    return mRec || null;
  };
  const handleDataAvailable = useCallback(
    (_e: BlobEvent) => {
      const isFinished = statusRef.current === recordingStatusEnum.FINISHED;
      if (!onRecordChange) return;
      if (isFinished) {
        const blob = new Blob([_e.data], { type: _e.data.type });
        audioBlob.current = blob;
        const url = URL.createObjectURL(blob);
        onRecordChange(url, blob);
      } else {
        onRecordChange(null, null);
      }
    },
    [onRecordChange]
  );
  useEffect(() => {
    if (recorder) {
      recorder.addEventListener('dataavailable', handleDataAvailable);
    }
  }, [recorder, handleDataAvailable]);

  function _setStatus(status: recordingStatusEnum) {
    setStatus(status);
    statusRef.current = status;
  }
  function _start(_recorder: MediaRecorder): void {
    switch (_recorder.state) {
      case 'recording':
        break;
      case 'paused':
        _recorder.resume();
        break;
      case 'inactive':
        _recorder.start();
        break;
    }
  }

  // API methods START
  const startRecording = async () => {
    let rec = recorder;
    if (!rec) {
      rec = await initRecorder();
      setRecorder(rec);
    }
    if (rec) {
      _start(rec);
      _setStatus(recordingStatusEnum.RECORDING);
      stopwatch.start();
    }
  };

  const pauseRecording = () => {
    _setStatus(recordingStatusEnum.PAUSED);
    if (recorder) {
      recorder.pause();
      stopwatch.pause();
    }
  };

  const finishRecording = () => {
    stopwatch.pause();
    _setStatus(recordingStatusEnum.FINISHED);
    if (recorder) {
      recorder.stop();
      recorder.stream.getTracks().forEach((track) => track.stop());
      setRecorder(null);
    }
  };

  const resetRecording = () => {
    stopwatch.pause();
    stopwatch.reset();
    _setStatus(recordingStatusEnum.EMPTY);
    if (recorder) {
      recorder.stop();
      recorder.stream.getTracks().forEach((track) => track.stop());
      _cleanRecorderListeners(recorder);
      setRecorder(null);
    }
  };

  // API methods END
  const _cleanRecorderListeners = useCallback(
    (recorder: MediaRecorder) => {
      recorder.removeEventListener('dataavailable', handleDataAvailable);
    },
    [handleDataAvailable]
  );

  useEffect(() => {
    function _cleanRecorder(recorder: MediaRecorder) {
      if (recorder) {
        recorder.stop();
        recorder.stream.getTracks().forEach((track) => track.stop());
        _cleanRecorderListeners(recorder);
      }
    }

    return () => {
      if (recorder && recorder.state !== 'inactive') {
        _cleanRecorder(recorder);
      }
    };
  }, [recorder, _cleanRecorderListeners]);

  return [
    status,
    seconds,
    audioBlob.current,
    {
      startRecording,
      pauseRecording,
      finishRecording,
      resetRecording,
      getVolume: getVolumeRef.current
    }
  ];
}

function getMaxVolume(analyser: AnalyserNode, fftBins: Uint8Array) {
  let maxVolume = 0;
  analyser.getByteFrequencyData(fftBins);
  for (let i = 0, ii = fftBins.length; i < ii; i++) {
    const currentSound = fftBins[i] / 2;
    if (currentSound > maxVolume) {
      maxVolume = currentSound;
    }
  }

  return maxVolume;
}

function volumeMeter(stream: MediaStream): () => number {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;

  const audioContext = new AudioContext();
  const audioSourceNode = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  audioSourceNode.connect(analyser);
  analyser.fftSize = 32;
  const fftBins = new Uint8Array(analyser.frequencyBinCount);
  return () => getMaxVolume(analyser, fftBins);
}
