// ../src/app/data/destinations.ts
var categories = [
  { name: "All", icon: "compass" },
  { name: "Beaches", icon: "map-pin" },
  { name: "Mountains", icon: "map-pin" },
  { name: "Temples", icon: "map-pin" },
  { name: "Cities", icon: "map-pin" },
  { name: "Villages", icon: "map-pin" },
  { name: "Islands", icon: "map-pin" }
];
var regions = [
  { name: "All Regions", value: "all" },
  { name: "Sumatra", value: "sumatra" },
  { name: "Java", value: "java" },
  { name: "Bali", value: "bali" },
  { name: "Sulawesi", value: "sulawesi" },
  { name: "Kalimantan", value: "kalimantan" },
  { name: "Papua", value: "papua" },
  { name: "Nusa Tenggara", value: "nusatenggara" },
  { name: "Maluku", value: "maluku" }
];
var featuredDestinations = [
  {
    "id": "monumen-nasional",
    "name": "Monumen Nasional",
    "description": "An iconic 132m obelisk in Central Jakarta, symbolizing the struggle for Indonesian independence. It features a museum detailing Indonesian history and an observation deck offering panoramic city views.",
    "location": "Jakarta",
    "region": "DKI Jakarta",
    "category": "Budaya",
    "image": "/images/jakarta/monumen-nasional.jpg",
    "likes": 18,
    "rating": 4.5,
    "bestTimeToVisit": "Dry season (May to September), preferably weekdays to avoid crowds.",
    "entranceFee": "IDR 20,000 (Check official sources for current tiered pricing for museum/observation deck)",
    "activities": [
      "Visiting the National History Museum at the base",
      "Ascending to the observation deck for city views",
      "Relaxing or exercising in the surrounding Merdeka Square park",
      "Photography",
      "Attending occasional events held in the square"
    ],
    "coordinates": {
      "latitude": -6.1753924,
      "longitude": 106.827152
      // Longitude inferred from location
    },
    "transportation": [
      "TransJakarta Bus (Monas corridor stops)",
      "Ride-hailing apps (Gojek, Grab)",
      "Taxi",
      "KRL Commuter Line (Juanda or Gondangdia stations, short walk/ride)",
      "MRT (Bundaran HI station, requires additional transport)"
    ],
    "accommodations": {
      "budget": "IDR 200,000 - 400,000 (Hostels, basic hotels slightly further out)",
      "midRange": "IDR 500,000 - 1,500,000 (Numerous hotels in Central Jakarta)",
      "luxury": "IDR 1,800,000+ (International chain hotels nearby)"
    },
    "nearbyAttractions": [
      "Museum Nasional",
      "Masjid Istiqlal",
      "Gereja Katedral Jakarta",
      "Galeri Nasional Indonesia",
      "Istana Merdeka (Presidential Palace)"
    ]
  },
  {
    "id": "kota-tua",
    "name": "Kota Tua",
    "description": "Jakarta's historical Old Town area, showcasing well-preserved Dutch colonial architecture centered around Fatahillah Square. It houses several museums and offers a glimpse into the city's past.",
    "location": "Jakarta",
    "region": "DKI Jakarta",
    "category": "Budaya",
    "image": "/images/jakarta/kota-tua.jpg",
    "likes": 25,
    "rating": 4.4,
    "bestTimeToVisit": "Weekends for lively atmosphere, weekdays for fewer crowds. Dry season (May-Sep).",
    "entranceFee": "Free (access to the area), individual museum entrance fees apply (typically IDR 2,000 - 5,000 each)",
    "activities": [
      "Exploring Fatahillah Square",
      "Visiting Museums (Jakarta History/Fatahillah, Wayang, Fine Arts & Ceramics, Bank Indonesia)",
      "Renting colorful bicycles ('sepeda ontel')",
      "Street photography",
      "Trying local street food and drinks",
      "Visiting Cafe Batavia for a historical ambiance"
    ],
    "coordinates": {
      "latitude": -6.1376447,
      "longitude": 106.813012
      // Longitude inferred from location
    },
    "transportation": [
      "KRL Commuter Line (Jakarta Kota Station - terminus)",
      "TransJakarta Bus (Kota corridor stop)",
      "Ride-hailing apps (Gojek, Grab)",
      "Taxi"
    ],
    "accommodations": {
      "budget": "IDR 200,000 - 400,000 (Guesthouses in surrounding areas)",
      "midRange": "IDR 400,000 - 800,000 (Hotels near Mangga Dua or Glodok)",
      "luxury": "IDR 1,000,000+ (Fewer luxury options directly in Kota Tua, more towards Central Jakarta)"
    },
    "nearbyAttractions": [
      "Museum Fatahillah",
      "Museum Wayang",
      "Museum Bank Indonesia",
      "Pecinan Glodok (Chinatown)",
      "Pelabuhan Sunda Kelapa (Old Port)"
    ]
  },
  {
    "id": "dunia-fantasi",
    "name": "Dunia Fantasi",
    "description": "Jakarta's largest and most popular theme park, located within the Ancol Dreamland complex. Offers a wide variety of rides, from thrilling roller coasters to family-friendly attractions and shows.",
    "location": "Jakarta",
    "region": "DKI Jakarta",
    "category": "Taman Hiburan",
    "image": "/images/jakarta/dunia-fantasi.jpg",
    "likes": 19,
    "rating": 4.3,
    "bestTimeToVisit": "Weekdays and non-holiday periods to minimize queue times.",
    "entranceFee": "IDR 270,000 (Check official Ancol website for current prices and promotions, often bundled with Ancol entrance)",
    "activities": [
      "Riding roller coasters (Halilintar, Hysteria, Tornado)",
      "Enjoying themed zones and family rides (Istana Boneka, Bianglala)",
      "Watching parades and live performances",
      "Playing arcade and carnival games",
      "Dining at various food stalls and restaurants"
    ],
    "coordinates": {
      "latitude": -6.1253123,
      "longitude": 106.83455
      // Longitude inferred from location
    },
    "transportation": [
      "Taxi",
      "Ride-hailing apps (Gojek, Grab)",
      "Private vehicle (parking available)",
      "TransJakarta Bus (Ancol corridor stop)",
      "Ancol internal shuttle bus"
    ],
    "accommodations": {
      "budget": "IDR 300,000 - 600,000 (Hotels just outside Ancol)",
      "midRange": "IDR 700,000 - 1,500,000 (Hotels within Ancol complex like Putri Duyung Ancol, Mercure)",
      "luxury": "IDR 1,500,000+ (Limited luxury within Ancol, more options nearby)"
    },
    "nearbyAttractions": [
      "Sea World Ancol",
      "Atlantis Water Adventures",
      "Ocean Dream Samudra",
      "Pantai Ancol (Ancol Beach)",
      "Pasar Seni Ancol (Art Market)"
    ]
  },
  {
    "id": "taman-mini-indonesia-indah",
    "name": "Taman Mini Indonesia Indah",
    "description": "A vast cultural park showcasing the diversity of Indonesia. Features pavilions representing each province with traditional architecture, clothing, and crafts, along with museums, gardens, and recreational facilities.",
    "location": "Jakarta",
    "region": "DKI Jakarta",
    "category": "Taman Hiburan",
    "image": "/images/jakarta/taman-mini-indonesia-indah.jpg",
    "likes": 21,
    "rating": 4.2,
    "bestTimeToVisit": "Weekends for cultural performances, weekdays for less crowding. Dry season.",
    "entranceFee": "IDR 10,000 (Base entrance, individual attractions/museums inside have separate fees)",
    "activities": [
      "Exploring provincial pavilions (Anjungan Daerah)",
      "Visiting museums (Museum Indonesia, Museum Transportasi, etc.)",
      "Riding the cable car for aerial views",
      "Watching cultural performances",
      "Visiting places of worship miniature replicas",
      "Exploring various themed gardens (Orchid, Bird Park)"
    ],
    "coordinates": {
      "latitude": -6.3024458,
      "longitude": 106.895155
      // Longitude inferred from location
    },
    "transportation": [
      "Taxi",
      "Ride-hailing apps (Gojek, Grab)",
      "Private vehicle",
      "TransJakarta Bus (requires connecting routes, check current lines)",
      "LRT (nearby station, requires short additional transport)"
    ],
    "accommodations": {
      "budget": "IDR 250,000 - 500,000 (Hotels in East Jakarta/Cibubur)",
      "midRange": "IDR 500,000 - 1,000,000 (Hotels near TMII or Halim Airport)",
      "luxury": "IDR 1,200,000+ (Fewer luxury options nearby, more towards city center)"
    },
    "nearbyAttractions": [
      "Museum Pusaka",
      "Taman Legenda Keong Emas",
      "SnowBay Waterpark (temporarily/permanently closed - check status)",
      "Lubang Buaya Memorial Park"
    ]
  },
  {
    "id": "atlantis-water-adventures",
    "name": "Atlantis Water Adventures",
    "description": "A water park within the Ancol Dreamland complex, themed around the mythical underwater city of Atlantis. Offers various pools, slides, and water-based attractions for all ages.",
    "location": "Jakarta",
    "region": "DKI Jakarta",
    "category": "Taman Hiburan",
    "image": "/images/jakarta/atlantis-water-adventures.jpg",
    "likes": 24,
    "rating": 4.1,
    "bestTimeToVisit": "Weekdays to avoid crowds, sunny days.",
    "entranceFee": "IDR 94,000 (Check official Ancol website for current prices and promotions, often bundled with Ancol entrance)",
    "activities": [
      "Swimming in various themed pools (Wave pool, Flowing river pool)",
      "Riding water slides of different thrill levels",
      "Relaxing in cabanas",
      "Enjoying kids' water play areas",
      "Trying the floating adventure playground"
    ],
    "coordinates": {
      "latitude": -6.12419,
      "longitude": 106.8398
      // Longitude cleaned and estimated from {'lat': -6.12419, 'Ir...'}
    },
    "transportation": [
      "Taxi",
      "Ride-hailing apps (Gojek, Grab)",
      "Private vehicle (parking available)",
      "TransJakarta Bus (Ancol corridor stop)",
      "Ancol internal shuttle bus"
    ],
    "accommodations": {
      "budget": "IDR 300,000 - 600,000 (Hotels just outside Ancol)",
      "midRange": "IDR 700,000 - 1,500,000 (Hotels within Ancol complex)",
      "luxury": "IDR 1,500,000+ (Limited luxury within Ancol, more options nearby)"
    },
    "nearbyAttractions": [
      "Dunia Fantasi",
      "Sea World Ancol",
      "Ocean Dream Samudra",
      "Pantai Ancol (Ancol Beach)",
      "Ocean Ecopark"
    ]
  },
  {
    "id": "kebun-binatang-ragunan",
    "name": "Kebun Binatang Ragunan",
    "description": "A large zoological park in South Jakarta, housing a diverse collection of animals from Indonesia and around the world. Features the Schmutzer Primate Centre and offers recreational spaces.",
    "location": "Jakarta",
    "region": "DKI Jakarta",
    "category": "Cagar Alam",
    "image": "/images/jakarta/kebun-binatang-ragunan.jpg",
    "likes": 22,
    "rating": 4,
    "bestTimeToVisit": "Weekdays to avoid peak crowds, morning hours for more active animals.",
    "entranceFee": "IDR 4,000 (Adult), IDR 3,000 (Child) - Requires JakCard for payment. Separate fee for Schmutzer Primate Centre.",
    "activities": [
      "Observing various animal species",
      "Visiting the Schmutzer Primate Centre (Orangutans, Gorillas)",
      "Exploring the Children's Zoo",
      "Picnicking in designated areas",
      "Renting bicycles or taking the zoo train",
      "Visiting the Reflection Park"
    ],
    "coordinates": {
      "latitude": -6.3124593,
      "longitude": 106.820666
      // Longitude inferred from location
    },
    "transportation": [
      "TransJakarta Bus (Ragunan corridor terminus)",
      "Ride-hailing apps (Gojek, Grab)",
      "Taxi",
      "Private vehicle (parking available)"
    ],
    "accommodations": {
      "budget": "IDR 250,000 - 450,000 (Hotels/Guesthouses in South Jakarta)",
      "midRange": "IDR 500,000 - 1,200,000 (Hotels around TB Simatupang or Cilandak)",
      "luxury": "IDR 1,500,000+ (Hotels in Kemang or TB Simatupang area)"
    },
    "nearbyAttractions": [
      "Setu Babakan (Betawi Cultural Village)",
      "Various shopping malls in South Jakarta (Citos, Pejaten Village)",
      "Ragunan Orchid Garden (Taman Anggrek Ragunan)"
    ]
  },
  {
    "id": "ocean-ecopark",
    "name": "Ocean Ecopark",
    "description": "An expansive green space within the Ancol Dreamland complex focused on edutainment and recreation with botanical themes. Offers various outdoor activities, learning zones, and event spaces.",
    "location": "Jakarta",
    "region": "DKI Jakarta",
    "category": "Taman Hiburan",
    "image": "/images/jakarta/ocean-ecopark.jpg",
    "likes": 30,
    "rating": 4.2,
    // Rating adjusted from '4' as it likely represents a category, not a score.
    "bestTimeToVisit": "Weekends for events, weekdays for quiet relaxation. Dry season.",
    "entranceFee": "IDR 180,000 (Likely incorrect/outdated in OCR, usually included in Ancol gate fee or specific activity fees apply. Check official Ancol website)",
    "activities": [
      "Cycling and walking",
      "Kayaking or boating on the lake",
      "Visiting the petting zoo or fauna land",
      "Learning about plants in Eco-Care, Eco-Nature, Eco-Art zones",
      "Joining outbound activities or paintball",
      "Attending concerts or festivals often held here"
    ],
    "coordinates": {
      "latitude": -6.1258016,
      "longitude": 106.842
      // Longitude estimated from location
    },
    "transportation": [
      "Taxi",
      "Ride-hailing apps (Gojek, Grab)",
      "Private vehicle (parking available)",
      "TransJakarta Bus (Ancol corridor stop)",
      "Ancol internal shuttle bus"
    ],
    "accommodations": {
      "budget": "IDR 300,000 - 600,000 (Hotels just outside Ancol)",
      "midRange": "IDR 700,000 - 1,500,000 (Hotels within Ancol complex)",
      "luxury": "IDR 1,500,000+ (Limited luxury within Ancol, more options nearby)"
    },
    "nearbyAttractions": [
      "Dunia Fantasi",
      "Atlantis Water Adventures",
      "Sea World Ancol",
      "Pasar Seni Ancol",
      "Pantai Ancol"
    ]
  },
  {
    "id": "pulau-tidung",
    "name": "Pulau Tidung",
    "description": "One of the Thousand Islands (Kepulauan Seribu) known for its iconic 'Bridge of Love' (Jembatan Cinta) connecting Tidung Besar and Tidung Kecil islands. Offers beaches, snorkeling, and a relaxed island atmosphere.",
    "location": "Jakarta",
    // Technically Kepulauan Seribu admin region, but accessed via Jakarta
    "region": "DKI Jakarta (Kepulauan Seribu)",
    "category": "Bahari",
    "image": "/images/jakarta/pulau-tidung.jpg",
    "likes": 14,
    "rating": 4,
    "bestTimeToVisit": "Dry season (April to October) for calmer seas and better visibility.",
    "entranceFee": "IDR 150,000 (This likely refers to a basic boat package/tour, not an island entrance fee. Verify with tour operators)",
    "activities": [
      "Walking or cycling across Jembatan Cinta",
      "Snorkeling and diving",
      "Banana boat rides and other water sports",
      "Relaxing on the beach",
      "Exploring the islands by bicycle",
      "Visiting the mangrove conservation area (on Tidung Kecil)"
    ],
    "coordinates": {
      "latitude": -5.8032053,
      "longitude": 106.522
      // Longitude estimated from location
    },
    "transportation": [
      "Public ferry or speedboat from Marina Ancol or Muara Angke (Kali Adem port)",
      "Private boat charter",
      "Bicycles for rent on the island"
    ],
    "accommodations": {
      "budget": "IDR 200,000 - 400,000 (Homestays)",
      "midRange": "IDR 400,000 - 700,000 (Simple guesthouses/resorts)",
      "luxury": "Limited luxury options, mostly basic to mid-range"
    },
    "nearbyAttractions": [
      "Pulau Payung",
      "Pulau Pari",
      "Other islands in Kepulauan Seribu (via island hopping)"
    ]
  },
  {
    "id": "museum-fatahillah",
    "name": "Museum Fatahillah (Jakarta History Museum)",
    "description": "Housed in the former Batavia City Hall (Stadhuis) in Kota Tua, this museum showcases the history of Jakarta from prehistoric times through the colonial era to the present day.",
    "location": "Jakarta",
    "region": "DKI Jakarta",
    "category": "Budaya",
    "image": "/images/jakarta/museum-fatahillah.jpg",
    "likes": 28,
    "rating": 4.3,
    "bestTimeToVisit": "Weekdays to avoid crowds.",
    "entranceFee": "IDR 5,000 (Adults), lower for students/children",
    "activities": [
      "Exploring exhibits on Jakarta's history",
      "Viewing colonial-era furniture and artifacts",
      "Learning about Betawi culture",
      "Visiting the underground prison cells",
      "Photography of the historic building and square"
    ],
    "coordinates": {
      "latitude": -6.1364488,
      "longitude": 106.8132
      // Longitude estimated from location
    },
    "transportation": [
      "KRL Commuter Line (Jakarta Kota Station)",
      "TransJakarta Bus (Kota corridor stop)",
      "Ride-hailing apps (Gojek, Grab)",
      "Taxi"
    ],
    "accommodations": {
      "budget": "IDR 200,000 - 400,000 (Guesthouses nearby)",
      "midRange": "IDR 400,000 - 800,000 (Hotels near Mangga Dua/Glodok)",
      "luxury": "IDR 1,000,000+ (More towards Central Jakarta)"
    },
    "nearbyAttractions": [
      "Kota Tua complex",
      "Museum Wayang",
      "Museum Seni Rupa dan Keramik",
      "Museum Bank Indonesia",
      "Cafe Batavia"
    ]
  },
  {
    "id": "masjid-istiqlal",
    "name": "Masjid Istiqlal",
    "description": "The largest mosque in Southeast Asia, located in Central Jakarta, adjacent to Merdeka Square. Known for its modern architecture and capacity to hold over 200,000 worshippers. Symbolizes religious tolerance, situated opposite the Jakarta Cathedral.",
    "location": "Jakarta",
    "region": "DKI Jakarta",
    "category": "Tempat Ibadah",
    "image": "/images/jakarta/masjid-istiqlal.jpg",
    "likes": 21,
    "rating": 4.7,
    "bestTimeToVisit": "Outside of prayer times for visits/tours. Respectful attire required.",
    "entranceFee": "Free",
    "activities": [
      "Admiring the grand architecture",
      "Observing Islamic prayer rituals (from designated areas for non-Muslims)",
      "Learning about Islamic culture and the mosque's history (guided tours often available)",
      "Photography (respectfully)",
      "Experiencing the peaceful atmosphere"
    ],
    "coordinates": {
      "latitude": -6.17017,
      "longitude": 106.831
      // Longitude cleaned and estimated from {'lat': -6.17017, 'Ir...'}
    },
    "transportation": [
      "TransJakarta Bus (Istiqlal or Juanda stops)",
      "KRL Commuter Line (Juanda station)",
      "Ride-hailing apps (Gojek, Grab)",
      "Taxi"
    ],
    "accommodations": {
      "budget": "IDR 200,000 - 400,000 (Hotels around Pasar Baru/Juanda)",
      "midRange": "IDR 500,000 - 1,500,000 (Hotels in Central Jakarta)",
      "luxury": "IDR 1,800,000+ (Nearby luxury hotels)"
    },
    "nearbyAttractions": [
      "Gereja Katedral Jakarta",
      "Monumen Nasional (Monas)",
      "Lapangan Banteng Park",
      "Museum Nasional",
      "Pasar Baru (Shopping area)"
    ]
  },
  {
    "id": "gereja-katedral",
    "name": "Gereja Katedral",
    "description": "Jakarta Cathedral (official name: Gereja Santa Maria Pelindung Diangkat Ke Surga) is a prominent Roman Catholic cathedral in Central Jakarta. Built in neo-gothic style, it stands opposite the Istiqlal Mosque, a symbol of interfaith harmony.",
    "location": "Jakarta",
    "region": "DKI Jakarta",
    "category": "Tempat Ibadah",
    "image": "/images/jakarta/gereja-katedral.jpg",
    "likes": 23,
    "rating": 4.6,
    "bestTimeToVisit": "Outside of mass times for sightseeing. Respectful attire required.",
    "entranceFee": "Free",
    "activities": [
      "Admiring the neo-gothic architecture and stained glass windows",
      "Attending mass (optional)",
      "Visiting the Jakarta Cathedral Museum (located within the complex)",
      "Photography (respectfully)",
      "Reflecting in the serene environment"
    ],
    "coordinates": {
      "latitude": -6.169225,
      "longitude": 106.833
      // Longitude estimated from location
    },
    "transportation": [
      "TransJakarta Bus (Katedral or Juanda stops)",
      "KRL Commuter Line (Juanda station)",
      "Ride-hailing apps (Gojek, Grab)",
      "Taxi"
    ],
    "accommodations": {
      "budget": "IDR 200,000 - 400,000 (Hotels around Pasar Baru/Juanda)",
      "midRange": "IDR 500,000 - 1,500,000 (Hotels in Central Jakarta)",
      "luxury": "IDR 1,800,000+ (Nearby luxury hotels)"
    },
    "nearbyAttractions": [
      "Masjid Istiqlal",
      "Monumen Nasional (Monas)",
      "Lapangan Banteng Park",
      "Museum Nasional",
      "Gedung Kesenian Jakarta (Arts Theater)"
    ]
  },
  {
    "id": "museum-nasional",
    "name": "Museum Nasional",
    "description": "Also known as the Elephant Museum (Museum Gajah) due to the elephant statue in its front yard. It's one of the oldest and most comprehensive museums in Indonesia, showcasing vast collections on Indonesian history, archaeology, ethnography, and geography.",
    "location": "Jakarta",
    "region": "DKI Jakarta",
    "category": "Budaya",
    "image": "/images/jakarta/museum-nasional.jpg",
    "likes": 25,
    "rating": 4.5,
    "bestTimeToVisit": "Weekdays for a less crowded experience.",
    "entranceFee": "IDR 5,000 (Adults), lower for students/children",
    "activities": [
      "Exploring extensive collections of artifacts (prehistoric, classical Hindu-Buddhist, ethnographic)",
      "Viewing the Treasury Room (gold artifacts, by appointment/special ticket)",
      "Learning about Indonesia's diverse cultures",
      "Visiting temporary exhibitions",
      "Admiring the architecture of the old and new wings"
    ],
    "coordinates": {
      "latitude": -6.176402,
      "longitude": 106.821
      // Longitude estimated from {'lat': -6.1764020}
    },
    "transportation": [
      "TransJakarta Bus (Monas corridor stops)",
      "Ride-hailing apps (Gojek, Grab)",
      "Taxi",
      "KRL Commuter Line (Juanda or Gondangdia stations, short ride needed)"
    ],
    "accommodations": {
      "budget": "IDR 200,000 - 400,000 (Hostels, basic hotels slightly further out)",
      "midRange": "IDR 500,000 - 1,500,000 (Numerous hotels in Central Jakarta)",
      "luxury": "IDR 1,800,000+ (International chain hotels nearby)"
    },
    "nearbyAttractions": [
      "Monumen Nasional (Monas)",
      "Istana Merdeka",
      "Masjid Istiqlal",
      "Gereja Katedral Jakarta",
      "Galeri Nasional Indonesia"
    ]
  },
  {
    "id": "sea-world-ancol",
    "name": "Sea World",
    "description": "An large oceanarium located within the Ancol Dreamland complex, showcasing a diverse collection of marine and freshwater life from Indonesia and beyond. Features include a main tank with sharks, a touch pool, and various themed aquariums.",
    "location": "Jakarta",
    "region": "DKI Jakarta",
    "category": "Taman Hiburan",
    "image": "/images/jakarta/sea-world-ancol.jpg",
    "likes": 24,
    "rating": 4.2,
    "bestTimeToVisit": "Weekdays to avoid crowds, during feeding times for more activity.",
    "entranceFee": "IDR 115,000 (Check official Ancol website for current prices/bundles)",
    "activities": [
      "Walking through the underwater tunnel in the main aquarium",
      "Observing sharks, rays, turtles, and various fish species",
      "Interacting with marine life at the touch pool",
      "Watching fish feeding shows",
      "Exploring freshwater aquariums (Arapaima, Piranha)",
      "Learning about marine conservation"
    ],
    "coordinates": {
      "latitude": -6.1264775,
      "longitude": 106.84
      // Longitude estimated from location
    },
    "transportation": [
      "Taxi",
      "Ride-hailing apps (Gojek, Grab)",
      "Private vehicle (parking available)",
      "TransJakarta Bus (Ancol corridor stop)",
      "Ancol internal shuttle bus"
    ],
    "accommodations": {
      "budget": "IDR 300,000 - 600,000 (Hotels just outside Ancol)",
      "midRange": "IDR 700,000 - 1,500,000 (Hotels within Ancol complex)",
      "luxury": "IDR 1,500,000+ (Limited luxury within Ancol, more options nearby)"
    },
    "nearbyAttractions": [
      "Dunia Fantasi",
      "Atlantis Water Adventures",
      "Ocean Dream Samudra",
      "Pantai Ancol (Ancol Beach)",
      "Ocean Ecopark"
    ]
  },
  {
    "id": "grand-indonesia",
    "name": "Grand Indonesia",
    "description": "A large, upscale shopping mall complex in Central Jakarta, consisting of East Mall and West Mall connected by a skybridge. Offers a vast array of international and local brands, dining options, entertainment facilities, and is linked to Hotel Indonesia Kempinski.",
    "location": "Jakarta",
    "region": "DKI Jakarta",
    "category": "Pusat Perbelanjaan",
    "image": "/images/jakarta/grand-indonesia.jpg",
    "likes": 27,
    "rating": 4.6,
    "bestTimeToVisit": "Anytime, but weekends can be very crowded.",
    "entranceFee": "Free (access to mall)",
    "activities": [
      "Shopping for fashion, electronics, books, and more",
      "Dining at numerous restaurants, cafes, and food courts",
      "Watching movies at the cinema (CGV)",
      "Visiting the dancing fountain show (check schedule)",
      "Browsing department stores (Central, Seibu)",
      "Window shopping and people watching"
    ],
    "coordinates": {
      "latitude": -6.19518,
      "longitude": 106.8217
      // Longitude inferred from location
    },
    "transportation": [
      "MRT (Bundaran HI station)",
      "TransJakarta Bus (Bundaran HI or Tosari stops)",
      "Ride-hailing apps (Gojek, Grab)",
      "Taxi"
    ],
    "accommodations": {
      "budget": "IDR 300,000 - 600,000 (Hotels/Hostels in nearby Tanah Abang/Kebon Kacang)",
      "midRange": "IDR 700,000 - 2,000,000 (Numerous hotels around Thamrin/Sudirman)",
      "luxury": "IDR 2,500,000+ (Hotel Indonesia Kempinski, Mandarin Oriental, Pullman)"
    },
    "nearbyAttractions": [
      "Plaza Indonesia (connected)",
      "Bundaran HI (Hotel Indonesia Roundabout)",
      "Selamat Datang Monument",
      "Thamrin City Mall",
      "Pasar Tanah Abang (Textile market)"
    ]
  },
  {
    "id": "jakarta-aquarium",
    "name": "Jakarta Aquarium",
    "description": "Located inside Neo Soho Mall, West Jakarta, this attraction combines an aquarium with conservation themes and theatrical elements. It showcases diverse aquatic and terrestrial animals, along with interactive experiences and shows.",
    "location": "Jakarta",
    "region": "DKI Jakarta",
    "category": "Taman Hiburan",
    // Could also be classified as Budaya/Edukasi
    "image": "/images/jakarta/jakarta-aquarium.jpg",
    "likes": 28,
    "rating": 4.4,
    "bestTimeToVisit": "Weekdays for fewer crowds. Check show schedules online.",
    "entranceFee": "IDR 185,000 (approx. - varies for weekday/weekend, regular/premium. Check official website)",
    "activities": [
      "Observing various marine and terrestrial species",
      "Interactive feeding experiences",
      "Watching the 'Pearl of the South Sea' underwater theatrical performance",
      "Touching starfish and other creatures at the touch pool",
      "Learning about conservation efforts",
      "Dining at the Pingoo restaurant with penguin views"
    ],
    "coordinates": {
      "latitude": -6.1752647,
      "longitude": 106.792
      // Longitude inferred from location
    },
    "transportation": [
      "TransJakarta Bus (S. Parman Podomoro City stop)",
      "Ride-hailing apps (Gojek, Grab)",
      "Taxi",
      "Private vehicle (parking in Neo Soho/Central Park Mall)"
    ],
    "accommodations": {
      "budget": "IDR 300,000 - 500,000 (Hotels/Kost around Tanjung Duren/Grogol)",
      "midRange": "IDR 600,000 - 1,500,000 (Pullman Jakarta Central Park, Hotel Ciputra)",
      "luxury": "IDR 1,500,000+ (Limited luxury directly attached, more options nearby)"
    },
    "nearbyAttractions": [
      "Central Park Mall (connected)",
      "Neo Soho Mall (location)",
      "Taman Anggrek Mall",
      "Various universities (Trisakti, Tarumanagara)"
    ]
  },
  {
    "id": "taman-pintar-yogyakarta",
    "name": "Taman Pintar Yogyakarta",
    "description": "An educational science park in the heart of Yogyakarta, offering interactive exhibits and activities aimed primarily at children and students to foster interest in science and technology.",
    "location": "Yogyakarta",
    "region": "DI Yogyakarta",
    "category": "Taman Hiburan",
    "image": "/images/yogyakarta/taman-pintar-yogyakarta.jpg",
    "likes": 24,
    "rating": 4.3,
    "bestTimeToVisit": "Weekdays to avoid school group crowds, morning hours.",
    "entranceFee": "Starting from IDR 6,000 (Different zones/buildings have separate fees, check official website).",
    "activities": [
      "Engaging with interactive science exhibits",
      "Visiting the Oval Building & Memorabilia Building",
      "Watching shows at the Planetarium",
      "Participating in creative workshops",
      "Exploring the outdoor playground area"
    ],
    "coordinates": {
      "latitude": -7.8006715,
      "longitude": 110.368
      // Estimated longitude based on location
    },
    "transportation": [
      "Trans Jogja bus (Halte Taman Pintar/Senopati)",
      "Becak (cycle rickshaw)",
      "Andong (horse cart)",
      "Taxi",
      "Ride-hailing apps (Gojek, Grab)"
    ],
    "accommodations": {
      "budget": "IDR 150,000-350,000 (Hostels/Guesthouses near Malioboro/Prawirotaman)",
      "midRange": "IDR 400,000-1,000,000 (Hotels around city center)",
      "luxury": "IDR 1,200,000+ (Hotels near Malioboro or Tugu area)"
    },
    "nearbyAttractions": [
      "Museum Benteng Vredeburg",
      "Gedung Agung (Presidential Palace)",
      "Nol Kilometer Jogja",
      "Pasar Beringharjo",
      "Jalan Malioboro"
    ]
  },
  {
    "id": "keraton-yogyakarta",
    "name": "Keraton Ngayogyakarta Hadiningrat",
    "description": "The official palace of the Sultanate of Yogyakarta. A cultural center showcasing Javanese architecture, traditions, artifacts, and hosting regular cultural performances.",
    "location": "Yogyakarta",
    "region": "DI Yogyakarta",
    "category": "Budaya",
    "image": "/images/yogyakarta/keraton-yogyakarta.jpg",
    "likes": 24,
    "rating": 4.5,
    "bestTimeToVisit": "Morning hours to catch cultural performances (check schedule) and avoid midday heat.",
    "entranceFee": "IDR 15,000 (Check official sources for current domestic/international rates).",
    "activities": [
      "Exploring the palace complex and pavilions",
      "Viewing royal artifacts and heirlooms",
      "Watching traditional Javanese dance or Gamelan performances",
      "Learning about Javanese culture and royal history",
      "Photography of the architecture and courtyards"
    ],
    "coordinates": {
      "latitude": -7.8052845,
      "longitude": 110.3642
      // Estimated longitude based on location
    },
    "transportation": [
      "Becak (cycle rickshaw)",
      "Andong (horse cart)",
      "Walk from Malioboro/Alun-Alun Utara",
      "Taxi",
      "Ride-hailing apps"
    ],
    "accommodations": {
      "budget": "IDR 150,000-350,000 (Hostels/Guesthouses near Alun-Alun Selatan/Prawirotaman)",
      "midRange": "IDR 400,000-1,000,000 (Hotels around city center)",
      "luxury": "IDR 1,200,000+ (Hotels near Malioboro or Tugu area)"
    },
    "nearbyAttractions": [
      "Taman Sari Water Castle",
      "Alun-Alun Utara (North Square)",
      "Alun-Alun Selatan (South Square)",
      "Museum Kereta Keraton",
      "Masjid Gedhe Kauman"
    ]
  },
  {
    "id": "sindu-kusuma-edupark",
    "name": "Sindu Kusuma Edupark (SKE)",
    "description": "A family theme park in the northern part of Yogyakarta featuring various rides, including a large Ferris wheel (Cakra Manggilingan), waterpark, and educational elements.",
    "location": "Yogyakarta",
    // Technically Sleman Regency, but considered Yogyakarta area
    "region": "DI Yogyakarta",
    "category": "Taman Hiburan",
    "image": "/images/yogyakarta/sindu-kusuma-edupark.jpg",
    "likes": 19,
    "rating": 4,
    "bestTimeToVisit": "Late afternoon/evening for Ferris wheel city light views, weekends for more attractions operating.",
    "entranceFee": "IDR 20,000 (Entrance only, rides often require separate tickets or passes. Check official website).",
    "activities": [
      "Riding the Cakra Manggilingan Ferris wheel",
      "Enjoying other amusement rides (roller coaster, carousel)",
      "Visiting the Omah Musik vintage music museum",
      "Playing at the waterpark (Waterpark Sindu Kusuma)",
      "Exploring the 8 Wonders light installation (evening)"
    ],
    "coordinates": {
      "latitude": -7.7672973,
      "longitude": 110.357
      // Estimated longitude based on location
    },
    "transportation": [
      "Taxi",
      "Ride-hailing apps (Gojek, Grab)",
      "Private vehicle"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses in Sinduadi/Mlati area)",
      "midRange": "IDR 500,000-1,200,000 (Hotels along Jalan Magelang or Ring Road Utara)",
      "luxury": "IDR 1,500,000+ (Hyatt Regency Yogyakarta nearby)"
    },
    "nearbyAttractions": [
      "Monumen Yogya Kembali (Monjali)",
      "Jogja City Mall",
      "Taman Pelangi Monjali (evening light park)"
    ]
  },
  {
    "id": "museum-benteng-vredeburg",
    "name": "Museum Benteng Vredeburg",
    "description": "A historical museum housed in a former Dutch colonial fortress located at the southern end of Malioboro Street. It showcases Indonesia's struggle for independence through dioramas and collections.",
    "location": "Yogyakarta",
    "region": "DI Yogyakarta",
    "category": "Budaya",
    "image": "/images/yogyakarta/museum-benteng-vredeburg.jpg",
    "likes": 32,
    "rating": 4.5,
    "bestTimeToVisit": "Weekdays to avoid crowds.",
    "entranceFee": "IDR 3,000 (Adults), lower for children. Check official sources.",
    "activities": [
      "Exploring the historic fortress architecture",
      "Viewing dioramas depicting Indonesian independence history",
      "Examining historical artifacts and photographs",
      "Walking along the fortress ramparts",
      "Attending temporary exhibitions or events"
    ],
    "coordinates": {
      "latitude": -7.8002015,
      "longitude": 110.3665
      // Estimated longitude based on location
    },
    "transportation": [
      "Walk from Malioboro Street",
      "Trans Jogja bus (Halte Malioboro 1 / Senopati)",
      "Becak (cycle rickshaw)",
      "Andong (horse cart)",
      "Taxi",
      "Ride-hailing apps"
    ],
    "accommodations": {
      "budget": "IDR 150,000-350,000 (Hostels/Guesthouses near Malioboro)",
      "midRange": "IDR 400,000-1,000,000 (Hotels around Malioboro/city center)",
      "luxury": "IDR 1,200,000+ (Hotels near Malioboro or Tugu area)"
    },
    "nearbyAttractions": [
      "Jalan Malioboro",
      "Pasar Beringharjo",
      "Taman Pintar Yogyakarta",
      "Gedung Agung (Presidential Palace)",
      "Nol Kilometer Jogja"
    ]
  },
  {
    "id": "de-mata-trick-eye-museum",
    "name": "De Mata Museum (XT Square)",
    "description": "An interactive 3D trick-eye art museum located within the XT Square complex. Offers numerous photo opportunities with optical illusion paintings and installations.",
    "location": "Yogyakarta",
    "region": "DI Yogyakarta",
    "category": "Budaya",
    // Could also be Taman Hiburan
    "image": "/images/yogyakarta/de-mata-trick-eye-museum.jpg",
    "likes": 30,
    "rating": 4.1,
    "bestTimeToVisit": "Anytime, but less crowded on weekdays.",
    "entranceFee": "IDR 50,000 (Approx. Check official XT Square or De Mata sources for current pricing and potential combo tickets).",
    "activities": [
      "Taking photos with various 3D trick-eye artworks",
      "Interacting with optical illusion installations",
      "Exploring different themed zones within the museum",
      "Visiting adjacent museums within XT Square (De Arca, De Walik)"
    ],
    "coordinates": {
      "latitude": -7.8163155,
      "longitude": 110.389
      // Estimated longitude based on location
    },
    "transportation": [
      "Taxi",
      "Ride-hailing apps (Gojek, Grab)",
      "Private vehicle",
      "Trans Jogja bus (routes serving Jalan Veteran/Gambiran)"
    ],
    "accommodations": {
      "budget": "IDR 150,000-300,000 (Guesthouses in Umbulharjo/nearby areas)",
      "midRange": "IDR 350,000-700,000 (Hotels around Jalan Veteran/Sisingamangaraja)",
      "luxury": "IDR 800,000+ (Fewer luxury options directly nearby, more towards city center or ring road)"
    },
    "nearbyAttractions": [
      "XT Square complex (other museums, food court, crafts)",
      "Gembira Loka Zoo (short drive)",
      "Museum Perjuangan Yogyakarta"
    ]
  },
  {
    "id": "taman-sari",
    "name": "Kampung Wisata Taman Sari",
    "description": "The site of a former royal garden of the Sultanate of Yogyakarta, known for its water castle features, bathing pools, underground mosque (Sumur Gumuling), and surrounding residential area (kampung) with batik workshops.",
    "location": "Yogyakarta",
    "region": "DI Yogyakarta",
    "category": "Taman Hiburan",
    // Primarily Budaya (Historical Site)
    "image": "/images/yogyakarta/taman-sari.jpg",
    "likes": 23,
    "rating": 4.4,
    "bestTimeToVisit": "Morning hours to avoid heat and crowds.",
    "entranceFee": "IDR 5,000 - 15,000 (Separate fees for main complex and specific sites like Sumur Gumuling. Guide recommended). Check official sources.",
    "activities": [
      "Exploring the main bathing complex (Umbul Panguras)",
      "Visiting the underground mosque (Sumur Gumuling)",
      "Wandering through the surrounding kampung (residential area)",
      "Visiting batik workshops and art galleries",
      "Learning about the history and legends of the site",
      "Photography"
    ],
    "coordinates": {
      "latitude": -7.8100673,
      "longitude": 110.3595
      // Estimated longitude based on location
    },
    "transportation": [
      "Walk from Keraton/Alun-Alun Selatan",
      "Becak (cycle rickshaw)",
      "Taxi",
      "Ride-hailing apps"
    ],
    "accommodations": {
      "budget": "IDR 150,000-300,000 (Guesthouses within Taman Sari kampung or Prawirotaman)",
      "midRange": "IDR 350,000-700,000 (Boutique hotels in Prawirotaman/Tirtodipuran)",
      "luxury": "IDR 800,000+ (Hotels towards city center)"
    },
    "nearbyAttractions": [
      "Keraton Yogyakarta",
      "Alun-Alun Selatan (South Square)",
      "Pasar Ngasem (Bird Market - relocated but area name persists)",
      "Museum Sonobudoyo Unit II"
    ]
  },
  {
    "id": "situs-warungboto",
    "name": "Situs Warungboto",
    "description": "A historical site featuring the ruins of a former royal resting house and bathing complex (Pesanggrahan Rejawinangun) built during the reign of Sultan Hamengkubuwono II. Known for its unique architecture and water features.",
    "location": "Yogyakarta",
    "region": "DI Yogyakarta",
    "category": "Taman Hiburan",
    // Primarily Budaya (Historical Site)
    "image": "/images/yogyakarta/situs-warungboto.jpg",
    "likes": 29,
    "rating": 4.2,
    "bestTimeToVisit": "Morning or late afternoon to avoid harsh sunlight.",
    "entranceFee": "Free (Donations may be accepted).",
    "activities": [
      "Exploring the architectural ruins",
      "Observing the pools and water channels",
      "Photography, especially pre-wedding shoots",
      "Learning about the site's history",
      "Enjoying the relatively quiet atmosphere"
    ],
    "coordinates": {
      "latitude": -7.8102685,
      "longitude": 110.387
      // Estimated longitude based on location
    },
    "transportation": [
      "Taxi",
      "Ride-hailing apps (Gojek, Grab)",
      "Private vehicle"
    ],
    "accommodations": {
      "budget": "IDR 150,000-300,000 (Guesthouses in Umbulharjo/nearby areas)",
      "midRange": "IDR 350,000-700,000 (Hotels around Jalan Veteran/Jalan Kusumanegara)",
      "luxury": "IDR 800,000+ (More options towards city center or airport)"
    },
    "nearbyAttractions": [
      "Gembira Loka Zoo",
      "XT Square",
      "Museum Perjuangan Yogyakarta",
      "Universitas Ahmad Dahlan Campus 4"
    ]
  },
  {
    "id": "nol-kilometer-jogja",
    "name": "Nol Kilometer Jogja",
    "description": "The Zero Kilometer point of Yogyakarta, a popular public space and intersection at the southern end of Malioboro street. Surrounded by historic buildings, it's a central meeting point and hub of activity.",
    "location": "Yogyakarta",
    "region": "DI Yogyakarta",
    "category": "Taman Hiburan",
    // Public Space / Landmark
    "image": "/images/yogyakarta/nol-kilometer-jogja.jpg",
    "likes": 21,
    "rating": 4.5,
    "bestTimeToVisit": "Evening and night for a lively atmosphere and street performances.",
    "entranceFee": "Free",
    "activities": [
      "Sitting and people-watching",
      "Enjoying street performances (evening)",
      "Photography of surrounding historical buildings (BI, BNI, Post Office)",
      "Meeting point before exploring Malioboro",
      "Trying street food from nearby vendors"
    ],
    "coordinates": {
      "latitude": -7.8013803,
      "longitude": 110.3658
      // Estimated longitude based on location
    },
    "transportation": [
      "Walk from Malioboro/Benteng Vredeburg",
      "Trans Jogja bus (Halte Senopati/Malioboro 1)",
      "Becak",
      "Andong",
      "Taxi",
      "Ride-hailing apps"
    ],
    "accommodations": {
      "budget": "IDR 150,000-350,000 (Hostels/Guesthouses near Malioboro)",
      "midRange": "IDR 400,000-1,000,000 (Hotels around Malioboro/city center)",
      "luxury": "IDR 1,200,000+ (Hotels near Malioboro or Tugu area)"
    },
    "nearbyAttractions": [
      "Museum Benteng Vredeburg",
      "Gedung Agung (Presidential Palace)",
      "Jalan Malioboro",
      "Pasar Beringharjo",
      "Taman Pintar Yogyakarta"
    ]
  },
  {
    "id": "gembira-loka-zoo",
    "name": "Gembira Loka Zoo",
    "description": "A popular zoological garden in Yogyakarta featuring a diverse collection of animals from around the world, themed zones, interactive exhibits, and recreational facilities like boat rides.",
    "location": "Yogyakarta",
    "region": "DI Yogyakarta",
    "category": "Cagar Alam",
    "image": "/images/yogyakarta/gembira-loka-zoo.jpg",
    "likes": 24,
    "rating": 4.4,
    "bestTimeToVisit": "Weekdays to avoid crowds, morning for more active animals.",
    "entranceFee": "IDR 60,000 (Weekdays), IDR 75,000 (Weekends/Holidays). Check official website for current pricing.",
    "activities": [
      "Observing animals (reptiles, mammals, birds, primates)",
      "Visiting the Bird Park and Reptile Zone",
      "Interactive animal feeding sessions (check schedule)",
      "Taking boat rides (Katinting, Speedboat) on the lake",
      "Exploring the petting zoo area",
      "Riding the Taring (transport train) within the zoo"
    ],
    "coordinates": {
      "latitude": -7.8062343,
      "longitude": 110.396
      // Estimated longitude based on location
    },
    "transportation": [
      "Trans Jogja bus (Halte Gembira Loka)",
      "Taxi",
      "Ride-hailing apps (Gojek, Grab)",
      "Private vehicle"
    ],
    "accommodations": {
      "budget": "IDR 150,000-300,000 (Guesthouses in Umbulharjo/Rejowinangun)",
      "midRange": "IDR 350,000-700,000 (Hotels around Jalan Kusumanegara)",
      "luxury": "IDR 800,000+ (More options towards city center or airport)"
    },
    "nearbyAttractions": [
      "Situs Warungboto",
      "XT Square",
      "Museum Perjuangan Yogyakarta",
      "De Mata Trick Eye Museum"
    ]
  },
  {
    "id": "sumur-gumuling",
    "name": "Sumur Gumuling",
    "description": "A unique underground structure within the Taman Sari complex, believed to have functioned as a mosque. Known for its circular design, central platform, and intersecting staircases creating photogenic perspectives.",
    "location": "Yogyakarta",
    "region": "DI Yogyakarta",
    "category": "Taman Hiburan",
    // Primarily Budaya (Historical Site)
    "image": "/images/yogyakarta/sumur-gumuling.jpg",
    "likes": 24,
    "rating": 4.3,
    "bestTimeToVisit": "Morning to avoid crowds and capture better lighting through the roof opening.",
    "entranceFee": "IDR 7,000 - 15,000 (Usually requires Taman Sari entrance + potential separate fee/guide. Check locally).",
    "activities": [
      "Exploring the unique underground architecture",
      "Photography of the intersecting stairways and central area",
      "Learning about its historical function and legends",
      "Navigating the tunnels leading to the structure"
    ],
    "coordinates": {
      "latitude": -7.8087911,
      // Coordinates seem slightly off from general Taman Sari, use with caution
      "longitude": 110.359
      // Estimated longitude based on location within Taman Sari
    },
    "transportation": [
      "Walk from Keraton/Alun-Alun Selatan/Taman Sari main complex",
      "Becak",
      "Access often involves navigating the Taman Sari kampung"
    ],
    "accommodations": {
      "budget": "IDR 150,000-300,000 (Guesthouses within Taman Sari kampung or Prawirotaman)",
      "midRange": "IDR 350,000-700,000 (Boutique hotels in Prawirotaman/Tirtodipuran)",
      "luxury": "IDR 800,000+ (Hotels towards city center)"
    },
    "nearbyAttractions": [
      "Taman Sari Water Castle (main complex)",
      "Keraton Yogyakarta",
      "Alun-Alun Selatan",
      "Kampung Cyber",
      "Pulo Cemeti (ruins)"
    ]
  },
  {
    "id": "desa-wisata-code",
    "name": "Desa Wisata Code",
    "description": "A riverside village (kampung) along the Code River known for its colorful murals painted on houses, initiated by local artists like Romo Mangunwijaya. Offers a glimpse into urban community life and art.",
    "location": "Yogyakarta",
    "region": "DI Yogyakarta",
    "category": "Taman Hiburan",
    // Cultural Village / Community Tourism
    "image": "/images/yogyakarta/desa-wisata-code.jpg",
    "likes": 25,
    "rating": 4,
    // Rating adjusted from '5'
    "bestTimeToVisit": "Daylight hours for best mural visibility.",
    "entranceFee": "Free (Donations welcome).",
    "activities": [
      "Walking along the riverbank and exploring the kampung alleyways",
      "Admiring the colorful house murals",
      "Photography",
      "Interacting with the local community (respectfully)",
      "Learning about the history and social projects of the area"
    ],
    "coordinates": {
      "latitude": -7.8229089,
      // Location is approximate, covers a stretch of riverbank
      "longitude": 110.371
      // Estimated longitude based on general Code river location
    },
    "transportation": [
      "Walk from nearby main roads (e.g., Jalan Suroto, near Tugu Station)",
      "Becak",
      "Taxi/Ride-hailing apps to drop-off points near bridges (e.g., Jembatan Gondolayu)"
    ],
    "accommodations": {
      "budget": "IDR 150,000-300,000 (Hostels/Guesthouses near Tugu Station/Malioboro)",
      "midRange": "IDR 400,000-1,000,000 (Hotels around Tugu/Jetis area)",
      "luxury": "IDR 1,200,000+ (Hotels near Tugu Station or Malioboro)"
    },
    "nearbyAttractions": [
      "Tugu Yogyakarta (Yogyakarta Monument)",
      "Jalan Malioboro",
      "Stasiun Tugu (Tugu Railway Station)",
      "Pasar Kranggan"
    ]
  },
  {
    "id": "alun-alun-selatan",
    "name": "Alun Alun Selatan (Alkid)",
    "description": "The South Square of the Yogyakarta Kraton, famous for its twin banyan trees and the 'Masangin' tradition (attempting to walk blindfolded between the trees). It becomes a lively night market with food stalls and decorated pedicabs.",
    "location": "Yogyakarta",
    "region": "DI Yogyakarta",
    "category": "Taman Hiburan",
    // Public Square / Cultural Spot
    "image": "/images/yogyakarta/alun-alun-selatan.jpg",
    "likes": 26,
    "rating": 4.4,
    "bestTimeToVisit": "Evening and night for the lively atmosphere, food stalls, and decorated pedicabs.",
    "entranceFee": "Free (Activities like riding pedicabs or buying food cost extra).",
    "activities": [
      "Trying the 'Masangin' ritual (walking between the banyan trees)",
      "Riding colorful, decorated pedicabs ('odong-odong')",
      "Sampling local street food and snacks",
      "Relaxing and people-watching",
      "Visiting during Sekaten festival (if applicable)"
    ],
    "coordinates": {
      "latitude": -7.8116719,
      "longitude": 110.364
      // Longitude cleaned and estimated
    },
    "transportation": [
      "Walk from Keraton/Taman Sari",
      "Becak",
      "Andong",
      "Taxi",
      "Ride-hailing apps"
    ],
    "accommodations": {
      "budget": "IDR 150,000-300,000 (Guesthouses in Mantrijeron/Prawirotaman)",
      "midRange": "IDR 350,000-700,000 (Hotels in Prawirotaman/Tirtodipuran)",
      "luxury": "IDR 800,000+ (Hotels towards city center)"
    },
    "nearbyAttractions": [
      "Keraton Yogyakarta",
      "Taman Sari Water Castle",
      "Museum Sonobudoyo Unit II",
      "Masjid Soko Tunggal"
    ]
  },
  {
    "id": "monumen-yogya-kembali",
    "name": "Monumen Yogya Kembali (Monjali)",
    "description": "A cone-shaped museum commemorating the historical event of the return of Yogyakarta as the capital of the Republic of Indonesia in 1949. Houses dioramas, artifacts, and a library related to the independence struggle.",
    "location": "Yogyakarta",
    // Technically Sleman Regency
    "region": "DI Yogyakarta",
    "category": "Budaya",
    "image": "/images/yogyakarta/monumen-yogya-kembali.jpg",
    "likes": 22,
    "rating": 4.3,
    "bestTimeToVisit": "Weekdays for fewer crowds.",
    "entranceFee": "IDR 15,000 (Check official sources for current rates).",
    "activities": [
      "Exploring the museum exhibits and dioramas",
      "Learning about Indonesian independence history, specifically the Yogyakarta events",
      "Visiting the library and Hall of Heroes",
      "Admiring the unique architecture",
      "Relaxing in the surrounding park area"
    ],
    "coordinates": {
      "latitude": -7.7495904,
      "longitude": 110.369
      // Estimated longitude based on location
    },
    "transportation": [
      "Trans Jogja bus (Halte Monjali)",
      "Taxi",
      "Ride-hailing apps",
      "Private vehicle"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses in Sariharjo/Sinduadi area)",
      "midRange": "IDR 500,000-1,200,000 (Hotels along Jalan Palagan or Ring Road Utara)",
      "luxury": "IDR 1,500,000+ (Hyatt Regency Yogyakarta nearby)"
    },
    "nearbyAttractions": [
      "Taman Pelangi Monjali (adjacent, evening park)",
      "Sindu Kusuma Edupark",
      "Jogja City Mall",
      "Universitas Gadjah Mada (UGM) campus area"
    ]
  },
  {
    "id": "taman-pelangi-monjali",
    "name": "Taman Pelangi Yogyakarta",
    "description": "An evening amusement park located in the grounds of Monumen Yogya Kembali (Monjali), featuring hundreds of colorful lanterns and light installations forming various shapes and themes.",
    "location": "Yogyakarta",
    // Technically Sleman Regency
    "region": "DI Yogyakarta",
    "category": "Taman Hiburan",
    "image": "/images/yogyakarta/taman-pelangi-monjali.jpg",
    "likes": 20,
    "rating": 4,
    "bestTimeToVisit": "Evening after sunset when the lights are on.",
    "entranceFee": "IDR 15,000 - 20,000 (Check locally as prices might change).",
    "activities": [
      "Walking around and admiring the lantern displays",
      "Photography with the colorful lights",
      "Enjoying small rides and games (optional, extra cost)",
      "Trying food and drinks from stalls",
      "Visiting Monumen Yogya Kembali (before the park opens)"
    ],
    "coordinates": {
      "latitude": -7.7505259,
      "longitude": 110.37
      // Estimated longitude based on location (adjacent to Monjali)
    },
    "transportation": [
      "Trans Jogja bus (Halte Monjali)",
      "Taxi",
      "Ride-hailing apps",
      "Private vehicle"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses in Sariharjo/Sinduadi area)",
      "midRange": "IDR 500,000-1,200,000 (Hotels along Jalan Palagan or Ring Road Utara)",
      "luxury": "IDR 1,500,000+ (Hyatt Regency Yogyakarta nearby)"
    },
    "nearbyAttractions": [
      "Monumen Yogya Kembali (Monjali)",
      "Sindu Kusuma Edupark",
      "Jogja City Mall"
    ]
  },
  {
    "id": "kampung-wisata-dipowinatan",
    "name": "Kampung Wisata Dipowinatan",
    // Name assumed from generic 'Kampung Wisata' entry
    "description": "A designated tourist village (kampung) in Yogyakarta, often known for preserving traditional Javanese architecture, local crafts (like silver or batik), and offering homestay experiences for cultural immersion.",
    "location": "Yogyakarta",
    "region": "DI Yogyakarta",
    "category": "Budaya",
    // Community Tourism / Cultural Village
    "image": "/images/yogyakarta/kampung-wisata-dipowinatan.jpg",
    "likes": 24,
    "rating": 4.1,
    "bestTimeToVisit": "Daylight hours for exploring, check for specific workshop/homestay availability.",
    "entranceFee": "Free (access to walk around), fees apply for workshops/homestays.",
    "activities": [
      "Walking through the kampung and observing traditional houses",
      "Visiting local craft workshops (batik, silver, etc. - varies by kampung)",
      "Participating in cultural activities or workshops (if offered)",
      "Staying in a local homestay",
      "Interacting with residents and learning about local life"
    ],
    "coordinates": {
      "latitude": -7.806093,
      // Generic coordinate, actual location of specific 'Kampung Wisata' might vary
      "longitude": 110.368
      // Estimated longitude
    },
    "transportation": [
      "Location dependent, often accessible by Becak, Taxi, Ride-hailing apps from main city areas."
    ],
    "accommodations": {
      "budget": "IDR 100,000-250,000 (Homestays within the kampung)",
      "midRange": "IDR 300,000-600,000 (Nearby guesthouses/hotels)",
      "luxury": "Fewer luxury options directly within traditional kampungs"
    },
    "nearbyAttractions": [
      "Location dependent, often near Kraton, Taman Sari, Prawirotaman, or Kotagede depending on the specific kampung."
    ]
  },
  {
    "id": "gunung-tangkuban-perahu",
    "name": "Gunung Tangkuban Parahu",
    "description": "An active volcano north of Bandung, famous for its distinctive upside-down boat shape and accessible craters emitting sulfurous fumes. Offers stunning volcanic landscapes.",
    "location": "Bandung",
    // More accurately Subang/West Bandung Regency, but commonly associated with Bandung trips
    "region": "Jawa Barat",
    "category": "Cagar Alam",
    "image": "/images/bandung/gunung-tangkuban-perahu.jpg",
    "likes": 28,
    "rating": 4.3,
    // Adjusted from 13.2
    "bestTimeToVisit": "Dry season (May-September), morning hours for clearer views before clouds roll in.",
    "entranceFee": "IDR 30,000 (Domestic weekday), higher for weekends/international tourists (Check official website for current rates).",
    "activities": [
      "Viewing the main Kawah Ratu crater",
      "Visiting other craters like Kawah Domas (can boil eggs)",
      "Hiking trails around the craters (use guide for some)",
      "Photography of the volcanic scenery",
      "Shopping for souvenirs and local produce (strawberries)",
      "Enjoying the cool mountain air"
    ],
    "coordinates": {
      "latitude": -6.7596377,
      "longitude": 107.609
      // Estimated longitude
    },
    "transportation": [
      "Private vehicle or chartered car (most common)",
      "Motorcycle",
      "Public transport possible but less direct (Angkot to Cikole, then Ojek/walk)"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses in Lembang/Cikole)",
      "midRange": "IDR 500,000-1,500,000 (Hotels and resorts in Lembang)",
      "luxury": "IDR 1,800,000+ (Higher-end resorts in Lembang)"
    },
    "nearbyAttractions": [
      "Ciater Hot Springs",
      "The Lodge Maribaya",
      "Orchid Forest Cikole",
      "Floating Market Lembang",
      "Farm House Susu Lembang"
    ]
  },
  {
    "id": "jalan-braga",
    "name": "Jalan Braga",
    "description": "A historic street in the heart of Bandung known for its preserved colonial-era architecture, art deco buildings, cafes, galleries, and vibrant atmosphere. Once known as the 'Paris of Java'.",
    "location": "Bandung",
    "region": "Jawa Barat",
    "category": "Budaya",
    "image": "/images/bandung/jalan-braga.jpg",
    "likes": 16,
    "rating": 4.7,
    // Adjusted from 15.2
    "bestTimeToVisit": "Afternoon and evening for a livelier atmosphere, cafes, and street life.",
    "entranceFee": "Free (access to the street)",
    "activities": [
      "Strolling and admiring the historic architecture",
      "Visiting cafes and restaurants (Braga Permai, Kopi Toko Djawa)",
      "Exploring art galleries and antique shops",
      "Street photography",
      "Enjoying the nightlife and live music (weekends)",
      "Visiting the Museum Konferensi Asia Afrika (nearby)"
    ],
    "coordinates": {
      "latitude": -6.9150534,
      "longitude": 107.608
      // Estimated longitude
    },
    "transportation": [
      "Walk from nearby areas (Alun-Alun, Asia Afrika)",
      "Angkot (city minibus)",
      "Taxi",
      "Ride-hailing apps (Gojek, Grab)"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses/hostels in the city center)",
      "midRange": "IDR 450,000-1,000,000 (Hotels on or near Braga Street)",
      "luxury": "IDR 1,200,000+ (Savoy Homann, Grand Hotel Preanger nearby)"
    },
    "nearbyAttractions": [
      "Museum Konferensi Asia Afrika",
      "Gedung Merdeka",
      "Alun-Alun Bandung (City Square)",
      "Masjid Raya Bandung",
      "Gedung Denis (Bank BJB Landmark)"
    ]
  },
  {
    "id": "gedung-sate",
    "name": "Gedung Sate",
    "description": "An iconic public building and landmark of Bandung and West Java. Famous for its unique architectural style combining neoclassical design with Indonesian elements, notably the 'sate' skewer ornament on its central pinnacle.",
    "location": "Bandung",
    "region": "Jawa Barat",
    "category": "Budaya",
    "image": "/images/bandung/gedung-sate.jpg",
    "likes": 22,
    "rating": 4.5,
    // Adjusted from 14.2
    "bestTimeToVisit": "Daylight hours for photos, weekend mornings for lively atmosphere in the park.",
    "entranceFee": "IDR 5,000 (For Museum Gedung Sate, exterior view is free).",
    "activities": [
      "Admiring the unique architecture from the outside",
      "Photography",
      "Visiting the Museum Gedung Sate inside",
      "Relaxing or exercising in the adjacent Gasibu field (Lapangan Gasibu)",
      "Visiting the Sunday morning market at Gasibu (if applicable)"
    ],
    "coordinates": {
      "latitude": -6.9024812,
      "longitude": 107.6188
      // Estimated longitude
    },
    "transportation": [
      "Angkot",
      "Taxi",
      "Ride-hailing apps",
      "Private vehicle"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses near Dipatiukur/Dago)",
      "midRange": "IDR 450,000-1,200,000 (Hotels around Citarum/Riau street)",
      "luxury": "IDR 1,500,000+ (Pullman Bandung, The Papandayan)"
    },
    "nearbyAttractions": [
      "Museum Geologi",
      "Museum Pos Indonesia",
      "Lapangan Gasibu",
      "Gedung Pakuan (Governor's Residence)",
      "Jalan Diponegoro"
    ]
  },
  {
    "id": "trans-studio-bandung",
    "name": "Trans Studio Bandung",
    "description": "One of the largest indoor theme parks in the world, located within the Trans Studio Mall complex. Offers a variety of rides, shows, and themed zones suitable for families.",
    "location": "Bandung",
    "region": "Jawa Barat",
    "category": "Taman Hiburan",
    "image": "/images/bandung/trans-studio-bandung.jpg",
    "likes": 18,
    "rating": 4.3,
    // Adjusted from 13.2
    "bestTimeToVisit": "Weekdays to avoid long queues.",
    "entranceFee": "IDR 280,000 (Check official website for current weekday/weekend/holiday rates and promotions).",
    "activities": [
      "Riding thrilling attractions (Yamaha Racing Coaster, Giant Swing)",
      "Enjoying family-friendly rides (Si Bolang Adventure)",
      "Watching live performances and parades (check schedule)",
      "Exploring themed zones (Studio Central, Lost City, Magic Corner)",
      "Shopping at Trans Studio Mall"
    ],
    "coordinates": {
      "latitude": -6.9250943,
      "longitude": 107.636
      // Estimated longitude
    },
    "transportation": [
      "Taxi",
      "Ride-hailing apps",
      "Private vehicle (parking available)",
      "Trans Metro Bandung bus routes serving the area"
    ],
    "accommodations": {
      "budget": "IDR 250,000-450,000 (Guesthouses in Gatot Subroto/Buah Batu area)",
      "midRange": "IDR 500,000-1,000,000 (Hotels near the complex)",
      "luxury": "IDR 1,500,000+ (The Trans Luxury Hotel - connected to the mall)"
    },
    "nearbyAttractions": [
      "Trans Studio Mall",
      "Masjid Agung Trans Studio Bandung",
      "Kawasan Kuliner Burangrang",
      "Saung Angklung Udjo (short drive)"
    ]
  },
  {
    "id": "taman-hutan-raya-ir-h-djuanda",
    "name": "Taman Hutan Raya Ir. H. Djuanda (Tahura)",
    "description": "A vast forest park and conservation area in the Dago Pakar hills, offering hiking trails, natural scenery, historical caves (Dutch & Japanese Caves), waterfalls, and a deer sanctuary.",
    "location": "Bandung",
    "region": "Jawa Barat",
    "category": "Cagar Alam",
    "image": "/images/bandung/taman-hutan-raya-ir-h-djuanda.jpg",
    "likes": 20,
    "rating": 4.3,
    // Adjusted from 13.2
    "bestTimeToVisit": "Dry season for easier trail conditions, morning hours.",
    "entranceFee": "IDR 15,000 (Check official sources for current rates).",
    "activities": [
      "Hiking or walking along nature trails",
      "Exploring Gua Belanda (Dutch Cave) and Gua Jepang (Japanese Cave)",
      "Visiting Curug Omas waterfall (requires longer hike)",
      "Picnicking",
      "Visiting the deer enclosure",
      "Enjoying the fresh air and greenery"
    ],
    "coordinates": {
      "latitude": -6.8565791,
      "longitude": 107.63
      // Estimated longitude
    },
    "transportation": [
      "Angkot to Dago Terminal, then Ojek (motorcycle taxi)",
      "Taxi or Ride-hailing apps (direct to entrance)",
      "Private vehicle"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses in Dago Atas/Pakar area)",
      "midRange": "IDR 500,000-1,500,000 (Hotels and villas in Dago Pakar)",
      "luxury": "IDR 1,800,000+ (InterContinental Bandung Dago Pakar, Sheraton Bandung)"
    },
    "nearbyAttractions": [
      "Tebing Keraton",
      "Dago Dreampark",
      "Warung Bandrek (various scenic cafes in Dago Pakar)",
      "Curug Dago waterfall (closer to Dago bawah)"
    ]
  },
  {
    "id": "farm-house-susu-lembang",
    "name": "Farm House Susu Lembang",
    "description": "A popular European-themed leisure park in Lembang, known for its photogenic spots like the Hobbit House replica, European-style buildings, animal feeding areas, and fresh milk products.",
    "location": "Bandung",
    // Lembang, West Bandung Regency
    "region": "Jawa Barat",
    "category": "Taman Hiburan",
    "image": "/images/bandung/farm-house-susu-lembang.jpg",
    "likes": 25,
    "rating": 4.1,
    // Adjusted from 12.2
    "bestTimeToVisit": "Weekdays to avoid extreme crowds, especially during holidays.",
    "entranceFee": "IDR 30,000 (Ticket can usually be exchanged for a cup of milk or sausage).",
    "activities": [
      "Photography at various themed spots (Hobbit House, European buildings)",
      "Feeding animals (rabbits, sheep, birds)",
      "Renting traditional European costumes for photos",
      "Trying fresh milk and yogurt products",
      "Dining at the restaurant",
      "Shopping for souvenirs"
    ],
    "coordinates": {
      "latitude": -6.8329689,
      "longitude": 107.606
      // Estimated longitude
    },
    "transportation": [
      "Private vehicle or chartered car",
      "Taxi or Ride-hailing apps",
      "Angkot (Bandung-Lembang route)"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses in Lembang)",
      "midRange": "IDR 500,000-1,500,000 (Hotels and villas in Lembang)",
      "luxury": "IDR 1,800,000+ (Higher-end resorts in Lembang)"
    },
    "nearbyAttractions": [
      "The Great Asia Africa",
      "Floating Market Lembang",
      "De Ranch Lembang",
      "Observatorium Bosscha",
      "Jalan Setiabudi (factory outlets)"
    ]
  },
  {
    "id": "kebun-binatang-bandung",
    "name": "Kebun Binatang Bandung",
    "description": "Bandung Zoological Garden located near the Bandung Institute of Technology (ITB). Houses a collection of Indonesian and international animals, set within a leafy park environment.",
    "location": "Bandung",
    "region": "Jawa Barat",
    "category": "Cagar Alam",
    "image": "/images/bandung/kebun-binatang-bandung.jpg",
    "likes": 21,
    "rating": 3.5,
    // Adjusted from rating '4' which seems like a category, not a score, plus general perception
    "bestTimeToVisit": "Weekdays, morning hours.",
    "entranceFee": "IDR 20,000 - 50,000 (Check official sources, prices often vary).",
    "activities": [
      "Observing various animal species",
      "Boating on the small lake",
      "Visiting the nocturnal animal house",
      "Picnicking",
      "Enjoying the green space"
    ],
    "coordinates": {
      "latitude": -6.8897177,
      "longitude": 107.608
      // Estimated longitude
    },
    "transportation": [
      "Angkot",
      "Taxi",
      "Ride-hailing apps",
      "Walk from ITB campus"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses around Dago/Cihampelas)",
      "midRange": "IDR 450,000-1,200,000 (Hotels in Dago or Cihampelas)",
      "luxury": "IDR 1,500,000+ (Hotels in Dago area)"
    },
    "nearbyAttractions": [
      "Institut Teknologi Bandung (ITB) campus",
      "Sabuga Convention Hall",
      "Cihampelas Walk (Ciwalk)",
      "Jalan Cihampelas (Jeans Street)",
      "Taman Ganeca"
    ]
  },
  {
    "id": "kawah-putih",
    "name": "Kawah Putih",
    "description": "A striking volcanic crater lake south of Bandung, renowned for its surreal turquoise-white water (color can vary) and surrounding barren landscape. Offers a unique and dramatic natural spectacle.",
    "location": "Bandung",
    // Ciwidey, South Bandung Regency
    "region": "Jawa Barat",
    "category": "Cagar Alam",
    "image": "/images/bandung/kawah-putih.jpg",
    "likes": 28,
    "rating": 4.4,
    // Adjusted from 13.2
    "bestTimeToVisit": "Dry season (May-September), morning hours for better visibility and less intense sulfur smell.",
    "entranceFee": "IDR 81,000 (Domestic), higher for international. Includes shuttle ('Ontang-Anting') from entrance gate to crater. Check official Perhutani sources.",
    "activities": [
      "Admiring the stunning crater lake view",
      "Photography",
      "Walking along the designated paths near the crater edge",
      "Visiting Sunan Ibu viewpoint (higher viewpoint)",
      "Breathing in the unique atmosphere (limit exposure due to sulfur)"
    ],
    "coordinates": {
      "latitude": -7.1662038,
      "longitude": 107.402
      // Estimated longitude
    },
    "transportation": [
      "Private vehicle or chartered car (most practical)",
      "Public transport (Bus Bandung-Ciwidey, then Angkot/Ojek to gate, then shuttle)"
    ],
    "accommodations": {
      "budget": "IDR 150,000-350,000 (Guesthouses/homestays in Ciwidey)",
      "midRange": "IDR 400,000-1,000,000 (Resorts and hotels in Ciwidey/Rancabali)",
      "luxury": "IDR 1,200,000+ (Glamping sites like Glamping Lakeside Rancabali)"
    },
    "nearbyAttractions": [
      "Glamping Lakeside Rancabali (Pinisi Resto, Situ Patenggang)",
      "Ranca Upas Deer Conservation & Camping Ground",
      "Ciwalini Hot Springs",
      "Situ Patenggang (lake)",
      "Various Strawberry Farms"
    ]
  },
  {
    "id": "tebing-keraton",
    "name": "Tebing Keraton",
    "description": "A cliff viewpoint in the Dago Pakar area (within Tahura Djuanda complex boundaries) offering spectacular panoramic views of the surrounding forested hills and valleys, especially popular for sunrise.",
    "location": "Bandung",
    "region": "Jawa Barat",
    "category": "Cagar Alam",
    "image": "/images/bandung/tebing-keraton.jpg",
    "likes": 25,
    "rating": 4.3,
    // Adjusted from 13.2
    "bestTimeToVisit": "Sunrise for the best views (requires very early start), clear mornings.",
    "entranceFee": "IDR 15,000 (Usually included in Tahura entrance or requires separate small fee, check locally).",
    "activities": [
      "Watching the sunrise or enjoying the morning panorama",
      "Photography of the landscape",
      "Enjoying the cool air and nature",
      "Short walk/hike from the parking area"
    ],
    "coordinates": {
      "latitude": -6.8340683,
      "longitude": 107.637
      // Estimated longitude
    },
    "transportation": [
      "Private vehicle or motorcycle (road can be narrow/steep)",
      "Ojek (motorcycle taxi) from Tahura entrance or Ciburial village",
      "Ride-hailing apps (may drop off before the final steep section)"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses in Dago Atas/Pakar area)",
      "midRange": "IDR 500,000-1,500,000 (Hotels and villas in Dago Pakar)",
      "luxury": "IDR 1,800,000+ (InterContinental Bandung Dago Pakar, Sheraton Bandung)"
    },
    "nearbyAttractions": [
      "Taman Hutan Raya Ir. H. Djuanda (Tahura)",
      "Warung Bandrek & other scenic cafes",
      "Dago Dreampark",
      "Curug Dago"
    ]
  },
  {
    "id": "dusun-bambu",
    "name": "Dusun Bambu",
    "description": "An eco-leisure park in the Lembang area offering a blend of nature, recreation, dining, and accommodation centered around bamboo architecture and green landscapes.",
    "location": "Bandung",
    // Lembang area
    "region": "Jawa Barat",
    "category": "Taman Hiburan",
    "image": "/images/bandung/dusun-bambu.jpg",
    "likes": 31,
    "rating": 4.3,
    // Adjusted from 13.2
    "bestTimeToVisit": "Weekdays for a more relaxed experience, weekends for full activities.",
    "entranceFee": "IDR 25,000 - 40,000 (Check official site, often includes voucher).",
    "activities": [
      "Dining at various themed restaurants (Lutung Kasarung bird cage dining, Purbasari lakeside dining)",
      "Exploring the park grounds and gardens",
      "Boating on the lake",
      "Cycling or e-bike rentals",
      "Children's playground and rabbit feeding",
      "Shopping at the market area",
      "Staying overnight in villas or camping grounds"
    ],
    "coordinates": {
      "latitude": -6.7897147,
      "longitude": 107.58
      // Estimated longitude
    },
    "transportation": [
      "Private vehicle or chartered car (most convenient)",
      "Taxi or Ride-hailing apps"
    ],
    "accommodations": {
      "budget": "Within park: Camping. Nearby: IDR 200,000+ (Guesthouses towards Lembang/Parongpong)",
      "midRange": "Within park: Villas. Nearby: IDR 500,000+ (Hotels/Villas in Lembang/Parongpong)",
      "luxury": "Within park: Higher-end Villas. Nearby: IDR 1,500,000+"
    },
    "nearbyAttractions": [
      "Curug Cimahi (Pelangi Waterfall)",
      "Villa Isola (Gedung Sate replica)",
      "Jendela Alam",
      "Ciater Hot Springs (longer drive)"
    ]
  },
  {
    "id": "museum-geologi",
    "name": "Museum Geologi",
    "description": "A geological museum located near Gedung Sate, housing extensive collections of rocks, minerals, fossils (including hominid replicas), and exhibits on Indonesian geology, volcanoes, and natural resources.",
    "location": "Bandung",
    "region": "Jawa Barat",
    "category": "Budaya",
    "image": "/images/bandung/museum-geologi.jpg",
    "likes": 23,
    "rating": 4.5,
    // Adjusted from 14.2
    "bestTimeToVisit": "Weekdays, opening hours (check official site).",
    "entranceFee": "IDR 2,000 - 3,000 (Check official rates, very affordable).",
    "activities": [
      "Exploring exhibits on geology and paleontology",
      "Viewing dinosaur fossil replicas",
      "Learning about Indonesian volcanoes and geological history",
      "Seeing rock and mineral collections",
      "Visiting the earthquake simulation room (if operational)"
    ],
    "coordinates": {
      "latitude": -6.9007162,
      "longitude": 107.621
      // Estimated longitude
    },
    "transportation": [
      "Angkot",
      "Taxi",
      "Ride-hailing apps",
      "Walk from Gedung Sate"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses near Dipatiukur/Dago)",
      "midRange": "IDR 450,000-1,200,000 (Hotels around Citarum/Riau street)",
      "luxury": "IDR 1,500,000+ (Pullman Bandung, The Papandayan)"
    },
    "nearbyAttractions": [
      "Gedung Sate",
      "Museum Pos Indonesia",
      "Lapangan Gasibu",
      "Cisangkuy street culinary area",
      "Jalan Riau (factory outlets)"
    ]
  },
  {
    "id": "museum-konferensi-asia-afrika",
    "name": "Museum Konferensi Asia Afrika",
    "description": "Located within Gedung Merdeka on Jalan Asia Afrika, this museum commemorates the historic 1955 Asian-African Conference held in Bandung. Features exhibits, photographs, and artifacts related to the conference and the Non-Aligned Movement.",
    "location": "Bandung",
    "region": "Jawa Barat",
    "category": "Budaya",
    "image": "/images/bandung/museum-konferensi-asia-afrika.jpg",
    "likes": 18,
    "rating": 4.5,
    // Adjusted from 14.2
    "bestTimeToVisit": "Museum opening hours (check official site), weekdays less crowded.",
    "entranceFee": "Free",
    "activities": [
      "Viewing historical photographs and documents from the 1955 conference",
      "Visiting the main conference hall in Gedung Merdeka",
      "Learning about the participating countries and leaders",
      "Exploring exhibits on post-colonial history and solidarity",
      "Watching historical footage"
    ],
    "coordinates": {
      "latitude": -6.9211092,
      "longitude": 107.609
      // Longitude cleaned and estimated
    },
    "transportation": [
      "Walk from Alun-Alun/Braga",
      "Angkot",
      "Taxi",
      "Ride-hailing apps"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses/hostels in the city center)",
      "midRange": "IDR 450,000-1,000,000 (Hotels on or near Braga/Asia Afrika)",
      "luxury": "IDR 1,200,000+ (Savoy Homann, Grand Hotel Preanger nearby)"
    },
    "nearbyAttractions": [
      "Gedung Merdeka",
      "Jalan Braga",
      "Alun-Alun Bandung",
      "Masjid Raya Bandung",
      "Jalan Asia Afrika historical buildings"
    ]
  },
  {
    "id": "masjid-raya-bandung",
    "name": "Masjid Raya Bandung",
    "description": "The Grand Mosque of Bandung, located on the edge of Alun-Alun (City Square). Features distinctive twin minarets that offer panoramic city views from the top (viewing deck access fee applies).",
    "location": "Bandung",
    "region": "Jawa Barat",
    "category": "Tempat Ibadah",
    "image": "/images/bandung/masjid-raya-bandung.jpg",
    "likes": 20,
    "rating": 4.7,
    // Adjusted from 15.2
    "bestTimeToVisit": "Outside prayer times for sightseeing. Evening for lively Alun-Alun atmosphere.",
    "entranceFee": "Free (access to mosque), small fee (around IDR 5,000-10,000) to access minaret viewing deck.",
    "activities": [
      "Admiring the mosque architecture",
      "Ascending the minarets for 360-degree city views (check opening times)",
      "Observing prayer activities (respectfully)",
      "Relaxing at the adjacent Alun-Alun Bandung park",
      "Photography"
    ],
    "coordinates": {
      "latitude": -6.9216897,
      "longitude": 107.607
      // Estimated longitude
    },
    "transportation": [
      "Walk from nearby Braga/Asia Afrika",
      "Angkot",
      "Taxi",
      "Ride-hailing apps"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses/hostels in the city center)",
      "midRange": "IDR 450,000-1,000,000 (Hotels near Alun-Alun/Braga)",
      "luxury": "IDR 1,200,000+ (Savoy Homann, Grand Hotel Preanger nearby)"
    },
    "nearbyAttractions": [
      "Alun-Alun Bandung",
      "Jalan Asia Afrika",
      "Museum Konferensi Asia Afrika",
      "Jalan Braga",
      "Pendopo Kota Bandung (Mayor's Office)"
    ]
  },
  {
    "id": "dago-dreampark",
    "name": "Dago Dreampark",
    "description": "An outdoor adventure and recreation park in the Dago Giri area, offering various activities amidst pine forests, including photo spots, outbound challenges, and family-friendly attractions.",
    "location": "Bandung",
    "region": "Jawa Barat",
    "category": "Taman Hiburan",
    "image": "/images/bandung/dago-dreampark.jpg",
    "likes": 20,
    "rating": 4,
    // Adjusted from 10.2
    "bestTimeToVisit": "Weekends for full range of activities, weekdays for less crowding. Dry season.",
    "entranceFee": "IDR 40,000 (Entrance fee, individual rides/photo spots require separate tickets).",
    "activities": [
      "Taking photos at unique spots (Sky Tree, Flying Carpet, Up House)",
      "Trying outbound activities (paintball, ATV, flying fox)",
      "Horse riding",
      "Exploring the pine forest setting",
      "Family activities (feeding animals, boating)",
      "Dining at food stalls"
    ],
    "coordinates": {
      "latitude": -6.8486423,
      "longitude": 107.624
    },
    "transportation": [
      "Private vehicle or chartered car",
      "Taxi or Ride-hailing apps (road can be narrow)"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses in Dago Atas/Giri area)",
      "midRange": "IDR 500,000-1,500,000 (Hotels and villas in Dago Pakar/Giri)",
      "luxury": "IDR 1,800,000+ (InterContinental Bandung Dago Pakar, Sheraton Bandung)"
    },
    "nearbyAttractions": [
      "Taman Hutan Raya Ir. H. Djuanda (Tahura)",
      "Tebing Keraton",
      "Warung Langit Miring & other scenic cafes",
      "Lawangwangi Creative Space"
    ]
  },
  {
    "id": "orchid-forest-cikole",
    "name": "Orchid Forest Cikole",
    "description": "A tourist destination in Lembang set within a pine forest, featuring a large collection of orchids, a wooden suspension bridge (Wood Bridge), outdoor activities, and cafes.",
    "location": "Bandung",
    "region": "Jawa Barat",
    "category": "Taman Hiburan",
    "image": "/images/bandung/orchid-forest-cikole.jpg",
    "likes": 24,
    "rating": 4.5,
    // Adjusted from 14.2
    "bestTimeToVisit": "Dry season, weekdays to avoid crowds. Orchid blooming seasons vary.",
    "entranceFee": "IDR 50,000 (Entrance fee, separate fees for Wood Bridge, activities).",
    "activities": [
      "Walking through the Orchid House and admiring orchid species",
      "Crossing the scenic Wood Bridge (especially atmospheric when lit at dusk)",
      "Enjoying the pine forest atmosphere",
      "Outdoor activities (sliding, rabbit feeding, horse riding)",
      "Dining at cafes within the park",
      "Photography"
    ],
    "coordinates": {
      "latitude": -6.780493,
      "longitude": 107.63
      // Longitude cleaned and estimated
    },
    "transportation": [
      "Private vehicle or chartered car",
      "Taxi or Ride-hailing apps"
    ],
    "accommodations": {
      "budget": "IDR 200,000-400,000 (Guesthouses in Lembang/Cikole)",
      "midRange": "IDR 500,000-1,500,000 (Hotels and resorts in Lembang)",
      "luxury": "IDR 1,800,000+ (Higher-end resorts in Lembang)"
    },
    "nearbyAttractions": [
      "Gunung Tangkuban Parahu",
      "Ciater Hot Springs",
      "Grafika Cikole",
      "Pal 16 Cikole",
      "Bandung Treetop Adventure Park"
    ]
  }
];
var allDestinations = [...featuredDestinations];
function getAllDestinations() {
  return allDestinations;
}
export {
  allDestinations,
  categories,
  featuredDestinations,
  getAllDestinations,
  regions
};
