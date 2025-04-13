// components/WistaraHomepage.tsx
"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring
} from 'framer-motion';
import { IconType } from 'react-icons'; // Import IconType
import {
  FiSearch,
  FiChevronRight,
  FiChevronLeft,
  FiMap,
  FiBookOpen,
  FiCompass,
  FiInfo,
  FiGlobe,
  FiUser,
  FiStar,
  FiHeart,
  FiChevronDown,
  FiFilter,
  FiMapPin,
  FiHeart,
  FiX,
  FiChevronRight,
  FiChevronLeft,
  FiMap,
  FiLayers,
  FiActivity,
  FiExternalLink,
  FiLoader // Added for loading state
} from 'react-icons/fi';
import { Quicksand, Inter, Space_Grotesk } from 'next/font/google';

// --- Font Config ---
const quicksand = Quicksand({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] });

// --- Interfaces ---
interface Destination {
  id: number;
  title: string;
  location: string;
  image: string;
  rating: number;
  tags: string[];
  color: string;
}

interface FeaturedExperience {
  id: string;
  title: string;
  location: string;
  image: string;
  color: string;
  icon: IconType; // Use IconType here
  shortDesc: string;
  rating: number;
}

// --- Sample Data ---
const sampleDestinations: Destination[] = [
  { id: 1, title: "Bali: Island Symphony", location: "Bali, Indonesia", image: "/images/bali.jpg", rating: 4.8, tags: ["Spiritual", "Art", "Nature", "Beach"], color: "emerald" },
  { id: 2, title: "Raja Ampat: Aquatic Realm", location: "Papua Barat, Indonesia", image: "/images/raja-ampat.png", rating: 4.9, tags: ["Diving", "Biodiversity", "Adventure", "Beach", "Nature"], color: "cyan" },
  { id: 3, title: "Borobudur Temple", location: "Magelang, Central Java", image: "/images/pexels-ahmad-syahrir-107128-758742.jpg", rating: 4.7, tags: ["UNESCO", "History", "Culture"], color: "teal" },
  { id: 4, title: "Komodo National Park", location: "East Nusa Tenggara", image: "/images/bali-pagoda-sunrise-indonesia.jpg", rating: 4.6, tags: ["Wildlife", "Adventure", "Nature", "UNESCO"], color: "emerald" },
  { id: 5, title: "Toba Lake", location: "North Sumatra", image: "/images/bali.jpg", rating: 4.5, tags: ["Nature", "Culture", "Relaxation", "Mountain"], color: "cyan" },
  { id: 6, title: "Mount Bromo", location: "East Java", image: "/images/raja-ampat.png", rating: 4.7, tags: ["Adventure", "Nature", "Photography", "Mountain"], color: "teal" },
  { id: 7, title: "Tana Toraja", location: "South Sulawesi", image: "/images/pexels-ahmad-syahrir-107128-758742.jpg", rating: 4.4, tags: ["Culture", "History", "Unique"], color: "emerald" },
  { id: 8, title: "Yogyakarta City", location: "Special Region of Yogyakarta", image: "/images/bali-pagoda-sunrise-indonesia.jpg", rating: 4.6, tags: ["Culture", "Urban", "Food", "History"], color: "cyan" }
];

// Featured experiences
const featuredExperiences: FeaturedExperience[] = [
  { id: "gamelan-lesson", title: "Gamelan Resonance", location: "Ubud, Bali", image: "https://images.unsplash.com/photo-1586829475394-4c9d954da03a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", color: "emerald", icon: FiActivity, shortDesc: "Discover Bali's soundscape.", rating: 4.8 },
  { id: "batik-workshop", title: "Batik Artistry", location: "Solo, Java", image: "https://images.unsplash.com/photo-1620700701150-4a1c65f28794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", color: "teal", icon: FiLayers, shortDesc: "Master textile dyeing.", rating: 4.7 },
  { id: "culinary-tour", title: "Archipelago Flavors", location: "Jakarta (Hub)", image: "https://images.unsplash.com/photo-1573413014465-361a8d7e2293?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", color: "cyan", icon: FiMap, shortDesc: "Explore diverse cuisine.", rating: 4.9 }
];

// --- Animation Variants ---
const pageVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } };
const cardGridVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const cardItemVariants = { hidden: { opacity: 0, y: 25, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } };
const fadeInUpVariant = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] } } };
const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 500 : -500, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] } },
  exit: (direction: number) => ({ x: direction < 0 ? 500 : -500, opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } })
};

// --- Helper: Color Classes (Avoids dynamic class generation issues) ---
interface ColorClasses {
  bg: string; text: string; border: string; gradientFrom: string; gradientTo: string; hoverBg: string; ring: string;
  darkText: string; lightBg: string; mediumBg: string; lightBorder: string;
}
const getColorClasses = (colorName: string): ColorClasses => {
  switch (colorName) {
    case 'emerald': return {
      bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-500/60', gradientFrom: 'from-emerald-500', gradientTo: 'to-teal-600',
      hoverBg: 'hover:bg-emerald-600', ring: 'focus:ring-emerald-500', darkText: 'text-emerald-800', lightBg: 'bg-emerald-50', mediumBg: 'bg-emerald-100',
      lightBorder: 'border-emerald-200'
    };
    case 'cyan': return {
      bg: 'bg-cyan-500', text: 'text-cyan-600', border: 'border-cyan-500/60', gradientFrom: 'from-cyan-500', gradientTo: 'to-blue-600',
      hoverBg: 'hover:bg-cyan-600', ring: 'focus:ring-cyan-500', darkText: 'text-cyan-800', lightBg: 'bg-cyan-50', mediumBg: 'bg-cyan-100',
      lightBorder: 'border-cyan-200'
    };
    case 'teal': return {
      bg: 'bg-teal-500', text: 'text-teal-600', border: 'border-teal-500/60', gradientFrom: 'from-teal-500', gradientTo: 'to-emerald-600',
      hoverBg: 'hover:bg-teal-600', ring: 'focus:ring-teal-500', darkText: 'text-teal-800', lightBg: 'bg-teal-50', mediumBg: 'bg-teal-100',
      lightBorder: 'border-teal-200'
    };
    default: return { // Fallback to emerald
      bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-500/60', gradientFrom: 'from-emerald-500', gradientTo: 'to-teal-600',
      hoverBg: 'hover:bg-emerald-600', ring: 'focus:ring-emerald-500', darkText: 'text-emerald-800', lightBg: 'bg-emerald-50', mediumBg: 'bg-emerald-100',
      lightBorder: 'border-emerald-200'
    };
  }
};

// --- Internal Components ---

// Header
const HeaderInternal: React.FC<{
  scrollY: any; // MotionValue<number>
  isSearchFocused: boolean;
  setIsSearchFocused: (focused: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}> = ({ scrollY, isSearchFocused, setIsSearchFocused, searchTerm, setSearchTerm }) => {
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerY = useTransform(scrollY, [0, 100], [0, -5]); // Subtle lift
  const springHeaderY = useSpring(headerY, { stiffness: 200, damping: 30 });

  return (
    <motion.header
      className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100"
      style={{ opacity: headerOpacity, y: springHeaderY }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className={`text-2xl font-bold ${spaceGrotesk.className} text-[#0A2540] flex items-center`}>
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-transparent bg-clip-text">WISTARA</span>
            </Link>
          </motion.div>

          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className={`max-w-lg w-full lg:max-w-xs transition-all duration-300 ${isSearchFocused ? 'lg:max-w-md' : ''}`}>
              <label htmlFor="search" className="sr-only">Cari destinasi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className={`h-5 w-5 transition-colors duration-300 ${isSearchFocused ? 'text-emerald-500' : 'text-gray-400'}`} aria-hidden="true" />
                </div>
                <input
                  id="search" name="search"
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 sm:text-sm transition-all duration-300 shadow-inner"
                  placeholder="Cari destinasi wisata..." type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                    onClick={() => setSearchTerm('')}
                    aria-label="Clear search"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex lg:space-x-6 items-center">
              {['Beranda', 'Tentang kami', 'Personalisasi', 'Favorit'].map((item) => (
                   <Link key={item} href={item === 'Beranda' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`} className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                       {item}
                   </Link>
               ))}
            <motion.button
              className="ml-3 flex-shrink-0 bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-full text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} aria-label="View profile"
            >
              <FiUser className="h-5 w-5" />
            </motion.button>
          </nav>

          <motion.div className="lg:hidden" whileTap={{ scale: 0.95 }}>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-md text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300" aria-label="Open menu">
              <FiUser className="h-6 w-6" /> {/* Replace with Menu icon eventually */}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

// Hero Section
// Update imports to match Home.tsx style
import {
  FiSearch,
  FiChevronRight,
  FiChevronLeft,
  FiMap,
  FiBookOpen,
  FiCompass,
  FiInfo,
  FiGlobe,
  // Keep existing icons
  FiUser,
  FiStar,
  FiHeart,
  FiChevronDown,
  FiFilter,
  FiMapPin,
  FiHeart,
  FiX,
  FiChevronRight,
  FiChevronLeft,
  FiMap,
  FiLayers,
  FiActivity,
  FiExternalLink,
  FiLoader // Added for loading state
} from 'react-icons/fi';
import { Quicksand, Inter, Space_Grotesk } from 'next/font/google';

// --- Font Config ---
const quicksand = Quicksand({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] });

// --- Interfaces ---
interface Destination {
  id: number;
  title: string;
  location: string;
  image: string;
  rating: number;
  tags: string[];
  color: string;
}

interface FeaturedExperience {
  id: string;
  title: string;
  location: string;
  image: string;
  color: string;
  icon: IconType; // Use IconType here
  shortDesc: string;
  rating: number;
}

// --- Sample Data ---
const sampleDestinations: Destination[] = [
  { id: 1, title: "Bali: Island Symphony", location: "Bali, Indonesia", image: "/images/bali.jpg", rating: 4.8, tags: ["Spiritual", "Art", "Nature", "Beach"], color: "emerald" },
  { id: 2, title: "Raja Ampat: Aquatic Realm", location: "Papua Barat, Indonesia", image: "/images/raja-ampat.png", rating: 4.9, tags: ["Diving", "Biodiversity", "Adventure", "Beach", "Nature"], color: "cyan" },
  { id: 3, title: "Borobudur Temple", location: "Magelang, Central Java", image: "/images/pexels-ahmad-syahrir-107128-758742.jpg", rating: 4.7, tags: ["UNESCO", "History", "Culture"], color: "teal" },
  { id: 4, title: "Komodo National Park", location: "East Nusa Tenggara", image: "/images/bali-pagoda-sunrise-indonesia.jpg", rating: 4.6, tags: ["Wildlife", "Adventure", "Nature", "UNESCO"], color: "emerald" },
  { id: 5, title: "Toba Lake", location: "North Sumatra", image: "/images/bali.jpg", rating: 4.5, tags: ["Nature", "Culture", "Relaxation", "Mountain"], color: "cyan" },
  { id: 6, title: "Mount Bromo", location: "East Java", image: "/images/raja-ampat.png", rating: 4.7, tags: ["Adventure", "Nature", "Photography", "Mountain"], color: "teal" },
  { id: 7, title: "Tana Toraja", location: "South Sulawesi", image: "/images/pexels-ahmad-syahrir-107128-758742.jpg", rating: 4.4, tags: ["Culture", "History", "Unique"], color: "emerald" },
  { id: 8, title: "Yogyakarta City", location: "Special Region of Yogyakarta", image: "/images/bali-pagoda-sunrise-indonesia.jpg", rating: 4.6, tags: ["Culture", "Urban", "Food", "History"], color: "cyan" }
];

// Featured experiences
const featuredExperiences: FeaturedExperience[] = [
  { id: "gamelan-lesson", title: "Gamelan Resonance", location: "Ubud, Bali", image: "https://images.unsplash.com/photo-1586829475394-4c9d954da03a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", color: "emerald", icon: FiActivity, shortDesc: "Discover Bali's soundscape.", rating: 4.8 },
  { id: "batik-workshop", title: "Batik Artistry", location: "Solo, Java", image: "https://images.unsplash.com/photo-1620700701150-4a1c65f28794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", color: "teal", icon: FiLayers, shortDesc: "Master textile dyeing.", rating: 4.7 },
  { id: "culinary-tour", title: "Archipelago Flavors", location: "Jakarta (Hub)", image: "https://images.unsplash.com/photo-1573413014465-361a8d7e2293?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", color: "cyan", icon: FiMap, shortDesc: "Explore diverse cuisine.", rating: 4.9 }
];

// --- Animation Variants ---
const pageVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } };
const cardGridVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const cardItemVariants = { hidden: { opacity: 0, y: 25, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } };
const fadeInUpVariant = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] } } };
const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 500 : -500, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] } },
  exit: (direction: number) => ({ x: direction < 0 ? 500 : -500, opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } })
};

// --- Helper: Color Classes (Avoids dynamic class generation issues) ---
interface ColorClasses {
  bg: string; text: string; border: string; gradientFrom: string; gradientTo: string; hoverBg: string; ring: string;
  darkText: string; lightBg: string; mediumBg: string; lightBorder: string;
}
const getColorClasses = (colorName: string): ColorClasses => {
  switch (colorName) {
    case 'emerald': return {
      bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-500/60', gradientFrom: 'from-emerald-500', gradientTo: 'to-teal-600',
      hoverBg: 'hover:bg-emerald-600', ring: 'focus:ring-emerald-500', darkText: 'text-emerald-800', lightBg: 'bg-emerald-50', mediumBg: 'bg-emerald-100',
      lightBorder: 'border-emerald-200'
    };
    case 'cyan': return {
      bg: 'bg-cyan-500', text: 'text-cyan-600', border: 'border-cyan-500/60', gradientFrom: 'from-cyan-500', gradientTo: 'to-blue-600',
      hoverBg: 'hover:bg-cyan-600', ring: 'focus:ring-cyan-500', darkText: 'text-cyan-800', lightBg: 'bg-cyan-50', mediumBg: 'bg-cyan-100',
      lightBorder: 'border-cyan-200'
    };
    case 'teal': return {
      bg: 'bg-teal-500', text: 'text-teal-600', border: 'border-teal-500/60', gradientFrom: 'from-teal-500', gradientTo: 'to-emerald-600',
      hoverBg: 'hover:bg-teal-600', ring: 'focus:ring-teal-500', darkText: 'text-teal-800', lightBg: 'bg-teal-50', mediumBg: 'bg-teal-100',
      lightBorder: 'border-teal-200'
    };
    default: return { // Fallback to emerald
      bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-500/60', gradientFrom: 'from-emerald-500', gradientTo: 'to-teal-600',
      hoverBg: 'hover:bg-emerald-600', ring: 'focus:ring-emerald-500', darkText: 'text-emerald-800', lightBg: 'bg-emerald-50', mediumBg: 'bg-emerald-100',
      lightBorder: 'border-emerald-200'
    };
  }
};

// --- Internal Components ---

// Header
const HeaderInternal: React.FC<{
  scrollY: any; // MotionValue<number>
  isSearchFocused: boolean;
  setIsSearchFocused: (focused: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}> = ({ scrollY, isSearchFocused, setIsSearchFocused, searchTerm, setSearchTerm }) => {
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerY = useTransform(scrollY, [0, 100], [0, -5]); // Subtle lift
  const springHeaderY = useSpring(headerY, { stiffness: 200, damping: 30 });

  return (
    <motion.header
      className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100"
      style={{ opacity: headerOpacity, y: springHeaderY }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className={`text-2xl font-bold ${spaceGrotesk.className} text-[#0A2540] flex items-center`}>
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-transparent bg-clip-text">WISTARA</span>
            </Link>
          </motion.div>

          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className={`max-w-lg w-full lg:max-w-xs transition-all duration-300 ${isSearchFocused ? 'lg:max-w-md' : ''}`}>
              <label htmlFor="search" className="sr-only">Cari destinasi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className={`h-5 w-5 transition-colors duration-300 ${isSearchFocused ? 'text-emerald-500' : 'text-gray-400'}`} aria-hidden="true" />
                </div>
                <input
                  id="search" name="search"
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 sm:text-sm transition-all duration-300 shadow-inner"
                  placeholder="Cari destinasi wisata..." type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                    onClick={() => setSearchTerm('')}
                    aria-label="Clear search"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex lg:space-x-6 items-center">
              {['Beranda', 'Tentang kami', 'Personalisasi', 'Favorit'].map((item) => (
                   <Link key={item} href={item === 'Beranda' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`} className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                       {item}
                   </Link>
               ))}
            <motion.button
              className="ml-3 flex-shrink-0 bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-full text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} aria-label="View profile"
            >
              <FiUser className="h-5 w-5" />
            </motion.button>
          </nav>

          <motion.div className="lg:hidden" whileTap={{ scale: 0.95 }}>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-md text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300" aria-label="Open menu">
              <FiUser className="h-6 w-6" /> {/* Replace with Menu icon eventually */}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

// Hero Section
// Add CountUp component from Home.tsx
const CountUp = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true, margin: "-50px 0px" });

  useEffect(() => {
    if (!isInView || !isClient) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

// Update HeroSectionInternal component
const HeroSectionInternal: React.FC<{ heroRef: React.Ref<HTMLDivElement>; isInView: boolean; smoothMouseX: any; smoothMouseY: any }> =
({ heroRef, isInView, smoothMouseX, smoothMouseY }) => {
  return (
    <motion.section
      ref={heroRef}
      className="relative rounded-2xl overflow-hidden mb-16 md:mb-20"
      variants={fadeInUpVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            x: useTransform(smoothMouseX, [-1, 1], [-20, 20]),
            y: useTransform(smoothMouseY, [-1, 1], [-20, 20])
          }}
        >
          <Image
            src="/images/bali-pagoda-sunrise-indonesia.jpg"
            alt="Explore Indonesia"
            fill
            style={{ objectFit: 'cover' }}
            priority
            className="brightness-[0.85]"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>

        <div className="relative h-full flex flex-col justify-center px-8 md:px-16 z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                <CountUp end={1000} suffix="+" />
                <p className="text-sm opacity-80">Destinations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                <CountUp end={500} suffix="+" />
                <p className="text-sm opacity-80">Experiences</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                <CountUp end={100} suffix="+" />
                <p className="text-sm opacity-80">Cities</p>
              </div>
            </div>

            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 ${spaceGrotesk.className}`}>
              Explore Indonesian Wonders
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Discover hidden gems and iconic landmarks across the archipelago
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg hover:shadow-emerald-500/20"
              >
                Start Exploring <FiCompass className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors duration-300"
              >
                View Map <FiMap className="inline-block ml-2 h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Featured Experiences Slider
const FeaturedExperiencesInternal: React.FC<{
    featuredRef: React.Ref<HTMLDivElement>;
    isInView: boolean;
    currentSlide: number;
    direction: number;
    prevSlide: () => void;
    nextSlide: () => void;
}> = ({ featuredRef, isInView, currentSlide, direction, prevSlide, nextSlide }) => {
    const experience = featuredExperiences[currentSlide];
    const colors = getColorClasses(experience.color);

    return (
         <motion.section
          ref={featuredRef}
          className="mb-16 md:mb-20"
          variants={fadeInUpVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.15 }}
        >
           <div className="flex justify-between items-center mb-6 md:mb-8">
               <h2 className={`text-2xl md:text-3xl font-bold text-gray-800 ${spaceGrotesk.className} tracking-tight`}>
                    Pengalaman Unggulan
                </h2>
                <div className="flex gap-2">
                    {[-1, 1].map(dir => (
                        <motion.button
                           key={dir}
                           onClick={dir === -1 ? prevSlide : nextSlide}
                           whileHover={{ scale: 1.1, backgroundColor: '#e5e7eb' }} whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:text-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-400"
                           aria-label={dir === -1 ? "Previous Experience" : "Next Experience"}
                        >
                           {dir === -1 ? <FiChevronLeft className="h-5 w-5" /> : <FiChevronRight className="h-5 w-5" />}
                       </motion.button>
                    ))}
                </div>
           </div>

           <div className="relative h-[400px] md:h-[450px] overflow-hidden rounded-xl shadow-lg">
               <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentSlide} custom={direction} variants={slideVariants}
                       initial="enter" animate="center" exit="exit"
                        className="absolute inset-0"
                    >
                       <div className="relative h-full w-full">
                            <Image
                                src={experience.image} alt={experience.title} fill
                               style={{ objectFit: 'cover' }} className="brightness-[0.85]"
                               sizes="(max-width: 768px) 100vw, 50vw"
                               unoptimized // If using external URLs like unsplash often
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                           <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                                <div className="flex items-center gap-2 mb-3">
                                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.mediumBg} ${colors.darkText}`}>
                                        <experience.icon className="mr-1.5 h-3.5 w-3.5" />
                                       {experience.shortDesc}
                                   </span>
                                   <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                                        <FiStar className="mr-1 h-3 w-3 fill-amber-500 text-amber-500" />
                                       {experience.rating.toFixed(1)}
                                   </span>
                                </div>

                                <h3 className={`text-2xl md:text-3xl font-bold mb-1 ${spaceGrotesk.className}`}>
                                    {experience.title}
                                </h3>

                                <p className="text-white/80 mb-5 flex items-center text-sm">
                                    <FiMapPin className="mr-1.5 h-4 w-4" />
                                    {experience.location}
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                                    className={`bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-lg ${colors.hoverBg} transition-all duration-300`}
                                >
                                    Jelajahi Pengalaman <FiExternalLink className="h-4 w-4" />
                                </motion.button>
                           </div>
                       </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.section>
    );
 };

// Filter Tags
const FilterTagsInternal: React.FC<{ activeFilters: string[]; toggleFilter: (tag: string) => void }> =
 ({ activeFilters, toggleFilter }) => {
    const popularTags = ['Nature', 'Culture', 'Adventure', 'Beach', 'Mountain', 'History', 'Urban', 'Food'];
    return (
         <motion.section
          className="mb-8 md:mb-10"
          variants={fadeInUpVariant}
          initial="hidden" animate="visible" transition={{ delay: 0.2 }}
        >
          <h3 className={`text-xl font-semibold text-gray-700 mb-4 ${spaceGrotesk.className}`}>
              Filter Cepat
           </h3>
            <div className="flex flex-wrap gap-2">
               {popularTags.map(tag => {
                   const isActive = activeFilters.includes(tag);
                    return (
                       <motion.button
                           key={tag}
                           onClick={() => toggleFilter(tag)}
                           whileHover={{ y: -2, scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                                isActive
                                   ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                                   : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                            }`}
                        >
                           {tag}
                        </motion.button>
                    );
                })}
           </div>
        </motion.section>
    );
 };

// Filter/Sort Bar
const FilterBarInternal: React.FC<{ sortOption: string; setSortOption: (option: string) => void }> =
 ({ sortOption, setSortOption }) => (
     <motion.section
        className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-10 gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
        variants={fadeInUpVariant}
        initial="hidden" animate="visible" transition={{ delay: 0.25 }}
    >
       <span className="text-gray-600 font-medium text-sm">
         Menampilkan destinasi populer
        </span>
       <div className="relative">
            <label htmlFor="sort" className="sr-only">Urutkan berdasarkan</label>
           <select
                id="sort" name="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}
               className="appearance-none w-full sm:w-auto bg-gray-50 border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            >
               <option value="popular">Populer</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="newest">Terbaru</option>
                {/* <option value="price_asc">Harga Terendah</option> */}
                {/* <option value="price_desc">Harga Tertinggi</option> */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <FiChevronDown className="h-4 w-4" />
           </div>
        </div>
   </motion.section>
 );

// Destination Card
const DestinationCardInternal: React.FC<{
    destination: Destination;
    isFavorite: boolean;
    toggleFavorite: (id: number, e: React.MouseEvent) => void;
}> = React.memo(({ destination, isFavorite, toggleFavorite }) => {
    const colors = getColorClasses(destination.color);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            variants={cardItemVariants}
            layout // Animate layout changes smoothly
            className="relative group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <Link href={`/destinations/${destination.id}`} className="block">
                <div className="relative aspect-video overflow-hidden">
                    <motion.div
                       className="absolute inset-0"
                       whileHover={{ scale: 1.05 }}
                       transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        <Image
                            src={destination.image}
                            alt={destination.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="transition-transform duration-400 ease-in-out"
                        />
                     </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                     <motion.button
                        onClick={(e) => toggleFavorite(destination.id, e)}
                        className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-all duration-300 ${
                           isFavorite ? 'bg-red-500/90 text-white' : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-white'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                     >
                        <FiHeart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </motion.button>

                     <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-900 shadow">
                           <FiStar className="mr-1 h-3 w-3 fill-current" />
                           {destination.rating.toFixed(1)}
                        </span>
                        {destination.tags.slice(0, 1).map(tag => (
                            <span key={tag} className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${colors.lightBg} ${colors.darkText} shadow-sm`}>
                                {tag}
                           </span>
                       ))}
                   </div>
               </div>

               <div className="p-4">
                    <h3 className={`text-lg font-semibold text-gray-800 mb-1 truncate ${spaceGrotesk.className}`}>
                        {destination.title}
                    </h3>
                   <p className="text-sm text-gray-500 flex items-center mb-3">
                        <FiMapPin className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                        {destination.location}
                    </p>
                  {/* Optionally show more tags on hover? */}
                 {/* <div className="flex flex-wrap gap-1.5 h-5 overflow-hidden">
                        {destination.tags.slice(0, 3).map(tag => (
                            <span key={tag} className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${colors.lightBg} ${colors.darkText}`}>
                                {tag}
                           </span>
                       ))}
                    </div> */}
               </div>
            </Link>
        </motion.div>
    );
});
DestinationCardInternal.displayName = 'DestinationCardInternal'; // Add display name for React DevTools

// Destination Grid
const DestinationGridInternal: React.FC<{
    destinations: Destination[];
    isLoading: boolean;
    favorites: number[];
    toggleFavorite: (id: number, e: React.MouseEvent) => void;
}> = ({ destinations, isLoading, favorites, toggleFavorite }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20 text-gray-500">
                <FiLoader className="animate-spin h-8 w-8 mr-3" />
                <span>Loading destinations...</span>
           </div>
        );
    }

    if (!destinations.length) {
        return (
            <div className="text-center py-20 text-gray-500">
                <p className="text-lg mb-2">No destinations found matching your criteria.</p>
               <p>Try adjusting your search or filters.</p>
            </div>
       );
    }

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={cardGridVariants}
            initial="hidden"
            animate="visible"
        >
           {destinations.map(dest => (
                <DestinationCardInternal
                    key={dest.id}
                    destination={dest}
                    isFavorite={favorites.includes(dest.id)}
                    toggleFavorite={toggleFavorite}
                />
           ))}
        </motion.div>
    );
 };


// --- Main Component ---
const WistaraHomepage: React.FC = () => {
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('popular');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Start loading initially
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  // Animation Hooks
  const { scrollY } = useScroll();
  const heroInView = useInView(heroRef, { once: false, amount: 0.2 });
  const featuredInView = useInView(featuredRef, { once: false, amount: 0.2 });

  // Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 80, damping: 30, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 80, damping: 30, mass: 0.5 });

  // Track mouse for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Slider Controls
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % featuredExperiences.length);
  }, []); // Removed dependency array content as length is constant here

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + featuredExperiences.length) % featuredExperiences.length);
  }, []); // Removed dependency array content

  // Filtering & Sorting Logic
  const filteredAndSortedDestinations = useMemo(() => {
    setIsLoading(true); // Set loading true during computation
    let results = [...sampleDestinations];
    const searchLower = searchTerm.toLowerCase().trim();

    if (searchLower) {
      results = results.filter(dest =>
        dest.title.toLowerCase().includes(searchLower) ||
        dest.location.toLowerCase().includes(searchLower) ||
        dest.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (activeFilters.length > 0) {
      results = results.filter(dest =>
        activeFilters.every(filter => dest.tags.some(tag => tag.toLowerCase() === filter.toLowerCase()))
      );
    }

    switch (sortOption) {
      case 'rating': results.sort((a, b) => b.rating - a.rating); break;
      case 'newest': results.sort((a, b) => b.id - a.id); break;
      // Add price logic if needed
      default: break; // 'popular' - default order (or could implement popularity score)
    }

    // Simulate filtering delay slightly
    const timer = setTimeout(() => setIsLoading(false), 200);

    // Cleanup timer if dependencies change before timeout fires
    // NOTE: This cleanup in useMemo is non-standard but illustrates the loading pattern.
    // A better approach would be a dedicated effect for filtering with loading states.
    // However, for simplicity here, we keep it synchronous with a small delay.
    // To avoid cleanup issues in strict mode, let's remove the cleanup for this example.
    // --> return () => clearTimeout(timer); NO CLEANUP HERE for demo purposes.

    return results;
  }, [searchTerm, sortOption, activeFilters]);

  // Toggle favorite
  const toggleFavorite = useCallback((id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent card link navigation
    setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  }, []);

  // Toggle filter tag
  const toggleFilter = useCallback((filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(item => item !== filter) : [...prev, filter]
    );
  }, []);

  return (
    <motion.div
      className={`bg-gray-50 min-h-screen ${quicksand.className} text-gray-900`}
      initial="hidden" animate="visible" variants={pageVariants}
    >
      <HeaderInternal
        scrollY={scrollY}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <HeroSectionInternal
          heroRef={heroRef}
          isInView={heroInView}
          smoothMouseX={smoothMouseX}
          smoothMouseY={smoothMouseY}
        />

        <FeaturedExperiencesInternal
          featuredRef={featuredRef}
          isInView={featuredInView}
          currentSlide={currentSlide}
          direction={direction}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
        />

        <FilterTagsInternal
          activeFilters={activeFilters}
          toggleFilter={toggleFilter}
        />

        <FilterBarInternal
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        <DestinationGridInternal
            destinations={filteredAndSortedDestinations}
            isLoading={isLoading}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
         />

      </main>

      {/* Footer placeholder */}
       <footer className="bg-gray-800 text-gray-300 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <p>© {new Date().getFullYear()} WISTARA. All rights reserved.</p>
               <p className="text-sm mt-2">Discover the Wonders of Indonesia</p>
           </div>
       </footer>
    </motion.div>
  );
};

export default WistaraHomepage;
