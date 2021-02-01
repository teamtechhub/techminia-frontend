import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { VideoPlayer } from "./Video.style";
import { findDOMNode } from "react-dom";
import screenfull from "screenfull";
import Duration from "./Duration";

export default function Video(props) {
  const [player, setPlayer] = useState();
  const [state, setState] = useState({
    url: props.url,
    player_controls: props.playercontrols || false,
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  });

  useEffect(() => {
    setState({ ...state, url: props.url, played: 0, loaded: 0, pip: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  const ref = (plyr) => {
    setPlayer(plyr);
  };

  // const load = (url) => {
  //   setState({
  //     url,
  //     played: 0,
  //     loaded: 0,
  //     pip: false,
  //   });
  // };

  const handlePlayPause = () => {
    setState({ playing: !state.playing });
  };

  // const handleStop = () => {
  //   setState({ url: null, playing: false });
  // };

  // const handleToggleControls = () => {
  //   const url = state.url;
  //   setState(
  //     {
  //       controls: !state.controls,
  //       url: null,
  //     },
  //     () => load(url)
  //   );
  // };

  // const handleToggleLight = () => {
  //   setState({ light: !state.light });
  // };

  // const handleToggleLoop = () => {
  //   setState({ loop: !state.loop });
  // };

  const handleVolumeChange = (e) => {
    setState({ volume: parseFloat(e.target.value) });
  };

  const handleToggleMuted = () => {
    setState({ muted: !state.muted });
  };

  // const handleSetPlaybackRate = (e) => {
  //   setState({ playbackRate: parseFloat(e.target.value) });
  // };

  // const handleTogglePIP = () => {
  //   setState({ pip: !state.pip });
  // };

  const handlePlay = () => {
    console.log("onPlay");
    setState({ playing: true });
  };

  const handleEnablePIP = () => {
    console.log("onEnablePIP");
    setState({ pip: true });
  };

  const handleDisablePIP = () => {
    console.log("onDisablePIP");
    setState({ pip: false });
  };

  const handlePause = () => {
    console.log("onPause");
    setState({ playing: false });
  };

  const handleSeekMouseDown = (e) => {
    setState({ seeking: true });
  };

  const handleSeekChange = (e) => {
    setState({ played: parseFloat(e.target.value) });
  };

  const handleSeekMouseUp = (e) => {
    setState({ seeking: false });
    player.seekTo(parseFloat(e.target.value));
  };

  const handleProgress = (state) => {
    console.log("onProgress", state);
    // We only want to update time slider if we are not currently seeking
    if (!state.seeking) {
      setState(state);
    }
  };

  const handleEnded = () => {
    console.log("onEnded");
    setState({ playing: state.loop });
  };

  const handleDuration = (duration) => {
    console.log("onDuration", duration);
    setState({ duration });
  };

  const handleClickFullscreen = () => {
    screenfull.request(findDOMNode(player));
  };

  // const renderLoadButton = (url, label) => {
  //   return <button onClick={() => load(url)}>{label}</button>;
  // };

  const {
    url,
    playing,
    player_controls,
    controls,
    light,
    volume,
    muted,
    loop,
    played,
    // loaded,
    duration,
    playbackRate,
    pip,
  } = state;

  return (
    <>
      <VideoPlayer
        role="region"
        tabindex="-1"
        className="player-wrapper"
        // style={{ height: "100%" }}
        // style="padding-top: 42.5781%;"
      >
        <ReactPlayer
          ref={ref}
          className="react-player"
          style={{ minHeight: "400px" }}
          width="100%"
          url={url}
          pip={pip}
          playing={playing}
          controls={controls}
          light={light}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          onReady={() => console.log("onReady")}
          onStart={() => console.log("onStart")}
          onPlay={handlePlay}
          onEnablePIP={handleEnablePIP}
          onDisablePIP={handleDisablePIP}
          onPause={handlePause}
          onBuffer={() => console.log("onBuffer")}
          onSeek={(e) => console.log("onSeek", e)}
          onEnded={handleEnded}
          onError={(e) => console.log("onError", e)}
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
        {player_controls ? (
          <div
            className="video-react-controls-enabled video-react-has-started video-react-paused video-react-fluid video-react-user-inactive video-react-workinghover video-react"
            role="region"
            tabindex="-1"
            // style="padding-top: 56.25%;"
          >
            <div class="video-react-control-bar video-react-control-bar-auto-hide">
              <button
                onClick={handlePlayPause}
                class={`video-react-play-control video-react-control video-react-button ${
                  playing ? "video-react-playing" : "video-react-paused"
                } `}
                type="button"
                tabindex="0"
              >
                <span class="video-react-control-text">
                  {playing ? "Pause" : "Play"}
                </span>
              </button>
              <button
                class="video-react-control video-react-button video-react-icon video-react-icon-replay-10 video-react-replay-control"
                type="button"
              >
                <span class="video-react-control-text">replay 10 seconds</span>
              </button>
              <button
                class="video-react-control video-react-button video-react-icon video-react-icon-forward-30 video-react-forward-control"
                type="button"
              >
                <span class="video-react-control-text">forward 30 seconds</span>
              </button>
              <div
                class={`video-react-volume-menu-button-horizontal ${
                  muted ? "video-react-vol-muted" : "video-react-vol-3"
                }  video-react-volume-menu-button video-react-menu-button-inline video-react-control video-react-button video-react-menu-button`}
                role="button"
                tabindex="0"
                onClick={handleToggleMuted}
              >
                <div class="video-react-menu">
                  <div class="video-react-menu-content">
                    <div>
                      <input
                        type="range"
                        min={0}
                        class="video-react-volume-bar video-react-slider-bar video-react-slider-horizontal video-react-slider"
                        max={1}
                        step="any"
                        value={volume}
                        onChange={handleVolumeChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="video-react-current-time video-react-time-control video-react-control">
                <div class="video-react-current-time-display" aria-live="off">
                  <span class="video-react-control-text">Current Time </span>
                  <Duration seconds={duration * played} />
                </div>
              </div>
              <div
                class="video-react-time-control video-react-time-divider"
                dir="ltr"
              >
                <div>
                  <span>/</span>
                </div>
              </div>
              <div class="video-react-duration video-react-time-control video-react-control">
                <div class="video-react-duration-display" aria-live="off">
                  <span class="video-react-control-text">Duration Time </span>
                  <Duration seconds={duration} />
                </div>
              </div>
              <div class="video-react-progress-control video-react-control">
                <div style={{ width: "100%" }}>
                  <input
                    type="range"
                    style={{ width: "100%" }}
                    class="video-react-progress-holder video-react-slider-horizontal video-react-slider"
                    min={0}
                    max={0.999999}
                    step="any"
                    value={played}
                    onMouseDown={handleSeekMouseDown}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}
                  />
                </div>
              </div>
              <div
                class="video-react-playback-rate video-react-menu-button-popup video-react-control video-react-button video-react-menu-button"
                role="button"
                tabindex="0"
              >
                <span class="video-react-control-text">Playback Rate</span>
                <div class="video-react-playback-rate-value">1.00x</div>
              </div>
              <button
                onClick={handleClickFullscreen}
                class="video-react-icon-fullscreen video-react-fullscreen-control video-react-control video-react-button video-react-icon"
                type="button"
                tabindex="0"
              >
                <span class="video-react-control-text">Non-Fullscreen</span>
              </button>
            </div>
          </div>
        ) : null}
      </VideoPlayer>
    </>
  );
}
