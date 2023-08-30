import React from 'react';
import { PlayIcon, PauseCircleIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';

export default function TimelineScrubber({ direction, onDirectionChange, isPlaying, onIsPlayingChange, isLive, setIsLive, isAtStart }) {

  const moveBack = () => {
    onDirectionChange && onDirectionChange("back");
    setIsLive(false);
    onIsPlayingChange(false);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsLive(false);
    }
    onIsPlayingChange && onIsPlayingChange(!isPlaying);
  };

  const moveForward = () => {
    onDirectionChange && onDirectionChange("forward");
  };

  const goLive = () => {
    setIsLive(true);
    onIsPlayingChange(true);
  };

  console.log("isAtStart", isAtStart);

  return (
    <div className="text-lg timeline-scrubber">
      <button disabled={direction != null || isAtStart} onClick={moveBack} className="mr-2">
        <BackwardIcon className="w-12 h-12" />
      </button>
      <button onClick={togglePlayPause} className="mr-2">
        {isPlaying ? <PauseCircleIcon className="w-12 h-12" /> : <PlayIcon className="w-12 h-12" />}
      </button>
      <button disabled={direction != null || isLive} onClick={moveForward} className="mr-2">
        <ForwardIcon className="w-12 h-12" />
      </button>
      {isLive ? (
        <span className="ml-2 p-1 font-serif bg-red-500 rounded-lg text-slate-50">Live</span>
      ) : (
        <button onClick={goLive} className="ml-2">Go live!</button>
      )}
    </div>
  );
}
