import { useEffect, useState } from 'react';

export default function useLatest(isPlaying, progress, direction, setProgress, setDirection, isLive, setIsLive, room) {
  const [evidence, setEvidence] = useState(null);
  const [agents, setAgents] = useState(null);
  const [verdict, setVerdict] = useState(null);

  useEffect(() => {
    let cleanup;

    async function fetchState(direction) {
      let url;

      if (direction === "start" || !progress) {
        url = `/api/state?room=${room}&start=true`;
      } else if (isLive) {
        url = `/api/state?room=${room}&latest=true`;
      } else if (direction === 'back') {
        url = `/api/state?room=${room}&before=${progress}`;
      } else if (direction === 'forward') {
        url = `/api/state?room=${room}&after=${progress}`;
      } else {
        return;
      }

      const response = await fetch(url);
      const { state, time, live } = await response.json();

      progress = time;
      setProgress(time);
      setDirection(null);

      if (live && isPlaying) {
        setIsLive(live);
      } else if (!live) {
        setAgents(state.agents);
        setEvidence(state.evidence);
        setVerdict(state.verdict);
      }
    }

    if (isLive) {
      const intervalID = setInterval(() => fetchState(direction == "start" ? "start" : "forward"), 1000);
      cleanup = () => clearInterval(intervalID);
    } else {
      cleanup = () => null;
    }
    if (direction != null) {
      fetchState(direction);
    }

    return cleanup;

  }, [isLive, isPlaying, direction]);

  return { evidence, agents, verdict };
}
