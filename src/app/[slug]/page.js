'use client';

import { Special_Elite } from 'next/font/google';
import React, { useState } from 'react';
import useLatest from '../../hooks/useLatest';
import GuiltyBars from '../../components/GuiltyBars';
import SpeechBubble from '../../components/SpeechBubble';
import ThoughtBubble from '../../components/ThoughtBubble';
import TimelineScrubber from '../../components/TimelineScrubber';
import Typewriter from '../../components/TypeWriter';

const specialElite = Special_Elite({
  weight: '400',
  subsets: ['latin']
})

export default function Page({ params }) {
  const room = params.slug;
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [direction, setDirection] = useState("start");
  const { courtCase, evidence, agentsState, verdict } = useLatest(isPlaying, progress, direction, setProgress, setDirection, isLive, setIsLive, room);

  const isAtStart = courtCase == null || Math.abs(new Date(courtCase.created_at).getTime() - new Date(progress).getTime()) < 1;

  return (
    <main className={"flex min-h-screen max-h-screen flex-col text-xs"}>
      <ul className="grid grid-cols-3 grid-rows-2 gap-2 place-items-start h-full w-full auto-cols-max">
        {agentsState && agentsState.state.map(agentState => (
          <li key={agentState.name} className="w-full">
            <div className="grid gap-4 border-2 rounded" style={{ gridTemplateColumns: '16em auto' }}>
              <div className="w-48">
                <img src={agentState.image_uri} alt={agentState.name} className="w-48 h-96" />
              </div>
              <div className="flex-grow">
                <h3 className={'text-2xl mt-2 mb-1 font-bold ' + specialElite.className }>{agentState.name}</h3>
                {agentState.latest_utterance && (
                  <div className="mt-2">
                    <SpeechBubble doType={isPlaying && !(direction == "forward" || direction == "back")} text={agentState.latest_utterance} />
                  </div>
                )}
                <div className="mt-2">
                  <GuiltyBars guiltyPercent={agentState.guilty_percent} innocentPercent={agentState.innocent_percent} />
                </div>
                {agentState.latest_sentiment && (
                  <div className="mt-2">
                    <ThoughtBubble doFade={isPlaying && !(direction == "forward" || direction == "back")} text={agentState.latest_sentiment} />
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {evidence && evidence.text && (
        <div className="absolute top-0 left-0 w-full bg-white bg-opacity-80 p-4">
          <p className="whitespace-pre-wrap text-black text-sm"><Typewriter text={evidence.text} doType={isPlaying && !(direction == "forward" || direction == "back")} /></p>
        </div>
      )}
      {verdict && verdict.text && (
        <div className="absolute top-0 left-0 w-full bg-white bg-opacity-80 p-4">
          <p className="whitespace-pre-wrap text-black text-sm"><Typewriter text={verdict.text} doType={isPlaying && !(direction == "forward" || direction == "back")} /></p>
        </div>
      )}
      {!agentsState && (
        <p className="text-lg m-auto"><Typewriter text="The court is being assembled..." doType={isPlaying && !(direction == "forward" || direction == "back")} /></p>
      )}
      <TimelineScrubber direction={direction} onDirectionChange={setDirection} isPlaying={isPlaying} onIsPlayingChange={setIsPlaying} isLive={isLive} setIsLive={setIsLive} isAtStart={isAtStart} />
    </main>
  );
}
