export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  joinDate: string;
  interests: string[];
  visitedDestinations: string[];
  savedDestinations: string[];
}

export const mockUsers: User[] = [
  {
    id: "user1",
    username: "AdiBayu",
    fullName: "Adi Bayu Pramana",
    email: "adi.bayu@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Pecinta alam dan fotografi. Hobi mendaki gunung dan menjelajahi tempat-tempat tersembunyi di Indonesia.",
    location: "Jakarta",
    joinDate: "Januari 2023",
    interests: ["Mountains", "Photography", "Hiking", "Local Culture"],
    visitedDestinations: ["bromo", "rajaampat", "borobudur", "kintamani"],
    savedDestinations: ["kawahijen", "balangan", "toraja"]
  },
  {
    id: "user2",
    username: "Putri_Traveler",
    fullName: "Putri Ayu Wulandari",
    email: "putri.ayu@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Food & travel enthusiast. Suka mengeksplor kuliner lokal dan tempat-tempat instagramable.",
    location: "Surabaya",
    joinDate: "Maret 2023",
    interests: ["Beaches", "Food", "Photography", "City Exploration"],
    visitedDestinations: ["balangan", "tanahlot", "diengplateau", "parangtritis"],
    savedDestinations: ["bromo", "borobudur", "komodo"]
  },
  {
    id: "user3",
    username: "WanderlustRian",
    fullName: "Rian Kurniawan",
    email: "rian.wanderlust@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=11",
    bio: "Blogger travel & digital nomad. Mencari pengalaman unik di seluruh Nusantara.",
    location: "Bandung",
    joinDate: "Desember 2022",
    interests: ["Islands", "Adventure", "History", "Local Culture"],
    visitedDestinations: ["komodo", "rajaampat", "mandalika", "borobudur", "tanahlot"],
    savedDestinations: ["kawahijen", "diengplateau", "tanahlot"]
  },
  {
    id: "user4",
    username: "AndiPenjelajah",
    fullName: "Andi Setiawan",
    email: "andi.explorer@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=8",
    bio: "Backpacker yang senang bertemu penduduk lokal. Mencari cerita unik dari berbagai pelosok Indonesia.",
    location: "Yogyakarta",
    joinDate: "April 2023",
    interests: ["Villages", "Traditions", "Mountains", "History"],
    visitedDestinations: ["borobudur", "prambanan", "toraja", "diengplateau"],
    savedDestinations: ["kawahijen", "bromo", "mandalika"]
  },
  {
    id: "user5",
    username: "SariWisata",
    fullName: "Sari Permatasari",
    email: "sari.travel@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=25",
    bio: "Profesional di bidang pariwisata. Suka mengunjungi destinasi wisata baru untuk rekomendasi klien.",
    location: "Bali",
    joinDate: "Februari 2023",
    interests: ["Beaches", "Luxury Travel", "Spa & Wellness", "Culinary"],
    visitedDestinations: ["kuta", "balangan", "uluwatu", "tanahlot", "mandalika"],
    savedDestinations: ["rajaampat", "bromo", "komodo"]
  },
  {
    id: "user6",
    username: "BudiAdventure",
    fullName: "Budi Santoso",
    email: "budi.adventure@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=15",
    bio: "Petualang ekstrim & diving enthusiast. Suka tantangan dan olahraga air.",
    location: "Makassar",
    joinDate: "Mei 2023",
    interests: ["Diving", "Extreme Sports", "Islands", "Marine Life"],
    visitedDestinations: ["rajaampat", "komodo", "bunaken", "derawan"],
    savedDestinations: ["wakatobi", "togean", "mandalika"]
  },
  {
    id: "user7",
    username: "DewiCulinary",
    fullName: "Dewi Anggraini",
    email: "dewi.culinary@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=9",
    bio: "Food blogger yang suka menjelajahi kuliner tradisional di seluruh Indonesia.",
    location: "Semarang",
    joinDate: "Juni 2023",
    interests: ["Food", "Traditions", "Markets", "Local Culture"],
    visitedDestinations: ["yogyakarta", "solo", "malang", "padang"],
    savedDestinations: ["toraja", "manado", "aceh"]
  },
  {
    id: "user8",
    username: "NovanHiker",
    fullName: "Novan Pratama",
    email: "novan.hiker@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=59",
    bio: "Pendaki profesional dan pemandu wisata untuk area pegunungan di Indonesia.",
    location: "Malang",
    joinDate: "Juli 2023",
    interests: ["Mountains", "Hiking", "Camping", "Nature"],
    visitedDestinations: ["bromo", "semeru", "rinjani", "gede", "merbabu"],
    savedDestinations: ["kelimutu", "kerinci", "latimojong"]
  }
];

// Helper function to get user by ID
export function getUserById(userId: string): User | undefined {
  return mockUsers.find(user => user.id === userId);
}

// Helper function to get comment author
export function getCommentAuthor(userId: string): {username: string, avatar: string} {
  const user = getUserById(userId);
  if (user) {
    return {
      username: user.username,
      avatar: user.avatar
    };
  }
  return {
    username: "Unknown User",
    avatar: "https://i.pravatar.cc/150?img=0"
  };
}

export default mockUsers;
