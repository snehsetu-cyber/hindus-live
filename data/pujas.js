// Puja vidhi guides. Each guide: intro, samagri (grouped checklist), steps, tips, faqs.
// `muhurat` names a calculation in lib/muhurat.js; `buy` on a samagri item is reserved for
// shop/affiliate links later.
//
// Written in our own words from common North Indian practice. Customs vary by region and
// family — have a pandit review each guide before promoting it.

export const pujas = [
  {
    slug: 'diwali-lakshmi-puja',
    festival: 'Diwali',
    muhurat: 'lakshmiPuja',
    title: { en: 'Diwali Lakshmi Puja', hi: 'दिवाली लक्ष्मी पूजा' },
    summary: 'How to do Lakshmi–Ganesh puja at home on Diwali: muhurat for your city, the full samagri list and step-by-step vidhi.',
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
