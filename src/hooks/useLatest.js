import { useEffect, useState } from 'react';

export default function useLatest(isPlaying, progress, direction, setProgress, setDirection, isLive, setIsLive, room) {

  const [courtCase, setCourtCase] = useState(null);
  const [evidence, setEvidence] = useState(null);
  const [agentsState, setAgentsState] = useState(null);
  const [verdict, setVerdict] = useState(null);

  useEffect(() => {
    let cleanup;

    async function fetchState(direction) {
      let url;

      if (isLive) {
        url = `/api/state?room=${room}&latest=true`;
      } else if (direction === 'back') {
        url = `/api/state?room=${room}&before=${progress}`;
      } else if (direction === 'forward') {
        url = `/api/state?room=${room}&after=${progress}`;
      } else if (direction === "start") {
        url = `/api/state?room=${room}`;
      } else {
        return;
      }

      const response = await fetch(url);
      const { data, time, live } = await response.json();

      progress = time;
      setProgress(time);
      setDirection(null);

      // hack to get past first screen quickly
      if (isPlaying && data.agents_state == null) {
        setTimeout(() => setDirection("forward"), 2000);
      }

      if (live && isPlaying) {
        setIsLive(live);
      } else if (!live) {
        setAgentsState(data.agents_state);
        setEvidence(data.evidence);
        setCourtCase(data.case);
        setVerdict(data.verdict);
      }
    }

    if (isPlaying) {
      const intervalID = setInterval(() => fetchState(direction == "start" ? "start" : "forward"), isLive ? 1000 : 20000);
      cleanup = () => clearInterval(intervalID);
    } else {
      cleanup = () => null;
    }
    if (direction != null) {
      fetchState(direction);
    }

    return cleanup;

  }, [isLive, isPlaying, direction, courtCase]);

  return { courtCase, evidence, agentsState, verdict };
}
