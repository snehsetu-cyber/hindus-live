export default function SiteHeader() {
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <a href="/" className="logo">Hindus<span>.live</span></a>
        <nav aria-label="Main" className="nav">
          <a href="/#live">Live Darshan</a>
          <a href="/panchang">Panchang</a>
          <a href="/aarti">Aarti</a>
          <a href="/#soon">Aarti Times</a>
          <a href="/#all">All Temples</a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ children }) {
  return (
    <footer className="footer">
      <div className="wrap">{children}</div>
    </footer>
  );
}
