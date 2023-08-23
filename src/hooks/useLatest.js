import { useEffect, useState } from 'react';

export default function useLatestCases() {
  const [latestCase, setLatestCase] = useState(null);
  const [latestEvidence, setLatestEvidence] = useState(null);
  const [latestAgentsState, setLatestAgentsState] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await fetch('/api/latest');
      const { data } = await response.json();
      setLatestAgentsState(data.agents_state);
      setLatestEvidence(data.evidence);
      setLatestCase(data.case);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { latestCase, latestEvidence, latestAgentsState };
}
