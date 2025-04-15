"use client"

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Quicksand, Inter, Space_Grotesk } from "next/font/google";
import { FiSearch, FiFilter, FiMapPin, FiHeart, FiBookmark, FiChevronDown, FiX, FiCornerDownRight, FiCompass } from "react-icons/fi";
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/router';

// Import destination data
import {
  Destination,
  categories as categoryData,
  regions as regionData
} from "@/app/data/destinations";
import { getAllDestinations, getDestinationsByRegion } from "@/lib/api-client";

// Import navbar component
import Navbar from "@/app/components/Navbar";

// Font configuration
const quicksand = Quicksand({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Client-side detection helper
const isClient = typeof window !== "undefined";

// Map category icons to FI components
const getCategoryIcon = (iconName: string) => {
  switch(iconName) {
    case "compass": return <FiCompass />;
    case "map-pin":
    default: return <FiMapPin />;
  }
};

// Categories with React icons
const categories = categoryData.map(cat => ({
  ...cat,
  icon: getCategoryIcon(cat.icon)
}));

// Regions of Indonesia for filtering
const regions = regionData;

export default function ExplorePage() {
  // Get auth from context instead of local state
  const { user, isAuthenticated } = useAuth();
  const isLoggedIn = isAuthenticated; // untuk kompatibilitas dengan kode yang sudah ada

  // Your existing state variables
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeRegion, setActiveRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [liked, setLiked] = useState<{[key: string]: boolean}>({});
  const [saved, setSaved] = useState<{[key: string]: boolean}>({});

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState<'favorite'|'save'|null>(null);
  const [pendingDestination, setPendingDestination] = useState<string|null>(null);

  const [showRegionDropdown, setShowRegionDropdown] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 150], [1, 0.85]);
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);
  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  const springHeaderY = useSpring(headerY, springConfig);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Tambahkan state untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const data = await getAllDestinations();
        setDestinations(data);
        setFilteredDestinations(data);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Failed to load destinations');

        // Fallback ke data statis jika API gagal
        import("../data/destinations").then((module) => {
          const staticData = [...module.featuredDestinations, ...module.moreDestinations];
          setDestinations(staticData);
          setFilteredDestinations(staticData);
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Handler untuk filter berdasarkan region
  const handleRegionChange = async (region: string) => {
    try {
      setLoading(true);
      if (region === 'all') {
        const data = await getAllDestinations();
        setFilteredDestinations(data);
      } else {
        const data = await getDestinationsByRegion(region);
        setFilteredDestinations(data);
      }
    } catch (err) {
      console.error('Error filtering by region:', err);
      setError('Failed to filter destinations');
    } finally {
      setLoading(false);
    }
  };

  // Track mouse position for parallax effects
  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = (clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Modifikasi event handler untuk like dan save
  const handleLike = (e: React.MouseEvent, destinationId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      // Simpan informasi tentang aksi yang ingin dilakukan
      setAuthAction('favorite');
      setPendingDestination(destinationId);
      setShowAuthModal(true);
      return;
    }

    // Jika sudah login, lakukan aksi like
    setLiked({...liked, [destinationId]: !liked[destinationId]});
  };

  const handleSave = (e: React.MouseEvent, destinationId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      // Simpan informasi tentang aksi yang ingin dilakukan
      setAuthAction('save');
      setPendingDestination(destinationId);
      setShowAuthModal(true);
      return;
    }

    // Jika sudah login, lakukan aksi save
    setSaved({...saved, [destinationId]: !saved[destinationId]});
  };

  // Tambahkan Auth Modal component
  const AuthModal = ({ onClose }: { onClose: () => void }) => {
    const router = useRouter();

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          className="bg-[#151515] border border-white/10 rounded-xl p-6 max-w-md w-full"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
        >
          <h3 className={`${spaceGrotesk.className} text-xl font-semibold mb-2`}>
            {authAction === 'favorite' ? 'Suka destinasi ini?' : 'Simpan ke koleksi Anda?'}
          </h3>
          <p className={`${inter.className} text-white/70 mb-6`}>
            {authAction === 'favorite'
              ? 'Anda perlu login untuk menyukai destinasi'
              : 'Anda perlu login untuk menyimpan destinasi'}
          </p>

          <div className="flex flex-col space-y-3">
            <motion.button
              className="bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 py-2.5 rounded-lg text-teal-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/login')}
            >
              Masuk
            </motion.button>

            <motion.button
              className="bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-lg text-white/70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
            >
              Lanjutkan sebagai tamu
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className={`relative bg-[#0a0a0a] min-h-screen text-white ${quicksand.className} overflow-x-hidden`}>
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.04] z-0 pointer-events-none"
        style={{
          x: useTransform(smoothMouseX, [-1, 1], [-15, 15]),
          y: useTransform(smoothMouseY, [-1, 1], [-15, 15]),
        }}
      />

      <motion.div
        className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] z-0 pointer-events-none mix-blend-overlay"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 120, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content */}
      <main className="relative pt-28 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 md:mb-12"
        >
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4`}>
            <span className="text-teal-400">Explore</span> Nusantara
          </h1>
          <p className={`${inter.className} text-lg md:text-xl text-white/70 max-w-3xl`}>
            Discover the breathtaking diversity of Indonesias landscapes, cultures, and hidden treasures
          </p>
        </motion.div>

        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 bg-gradient-to-r from-teal-900/30 to-emerald-900/20 rounded-lg p-4 border border-teal-500/20"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/30 flex items-center justify-center text-teal-300 font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className={`${spaceGrotesk.className} text-lg`}>Selamat datang, {user.name}!</h3>
                <p className={`${inter.className} text-sm text-white/70`}>
                  Temukan destinasi baru yang sesuai dengan minat Anda
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <div className="mb-10 md:mb-14">
          <motion.div
            ref={searchRef}
            className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ borderColor: "rgba(45, 212, 191, 0.3)" }}
          >
            {/* Search Input */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-lg" />
              <input
                type="text"
                placeholder="Search destinations, cultures, or activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${inter.className} w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all duration-200`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  <FiX className="text-lg" />
                </button>
              )}
            </div>

            {/* Region Filter */}
            <div className="relative">
              <motion.button
                onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                className={`flex items-center justify-between w-full md:w-48 space-x-2 bg-white/5 border ${showRegionDropdown ? 'border-teal-500/50' : 'border-white/10'} rounded-lg py-3 px-4 text-white transition-all duration-200 hover:border-white/20`}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`${inter.className} text-sm md:text-base`}>
                  {regions.find(r => r.value === activeRegion)?.name || 'All Regions'}
                </span>
                <FiChevronDown className={`transition-transform duration-200 ${showRegionDropdown ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {showRegionDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 right-0 top-full mt-1 z-50 bg-[#151515] border border-white/10 rounded-lg shadow-lg py-1 overflow-hidden"
                  >
                    {regions.map((region) => (
                      <motion.button
                        key={region.value}
                        onClick={() => {
                          setActiveRegion(region.value);
                          setShowRegionDropdown(false);
                          handleRegionChange(region.value);
                        }}
                        className={`flex items-center w-full text-left px-4 py-2 ${inter.className} text-sm transition-colors hover:bg-white/5 ${activeRegion === region.value ? 'text-teal-400' : 'text-white/80'}`}
                        whileHover={{ x: 4 }}
                      >
                        {region.name}
                        {activeRegion === region.value && (
                          <FiCornerDownRight className="ml-2 opacity-70" />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filter Button */}
            <motion.button
              className="flex items-center justify-center space-x-2 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 rounded-lg py-3 px-5 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiFilter className="text-teal-400" />
              <span className={`${inter.className} text-teal-200`}>Filters</span>
            </motion.button>
          </motion.div>

          {/* Categories */}
          <motion.div
            className="flex space-x-2 md:space-x-3 overflow-x-auto pb-2 md:pb-4 no-scrollbar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category.name
                    ? 'bg-teal-500/20 border border-teal-500/40 text-teal-300'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:border-white/20'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + index * 0.05,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 100
                }}
              >
                {category.icon}
                <span className={`${inter.className} text-sm`}>{category.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className={`${spaceGrotesk.className} text-xl font-semibold`}>
            {filteredDestinations.length} {filteredDestinations.length === 1 ? 'destination' : 'destinations'} found
          </h2>
        </motion.div>

        {loading ? (
          <p>Loading destinations...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            {filteredDestinations.length > 0 ? (
              <>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredDestinations
                    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                    .map((destination, index) => (
                      // Card code remains the same
                      <motion.div
                        key={destination.id}
                        variants={cardVariants}
                        custom={index}
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-teal-400/30 transition-colors duration-300"
                      >
                        <Link href={`/explore/${destination.id}`}>
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <Image
                            src={destination.image}
                            alt={destination.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-70"></div>

                          {/* Location Badge */}
                          <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-full py-1 px-3 flex items-center space-x-1">
                            <FiMapPin className="text-teal-400 text-xs" />
                            <span className={`${inter.className} text-xs text-white/90`}>{destination.location}</span>
                          </div>

                          {/* Actions */}
                          <div className="absolute top-3 right-3 flex space-x-2">
                            <motion.button
                              onClick={(e) => handleLike(e, destination.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className={`h-8 w-8 flex items-center justify-center rounded-full backdrop-blur-sm transition-colors ${liked[destination.id] ? 'bg-rose-500/30 text-rose-400' : 'bg-black/40 text-white/70 hover:text-white'}`}
                            >
                              <FiHeart className={`text-sm ${liked[destination.id] ? 'fill-rose-400' : ''}`} />
                            </motion.button>

                            <motion.button
                              onClick={(e) => handleSave(e, destination.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className={`h-8 w-8 flex items-center justify-center rounded-full backdrop-blur-sm transition-colors ${saved[destination.id] ? 'bg-teal-500/30 text-teal-300' : 'bg-black/40 text-white/70 hover:text-white'}`}
                            >
                              <FiBookmark className={`text-sm ${saved[destination.id] ? 'fill-teal-400' : ''}`} />
                            </motion.button>
                          </div>
                        </div>
                        </Link>
                        <motion.div className="p-4">
                          <Link href={`/explore/${destination.id}`}>
                            <h3 className={`${spaceGrotesk.className} text-lg font-semibold mb-2 group-hover:text-teal-300 transition-colors`}>
                              {destination.name}
                            </h3>
                          </Link>

                          <p className={`${inter.className} text-sm text-white/70 line-clamp-2 mb-3`}>
                            {destination.description}
                          </p>

                          {/* Rating and Stats */}
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                              {/* Star rating */}
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`text-xs ${i < Math.floor(destination.rating) ? 'text-teal-400' : 'text-white/20'}`}>★</span>
                                ))}
                              </div>
                              <span className={`${inter.className} text-xs text-white/80`}>{destination.rating}</span>
                            </div>

                            <div className={`${inter.className} text-xs text-white/60 flex items-center`}>
                              <FiHeart className="mr-1 text-rose-400/70" />
                              {destination.likes.toLocaleString()}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                </motion.div>

                {/* Pagination Controls */}
                {filteredDestinations.length > ITEMS_PER_PAGE && (
                  <div className="mt-12 flex items-center justify-center gap-6">
                    <motion.button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Previous page"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>

                    <span className={`${inter.className} text-lg text-white/70`}>
                      {currentPage} / {Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE)}
                    </span>

                    <motion.button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE)))}
                      disabled={currentPage >= Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE)}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Next page"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                )}
              </>
            ) : (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className={`${spaceGrotesk.className} text-xl mb-2`}>No destinations found</h3>
                <p className={`${inter.className} text-white/60`}>Try adjusting your search or filters</p>
              </motion.div>
            )}
          </>
        )}
      </main>

      <AnimatePresence>
        {showAuthModal && (
          <AuthModal onClose={() => {
            setShowAuthModal(false);
            setAuthAction(null);
            setPendingDestination(null);
          }} />
        )}
      </AnimatePresence>
    </div>
  );
}
