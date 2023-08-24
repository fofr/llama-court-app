'use client';

// pages/Room.js
import { Special_Elite } from 'next/font/google';
import React, { useState } from 'react';
import useLatest from '../../hooks/useLatest';
import GuiltyBars from './../GuiltyBars';
import SpeechBubble from './../SpeechBubble';
import ThoughtBubble from './../ThoughtBubble';
import TimelineScrubber from './../TimelineScrubber';
import Typewriter from '../TypeWriter';

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
    <main className={"flex min-h-screen max-h-screen flex-col text-xs " + specialElite.className}>
      <ul className="flex m-0 p-0 relative h-screen">
        {agentsState && agentsState.state.map(agentState => (
          <li key={agentState.name} className="w-1/2 m-0 p-0 grid grid-rows-agent">
            <div className="relative">
              <img src={agentState.image_uri} alt={agentState.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 bg-black bg-opacity-50 p-1 w-full">
                <p className="whitespace-pre-wrap text-white pb-2">
                  <em>Beliefs:</em>
                  <br />
                  {agentState.beliefs}
                </p>
                <GuiltyBars guiltyPercent={agentState.guilty_percent} innocentPercent={agentState.innocent_percent} />
              </div>
              {agentState.latest_utterance && (
                <div className="absolute top-0 left-0">
                  <SpeechBubble doType={isPlaying && !(direction == "forward" || direction == "back")} text={agentState.latest_utterance} />
                </div>
              )}
              {agentState.latest_sentiment && (
                <div className="absolute top-0 left-0">
                  <ThoughtBubble doFade={isPlaying && !(direction == "forward" || direction == "back")} text={agentState.latest_sentiment} />
                </div>
              )}
            </div>
            <div className="mt-2 text-center">
              <h3 className="text-xl mb-1 font-bold">{agentState.name}</h3>
            </div>
          </li>
        ))}
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
      </ul>
      <TimelineScrubber direction={direction} onDirectionChange={setDirection} isPlaying={isPlaying} onIsPlayingChange={setIsPlaying} isLive={isLive} setIsLive={setIsLive} isAtStart={isAtStart} />
      <style jsx>{`
        .grid-rows-agent {
          grid-template-rows: 1fr auto;
        }
      `}</style>
    </main>

  );
}
