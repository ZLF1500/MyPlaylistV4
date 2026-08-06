export default function Equalizer() {
  const bars = Array.from({ length: 24 });
  return (
    <div className="mm-eq pointer-events-none absolute" style={{ left: "8%", right: "4%", top: "14%", bottom: "18%" }}>
      {bars.map((_, i) => (
        <span key={i} className="mm-eq-bar" style={{ animationDelay: `${(i % 7) * 0.13}s`, left: `${(i / bars.length) * 100}%` }} />
      ))}
    </div>
  );
}
