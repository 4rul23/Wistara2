// Destination Card interface
export interface Destination {
  id: string;
  name: string;
  description: string;
  location: string;
  region: string;
  category: string;
  image: string;
  likes: number;
  rating: number;
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

// Regions of Indonesia for filtering
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

// Featured destinations data
export const featuredDestinations: Destination[] = [
  {
    id: "borobudur",
    name: "Borobudur Temple",
    description: "The world's largest Buddhist temple, dating from the 9th century and featuring intricate relief carvings.",
    location: "Magelang, Central Java",
    region: "java",
    category: "Temples",
    image: "/images/borobudur.jpg",
    likes: 5422,
    rating: 4.8
  },
  {
    id: "raja-ampat",
    name: "Raja Ampat Islands",
    description: "An archipelago comprising over 1,500 small islands known for pristine beaches and coral reefs.",
    location: "West Papua",
    region: "papua",
    category: "Islands",
    image: "/images/raja-ampat.png",
    likes: 4876,
    rating: 4.9
  },
  {
    id: "bali-ubud",
    name: "Ubud",
    description: "Bali's cultural heart with traditional crafts, dance performances and lush landscapes.",
    location: "Bali",
    region: "bali",
    category: "Villages",
    image: "/images/bali.jpg",
    likes: 6821,
    rating: 4.7
  },
  {
    id: "bromo",
    name: "Mount Bromo",
    description: "An active volcano in East Java, known for its spectacular sunrises and otherworldly landscape.",
    location: "East Java",
    region: "java",
    category: "Mountains",
    image: "/images/bromo.jpg",
    likes: 3947,
    rating: 4.8
  },
  {
    id: "komodo",
    name: "Komodo National Park",
    description: "Home to the Komodo dragon and diverse marine ecosystems with vibrant coral reefs.",
    location: "East Nusa Tenggara",
    region: "nusatenggara",
    category: "Islands",
    image: "/images/komodo.jpg",
    likes: 3218,
    rating: 4.7
  },
  {
    id: "toba",
    name: "Lake Toba",
    description: "The largest volcanic lake in the world, formed by a supervolcanic eruption.",
    location: "North Sumatra",
    region: "sumatra",
    category: "Mountains",
    image: "/images/toba.jpg",
    likes: 2950,
    rating: 4.6
  },
  {
    id: "bunaken",
    name: "Bunaken Marine Park",
    description: "Renowned for its marine biodiversity and crystal-clear waters ideal for diving.",
    location: "North Sulawesi",
    region: "sulawesi",
    category: "Beaches",
    image: "/images/bunaken.jpg",
    likes: 2754,
    rating: 4.8
  },
  {
    id: "tana-toraja",
    name: "Tana Toraja",
    description: "Region known for its elaborate funeral rituals, traditional houses and stunning landscapes.",
    location: "South Sulawesi",
    region: "sulawesi",
    category: "Villages",
    image: "/images/toraja.jpg",
    likes: 2413,
    rating: 4.6
  }
];


export const moreDestinations: Destination[] = [
  {
    id: "wakatobi",
    name: "Wakatobi Islands",
    description: "A remote archipelago known for its pristine coral reefs and marine biodiversity, perfect for diving enthusiasts.",
    location: "Southeast Sulawesi",
    region: "sulawesi",
    category: "Islands",
    image: "/images/wakatobi.jpg",
    likes: 2187,
    rating: 4.7
  },
  {
    id: "prambanan",
    name: "Prambanan Temple",
    description: "A 9th-century Hindu temple compound dedicated to the Trimurti, expressing the endless cycle of reincarnation.",
    location: "Yogyakarta, Java",
    region: "java",
    category: "Temples",
    image: "/images/prambanan.jpg",
    likes: 3864,
    rating: 4.7
  },
  {
    id: "lombok",
    name: "Lombok Island",
    description: "Known for beautiful beaches, the mighty Mount Rinjani volcano, and indigenous Sasak culture.",
    location: "West Nusa Tenggara",
    region: "nusatenggara",
    category: "Islands",
    image: "/images/lombok.jpg",
    likes: 4092,
    rating: 4.8
  },
  {
    id: "derawan",
    name: "Derawan Islands",
    description: "A tropical paradise with white sandy beaches, crystal clear waters and diverse marine life including rare turtles.",
    location: "East Kalimantan",
    region: "kalimantan",
    category: "Islands",
    image: "/images/derawan.jpg",
    likes: 1958,
    rating: 4.6
  }
];

// Combine all destinations
export const allDestinations = [...featuredDestinations, ...moreDestinations];
