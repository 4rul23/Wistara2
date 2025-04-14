import { mockUsers } from './users';

// Interface untuk data komentar
export interface Comment {
  id: string;
  destinationId: string;
  userId: string;
  text: string;
  rating: number;
  date: string;
}

// Komentar umum yang bisa dipakai untuk destinasi apa saja
export const commentTemplates = [
  "Tempat wisata yang luar biasa! Pemandangan alam yang menakjubkan dan pelayanan yang ramah.",
  "Salah satu destinasi terbaik yang pernah saya kunjungi. Makanan lokalnya enak dan pemandangannya memukau.",
  "Sangat direkomendasikan untuk liburan keluarga. Banyak aktivitas yang bisa dilakukan dan tempatnya bersih.",
  "Pengalaman budaya yang autentik. Belajar banyak tentang sejarah dan tradisi lokal saat berkunjung.",
  "Tempatnya menarik tapi agak ramai saat akhir pekan. Sarankan untuk datang di hari kerja.",
  "Perjalanan yang sangat berkesan. Wajib dikunjungi bagi pecinta wisata alam Indonesia.",
  "Keindahan alamnya tidak perlu diragukan lagi. Namun fasilitas pendukung masih perlu ditingkatkan.",
  "Sungguh takjub dengan keindahan tempat ini. Akan kembali lagi suatu hari nanti.",
  "Petualangan yang menyenangkan. Cocok untuk pencinta alam dan fotografi.",
  "Akses ke lokasi agak sulit tapi sepadan dengan keindahannya."
];

// Helper function untuk generate tanggal acak dalam format "X waktu yang lalu"
function generateRandomTimeAgo(): string {
  const units = ["jam", "hari", "minggu", "bulan"];
  const unit = units[Math.floor(Math.random() * units.length)];
  const value = Math.floor(Math.random() * 10) + 1;
  return `${value} ${unit} yang lalu`;
}

// Mapping komentar berdasarkan destinationId
export const destinationComments: Record<string, Comment[]> = {
  // Borobudur comments
  "borobudur": [
    {
      id: "comment-borobudur-1",
      destinationId: "borobudur",
      userId: "user3",
      text: "Matahari terbit di Borobudur adalah pengalaman spiritual yang luar biasa. Relief-reliefnya sangat detail dan menceritakan banyak kisah Buddha yang menarik untuk dipelajari.",
      rating: 5,
      date: "2 minggu yang lalu"
    },
    {
      id: "comment-borobudur-2",
      destinationId: "borobudur",
      userId: "user5",
      text: "Kunjungan kedua saya ke Borobudur dan tetap takjub. Sarankan datang pagi-pagi untuk menghindari keramaian dan panas.",
      rating: 4,
      date: "1 bulan yang lalu"
    },
    {
      id: "comment-borobudur-3",
      destinationId: "borobudur",
      userId: "user1",
      text: "Objek wisata bersejarah yang wajib dikunjungi. Namun harga tiket untuk turis asing terlalu mahal dibandingkan negara lain.",
      rating: 4,
      date: "3 hari yang lalu"
    }
  ],

  // Raja Ampat comments
  "raja-ampat": [
    {
      id: "comment-raja-ampat-1",
      destinationId: "raja-ampat",
      userId: "user6",
      text: "Surga bawah laut Indonesia! Snorkeling di sini luar biasa, beragam terumbu karang dan ikan berwarna-warni. Akomodasi agak mahal tapi sepadan.",
      rating: 5,
      date: "1 minggu yang lalu"
    },
    {
      id: "comment-raja-ampat-2",
      destinationId: "raja-ampat",
      userId: "user2",
      text: "View dari puncak Pianemo sungguh indah, air lautnya jernih banget. Jangan lupa bawa kamera underwater!",
      rating: 5,
      date: "3 bulan yang lalu"
    },
    {
      id: "comment-raja-ampat-3",
      destinationId: "raja-ampat",
      userId: "user7",
      text: "Makanan laut segar dan murah, penduduk lokal sangat ramah. Sayangnya, akses internet terbatas jadi siapkan semua kebutuhan sebelum ke sana.",
      rating: 4,
      date: "5 hari yang lalu"
    },
    {
      id: "comment-raja-ampat-4",
      destinationId: "raja-ampat",
      userId: "user4",
      text: "Perjalanannya memang panjang dan mahal, tapi semua terbayarkan dengan pemandangan dan pengalaman diving yang tak terlupakan.",
      rating: 5,
      date: "2 minggu yang lalu"
    }
  ],

  // Ubud comments
  "bali-ubud": [
    {
      id: "comment-bali-ubud-1",
      destinationId: "bali-ubud",
      userId: "user7",
      text: "Kuliner Ubud sangat beragam dari warung lokal hingga restoran fine dining. Saya sangat menikmati kelas memasak dan belajar tentang rempah-rempah Bali.",
      rating: 5,
      date: "4 hari yang lalu"
    },
    {
      id: "comment-bali-ubud-2",
      destinationId: "bali-ubud",
      userId: "user3",
      text: "Monkey Forest adalah pengalaman seru tapi hati-hati dengan barang berharga Anda. Monyet-monyet sangat pintar dan suka mencuri.",
      rating: 4,
      date: "2 minggu yang lalu"
    },
    {
      id: "comment-bali-ubud-3",
      destinationId: "bali-ubud",
      userId: "user5",
      text: "Saya sangat menikmati retreat yoga di sini. Suasananya tenang dan menenangkan, sempurna untuk melepas penat dari rutinitas.",
      rating: 5,
      date: "1 bulan yang lalu"
    }
  ],

  // Mount Bromo comments
  "bromo": [
    {
      id: "comment-bromo-1",
      destinationId: "bromo",
      userId: "user1",
      text: "Sunrise di Bromo adalah pengalaman yang wajib. Udara sangat dingin jadi bawa jaket tebal. Naik kuda adalah pengalaman seru untuk menjelajahi lautan pasir.",
      rating: 5,
      date: "3 minggu yang lalu"
    },
    {
      id: "comment-bromo-2",
      destinationId: "bromo",
      userId: "user8",
      text: "Sebagai pendaki berpengalaman, Bromo tetap menawarkan tantangan dan pemandangan yang memukau. Tour jeep pagi buta sangat direkomendasikan.",
      rating: 4,
      date: "5 hari yang lalu"
    },
    {
      id: "comment-bromo-3",
      destinationId: "bromo",
      userId: "user4",
      text: "Bertemu dengan masyarakat Tengger dan belajar tentang budaya mereka adalah pengalaman tambahan yang berharga selain pemandangan alam.",
      rating: 5,
      date: "2 bulan yang lalu"
    }
  ],

  // Komodo National Park comments
  "komodo": [
    {
      id: "comment-komodo-1",
      destinationId: "komodo",
      userId: "user6",
      text: "Bertemu langsung dengan komodo adalah pengalaman mendebarkan! Pastikan selalu didampingi ranger. Manta Point adalah surga bagi penyelam.",
      rating: 5,
      date: "1 bulan yang lalu"
    },
    {
      id: "comment-komodo-2",
      destinationId: "komodo",
      userId: "user2",
      text: "Pink Beach benar-benar pink! Air lautnya jernih dan cocok untuk snorkeling. Sunset di Padar Island sangat indah, tapi treknya cukup menantang.",
      rating: 4,
      date: "2 minggu yang lalu"
    }
  ]
};

// Function untuk mendapatkan komentar berdasarkan destinasi
export function getCommentsByDestinationId(destinationId: string): Comment[] {
  return destinationComments[destinationId] || [];
}

// Function untuk menambahkan komentar baru
export function addComment(comment: Omit<Comment, 'id' | 'date'>): Comment {
  const newComment: Comment = {
    id: `comment-${comment.destinationId}-${comment.userId}-${Date.now()}`,
    ...comment,
    date: 'Baru saja'
  };

  // Tambahkan ke penyimpanan komentar
  if (!destinationComments[comment.destinationId]) {
    destinationComments[comment.destinationId] = [];
  }

  destinationComments[comment.destinationId].unshift(newComment);

  return newComment;
}

// Generate komentar untuk destinasi yang belum memiliki komentar
export function generateCommentsForDestination(destinationId: string, destinationName: string): Comment[] {
  if (destinationComments[destinationId]) {
    return destinationComments[destinationId];
  }

  // Pilih 3-5 user acak
  const randomUserCount = Math.floor(Math.random() * 3) + 3; // 3-5 komentar
  const shuffledUsers = [...mockUsers].sort(() => 0.5 - Math.random());
  const selectedUsers = shuffledUsers.slice(0, randomUserCount);

  // Generate komentar untuk setiap user
  const generatedComments: Comment[] = selectedUsers.map((user, index) => {
    // Pilih template komentar berdasarkan kombinasi user dan destinasi
    const commentIndex = (user.username.length + destinationName.length + index) % commentTemplates.length;

    return {
      id: `comment-${destinationId}-${user.id}-${Date.now() + index}`,
      destinationId: destinationId,
      userId: user.id,
      text: commentTemplates[commentIndex].replace("{destination}", destinationName),
      rating: Math.floor(Math.random() * 2) + 4, // rating 4-5
      date: generateRandomTimeAgo()
    };
  });

  // Simpan komentar yang digenerate
  destinationComments[destinationId] = generatedComments;

  return generatedComments;
}
