'use client';

import useLatest from '../hooks/useLatest';

export default function Home() {
  const { latestCase, latestEvidence, latestAgentsState } = useLatest();
  if (!latestCase) {
    return <p>Loading...</p>
  }

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 class="text-4xl font-bold">Case {latestCase.id}</h1>

      <ul class="max-w-prose">
      {latestAgentsState.state.map(agentState => (
        <li key={agentState.name}>
          <h3 className="text-2xl mt-4 mb-1 font-bold">{agentState.name}</h3>
          <p class="text-xl mb-4">{agentState.description}</p>

          <p>Mood: {agentState.mood}</p>
          <p>Beliefs: {agentState.beliefs}</p>
          <p>Summary: {agentState.summary}</p>
          {/* <p>{agentState.image_uri}</p> */}
          <p>Description: {agentState.description}</p>
          <p>Guilty %:{agentState.guilty_percent}</p>
          <p>Innocent %: {agentState.innocent_percent}</p>
          <p>Speak eagerness: {agentState.speak_eagerness}</p>
          <p>Latest sentiment: {agentState.latest_sentiment}</p>
          <p>Latest utterance: {agentState.latest_utterance}</p>
        </li>
      ))}
      </ul>
    </main>
  )
}
