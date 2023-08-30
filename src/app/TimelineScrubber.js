import React from 'react';
import { PlayIcon, PauseCircleIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';

export default function TimelineScrubber({ direction, onDirectionChange, isPlaying, onIsPlayingChange, isLive, setIsLive }) {

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
    if (!isPlaying) {
      onDirectionChange("forward");
    }
  };

  const moveForward = () => {
    onDirectionChange && onDirectionChange("forward");
  };

  const goLive = () => {
    setIsLive(true);
    onIsPlayingChange(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white max-w-full h-16">
      <div className="text-lg p-2 flex mx-auto items-center justify-center">
        <button disabled={direction != null} onClick={moveBack} className="mr-2"><BackwardIcon className="w-8 h-8" /></button>
        <button onClick={togglePlayPause} className="mr-2">{isPlaying ? <PauseCircleIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}</button>
        <button disabled={direction != null || isLive} onClick={moveForward} className="mr-2"><ForwardIcon className="w-8 h-8" /></button>
        {isLive ? (
          <span className="ml-2 rounded border-2 border-white ml-4 px-3 py-1 bg-red-500 rounded-lg text-slate-50">Live</span>
        ) : (
          <button onClick={goLive} className="ml-2 rounded border-2 border-black ml-4 px-3 py-1 bg-slate-200">Go live</button>
        )}
      </div>
    </div>
  );
}
