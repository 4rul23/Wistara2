"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Inter, Space_Grotesk, Quicksand } from "next/font/google";
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronRight, FiMap, FiHeart, FiCamera, FiInfo, FiUsers, FiArrowLeft, FiGlobe, FiMapPin, FiCalendar } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

// Font configuration
const quicksand = Quicksand({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Helper function for parallax effect
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export default function AboutPage() {
  const router = useRouter();
  const mousePosition = useMousePosition();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className={`relative min-h-screen text-white bg-[#0a0a0a] ${quicksand.className} overflow-x-hidden`}>
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.04] z-0 pointer-events-none"
        style={{
          backgroundPosition: `${mousePosition.x * 0.01}px ${mousePosition.y * 0.01}px`
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          transition: {
            duration: 50,
            ease: "linear",
            repeat: Infinity,
            repeatType: "mirror"
          }
        }}
      />

      <motion.div
        className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] z-0 pointer-events-none mix-blend-overlay"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          transition: {
            duration: 120,
            ease: "linear",
            repeat: Infinity,
            repeatType: "mirror"
          }
        }}
      />

      {/* Back to Home Button */}
      <div className="fixed top-6 left-6 z-40">
        <motion.button
          onClick={handleBackToHome}
          className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-lg text-white/80 hover:text-white"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft />
          <span className="text-sm">Kembali ke Beranda</span>
        </motion.button>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <FiGlobe className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
          </div>
          <h1 className={`${spaceGrotesk.className} text-4xl sm:text-5xl md:text-6xl font-bold mb-6`}>
            Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Wistara</span>
          </h1>
          <p className={`${inter.className} text-white/70 max-w-3xl mx-auto text-lg sm:text-xl`}>
            Menjelajahi keindahan Indonesia dengan pengalaman digital yang imersif dan informatif
          </p>
        </motion.div>

        {/* Mission Section with Borobudur image */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-1/2">
                <h2 className={`${spaceGrotesk.className} text-2xl sm:text-3xl font-bold mb-6`}>
                  Misi Kami
                </h2>
                <div className="space-y-4 text-white/80">
                  <p>
                    Wistara hadir dengan misi untuk mempromosikan kekayaan budaya dan keindahan alam Indonesia ke seluruh dunia melalui platform digital yang inovatif dan interaktif.
                  </p>
                  <p>
                    Kami percaya bahwa Indonesia memiliki potensi pariwisata yang luar biasa yang patut diperkenalkan kepada wisatawan domestik dan mancanegara. Dengan pengalaman digital yang kami ciptakan, kami ingin menginspirasi lebih banyak orang untuk menjelajahi keindahan Indonesia.
                  </p>
                  <p>
                    Wistara juga berkomitmen untuk mendukung pariwisata berkelanjutan yang memperhatikan dampak lingkungan dan mendukung ekonomi lokal di berbagai destinasi di Indonesia.
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 h-64 sm:h-80 md:h-auto relative rounded-xl overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src="/images/borobudur.jpg"
                    alt="Candi Borobudur - Keindahan warisan budaya Indonesia"
                    fill
                    className="object-cover"
                    quality={90}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium flex items-center gap-1">
                      <FiMapPin size={12} />
                      Candi Borobudur, Magelang
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Destination Showcase */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h2 className={`${spaceGrotesk.className} text-2xl sm:text-3xl font-bold mb-8 text-center`}>
            Keindahan Indonesia
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              className="aspect-[4/3] relative rounded-xl overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/bali-pagoda-sunrise-indonesia.jpg"
                alt="Pagoda di Bali saat sunrise"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">Bali</h3>
                <p className="text-sm opacity-80 flex items-center gap-1">
                  <FiMapPin size={12} />
                  Pulau Dewata
                </p>
              </div>
            </motion.div>

            <motion.div
              className="aspect-[4/3] relative rounded-xl overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/bromo.png"
                alt="Gunung Bromo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">Bromo</h3>
                <p className="text-sm opacity-80 flex items-center gap-1">
                  <FiMapPin size={12} />
                  Jawa Timur
                </p>
              </div>
            </motion.div>

            <motion.div
              className="aspect-[4/3] relative rounded-xl overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/bantimurung.png"
                alt="Bantimurung"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">Bantimurung</h3>
                <p className="text-sm opacity-80 flex items-center gap-1">
                  <FiMapPin size={12} />
                  Sulawesi Selatan
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section with improved icons and descriptions */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2 className={`${spaceGrotesk.className} text-2xl sm:text-3xl font-bold mb-8 text-center`}>
            Fitur Utama
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="bg-teal-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FiMap className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className={`${spaceGrotesk.className} text-xl font-bold mb-2`}>Eksplorasi Virtual</h3>
              <p className="text-white/70">
                Jelajahi ratusan destinasi wisata di Indonesia dengan gambar beresolusi tinggi, deskripsi mendalam, dan informasi praktis untuk perjalanan Anda.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <span className="w-1 h-1 bg-teal-400 rounded-full"></span>
                  Foto dan video berkualitas tinggi
                </li>
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <span className="w-1 h-1 bg-teal-400 rounded-full"></span>
                  Informasi lokasi yang detail
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="bg-blue-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FiHeart className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className={`${spaceGrotesk.className} text-xl font-bold mb-2`}>Personalisasi</h3>
              <p className="text-white/70">
                Dapatkan rekomendasi destinasi berdasarkan preferensi perjalanan Anda. Simpan tempat favorit dan tandai destinasi yang telah Anda kunjungi.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Rekomendasi sesuai minat pribadi
                </li>
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Koleksi favorit dan dikunjungi
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="bg-rose-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FiInfo className="w-6 h-6 text-rose-400" />
              </div>
              <h3 className={`${spaceGrotesk.className} text-xl font-bold mb-2`}>Informasi Lengkap</h3>
              <p className="text-white/70">
                Akses informasi praktis seperti rute perjalanan, waktu terbaik untuk berkunjung, aktivitas yang direkomendasikan, dan tips perjalanan.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <span className="w-1 h-1 bg-rose-400 rounded-full"></span>
                  Panduan lengkap tiap destinasi
                </li>
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <span className="w-1 h-1 bg-rose-400 rounded-full"></span>
                  Tips perjalanan dari komunitas
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Destination - Bali Section */}
        <motion.section
          className="mb-20 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="bg-gradient-to-br from-blue-900/20 to-teal-900/20 backdrop-blur-sm border border-white/10 rounded-2xl p-0 relative">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-60 md:h-auto">
                <Image
                  src="/images/bali.jpg"
                  alt="Pantai di Bali"
                  fill
                  className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                  priority
                />
              </div>
              <div className="p-8 md:w-1/2 md:py-12 md:px-8">
                <div className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm mb-4 font-medium">
                  Destinasi Unggulan
                </div>
                <h2 className={`${spaceGrotesk.className} text-2xl sm:text-3xl font-bold mb-4`}>
                  Pulau Bali
                </h2>
                <p className="text-white/70 mb-6">
                  Bali, pulau yang terkenal dengan pantainya yang indah, adalah tujuan wisata favorit di Indonesia. Dengan keindahan alamnya, budaya yang kaya, dan keramahan penduduknya, Bali menawarkan pengalaman liburan yang tak terlupakan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-center gap-2 text-white/60">
                    <FiMapPin className="text-teal-400" />
                    <span>Indonesia</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <FiCalendar className="text-blue-400" />
                    <span>Waktu terbaik: April - Oktober</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <FiCamera className="text-rose-400" />
                    <span>Destinasi Fotogenik</span>
                  </div>
                </div>
                <motion.button
                  className="px-6 py-3 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 text-teal-300 rounded-lg flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Jelajahi Bali
                  <FiChevronRight />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Team Section with improved styling */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <h2 className={`${spaceGrotesk.className} text-2xl sm:text-3xl font-bold mb-8 text-center`}>
            Tim Wistara
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Arul Setya", role: "Software Engineer", quote: "Teknologi untuk menjembatani wisatawan dengan keindahan Indonesia" },
              { name: "Nada Yasinta", role: "UI/UX Designer", quote: "Merancang antarmuka yang intuitif untuk pengalaman menjelajah yang menyenangkan" },
              { name: "Rizki Ramadhan", role: "Content Manager", quote: "Menghadirkan konten informatif berkualitas tentang destinasi Indonesia" },
              { name: "Dewi Cahyani", role: "Travel Consultant", quote: "Memberikan wawasan dan tips perjalanan untuk pengalaman wisata terbaik" }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center text-center"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)" }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400/40 to-blue-500/40 animate-pulse" />
                  <div className="w-full h-full rounded-full flex items-center justify-center bg-white/10 text-2xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                </div>
                <h3 className={`${spaceGrotesk.className} text-lg font-bold`}>{member.name}</h3>
                <p className="text-white/60 text-sm mb-3">{member.role}</p>
                <p className="text-white/80 text-xs italic">"{member.quote}"</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Vision Section with improved styling */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <div className="bg-gradient-to-br from-teal-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10 text-center">
            <h2 className={`${spaceGrotesk.className} text-2xl sm:text-3xl font-bold mb-6`}>
              Visi Ke Depan
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto mb-8">
              Kami berkomitmen untuk terus mengembangkan Wistara menjadi platform pariwisata terdepan di Indonesia. Dengan memanfaatkan teknologi terkini, kami ingin menciptakan pengalaman digital yang semakin imersif dan informatif bagi para pengguna.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="bg-teal-500/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiMap className="text-teal-400" size={18} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ekspansi Konten</h3>
                <p className="text-white/60 text-sm">Menambahkan lebih banyak destinasi dan informasi mendalam</p>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="bg-blue-500/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiCamera className="text-blue-400" size={18} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Teknologi AR/VR</h3>
                <p className="text-white/60 text-sm">Mengintegrasikan teknologi realitas virtual untuk pengalaman imersif</p>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="bg-rose-500/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiUsers className="text-rose-400" size={18} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Kolaborasi Lokal</h3>
                <p className="text-white/60 text-sm">Bermitra dengan pelaku wisata lokal untuk pengalaman otentik</p>
              </motion.div>
            </div>

            <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg max-w-3xl mx-auto">
              <p className="text-white/80 italic">
                "Wistara bertujuan menjadi jembatan digital yang menghubungkan keajaiban Indonesia dengan para wisatawan dari seluruh dunia."
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className={`${spaceGrotesk.className} text-2xl sm:text-3xl font-bold mb-4`}>
                Mari Terhubung
              </h2>
              <p className="text-white/70 mb-8">
                Kami selalu terbuka untuk saran, pertanyaan, dan kolaborasi. Hubungi kami melalui:
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="mailto:info@wistara.id"
                  className="w-full sm:w-auto px-6 py-3 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 text-teal-300 rounded-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Email Kami
                  <FiChevronRight />
                </motion.a>

                <motion.a
                  href="https://instagram.com/wistara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Instagram
                  <FiChevronRight />
                </motion.a>

                <motion.a
                  href="https://twitter.com/wistara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Twitter
                  <FiChevronRight />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 bg-black/20">
        <div className="container mx-auto px-4 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Wistara. Semua hak dilindungi undang-undang.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
