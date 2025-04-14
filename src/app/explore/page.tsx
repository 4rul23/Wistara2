"use client"

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Quicksand, Inter, Space_Grotesk } from "next/font/google";
import { FiSearch, FiFilter, FiMapPin, FiHeart, FiBookmark, FiChevronDown, FiX, FiCornerDownRight, FiCompass } from "react-icons/fi";
import { useAuth } from '@/app/context/AuthContext'; // Add this import

// Import destination data
import {
  Destination,
  categories as categoryData,
  regions as regionData,
  allDestinations
} from "@/app/data/destinations";

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
  const { isLoggedIn, login, logout } = useAuth();

  // Your existing state variables
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeRegion, setActiveRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState(allDestinations);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [liked, setLiked] = useState<{[key: string]: boolean}>({});
  const [saved, setSaved] = useState<{[key: string]: boolean}>({});

  // Refs and animations
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

  useEffect(() => {
    let results = allDestinations;

    if (activeRegion !== "all") {
      results = results.filter(item => item.region === activeRegion);
    }

    if (activeCategory !== "All") {
      results = results.filter(item => item.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        item => item.name.toLowerCase().includes(query) ||
               item.description.toLowerCase().includes(query) ||
               item.location.toLowerCase().includes(query)
      );
    }

    setFilteredDestinations(results);
  }, [activeCategory, activeRegion, searchQuery]);

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

  // Demo toggle function that uses the actual auth context
  const toggleLogin = () => {
    if (isLoggedIn) {
      logout();
    } else {
      // For demo purposes, login with dummy data
      login("demo@example.com", "demopassword").catch(err =>
        console.error("Demo login failed:", err)
      );
    }
  };

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

      {/* Demo login toggle - add this near the top of your main content */}
      <div className="absolute top-4 right-4 z-50">
        <motion.button
          onClick={toggleLogin}
          className="bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xs px-3 py-1.5 rounded-md border border-white/10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Demo: {isLoggedIn ? "Logout" : "Login"}
        </motion.button>
      </div>

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

        {filteredDestinations.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredDestinations.map((destination, index) => (
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
                      onClick={() => setLiked({...liked, [destination.id]: !liked[destination.id]})}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`h-8 w-8 flex items-center justify-center rounded-full backdrop-blur-sm transition-colors ${liked[destination.id] ? 'bg-rose-500/30 text-rose-400' : 'bg-black/40 text-white/70 hover:text-white'}`}
                    >
                      <FiHeart className={`text-sm ${liked[destination.id] ? 'fill-rose-400' : ''}`} />
                    </motion.button>

                    <motion.button
                      onClick={() => setSaved({...saved, [destination.id]: !saved[destination.id]})}
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
      </main>
    </div>
  );
}
