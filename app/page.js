import { loadStatus } from '../lib/status.js';
import LiveBoard from './LiveBoard.js';

export const revalidate = 300;

export default async function Home() {
  const data = await loadStatus();
  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a href="/" className="logo">Hindus<span>.live</span></a>
          <nav aria-label="Main" className="nav">
            <a href="#live">Live Darshan</a>
            <a href="#soon">Aarti Schedule</a>
            <a href="#all">All Temples</a>
          </nav>
        </div>
      </header>
      <main>
        <LiveBoard initial={data} />
      </main>
      <footer className="footer">
        <div className="wrap">
          Streams are embedded from the temples’ own channels and remain theirs. Aarti times are in IST and can change on
          festivals — check with the temple.
        </div>
      </footer>
    </>
  );
}
