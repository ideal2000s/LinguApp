import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import cn from 'classnames';
import styled from 'styled-components';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import PlayButton from './PlayButton';
import Slider from './Slider';
import { tOnProgressState, tUrl } from '../Types';
import { timePrettyPrintHelper } from '../Helpers';
import NavButton from './NavButton';

interface IProps {
  url: tUrl;
  className?: string;
  onPlay?: () => void;
  onEnded?: () => void;
  onPause?: () => void;
}

interface IState {
  url: tUrl | null;
  pip: boolean;
  playing: boolean;
  controls: boolean;
  light: boolean;
  volume: number;
  muted: boolean;
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
  duration: number;
  playbackRate: number;
  loop: boolean;
  seeking: boolean;
}

class AudioPlayer extends Component<IProps, IState> {
  player: ReactPlayer | null = null;

  state: Readonly<IState> = {
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    seeking: false
  };

  load = (url: tUrl): void => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
      playing: false
    });
  };

  handleTogglePlay = (): void => {
    this.setState({ playing: !this.state.playing });
  };

  handleStop = (): void => {
    this.setState({ url: null, playing: false });
  };

  handleToggleLight = (): void => {
    this.setState({ light: !this.state.light });
  };

  handleToggleLoop = (): void => {
    this.setState({ loop: !this.state.loop });
  };

  handleVolumeChange = (value: number): void => {
    this.setState({ volume: value });
  };

  handleToggleMuted = (): void => {
    this.setState({ muted: !this.state.muted });
  };

  handleSetPlaybackRate = (value: number): void => {
    this.setState({ playbackRate: value });
  };

  handleTogglePIP = (): void => {
    this.setState({ pip: !this.state.pip });
  };

  handlePlay = (): void => {
    this.setState({ playing: true });
    this.props.onPlay && this.props.onPlay();
  };

  handleEnablePIP = (): void => {
    this.setState({ pip: true });
  };

  handleDisablePIP = (): void => {
    this.setState({ pip: false });
  };

  handlePause = (): void => {
    this.setState({ playing: false });
    this.props.onPause && this.props.onPause();
  };

  handleSeekMouseDown = (): void => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (value: number): void => {
    this.setState({ played: value });
  };

  handleSeekMouseUp = (value: number): void => {
    this.setState({ seeking: false });
    this.player?.seekTo(value);
  };

  handleProgress = (state: tOnProgressState): void => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  handleEnded = (): void => {
    this.setState({ playing: this.state.loop });
    this.props.onEnded && this.props.onEnded();
  };

  handleDuration = (duration: number): void => {
    this.setState({ duration });
  };

  handleReady = (): void => {};

  handleStart = (): void => {};

  handleBuffer = (): void => {};

  handleSeek = (): void => {};

  handleError = (): void => {};

  ref = (player: ReactPlayer): void => {
    this.player = player;
  };

  componentDidMount = (): void => {
    this.load(this.props.url);
  };

  render(): JSX.Element {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      playedSeconds,
      duration,
      playbackRate,
      pip
    } = this.state;

    return (
      <>
        <SWrapper className={cn(this.props.className)}>
          <SProgress>
            <SPlayed>{timePrettyPrintHelper(playedSeconds)}</SPlayed>
            <SSlider
              played={played}
              onSeekMouseDown={this.handleSeekMouseDown}
              onSeekChange={this.handleSeekChange}
              onSeekMouseUp={this.handleSeekMouseUp}
            />
            <SDuration>{timePrettyPrintHelper(duration)}</SDuration>
          </SProgress>
          <SControls>
            <NavButton disabled={true} icon={faStepBackward} />
            <PlayButton size="md" isPlaying={playing} onClick={this.handleTogglePlay} />
            <NavButton disabled={true} icon={faStepForward} />
          </SControls>
        </SWrapper>
        {!!url && (
          <ReactPlayer
            progressInterval={100}
            ref={this.ref}
            width={0}
            height={0}
            url={url}
            pip={pip}
            playing={playing}
            controls={controls}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onReady={this.handleReady}
            onStart={this.handleStart}
            onPlay={this.handlePlay}
            onEnablePIP={this.handleEnablePIP}
            onDisablePIP={this.handleDisablePIP}
            onPause={this.handlePause}
            onBuffer={this.handleBuffer}
            onSeek={this.handleSeek}
            onEnded={this.handleEnded}
            onError={this.handleError}
            onProgress={this.handleProgress}
            onDuration={this.handleDuration}
          />
        )}
      </>
    );
  }
}

const SWrapper = styled.div`
  width: 100%;
`;

const SProgress = styled.div`
  display: flex;
  flex-direction: raw;
  justify-content: center;
  position: relative;
`;

const SSlider = styled(Slider)`
  align-self: center;
`;

const SPlayed = styled.div`
  align-self: center;
  font-size: 0.9rem;
  margin-right: 18px;
  width: 3rem;
  position: absolute;
  left: 0;
  top: -30px;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    position: static;
  }
`;

const SDuration = styled.div`
  align-self: center;
  text-align: right;
  font-size: 0.9rem;
  margin-left: 18px;
  width: 3rem;
  position: absolute;
  right: 0;
  top: -30px;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    position: static;
  }
`;

const SControls = styled.div`
  margin-top: 19px;
  display: flex;
  flex-direction: raw;
  justify-content: center;
`;

export default AudioPlayer;
