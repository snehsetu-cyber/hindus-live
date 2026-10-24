const LINKS = [
  ['/#live', 'Live Darshan'],
  ['/panchang', 'Panchang'],
  ['/aarti', 'Aarti'],
  ['/puja', 'Puja Vidhi'],
  ['/#all', 'Temples'],
];

function Diya() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <path d="M13 3c3 4 3 7 0 10-3-3-3-6 0-10z" fill="#F57C00" />
      <path d="M4 17h18c-1 4-5 6-9 6s-8-2-9-6z" fill="#F2A20C" />
    </svg>
  );
}

export default function SiteHeader() {
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <a href="/" className="logo"><Diya /><span className="lw">Hindus<span>.live</span></span></a>
        <nav aria-label="Main" className="nav desk">
          {LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <details className="mnav">
          <summary aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </summary>
          <nav aria-label="Main">
            {LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
        </details>
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
