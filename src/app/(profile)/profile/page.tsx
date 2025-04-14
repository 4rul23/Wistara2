"use client"

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useFavorite } from '@/app/context/FavoriteContext';
import { useVisited } from '@/app/context/VisitedContext';
import { allDestinations, Destination } from '@/app/data/destinations';
import { getUserById, User } from '@/app/data/users';
import { AnimatePresence } from 'framer-motion';
import { Inter, Space_Grotesk, Quicksand } from "next/font/google";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMapPin, FiCalendar, FiEdit3, FiHeart, FiCheck, FiUser, FiSettings, FiLogOut, FiInfo, FiArrowLeft } from 'react-icons/fi';

// Font configuration
const quicksand = Quicksand({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const isClient = typeof window !== "undefined";

interface TravelPreferences {
  preferredDestinationType: string[];
  budget: string;
  travelStyle: string[];
  travelSeason: string[];
  accommodation: string[];
  activities: string[];
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const { favoriteDestinations } = useFavorite();
  const { visitedDestinations } = useVisited();
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences'>('profile');
  const [favoriteDestinationDetails, setFavoriteDestinationDetails] = useState<Destination[]>([]);
  const [visitedDestinationDetails, setVisitedDestinationDetails] = useState<Destination[]>([]);
  const [userPreferences, setUserPreferences] = useState<TravelPreferences>({
    preferredDestinationType: [],
    budget: '',
    travelStyle: [],
    travelSeason: [],
    accommodation: [],
    activities: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Animation values
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 150], [0, 1]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.5 });
  const parallaxX = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const parallaxY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  // Mouse tracking for parallax
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

  // Load user data
  useEffect(() => {
    if (isLoggedIn && user) {
      // Load user from mock data
      const mockUserData = getUserById(user.id);
      if (mockUserData) {
        setUserDetails(mockUserData);
      }

      // Load user preferences from localStorage
      try {
        const savedPreferences = localStorage.getItem(`user-preferences-${user.id}`);
        if (savedPreferences) {
          setUserPreferences(JSON.parse(savedPreferences));
        } else {
          // If no preferences are saved, use interests from mock user data as preferredDestinationType
          if (mockUserData) {
            setUserPreferences(prev => ({
              ...prev,
              preferredDestinationType: mockUserData.interests || []
            }));
          }
        }
      } catch (error) {
        console.error("Error loading user data", error);
      }
    }
  }, [isLoggedIn, user]);

  // Load favorite and visited destinations
  useEffect(() => {
    // Filter destinations that have been favorited
    const favoriteDetails = allDestinations.filter(
      destination => favoriteDestinations.includes(destination.id)
    );
    setFavoriteDestinationDetails(favoriteDetails);

    // Filter destinations that have been visited
    const visitedDetails = allDestinations.filter(
      destination => visitedDestinations.includes(destination.id)
    );
    setVisitedDestinationDetails(visitedDetails);
  }, [favoriteDestinations, visitedDestinations]);

  const saveUserPreferences = () => {
    if (isLoggedIn && user) {
      localStorage.setItem(`user-preferences-${user.id}`, JSON.stringify(userPreferences));
      setIsEditing(false);

      // Show success notification
      setNotificationMessage("Preferensi berhasil disimpan");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  // For multi-select fields
  const togglePreference = (field: keyof TravelPreferences, value: string) => {
    setUserPreferences(prev => {
      const currentValues = prev[field] as string[];
      const exists = currentValues.includes(value);

      return {
        ...prev,
        [field]: exists
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
      };
    });
  };

  const handleBackToExplore = () => {
    router.push('/explore');
  };

  if (!isLoggedIn) {
    return (
      <div className={`relative bg-[#0a0a0a] min-h-screen text-white ${quicksand.className} overflow-x-hidden`}>
        {/* Background Elements */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.04] z-0 pointer-events-none"
          style={{ x: parallaxX, y: parallaxY }}
        />

        <motion.div
          className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] z-0 pointer-events-none mix-blend-overlay"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 120, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
        />

        {/* Back to Explore Button */}
        <div className="fixed top-6 left-6 z-40">
          <motion.button
            onClick={handleBackToExplore}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-lg text-white/80 hover:text-white"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft />
            <span className="text-sm">Kembali ke Explore</span>
          </motion.button>
        </div>

        {/* Content */}
        <div className="min-h-screen pt-32 px-4 sm:px-8 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className={`${spaceGrotesk.className} text-3xl sm:text-4xl font-bold mb-6`}>
              Profil Pengguna
            </h1>

            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8"
              whileHover={{ boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.2)", y: -2 }}
            >
              <p className={`${inter.className} text-white/70 text-lg`}>
                Silakan login untuk melihat profil Anda.
              </p>
              <motion.button
                onClick={() => window.location.href = '/login'}
                className="mt-6 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 rounded-lg px-6 py-3 text-teal-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Login
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-[#0a0a0a] min-h-screen text-white ${quicksand.className} overflow-x-hidden`}>
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.04] z-0 pointer-events-none"
        style={{ x: parallaxX, y: parallaxY }}
      />

      <motion.div
        className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] z-0 pointer-events-none mix-blend-overlay"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 120, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Back to Explore Button */}
      <div className="fixed top-6 left-6 z-40">
        <motion.button
          onClick={handleBackToExplore}
          className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-lg text-white/80 hover:text-white"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft />
          <span className="text-sm">Kembali ke Explore</span>
        </motion.button>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen pt-32 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                {userDetails?.avatar ? (
                  <div className="h-24 w-24 rounded-full overflow-hidden">
                    <Image
                      src={userDetails.avatar}
                      alt={userDetails.fullName}
                      width={96}
                      height={96}
                      className="object-cover h-full w-full"
                    />
                  </div>
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center text-3xl font-bold text-white">
                    {userDetails?.fullName?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || 'W'}
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-0 right-0 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm p-2 rounded-full"
                >
                  <FiEdit3 size={14} />
                </motion.button>
              </div>
              <div>
                <h1 className={`${spaceGrotesk.className} text-3xl sm:text-4xl font-bold`}>
                  {userDetails?.fullName || user?.name || 'Wistara User'}
                </h1>
                <div className="flex items-center gap-2 text-white/60 mt-1">
                  <span>@{userDetails?.username || user?.id || 'wistara_user'}</span>
                </div>
                <p className={`${inter.className} text-white/60 mt-1 flex items-center gap-2`}>
                  <FiMapPin size={14} />
                  <span>{userDetails?.location || 'Indonesia'}</span>
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-sm text-white/60">
                    <FiHeart size={14} className="text-rose-400" />
                    <span>{favoriteDestinations.length} Favorit</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-white/60">
                    <FiCheck size={14} className="text-emerald-400" />
                    <span>{visitedDestinations.length} Dikunjungi</span>
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              onClick={logout}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiLogOut size={16} />
              <span>Logout</span>
            </motion.button>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-white/10 mb-8">
            <div className="flex gap-2 sm:gap-8 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 whitespace-nowrap ${activeTab === 'profile' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-white/70'}`}
              >
                <div className="flex items-center gap-2">
                  <FiUser size={16} />
                  <span>Profil</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('preferences')}
                className={`px-4 py-2 whitespace-nowrap ${activeTab === 'preferences' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-white/70'}`}
              >
                <div className="flex items-center gap-2">
                  <FiSettings size={16} />
                  <span>Preferensi Perjalanan</span>
                </div>
              </button>
            </div>
          </div>

          {/* Rest of the content remains the same */}
          {activeTab === 'profile' && (
            /* Your existing profile tab content */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Basic Information */}
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
                whileHover={{ boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.2)", y: -2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`${spaceGrotesk.className} text-xl font-bold`}>Informasi Dasar</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/10 hover:bg-white/20 border border-white/10 p-2 rounded-full"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <FiEdit3 size={14} />
                  </motion.button>
                </div>

                {/* Existing basic information content */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-white/50 mb-1">Nama Lengkap</p>
                    <p className="text-white/90">{userDetails?.fullName || user?.name || 'Wistara User'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">Username</p>
                    <p className="text-white/90">@{userDetails?.username || user?.id || 'wistara_user'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">Email</p>
                    <p className="text-white/90">{userDetails?.email || user?.email || 'user@example.com'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">Lokasi</p>
                    <p className="text-white/90">{userDetails?.location || 'Indonesia'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">Bergabung Sejak</p>
                    <p className="text-white/90">{userDetails?.joinDate || 'April 2024'}</p>
                  </div>
                  {userDetails?.bio && (
                    <div>
                      <p className="text-sm text-white/50 mb-1">Bio</p>
                      <p className="text-white/90">{userDetails.bio}</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Rest of the profile tab content */}
              {/* ... */}
            </motion.div>
          )}

          {/* Preferences tab content remains unchanged */}
          {/* ... */}
        </div>
      </div>

      {/* Sticky Header (appears on scroll) */}
      <motion.div
        className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-40 py-4 px-6"
        style={{ opacity: headerOpacity }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={handleBackToExplore}
              className="flex items-center gap-2 text-white/70 hover:text-white"
              whileHover={{ x: -3 }}
            >
              <FiArrowLeft size={16} />
              <span>Explore</span>
            </motion.button>
            <span className="text-white/30">|</span>
            <h3 className={`${spaceGrotesk.className} font-medium text-xl`}>Profil Pengguna</h3>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={() => setActiveTab('profile')}
              className={activeTab === 'profile' ? 'text-teal-400' : 'text-white/70'}
            >
              Profil
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={activeTab === 'preferences' ? 'text-teal-400' : 'text-white/70'}
            >
              Preferensi
            </button>
          </div>
        </div>
      </motion.div>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <span>✓</span>
            {notificationMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
