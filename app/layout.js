import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'Hindus.live — Live Darshan & Aarti from India’s Temples',
  description: 'Watch live darshan and aarti from temples across India, with today’s aarti schedule.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Mukta:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
