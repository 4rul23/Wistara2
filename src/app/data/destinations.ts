// Destination Card interface
export interface Destination {
    id: string;
    name: string;
    description: string;
    location: string; // Contains City, Province/Island
    region: string; // Changed to City/Main Location
    category: string;
    image: string;
    likes: number;
    rating: number;
    // Enhanced fields
    bestTimeToVisit: string;
    entranceFee: string;
    activities: string[];
    coordinates: {
        latitude: number;
        longitude: number;
    };
    culturalSignificance?: string;
    difficulty?: 'Easy' | 'Moderate' | 'Hard'; // For hiking destinations
    localCuisine?: string[];
    transportation: string[];
    accommodations: {
        budget: string;
        midRange: string;
        luxury: string;
    };
    nearbyAttractions: string[];
    galleryImages?: string[]; // Will be populated dynamically
}

// Categories for filtering
export const categories = [
    { name: "All", icon: "compass" },
    { name: "Beaches", icon: "map-pin" },
    { name: "Mountains", icon: "map-pin" },
    { name: "Temples", icon: "map-pin" },
    { name: "Cities", icon: "map-pin" },
    { name: "Villages", icon: "map-pin" },
    { name: "Islands", icon: "map-pin" }
];

// Regions of Indonesia for filtering (kept for potential broader filtering logic)
export const regions = [
    { name: "All Regions", value: "all" },
    { name: "Sumatra", value: "sumatra" },
    { name: "Java", value: "java" },
    { name: "Bali", value: "bali" },
    { name: "Sulawesi", value: "sulawesi" },
    { name: "Kalimantan", value: "kalimantan" },
    { name: "Papua", value: "papua" },
    { name: "Nusa Tenggara", value: "nusatenggara" },
    { name: "Maluku", value: "maluku" },
];

// Featured destinations data (Region field updated)
export const featuredDestinations: Destination[] = [
    {
        id: "borobudur",
        name: "Borobudur Temple",
        description: "The world's largest Buddhist temple, dating from the 9th century and featuring intricate relief carvings that tell stories of Buddhist teachings and Javanese life.",
        location: "Magelang, Central Java",
        region: "Magelang", // Updated
        category: "Temples",
        image: "/images/borobudurs.jpg",
        likes: 5422,
        rating: 4.8,
        bestTimeToVisit: "May to September",
        entranceFee: "IDR 350,000 for foreigners, IDR 50,000 for locals",
        activities: [
            "Guided cultural tours",
            "Sunrise viewing",
            "Meditation sessions",
            "Photography workshops",
            "Historical site exploration"
        ],
        coordinates: {
            latitude: -7.6079,
            longitude: 110.2038
        },
        culturalSignificance: "A UNESCO World Heritage site representing one of the greatest Buddhist monuments ever built, showcasing Indonesia's rich religious history and architectural prowess.",
        transportation: [
            "Private car rental from Yogyakarta (1.5 hours)",
            "Organized tours from Yogyakarta or Solo",
            "Public bus to Borobudur terminal"
        ],
        accommodations: {
            budget: "IDR 150,000-300,000 per night",
            midRange: "IDR 500,000-1,000,000 per night",
            luxury: "IDR 2,000,000+ per night at Plataran or Amanjiwo"
        },
        nearbyAttractions: [
            "Prambanan Temple",
            "Yogyakarta City",
            "Mount Merapi",
            "Mendut Temple"
        ]
    },
    {
        id: "raja-ampat",
        name: "Raja Ampat Islands",
        description: "An archipelago comprising over 1,500 small islands known for pristine beaches, coral reefs, and the richest marine biodiversity on Earth with over 1,400 fish species and 600 coral species.",
        location: "West Papua",
        region: "West Papua", // Updated (as location is already specific)
        category: "Islands",
        image: "/images/raja-ampat.png",
        likes: 4876,
        rating: 4.9,
        bestTimeToVisit: "October to April",
        entranceFee: "IDR 1,000,000 (Raja Ampat Marine Park Entry Permit, valid for 1 year)",
        activities: [
            "Diving and snorkeling",
            "Island hopping",
            "Bird watching",
            "Kayaking",
            "Traditional village visits",
            "Hiking to viewpoints"
        ],
        coordinates: {
            latitude: -0.5894,
            longitude: 130.1651
        },
        transportation: [
            "Flights to Sorong, followed by boat transfer",
            "Liveaboard cruises",
            "Local ferry services between islands"
        ],
        accommodations: {
            budget: "IDR 300,000-500,000 per night in homestays",
            midRange: "IDR 1,000,000-2,500,000 per night",
            luxury: "IDR 3,000,000-10,000,000 per night in eco-resorts"
        },
        nearbyAttractions: [
            "Wayag Island",
            "Misool Island",
            "Pianemo Viewpoint",
            "Arborek Tourism Village"
        ]
    },
    {
        id: "bali-ubud",
        name: "Ubud",
        description: "Bali's cultural heart with traditional crafts, dance performances and lush landscapes. A center for traditional arts, yoga retreats, and organic cuisine nestled among terraced rice paddies and ancient temples.",
        location: "Bali",
        region: "Bali", // Updated (as location is already specific)
        category: "Villages",
        image: "/images/bali.jpg",
        likes: 6821,
        rating: 4.7,
        bestTimeToVisit: "April to October",
        entranceFee: "Most attractions range from IDR 15,000-100,000",
        activities: [
            "Traditional dance performances",
            "Art gallery visits",
            "Rice terrace walks",
            "Cooking classes",
            "Yoga retreats",
            "Spa treatments",
            "Temple visits"
        ],
        coordinates: {
            latitude: -8.5069,
            longitude: 115.2625
        },
        culturalSignificance: "The artistic and cultural center of Bali, where traditional Balinese arts, crafts, and performances are preserved and celebrated daily.",
        localCuisine: [
            "Babi Guling (suckling pig)",
            "Bebek Betutu (slow-cooked duck)",
            "Nasi Campur",
            "Fresh tropical fruit smoothies"
        ],
        transportation: [
            "Scooter rental (IDR 50,000-70,000 per day)",
            "Private car with driver (IDR 500,000-700,000 per day)",
            "Taxi services",
            "Walking (within central Ubud)"
        ],
        accommodations: {
            budget: "IDR 200,000-400,000 per night",
            midRange: "IDR 600,000-1,500,000 per night",
            luxury: "IDR 2,000,000-10,000,000+ per night for luxury villas"
        },
        nearbyAttractions: [
            "Sacred Monkey Forest Sanctuary",
            "Tegallalang Rice Terraces",
            "Goa Gajah (Elephant Cave)",
            "Tirta Empul Temple"
        ]
    },
    {
        id: "bromo",
        name: "Mount Bromo",
        description: "An active volcano in East Java, known for its spectacular sunrises and otherworldly landscape of volcanic calderas surrounded by a sea of fine volcanic sand.",
        location: "East Java",
        region: "East Java", // Updated (as location is already specific)
        category: "Mountains",
        image: "/images/bromo.jpg",
        likes: 3947,
        rating: 4.8,
        bestTimeToVisit: "April to October",
        entranceFee: "IDR 220,000 for foreigners (weekdays), IDR 320,000 (weekends); IDR 27,500-32,500 for locals",
        activities: [
            "Sunrise viewing from Mount Penanjakan",
            "Hiking to the crater rim",
            "Horseback riding across the Sea of Sand",
            "Photography tours",
            "Camping",
            "Jeep adventures"
        ],
        coordinates: {
            latitude: -7.9425,
            longitude: 112.9530
        },
        difficulty: "Moderate",
        transportation: [
            "Jeep tours from Cemoro Lawang",
            "Private car hire from Malang or Probolinggo",
            "Public buses to Probolinggo then local transport"
        ],
        accommodations: {
            budget: "IDR 150,000-300,000 per night in guesthouses",
            midRange: "IDR 400,000-800,000 per night",
            luxury: "IDR 1,000,000-2,500,000 per night"
        },
        nearbyAttractions: [
            "Mount Semeru",
            "Whispering Sands",
            "Madakaripura Waterfall",
            "Tengger Caldera"
        ]
    },
    {
        id: "komodo",
        name: "Komodo National Park",
        description: "Home to the Komodo dragon and diverse marine ecosystems with vibrant coral reefs. A UNESCO World Heritage site spanning several islands with unique wildlife both on land and underwater.",
        location: "East Nusa Tenggara",
        region: "East Nusa Tenggara", // Updated (as location is already specific)
        category: "Islands",
        image: "/images/komodo.jpg",
        likes: 3218,
        rating: 4.7,
        bestTimeToVisit: "April to December",
        entranceFee: "IDR 150,000 per day for foreigners, IDR 5,000 for locals",
        activities: [
            "Komodo dragon viewing tours",
            "Snorkeling and diving",
            "Pink Beach visits",
            "Hiking",
            "Island hopping",
            "Wildlife photography"
        ],
        coordinates: {
            latitude: -8.5833,
            longitude: 119.5000
        },
        transportation: [
            "Flights to Labuan Bajo, followed by boat tours",
            "Liveaboard cruises from Bali or Lombok",
            "Local boat charters"
        ],
        accommodations: {
            budget: "IDR 200,000-400,000 per night in Labuan Bajo",
            midRange: "IDR 600,000-1,200,000 per night",
            luxury: "IDR 2,000,000-8,000,000 per night for luxury resorts"
        },
        nearbyAttractions: [
            "Padar Island",
            "Pink Beach",
            "Manta Point",
            "Batu Cermin Cave",
            "Cunca Waterfall"
        ]
    },
    {
        id: "toba",
        name: "Lake Toba",
        description: "The largest volcanic lake in the world, formed by a supervolcanic eruption. In its center lies Samosir Island, home to the Batak culture with traditional villages, ancient tombs, and cultural performances.",
        location: "North Sumatra",
        region: "North Sumatra", // Updated (as location is already specific)
        category: "Mountains", // Note: Technically a lake, but often associated with surrounding highlands
        image: "/images/toba.jpg",
        likes: 2950,
        rating: 4.6,
        bestTimeToVisit: "May to September",
        entranceFee: "Free (specific attractions may have small fees)",
        activities: [
            "Cultural tours of Batak villages",
            "Swimming and water sports",
            "Motorcycle tours around Samosir Island",
            "Hot spring visits",
            "Traditional dance performances",
            "Hiking"
        ],
        coordinates: {
            latitude: 2.6830,
            longitude: 98.8716
        },
        culturalSignificance: "Home to the Batak people with their unique traditions, ancient megalithic artifacts, and distinctive architectural styles that have been preserved for generations.",
        transportation: [
            "Bus from Medan to Parapat (4-5 hours)",
            "Ferry to Samosir Island",
            "Motorcycle rental on Samosir",
            "Private car hire with driver"
        ],
        accommodations: {
            budget: "IDR 100,000-250,000 per night",
            midRange: "IDR 300,000-700,000 per night",
            luxury: "IDR 800,000-2,000,000 per night for lakeside resorts"
        },
        nearbyAttractions: [
            "Sipiso-piso Waterfall",
            "Batak Museum",
            "Traditional Batak villages",
            "Holbung Hill",
            "Tomok ancient tombs"
        ]
    },
    {
        id: "bunaken",
        name: "Bunaken Marine Park",
        description: "Renowned for its marine biodiversity and crystal-clear waters ideal for diving. The underwater walls dropping up to 1,500 meters host over 300 coral species and more than 3,000 fish species.",
        location: "North Sulawesi",
        region: "North Sulawesi", // Updated (as location is already specific)
        category: "Beaches", // Primarily known for marine park/diving
        image: "/images/bunaken.jpg",
        likes: 2754,
        rating: 4.8,
        bestTimeToVisit: "April to November",
        entranceFee: "IDR 150,000 (Marine Park entrance, valid for 1 year)",
        activities: [
            "Scuba diving",
            "Snorkeling",
            "Glass-bottom boat tours",
            "Beach relaxation",
            "Island hopping",
            "Marine life photography"
        ],
        coordinates: {
            latitude: 1.6237,
            longitude: 124.7514
        },
        transportation: [
            "Boat from Manado (30-45 minutes)",
            "Organized diving tours from Manado",
            "Resort boat transfers"
        ],
        accommodations: {
            budget: "IDR 250,000-500,000 per night",
            midRange: "IDR 600,000-1,500,000 per night",
            luxury: "IDR 2,000,000-4,000,000 per night for dive resorts"
        },
        nearbyAttractions: [
            "Siladen Island",
            "Manado Tua Volcano",
            "Tangkoko Nature Reserve",
            "Lembeh Strait",
            "Minahasa Highlands"
        ]
    },
    {
        id: "tana-toraja",
        name: "Tana Toraja",
        description: "Region known for its elaborate funeral rituals, traditional houses and stunning landscapes. The unique culture centers around death as a celebration with complex ceremonies that can last for days.",
        location: "South Sulawesi",
        region: "South Sulawesi", // Updated (as location is already specific)
        category: "Villages",
        image: "/images/toraja.jpg",
        likes: 2413,
        rating: 4.6,
        bestTimeToVisit: "June to September",
        entranceFee: "Free (specific sites may charge IDR 10,000-50,000)",
        activities: [
            "Traditional funeral ceremony visits (with permission)",
            "Tongkonan (traditional house) tours",
            "Cave burial site exploration",
            "Trekking through rice terraces",
            "Local market visits",
            "Cultural immersion experiences"
        ],
        coordinates: {
            latitude: -3.0375,
            longitude: 119.8642
        },
        culturalSignificance: "Known for its unique death rituals, boat-shaped houses (Tongkonan), intricately carved wooden effigies (Tau Tau), and belief system that blends animism with Christianity.",
        localCuisine: [
            "Pa'piong (bamboo-cooked meat)",
            "Pantollo' Pamarrasan (grilled pork)",
            "Deppa Tori' (sweet rice cake)",
            "Bolu Paranggi (Toraja coffee)"
        ],
        transportation: [
            "Flight to Makassar, then 8-hour drive to Toraja",
            "Public bus from Makassar to Rantepao",
            "Private car hire",
            "Local bemo (minibuses) within Toraja"
        ],
        accommodations: {
            budget: "IDR 150,000-300,000 per night",
            midRange: "IDR 400,000-800,000 per night",
            luxury: "IDR 1,000,000-2,000,000 per night"
        },
        nearbyAttractions: [
            "Londa Burial Caves",
            "Kete Kesu Village",
            "Batutumonga highlands",
            "Lemo Cliff Graves",
            "Sa'dan Traditional Weaving Village"
        ]
    }
];


export const moreDestinations: Destination[] = [
    {
        id: "wakatobi",
        name: "Wakatobi Islands",
        description: "A remote archipelago known for its pristine coral reefs and marine biodiversity, perfect for diving enthusiasts. The name is an acronym from the four main islands: Wangi-wangi, Kaledupa, Tomia, and Binongko.",
        location: "Southeast Sulawesi",
        region: "Southeast Sulawesi", // Updated
        category: "Islands",
        image: "/images/wakatobi.jpg",
        likes: 2187,
        rating: 4.7,
        bestTimeToVisit: "March to December",
        entranceFee: "IDR 150,000 (Marine Park fee)",
        activities: [
            "Diving and snorkeling",
            "Beach relaxation",
            "Island hopping",
            "Traditional fishing village tours",
            "Bajo sea gypsy cultural experiences",
            "Marine conservation activities"
        ],
        coordinates: {
            latitude: -5.3268,
            longitude: 123.5945
        },
        transportation: [
            "Flight to Wangi-Wangi from Makassar or Kendari",
            "Chartered boats between islands",
            "Local wooden boat (sampan) rental",
            "Resort transfer boats"
        ],
        accommodations: {
            budget: "IDR 250,000-400,000 per night in homestays",
            midRange: "IDR 600,000-1,500,000 per night",
            luxury: "IDR 3,000,000-10,000,000 per night for Wakatobi Resort"
        },
        nearbyAttractions: [
            "Hoga Island",
            "Bajo stilt villages",
            "Coral gardens",
            "Kapota mangrove forest",
            "Traditional shipbuilding in Binongko"
        ]
    },
    {
        id: "prambanan",
        name: "Prambanan Temple",
        description: "A 9th-century Hindu temple compound dedicated to the Trimurti, expressing the endless cycle of reincarnation. The massive complex features intricate stone carvings depicting the epic tale of Ramayana.",
        location: "Yogyakarta, Java",
        region: "Yogyakarta", // Updated
        category: "Temples",
        image: "/images/prambanan.jpg",
        likes: 3864,
        rating: 4.7,
        bestTimeToVisit: "May to September",
        entranceFee: "IDR 350,000 for foreigners, IDR 50,000 for locals",
        activities: [
            "Temple exploration",
            "Ramayana Ballet performances (evening)",
            "Sunset viewing",
            "Archaeological tours",
            "Cultural photography",
            "Full moon tours (special events)"
        ],
        coordinates: {
            latitude: -7.7520,
            longitude: 110.4913
        },
        culturalSignificance: "A UNESCO World Heritage site showcasing Indonesia's Hindu history and one of the largest Hindu temples in Southeast Asia with distinctive tall and pointed architecture.",
        transportation: [
            "Private car or taxi from Yogyakarta (30 minutes)",
            "Public bus from Yogyakarta",
            "TransJogja bus service",
            "Combined tours with Borobudur"
        ],
        accommodations: {
            budget: "IDR 150,000-300,000 per night in Yogyakarta",
            midRange: "IDR 400,000-800,000 per night",
            luxury: "IDR 1,000,000-3,000,000+ per night in luxury hotels"
        },
        nearbyAttractions: [
            "Borobudur Temple",
            "Ratu Boko Palace",
            "Yogyakarta Sultan's Palace",
            "Sewu Temple",
            "Kalasan Temple"
        ]
    },
    {
        id: "lombok",
        name: "Lombok Island",
        description: "Known for beautiful beaches, the mighty Mount Rinjani volcano, and indigenous Sasak culture. Less developed than neighboring Bali, Lombok offers pristine natural beauty with a distinct cultural identity.",
        location: "West Nusa Tenggara",
        region: "West Nusa Tenggara", // Updated
        category: "Islands",
        image: "/images/lombok.jpg",
        likes: 4092,
        rating: 4.8,
        bestTimeToVisit: "May to October",
        entranceFee: "Free (beaches), IDR 150,000 (Rinjani National Park)",
        activities: [
            "Beach lounging and surfing",
            "Mount Rinjani trekking",
            "Gili Islands day trips",
            "Sasak village cultural tours",
            "Waterfall exploration",
            "Surfing at Desert Point or Kuta beaches"
        ],
        coordinates: {
            latitude: -8.6500,
            longitude: 116.3200
        },
        difficulty: "Hard (for Rinjani trekking)",
        culturalSignificance: "Home to the Sasak people with their unique traditions, weaving crafts, and traditional villages where ancient ways of life continue.",
        localCuisine: [
            "Ayam Taliwang (spicy grilled chicken)",
            "Plecing Kangkung (water spinach salad)",
            "Beberuk Terong (eggplant dish)",
            "Sate Rembiga (spiced meat satay)"
        ],
        transportation: [
            "Flights to Lombok International Airport",
            "Fast boats from Bali",
            "Local car or motorbike rental",
            "Cidomo (horse-drawn cart) in villages"
        ],
        accommodations: {
            budget: "IDR 150,000-350,000 per night",
            midRange: "IDR 500,000-1,500,000 per night",
            luxury: "IDR 2,000,000-10,000,000+ per night for beach resorts"
        },
        nearbyAttractions: [
            "Gili Islands (Trawangan, Air, Meno)",
            "Mount Rinjani",
            "Kuta and Tanjung Aan beaches",
            "Sendang Gile and Tiu Kelep waterfalls",
            "Sade Sasak Village"
        ]
    },
    {
        id: "derawan",
        name: "Derawan Islands",
        description: "A tropical paradise with white sandy beaches, crystal clear waters and diverse marine life including rare turtles. The archipelago comprises 31 islands, offering world-class diving and unique wildlife encounters.",
        location: "East Kalimantan",
        region: "East Kalimantan",
        category: "Islands",
        image: "/images/derawan.jpg",
        likes: 1958,
        rating: 4.6,
        bestTimeToVisit: "March to October",
        entranceFee: "IDR 50,000 per island for foreigners, IDR 20,000 for locals",
        activities: [
            "Swimming with stingless jellyfish in Kakaban",
            "Turtle watching and conservation",
            "Diving and snorkeling",
            "Island hopping",
            "Whale shark spotting (seasonal)",
            "Sunbathing on pristine beaches"
        ],
        coordinates: {
            latitude: 2.2870,
            longitude: 118.7001
        },
        transportation: [
            "Flight to Berau, then car to Tanjung Batu (3 hours)",
            "Speedboat from Tanjung Batu harbor to Derawan",
            "Wooden boats between islands",
            "Resort transfer services"
        ],
        accommodations: {
            budget: "IDR 200,000-350,000 per night in simple guesthouses",
            midRange: "IDR 500,000-1,000,000 per night",
            luxury: "IDR 1,500,000-4,000,000 per night for dive resorts"
        },
        nearbyAttractions: [
            "Kakaban Lake (jellyfish lake)",
            "Maratua Island",
            "Sangalaki Island (turtle sanctuary)",
            "Nabucco Island",
            "Biduk-biduk Waterfall"
        ]
    }
];


export const allDestinations = [...featuredDestinations, ...moreDestinations];

export function getAllDestinations(): Destination[] {
    return allDestinations;
  }
