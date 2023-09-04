export default function GuiltyBars({ guiltyPercent, innocentPercent }) {
  return (
    <div className="relative bg-black flex justify-between p-3">
      <div
        className="absolute bg-green-500 bg-opacity-70 transition-all duration-500"
        style={{
          width: `${innocentPercent / 2}%`,
          right: '50%',
          height: "14px",
        }}
      />
      <div
        className="absolute bg-red-500 bg-opacity-70 transition-all duration-500"
        style={{
          width: `${guiltyPercent / 2}%`,
          left: '50%',
          height: "14px",
        }}
      />
      <span className="relative text-white">Innocent</span>
      <span className="relative text-white">Guilty</span>
    </div>
  );
}
