export default function GuiltyBars({ guiltyPercent, innocentPercent }) {
  const getBackgroundColor = (guiltyPercent) => {
    if (guiltyPercent > 95) return 'bg-red-500';
    if (guiltyPercent > 75) return 'bg-orange-400';
    if (guiltyPercent > 55) return 'bg-orange-400';
    if (guiltyPercent > 45) return 'bg-slate-500';
    return 'bg-lime-600';
  }

  return (
    <div className={`
      inline-flex items-center text-white text-lg font-bold border-white px-2 py-4 text-center rounded-full drop-shadow-lg
      ${getBackgroundColor(guiltyPercent)}`}>
      <span className="mr-1">{guiltyPercent}%</span>
      <span className="text-base sr-only">guilty</span>
    </div>
  );
}
