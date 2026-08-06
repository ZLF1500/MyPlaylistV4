export default function FloatingNotes() {
  const notes = ["♪", "♫", "🥬", "♪", "✨", "♫"];
  return (
    <div className="mm-notes pointer-events-none fixed inset-0">
      {notes.map((n, i) => (
        <span key={i} className={`mm-note mm-note-${i}`}>{n}</span>
      ))}
    </div>
  );
}
