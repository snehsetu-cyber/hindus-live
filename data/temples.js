// Starter temple list for Hindus.live.
//
// IMPORTANT: channel IDs come from a public third-party list and could NOT be
// verified from the build environment. Before launch, open each channel
// (https://www.youtube.com/channel/<id>) and confirm it belongs to the temple
// trust, then set `verified: true`. The app hides unverified temples when
// SHOW_UNVERIFIED=0.
//
// Aarti times are in IST (24h "HH:MM"), taken from travel/temple guides and
// they change seasonally and on festivals; confirm with each temple.
//   days: optional array of weekdays (0=Sun … 6=Sat) the aarti applies to.
//
// Fields:
//   channelId     YouTube channel to watch for live/upcoming streams
//   pinnedVideoId optional: a 24x7 stream's video ID (old 24x7 streams can drop
//                 out of the channel's RSS feed, so pin them here)
//   officialUrl   the temple's own live page (used when there is no channel,
//                 or embedding is disabled)

export const temples = [
  {
    id: 'somnath',
    name: 'Somnath Jyotirlinga',
    nameHi: 'सोमनाथ ज्योतिर्लिंग',
    place: 'Prabhas Patan, Gujarat',
    channelId: 'UCT1egsvA08YcdMLiEu1DTRg',
    officialUrl: 'https://somnath.org/somnath-live-darshan',
    verified: false,
    aartis: [
      { name: 'Mangala Aarti', time: '07:00' },
      { name: 'Madhyahna Aarti', time: '12:00' },
      { name: 'Sandhya Aarti', time: '19:00' },
    ],
  },
  {
    id: 'mahakaleshwar',
    name: 'Mahakaleshwar Jyotirlinga',
    nameHi: 'महाकालेश्वर ज्योतिर्लिंग',
    place: 'Ujjain, Madhya Pradesh',
    channelId: 'UC7q12ONY2mvuq066rreluhQ',
    officialUrl: 'https://shrimahakaleshwar.mp.gov.in/live-darshan',
    verified: false,
    aartis: [
      { name: 'Bhasma Aarti', time: '04:00' },
      { name: 'Morning Aarti', time: '07:00' },
      { name: 'Bhog Aarti', time: '10:00' },
      { name: 'Sandhya Aarti', time: '17:00' },
      { name: 'Shayan Aarti', time: '22:30' },
    ],
  },
  {
    id: 'siddhivinayak',
    name: 'Shree Siddhivinayak',
    nameHi: 'श्री सिद्धिविनायक',
    place: 'Prabhadevi, Mumbai',
    channelId: 'UCA99DrZabMr0ZncelhO6TkQ',
    officialUrl: 'https://www.siddhivinayak.org/live-darshan/',
    verified: false,
    aartis: [
      { name: 'Kakad Aarti', time: '05:30', days: [0, 1, 3, 4, 5, 6] },
      { name: 'Kakad Aarti', time: '05:00', days: [2] },
      { name: 'Evening Aarti', time: '19:30', days: [0, 1, 3, 4, 5, 6] },
      { name: 'Night Aarti', time: '21:30', days: [2] },
      { name: 'Shej Aarti', time: '21:50', days: [0, 1, 3, 4, 5, 6] },
    ],
  },
  {
    id: 'dwarkadhish',
    name: 'Shri Dwarkadhish',
    nameHi: 'श्री द्वारकाधीश',
    place: 'Dwarka, Gujarat',
    channelId: 'UCBAvMHZO3BIfMMhOK9LMOYQ',
    officialUrl: null,
    verified: false,
    aartis: [
      { name: 'Mangla Aarti', time: '06:30' },
      { name: 'Shringar Aarti', time: '10:30' },
      { name: 'Sandhya Aarti', time: '19:30' },
      { name: 'Shayan Aarti', time: '20:30' },
    ],
  },
  {
    id: 'mahalakshmi-mumbai',
    name: 'Shree Mahalakshmi Mandir',
    nameHi: 'श्री महालक्ष्मी मंदिर',
    place: 'Mumbai',
    channelId: 'UCqNGTFK0_nHU2Ldj3ZKScYw',
    officialUrl: null,
    verified: false,
    aartis: [
      { name: 'Morning Aarti', time: '07:00' },
      { name: 'Evening Aarti', time: '19:30' },
      { name: 'Shej Aarti', time: '22:00' },
    ],
  },
  {
    id: 'tirumala',
    name: 'Tirumala Venkateswara (SVBC)',
    nameHi: 'तिरुमला वेंकटेश्वर',
    place: 'Tirumala, Andhra Pradesh',
    channelId: 'UCS2Y83GD-fc7qqgNW5uj41g',
    officialUrl: null,
    verified: false,
    aartis: [],
  },
  {
    id: 'salasar',
    name: 'Shree Salasar Balaji',
    nameHi: 'श्री सालासर बालाजी',
    place: 'Churu, Rajasthan',
    channelId: 'UC82-0zBQho_hyV10fFAAeQA',
    officialUrl: null,
    verified: false,
    aartis: [],
  },
  {
    id: 'radhavallabh',
    name: 'Shri Radhavallabh Mandir',
    nameHi: 'श्री राधावल्लभ मंदिर',
    place: 'Vrindavan, Uttar Pradesh',
    channelId: 'UCTw4wtqF6KEA8ULDSi_6fUQ',
    officialUrl: null,
    verified: false,
    aartis: [],
  },
  {
    id: 'iskcon-juhu',
    name: 'ISKCON Juhu',
    nameHi: 'इस्कॉन जुहू',
    place: 'Mumbai',
    channelId: 'UC1vJ4RlWSHP6n0xL2G1tkYQ',
    officialUrl: null,
    verified: false,
    aartis: [],
  },
  // Temples whose official stream lives on their own website (link-out cards).
  {
    id: 'kashi-vishwanath',
    name: 'Shri Kashi Vishwanath',
    nameHi: 'श्री काशी विश्वनाथ',
    place: 'Varanasi, Uttar Pradesh',
    channelId: null,
    officialUrl: 'https://shrikashivishwanath.org/online/live_darshan',
    verified: true,
    aartis: [],
  },
  {
    id: 'vaishno-devi',
    name: 'Mata Vaishno Devi',
    nameHi: 'माता वैष्णो देवी',
    place: 'Katra, Jammu & Kashmir',
    channelId: null,
    officialUrl: 'https://www.maavaishnodevi.org/live',
    verified: true,
    aartis: [],
  },
];
