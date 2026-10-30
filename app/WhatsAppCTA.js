// "Follow on WhatsApp" calls to action, all pointing at the Panchang Live channel.
export const WHATSAPP_CHANNEL = 'https://www.whatsapp.com/channel/0029VbD6gsHK5cDO8auel93S';

export function ChatIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20l1.4-4.2A8 8 0 1 1 8.4 18.8L4 20z" />
      <path d="M9 10h6M9 13.5h4" strokeLinecap="round" />
    </svg>
  );
}

// Small pill, used in the header.
export function WhatsAppPill() {
  return (
    <a className="wa-pill" href={WHATSAPP_CHANNEL} target="_blank" rel="noopener noreferrer" aria-label="Follow Panchang Live on WhatsApp">
      <ChatIcon size={16} /><span>Follow</span>
    </a>
  );
}

// Banner, used in page bodies. `line` is the pitch for that page.
export default function WhatsAppCTA({ line = 'Get today’s panchang, muhurat and festival dates every morning at 6 AM.', compact = false }) {
  return (
    <aside className={`wa-cta ${compact ? 'compact' : ''}`} aria-label="Follow on WhatsApp">
      <div className="wa-text">
        <strong lang="hi">रोज़ सुबह का पंचांग, WhatsApp पर</strong>
        <span>{line}</span>
      </div>
      <a className="wa-btn" href={WHATSAPP_CHANNEL} target="_blank" rel="noopener noreferrer">
        <ChatIcon />Follow on WhatsApp
      </a>
    </aside>
  );
}
