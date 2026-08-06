import { Disc3 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mm-footer flex flex-col items-start justify-between gap-4 px-4 sm:px-6 md:px-10 py-8 md:flex-row md:items-center">
      <div>
        <div className="flex items-center gap-2 font-display text-base font-semibold">
          <Disc3 size={15} className="mm-accent-text" /> <span>Zoe Library</span>
        </div>
        <p className="mt-1 text-xs mm-muted">© 2026 Zoe Library · dibuat dengan 💙 untuk Miku</p>
      </div>
      <div className="flex gap-5 text-xs mm-muted">
        <a href="#" className="hover:opacity-80">About</a>
        <a href="#" className="hover:opacity-80">Privacy</a>
        <a href="#" className="hover:opacity-80">Terms</a>
        <a href="#" className="hover:opacity-80">Contact</a>
      </div>
    </footer>
  );
}
