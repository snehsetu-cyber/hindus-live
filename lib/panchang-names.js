export const TITHI = {
  list: [
    { en: 'Pratipada', hi: 'प्रतिपदा' },
    { en: 'Dwitiya', hi: 'द्वितीया' },
    { en: 'Tritiya', hi: 'तृतीया' },
    { en: 'Chaturthi', hi: 'चतुर्थी' },
    { en: 'Panchami', hi: 'पंचमी' },
    { en: 'Shashthi', hi: 'षष्ठी' },
    { en: 'Saptami', hi: 'सप्तमी' },
    { en: 'Ashtami', hi: 'अष्टमी' },
    { en: 'Navami', hi: 'नवमी' },
    { en: 'Dashami', hi: 'दशमी' },
    { en: 'Ekadashi', hi: 'एकादशी' },
    { en: 'Dwadashi', hi: 'द्वादशी' },
    { en: 'Trayodashi', hi: 'त्रयोदशी' },
    { en: 'Chaturdashi', hi: 'चतुर्दशी' },
  ],
  purnima: { en: 'Purnima', hi: 'पूर्णिमा' },
  amavasya: { en: 'Amavasya', hi: 'अमावस्या' },
};

export const PAKSHA_HI = { Shukla: 'शुक्ल पक्ष', Krishna: 'कृष्ण पक्ष' };

export const NAKSHATRA = [
  ['Ashwini', 'अश्विनी'], ['Bharani', 'भरणी'], ['Krittika', 'कृत्तिका'], ['Rohini', 'रोहिणी'],
  ['Mrigashira', 'मृगशिरा'], ['Ardra', 'आर्द्रा'], ['Punarvasu', 'पुनर्वसु'], ['Pushya', 'पुष्य'],
  ['Ashlesha', 'आश्लेषा'], ['Magha', 'मघा'], ['Purva Phalguni', 'पूर्वा फाल्गुनी'], ['Uttara Phalguni', 'उत्तरा फाल्गुनी'],
  ['Hasta', 'हस्त'], ['Chitra', 'चित्रा'], ['Swati', 'स्वाति'], ['Vishakha', 'विशाखा'],
  ['Anuradha', 'अनुराधा'], ['Jyeshtha', 'ज्येष्ठा'], ['Mula', 'मूल'], ['Purva Ashadha', 'पूर्वाषाढ़ा'],
  ['Uttara Ashadha', 'उत्तराषाढ़ा'], ['Shravana', 'श्रवण'], ['Dhanishta', 'धनिष्ठा'], ['Shatabhisha', 'शतभिषा'],
  ['Purva Bhadrapada', 'पूर्वा भाद्रपद'], ['Uttara Bhadrapada', 'उत्तरा भाद्रपद'], ['Revati', 'रेवती'],
].map(([en, hi]) => ({ en, hi }));

export const YOGA = [
  ['Vishkambha', 'विष्कम्भ'], ['Priti', 'प्रीति'], ['Ayushman', 'आयुष्मान'], ['Saubhagya', 'सौभाग्य'],
  ['Shobhana', 'शोभन'], ['Atiganda', 'अतिगण्ड'], ['Sukarma', 'सुकर्मा'], ['Dhriti', 'धृति'],
  ['Shula', 'शूल'], ['Ganda', 'गण्ड'], ['Vriddhi', 'वृद्धि'], ['Dhruva', 'ध्रुव'],
  ['Vyaghata', 'व्याघात'], ['Harshana', 'हर्षण'], ['Vajra', 'वज्र'], ['Siddhi', 'सिद्धि'],
  ['Vyatipata', 'व्यतीपात'], ['Variyan', 'वरीयान'], ['Parigha', 'परिघ'], ['Shiva', 'शिव'],
  ['Siddha', 'सिद्ध'], ['Sadhya', 'साध्य'], ['Shubha', 'शुभ'], ['Shukla', 'शुक्ल'],
  ['Brahma', 'ब्रह्म'], ['Indra', 'इन्द्र'], ['Vaidhriti', 'वैधृति'],
].map(([en, hi]) => ({ en, hi }));

export const KARANA_MOVABLE = [
  ['Bava', 'बव'], ['Balava', 'बालव'], ['Kaulava', 'कौलव'], ['Taitila', 'तैतिल'],
  ['Garaja', 'गर'], ['Vanija', 'वणिज'], ['Vishti (Bhadra)', 'विष्टि (भद्रा)'],
].map(([en, hi]) => ({ en, hi }));

// index 0-2: the three fixed karanas at the end of Krishna Chaturdashi/Amavasya; 3: first half of Shukla Pratipada
export const KARANA_FIXED = [
  ['Shakuni', 'शकुनि'], ['Chatushpada', 'चतुष्पद'], ['Naga', 'नाग'], ['Kimstughna', 'किंस्तुघ्न'],
].map(([en, hi]) => ({ en, hi }));

export const MONTHS = [
  ['Chaitra', 'चैत्र'], ['Vaishakha', 'वैशाख'], ['Jyeshtha', 'ज्येष्ठ'], ['Ashadha', 'आषाढ़'],
  ['Shravana', 'श्रावण'], ['Bhadrapada', 'भाद्रपद'], ['Ashwin', 'आश्विन'], ['Kartika', 'कार्तिक'],
  ['Margashirsha', 'मार्गशीर्ष'], ['Pausha', 'पौष'], ['Magha', 'माघ'], ['Phalguna', 'फाल्गुन'],
].map(([en, hi]) => ({ en, hi }));

export const RASHI = [
  ['Mesha', 'मेष', 'Aries'], ['Vrishabha', 'वृषभ', 'Taurus'], ['Mithuna', 'मिथुन', 'Gemini'],
  ['Karka', 'कर्क', 'Cancer'], ['Simha', 'सिंह', 'Leo'], ['Kanya', 'कन्या', 'Virgo'],
  ['Tula', 'तुला', 'Libra'], ['Vrishchika', 'वृश्चिक', 'Scorpio'], ['Dhanu', 'धनु', 'Sagittarius'],
  ['Makara', 'मकर', 'Capricorn'], ['Kumbha', 'कुम्भ', 'Aquarius'], ['Meena', 'मीन', 'Pisces'],
].map(([en, hi, west]) => ({ en, hi, west }));

export const WEEKDAYS = [
  ['Sunday', 'रविवार'], ['Monday', 'सोमवार'], ['Tuesday', 'मंगलवार'], ['Wednesday', 'बुधवार'],
  ['Thursday', 'गुरुवार'], ['Friday', 'शुक्रवार'], ['Saturday', 'शनिवार'],
].map(([en, hi]) => ({ en, hi }));
