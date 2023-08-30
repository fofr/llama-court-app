'use client';

// pages/Room.js
import { Special_Elite } from 'next/font/google';
import React, { useState } from 'react';
import useLatest from '../../hooks/useLatest';
import Typewriter from '../Typewriter';
import GuiltyBars from './../GuiltyBars';
import SpeechBubble from './../SpeechBubble';
import ThoughtBubble from './../ThoughtBubble';
import TimelineScrubber from './../TimelineScrubber';

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
  const { evidence, agents, verdict } = useLatest(isPlaying, progress, direction, setProgress, setDirection, isLive, setIsLive, room);

  return (
    <main className={"flex min-h-screen max-h-screen flex-col text-xs " + specialElite.className}>
      <ul className="flex m-0 p-0 relative h-screen overflow-scroll pb-16">
        {agents && agents.map(agent => (
          <li key={agent.name} className="w-1/2 m-0 p-0 grid grid-rows-agent" style={{minWidth: '25em'}}>
            <div className="relative">
              <img src={agent.image_uri} alt={agent.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 bg-black bg-opacity-50 p-1 w-full">
                <p className="whitespace-pre-wrap text-white pb-2">
                  <em>Beliefs:</em>
                  <br />
                  {agent.beliefs}
                </p>
                <GuiltyBars guiltyPercent={agent.guilty_percent} innocentPercent={agent.innocent_percent} />
              </div>
              {agent.latest_utterance && (
                <div className="absolute top-0 left-0">
                  <SpeechBubble isPlaying={isPlaying && direction != "forward"} setDirection={setDirection} text={agent.latest_utterance} />
                </div>
              )}
              {agent.latest_sentiment && (
                <div className="absolute top-0 left-0">
                  <ThoughtBubble isPlaying={isPlaying} setDirection={setDirection} text={agent.latest_sentiment} />
                </div>
              )}
            </div>
            <div className="mt-2 text-center">
              <h3 className="text-xl mb-1 font-bold">{agent.name}</h3>
            </div>
          </li>
        ))}
      </ul>
      {evidence && (
        <div className="absolute top-0 left-0 w-full bg-white bg-opacity-80 p-4">
          <p className="whitespace-pre-wrap text-black text-sm"><Typewriter text={evidence} isPlaying={isPlaying && direction != "forward"} setDirection={setDirection} /></p>
        </div>
      )}
      {verdict && verdict && (
        <div className="absolute top-0 left-0 w-full bg-white bg-opacity-80 p-4">
          <p className="whitespace-pre-wrap text-black text-sm"><Typewriter text={verdict} isPlaying={isPlaying && direction != "forward"} setDirection={setDirection} /></p>
        </div>
      )}
      {!agents && (
        <p className="text-lg m-auto"><Typewriter text="The court is being assembled..." isPlaying={isPlaying && direction != "forward"} setDirection={setDirection} /></p>
      )}

      <TimelineScrubber direction={direction} onDirectionChange={setDirection} isPlaying={isPlaying} onIsPlayingChange={setIsPlaying} isLive={isLive} setIsLive={setIsLive} />
      <style jsx>{`
        .grid-rows-agent {
          grid-template-rows: 1fr auto;
        }
      `}</style>
    </main>

  );
}
