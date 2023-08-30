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
    <main className={"flex min-h-screen max-h-screen flex-col text-xs p-4"}>
      <h2 className={'text-4xl mt-4 mb-6 font-bold ' + specialElite.className}>Courtroom {room}</h2>

      <div className={'text-xl max-w-prose ' + specialElite.className}>
        {evidence && evidence.text && (
          <div className="p-4">
            <p className="whitespace-pre-wrap text-black text-xl">
              <Typewriter text={evidence.text} doType={isPlaying && !(direction == "forward" || direction == "back")} />
            </p>
          </div>
        )}
        {verdict && verdict.text && (
          <div className="p-4">
            <p className="whitespace-pre-wrap text-black text-xl">
              <Typewriter text={verdict.text} doType={isPlaying && !(direction == "forward" || direction == "back")} />
            </p>
          </div>
        )}
        {!agentsState && (
          <p className="text-lg m-auto"><Typewriter text="The court is being assembled..." doType={isPlaying && !(direction == "forward" || direction == "back")} /></p>
        )}
        <TimelineScrubber direction={direction} onDirectionChange={setDirection} isPlaying={isPlaying} onIsPlayingChange={setIsPlaying} isLive={isLive} setIsLive={setIsLive} isAtStart={isAtStart} />
      </div>
      <h2 className={'text-4xl mt-10 mb-6 font-bold ' + specialElite.className}>Members of the jury</h2>
      <ul className="mb-6 pb-6 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 place-items-start h-full w-full auto-cols-max">
        {agentsState && agentsState.state.map(agentState => (
          <li key={agentState.name} className="w-full">
            <div className="grid gap-4" style={{ gridTemplateColumns: '16em auto' }}>
              <div className="w-48 relative">
                <img src={agentState.image_uri} alt={agentState.name} className="w-48 h-96 rounded" />
                <div className="absolute bottom-3 left-3">
                  <GuiltyBars guiltyPercent={agentState.guilty_percent} innocentPercent={agentState.innocent_percent} />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className={'text-2xl mt-4 mb-1 font-bold ' + specialElite.className }>{agentState.name}</h3>
                {agentState.latest_utterance && (
                  <div className="mt-2">
                    <SpeechBubble doType={isPlaying && !(direction == "forward" || direction == "back")} text={agentState.latest_utterance} />
                  </div>
                )}
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
    </main>
  );
}
