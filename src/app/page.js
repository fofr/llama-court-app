'use client';

import { Special_Elite } from 'next/font/google';
import useLatest from '../hooks/useLatest';
import GuiltyBars from './GuiltyBars';
import SpeechBubble from './SpeechBubble';
import ThoughtBubble from './ThoughtBubble';
import Typewriter from './Typewriter';

const specialElite = Special_Elite({
  weight: '400',
  subsets: ['latin']
})

export default function Home() {
  const { latestCase, latestEvidence, latestAgentsState } = useLatest();
  if (!latestCase) {
    return <p>Loading...</p>
  }

  return (
    <main className={"flex min-h-screen flex-col text-xs " + specialElite.className}>
      <ul className="flex m-0 p-0 relative h-screen">
        {latestAgentsState.state.map(agentState => (
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
                  <SpeechBubble text={agentState.latest_utterance} />
                </div>
              )}
              {agentState.latest_sentiment && (
                <div className="absolute top-0 left-0">
                  <ThoughtBubble text={agentState.latest_sentiment} />
                </div>
              )}
            </div>
            <div className="mt-2 text-center">
              <h3 className="text-xl mb-1 font-bold">{agentState.name}</h3>
            </div>
          </li>
        ))}
        {latestEvidence.text && (
          <div className="absolute top-0 left-0 w-full bg-white bg-opacity-80 p-4">
            <p className="whitespace-pre-wrap text-black text-sm"><Typewriter text={latestEvidence.text} /></p>
          </div>
        )}
      </ul>
      <style jsx>{`
        .grid-rows-agent {
          grid-template-rows: 1fr auto;
        }
      `}</style>
    </main>

  );
}
