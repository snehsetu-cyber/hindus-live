// Puja vidhi guides. Each guide: intro, samagri (grouped checklist), steps, tips, faqs.
// `muhurat` names a calculation in lib/muhurat.js; `buy` on a samagri item is reserved for
// shop/affiliate links later.
//
// Written in our own words from common North Indian practice. Customs vary by region and
// family — have a pandit review each guide before promoting it.

export const pujas = [
  {
    slug: 'dhanteras-puja',
    festival: 'Dhanteras',
    festivalHi: 'धनतेरस',
    muhurat: 'dhanteras',
    title: { en: 'Dhanteras Puja', hi: 'धनतेरस पूजा' },
    summary: 'How to do Dhanteras puja at home: muhurat for your city, Yama Deepam, the samagri list, step-by-step vidhi and what to buy.',
    metaLine: 'Samagri list, Yama Deepam and step-by-step Dhanvantari, Kuber and Lakshmi puja at home.',
    intro: [
      'Dhanteras, or Dhantrayodashi, opens the five days of Diwali. It falls on the Trayodashi of Kartik Krishna paksha, two days before Lakshmi Puja. Families worship Lord Dhanvantari for good health, and Kuber and Goddess Lakshmi for prosperity.',
      'It is also the day for buying something new for the home — usually metal utensils, silver or gold, or a new broom — and for lighting the Yama Deepam after sunset, a lamp for the protection of the family. The evening puja is done in Pradosh Kaal, ideally while the steady Vrishabha lagna rises and Trayodashi is still on.',
    ],
    samagri: [
      {
        group: 'For the altar', hi: 'चौकी के लिए',
        items: [
          ['Wooden chowki (low stool)', 'लकड़ी की चौकी'],
          ['Red or yellow cloth', 'लाल या पीला कपड़ा'],
          ['Lakshmi and Ganesh idols or a picture', 'लक्ष्मी-गणेश की मूर्ति या चित्र'],
          ['Kuber picture or idol (optional)', 'कुबेर का चित्र (वैकल्पिक)'],
          ['Dhanvantari picture (optional)', 'धन्वंतरि का चित्र (वैकल्पिक)'],
          ['Kalash with mango leaves', 'कलश और आम के पत्ते'],
          ['Asan (mat) to sit on', 'आसन'],
        ],
      },
      {
        group: 'Puja thali', hi: 'पूजा की थाली',
        items: [
          ['Roli or kumkum', 'रोली / कुमकुम'],
          ['Haldi (turmeric)', 'हल्दी'],
          ['Akshat (unbroken rice)', 'अक्षत'],
          ['Gangajal', 'गंगाजल'],
          ['Mauli / kalava', 'मौली / कलावा'],
          ['Incense sticks and dhoop', 'अगरबत्ती और धूप'],
          ['Camphor', 'कपूर'],
          ['Paan and supari', 'पान और सुपारी'],
        ],
      },
      {
        group: 'Flowers and bhog', hi: 'फूल और भोग',
        items: [
          ['Marigold flowers and garland', 'गेंदे के फूल और माला'],
          ['Sweets', 'मिठाई'],
          ['Jaggery and coriander seeds (dhaniya)', 'गुड़ और साबुत धनिया'],
          ['Seasonal fruits', 'फल'],
        ],
      },
      {
        group: 'Lamps', hi: 'दीपक',
        items: [
          ['Ghee diya for the altar', 'घी का दीपक'],
          ['Four-wick diya for Yama Deepam (clay or wheat dough)', 'चौमुखा दीपक (यम दीपक)'],
          ['Mustard oil', 'सरसों का तेल'],
          ['Cotton wicks', 'रुई की बत्ती'],
          ['Clay diyas (13 is traditional in many homes)', 'मिट्टी के दीये'],
        ],
      },
      {
        group: 'Dhanteras purchase', hi: 'धनतेरस की खरीदारी',
        items: [
          ['A new metal utensil (brass, copper or steel)', 'नया बर्तन'],
          ['Silver or gold coin (optional)', 'चांदी या सोने का सिक्का'],
          ['New broom', 'नई झाड़ू'],
          ['Gomti chakra (optional)', 'गोमती चक्र (वैकल्पिक)'],
        ],
      },
    ],
    steps: [
      {
        title: 'Clean and decorate the home', hi: 'घर की सफाई और सजावट', when: 'During the day',
        text: 'Finish the Diwali cleaning, especially the entrance and the puja corner. Hang a toran on the main door and make a rangoli at the entrance.',
      },
      {
        title: 'Buy something new', hi: 'नई वस्तु की खरीदारी', when: 'During the day or evening',
        text: 'Buying a new utensil, silver or gold, or a new broom on Dhanteras is believed to bring prosperity. Many families put a little water, rice or sweets into a new vessel before bringing it home, rather than bringing it in empty.',
      },
      {
        title: 'Set up the altar', hi: 'चौकी सजाएं', when: 'Before the muhurat',
        text: 'Cover the chowki with the red cloth and seat Lakshmi and Ganesh, with Kuber and Dhanvantari pictures if you have them. Place the kalash, light the ghee diya and keep the thali ready. Put the day’s new purchases, coins and jewellery near the altar.',
      },
      {
        title: 'Purify and take the sankalp', hi: 'शुद्धि और संकल्प', when: 'When the muhurat begins',
        text: 'Sit facing east or north. Sprinkle Gangajal on yourself and the altar. With water, akshat and a flower in your right hand, say your name, the place and the date, and that you are doing Dhanteras puja for your family’s health and prosperity.',
      },
      {
        title: 'Worship Ganesh first', hi: 'गणेश पूजन',
        text: 'Offer water, roli, akshat, flowers and a sweet to Ganesh and pray that the puja goes ahead without obstacles.',
        mantra: 'ॐ गं गणपतये नमः',
      },
      {
        title: 'Worship Lord Dhanvantari', hi: 'धन्वंतरि पूजन',
        text: 'Dhanvantari, the physician of the gods, appeared on this day. Offer flowers, akshat and naivedya and pray for good health for everyone in the family. Many families offer jaggery mixed with coriander seeds.',
        mantra: 'ॐ धन्वंतरये नमः',
      },
      {
        title: 'Worship Kuber and Lakshmi', hi: 'कुबेर और लक्ष्मी पूजन',
        text: 'Offer roli, haldi, akshat, flowers and sweets to Lakshmi and Kuber. Put a tilak on the new purchases, coins and jewellery and offer them a flower. Pray for prosperity earned honestly.',
        mantra: 'ॐ महालक्ष्म्यै नमः',
      },
      {
        title: 'Light the Yama Deepam', hi: 'यम दीपदान', when: 'After sunset',
        text: 'Light the four-wick diya with mustard oil and place it outside the main door, facing south, for the protection of the family. Then light the clay diyas around the home.',
      },
      {
        title: 'Perform the aarti', hi: 'आरती',
        text: 'Perform the Ganesh aarti, and many families also sing Om Jai Jagdish Hare. Finish with the Karpur Gauram verse while offering the camphor flame.',
        links: [['Jai Ganesh Deva', '/aarti/jai-ganesh-deva'], ['Om Jai Jagdish Hare', '/aarti/om-jai-jagdish-hare'], ['Karpur Gauram', '/aarti/karpur-gauram']],
      },
      {
        title: 'Prayer and prasad', hi: 'प्रार्थना और प्रसाद',
        text: 'Bow down, ask forgiveness for any mistakes in the puja, and share the prasad with the family.',
      },
    ],
    tips: [
      'Do the puja within the muhurat for your city; the Yama Deepam is lit in Pradosh Kaal, after sunset.',
      'Many families avoid buying sharp iron objects, glass and black items on Dhanteras, and avoid bringing home an empty vessel.',
      'Lakshmi Puja is two days later, on Diwali — keep the new utensils and coins for that puja too.',
      'Keep lit diyas away from curtains and out of reach of children and pets.',
    ],
    faqs: [
      ['Why is Dhanteras celebrated?', 'It marks the appearance of Lord Dhanvantari, the god of health, and begins the Diwali festival. Families pray for health and prosperity and buy something new for the home.'],
      ['What should I buy on Dhanteras?', 'Commonly a metal utensil, a silver or gold coin, or a new broom. What matters is buying something useful for the home; it does not have to be expensive.'],
      ['What is Yama Deepam?', 'A four-wick lamp lit outside the main door, facing south, on Dhanteras evening. It is offered to Yamaraj for the protection of the family.'],
      ['Can I do the puja without a pandit?', 'Yes. Most families do it themselves at home following steps like these. Follow your family’s own tradition where it differs.'],
    ],
  },
  {
    slug: 'diwali-lakshmi-puja',
    festival: 'Diwali',
    festivalHi: 'दीपावली',
    muhurat: 'lakshmiPuja',
    title: { en: 'Diwali Lakshmi Puja', hi: 'दिवाली लक्ष्मी पूजा' },
    summary: 'How to do Lakshmi–Ganesh puja at home on Diwali: muhurat for your city, the full samagri list and step-by-step vidhi.',
    metaLine: 'Full samagri list and step-by-step Lakshmi–Ganesh puja vidhi at home.',
    intro: [
      'Lakshmi Puja is the heart of Diwali. On the evening of Kartik Amavasya, families clean and light up their homes to welcome Goddess Lakshmi, who brings wealth, well-being and good fortune. Ganesh is worshipped first, as at the start of every puja, so that the worship goes ahead without obstacles.',
      'You do not need a pandit to do this puja at home. What matters most is a clean home, a sincere heart and doing the puja in the right muhurat — the evening window when Pradosh Kaal, the steady Vrishabha lagna and Amavasya all overlap.',
    ],
    samagri: [
      {
        group: 'For the altar', hi: 'चौकी के लिए',
        items: [
          ['Wooden chowki (low stool)', 'लकड़ी की चौकी'],
          ['Red or yellow cloth to cover it', 'लाल या पीला कपड़ा'],
          ['Lakshmi and Ganesh idols or a picture', 'लक्ष्मी-गणेश की मूर्ति या चित्र'],
          ['Kalash (copper or brass pot)', 'कलश'],
          ['5 mango leaves', 'आम के पत्ते'],
          ['Coconut with husk', 'जटा वाला नारियल'],
          ['Mauli / kalava (sacred red thread)', 'मौली / कलावा'],
          ['Asan (mat) to sit on', 'आसन'],
        ],
      },
      {
        group: 'Puja thali', hi: 'पूजा की थाली',
        items: [
          ['Roli or kumkum', 'रोली / कुमकुम'],
          ['Haldi (turmeric)', 'हल्दी'],
          ['Chandan (sandalwood paste)', 'चंदन'],
          ['Akshat (unbroken rice)', 'अक्षत (साबुत चावल)'],
          ['Supari (betel nuts)', 'सुपारी'],
          ['Paan (betel leaves)', 'पान के पत्ते'],
          ['Gangajal', 'गंगाजल'],
          ['Panchamrit: milk, curd, ghee, honey, sugar', 'पंचामृत'],
          ['Incense sticks and dhoop', 'अगरबत्ती और धूप'],
          ['Camphor', 'कपूर'],
          ['Bell', 'घंटी'],
          ['Cardamom and cloves', 'इलायची और लौंग'],
        ],
      },
      {
        group: 'Flowers', hi: 'फूल',
        items: [
          ['Marigold garlands', 'गेंदे की माला'],
          ['Lotus flowers (Lakshmi’s favourite)', 'कमल का फूल'],
          ['Red flowers / roses', 'लाल फूल'],
          ['Durva grass for Ganesh', 'दूर्वा'],
        ],
      },
      {
        group: 'Bhog (offerings)', hi: 'भोग',
        items: [
          ['Kheel and batashe', 'खील-बताशे'],
          ['Sweets or laddoos', 'मिठाई / लड्डू'],
          ['Seasonal fruits', 'फल'],
          ['Dry fruits', 'मेवे'],
        ],
      },
      {
        group: 'Lamps', hi: 'दीपक',
        items: [
          ['One large lamp for ghee (the main diya)', 'घी का बड़ा दीपक'],
          ['Clay diyas (11, 21 or more)', 'मिट्टी के दीये'],
          ['Cotton wicks', 'रुई की बत्ती'],
          ['Ghee and mustard oil', 'घी और सरसों का तेल'],
          ['Matchbox', 'माचिस'],
        ],
      },
      {
        group: 'For Lakshmi and wealth puja', hi: 'लक्ष्मी और धन पूजा के लिए',
        items: [
          ['Red chunri for Lakshmi', 'लाल चुनरी'],
          ['Silver or new coins', 'चांदी या नए सिक्के'],
          ['Account books and a pen (for business owners)', 'बही-खाता और कलम'],
          ['Lakshmi footprints / charan paduka (optional)', 'लक्ष्मी चरण (वैकल्पिक)'],
          ['Shri Yantra (optional)', 'श्री यंत्र (वैकल्पिक)'],
        ],
      },
      {
        group: 'Decoration', hi: 'सजावट',
        items: [
          ['Rangoli colours', 'रंगोली के रंग'],
          ['Toran / bandanwar for the door', 'तोरण / बंदनवार'],
        ],
      },
    ],
    steps: [
      {
        title: 'Prepare the home', hi: 'घर की तैयारी', when: 'During the day',
        text: 'Clean the whole house, especially the puja corner and the main entrance — Lakshmi is believed to enter only a clean home. Hang a toran of mango leaves and marigolds over the door and make a rangoli at the entrance. Many families draw small Lakshmi footprints walking into the house.',
      },
      {
        title: 'Set up the altar', hi: 'चौकी सजाएं', when: 'Before the muhurat',
        text: 'Place the chowki in the north-east of the room if you can, so that you will face east or north while praying. Cover it with the red cloth. Seat Ganesh and Lakshmi side by side, in the way your family does. Fill the kalash with water and add a coin, a supari, a little rice and a flower; set five mango leaves in its mouth, place the coconut on top and tie mauli around the neck. Put the kalash on the chowki, light the main ghee diya and keep the thali ready. Bathe and wear clean clothes.',
      },
      {
        title: 'Purify and take the sankalp', hi: 'शुद्धि और संकल्प', when: 'When the muhurat begins',
        text: 'Sit on the asan facing east or north. Sprinkle a little Gangajal on yourself, the altar and the samagri. Take some water, akshat and a flower in your right hand, say your name, your family’s gotra if you know it, the place and the date, and say that you are doing Lakshmi Puja for the well-being of your family. Then let the water and rice fall on a plate.',
      },
      {
        title: 'Worship the kalash', hi: 'कलश पूजन',
        text: 'Put a tilak of roli on the kalash and offer akshat and a flower. The kalash stands for all the sacred waters and the gods, and is worshipped before the deities.',
      },
      {
        title: 'Worship Ganesh first', hi: 'गणेश पूजन',
        text: 'Offer water, then a tilak of roli and akshat, durva grass, flowers and a laddoo or other sweet to Ganesh. Chant “ॐ गं गणपतये नमः” and ask him to remove all obstacles.',
        mantra: 'ॐ गं गणपतये नमः',
      },
      {
        title: 'Worship Goddess Lakshmi', hi: 'लक्ष्मी पूजन',
        text: 'With folded hands and a flower, invite Lakshmi to the altar. Bathe the idol with water, then panchamrit, then clean water again and wipe it dry (for a picture, just sprinkle a few drops). Offer the red chunri, roli, haldi, chandan and akshat, then the lotus, flowers and garland. Offer kheel-batashe, sweets, fruits and dry fruits, with paan, supari, cardamom and cloves. Chant “ॐ महालक्ष्म्यै नमः” 11, 21 or 108 times.',
        mantra: 'ॐ महालक्ष्म्यै नमः',
      },
      {
        title: 'Worship wealth and account books', hi: 'धन और बही-खाता पूजन',
        text: 'Place the coins, any jewellery and the account books and pen near Lakshmi. Put a tilak on them and offer flowers and akshat. Business owners draw a swastik and write “शुभ लाभ” on the first page of the new account book. Pray for prosperity earned honestly.',
      },
      {
        title: 'Light the diyas', hi: 'दीपदान',
        text: 'Light the clay diyas from the main diya and place them around the home: at the entrance, in the kitchen, near the water source, by the tulsi plant and on balconies and windows.',
      },
      {
        title: 'Perform the aarti', hi: 'आरती',
        text: 'With the whole family together, perform the Lakshmi aarti and then the Ganesh aarti, ringing the bell, and many families close with Om Jai Jagdish Hare. Finish with the Karpur Gauram verse while offering the camphor flame.',
        links: [['Jai Ganesh Deva', '/aarti/jai-ganesh-deva'], ['Om Jai Jagdish Hare', '/aarti/om-jai-jagdish-hare'], ['Karpur Gauram', '/aarti/karpur-gauram']],
      },
      {
        title: 'Pushpanjali, prayer and prasad', hi: 'पुष्पांजलि, क्षमा प्रार्थना और प्रसाद',
        text: 'Offer a last handful of flowers, bow down and ask forgiveness for any mistakes made during the puja. Share the kheel-batashe and sweets as prasad with family and neighbours. Many families keep the main diya burning through the night — if you do, keep it somewhere safe.',
      },
    ],
    tips: [
      'Do the puja within the muhurat for your city; if you miss it, do it in Pradosh Kaal while Amavasya is still on.',
      'For home worship, a Ganesh idol whose trunk turns to his left is the common recommendation.',
      'Many families buy new idols each year and immerse or respectfully keep the old ones.',
      'Never leave lit diyas unattended near curtains, and keep children and pets away from crackers.',
      'Clay diyas and natural colours for rangoli are kinder to the environment.',
    ],
    faqs: [
      ['Can I do Lakshmi Puja without a pandit?', 'Yes. Most families do it themselves at home, following the steps on this page. If your family has its own tradition or pandit, follow that.'],
      ['Can I use a picture instead of an idol?', 'Yes. A framed picture of Lakshmi and Ganesh is fine; sprinkle water on it instead of bathing it.'],
      ['What if I miss the muhurat?', 'The puja can still be done during Pradosh Kaal while Amavasya prevails. Nishita Kaal, around midnight, is mainly followed by those doing tantric or special sadhana.'],
      ['Which mantra should I chant?', '“ॐ महालक्ष्म्यै नमः” is a simple and widely used Lakshmi mantra; chant it 11, 21 or 108 times.'],
    ],
  },
];

export const pujaBySlug = (slug) => pujas.find((p) => p.slug === slug) || null;
