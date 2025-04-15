"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Quicksand, Inter, Space_Grotesk } from "next/font/google";
import { FiArrowLeft, FiMapPin, FiHeart, FiBookmark, FiShare2, FiCamera, FiInfo,
   FiDollarSign, FiClock, FiStar, FiChevronRight, FiExternalLink, FiAlertCircle } from "react-icons/fi";
import { Destination } from "@/app/data/destinations"; // tetap impor interface
import { getDestinationById } from "@/lib/api-client";
import { useAuth } from '@/app/context/AuthContext';
import UserComments from './components/Comment';
import { useVisited } from '@/app/context/VisitedContext';
import { useFavorite } from '@/app/context/FavoriteContext';

// Font configuration
const quicksand = Quicksand({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });


const isClient = typeof window !== "undefined";

const ImageGallery = ({ images }: { images: string[] }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="mt-8 mb-12">
      <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-4`}>Gallery</h2>

      <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full relative"
          >
            <Image
              src={images[activeImage]}
              alt="Gallery image"
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex space-x-2 overflow-x-auto py-2">
        {images.map((img, idx) => (
          <motion.button
            key={idx}
            className={`relative h-16 aspect-video rounded-md overflow-hidden flex-shrink-0 border-2
              ${activeImage === idx ? 'border-teal-400' : 'border-transparent'}`}
            onClick={() => setActiveImage(idx)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx+1}`}
              fill
              className="object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Auth modal for non-logged in users
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
        <h3 className={`${spaceGrotesk.className} text-xl font-semibold mb-2`}>Silakan masuk</h3>
        <p className={`${inter.className} text-white/70 mb-6`}>
          Anda perlu login untuk menyimpan destinasi favorit
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

export default function DestinationDetailPage() {
  const params = useParams();
  const destinationId = params.id as string;
  const { user, isAuthenticated } = useAuth();
  const isLoggedIn = isAuthenticated; // untuk kompatibilitas dengan kode lainnya
  const { isVisited, addVisitedDestination, removeVisitedDestination } = useVisited();
  const hasVisited = isVisited(destinationId);
  const { isFavorite, addFavoriteDestination, removeFavoriteDestination } = useFavorite();
  const isFavorited = isFavorite(destinationId);

  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 300], [0, 1]);
  const heroScale = useTransform(scrollY, [0, 300], [1.1, 1]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const parallaxY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  // Handle like interaction
  const handleLike = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setIsLiked(!isLiked);
    // In a real app, you would call an API here to update the user's likes
  };

  // Handle save interaction
  const handleSave = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setIsSaved(!isSaved);
    // In a real app, you would call an API here to update the user's saved destinations
  };

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

  // Fetch destination data
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);
        const data = await getDestinationById(destinationId);
        setDestination(data);
      } catch (err) {
        console.error('Error fetching destination:', err);
        setError('Failed to load destination details');

        // Fallback ke data statis jika API gagal
        import("../../data/destinations").then((module) => {
          const allDestinations = [...module.featuredDestinations, ...module.moreDestinations];
          const staticData = allDestinations.find(d => d.id === destinationId);
          if (staticData) {
            setDestination(staticData);
          } else {
            setError('Destination not found');
          }
        });
      } finally {
        setLoading(false);
      }
    };

    if (destinationId) {
      fetchDestination();
    }
  }, [destinationId]);

  // Load user's likes and saves from localStorage for demo purposes
  useEffect(() => {
    if (!destination || !isClient) return;

    // In a real app, this would come from an API
    const savedLikes = localStorage.getItem('userLikes');
    const savedBookmarks = localStorage.getItem('userBookmarks');

    if (savedLikes) {
      const likes = JSON.parse(savedLikes);
      setIsLiked(likes.includes(destination.id));
    }

    if (savedBookmarks) {
      const bookmarks = JSON.parse(savedBookmarks);
      setIsSaved(bookmarks.includes(destination.id));
    }
  }, [destination, isClient]);

  // Save likes and bookmarks to localStorage when they change
  useEffect(() => {
    if (!destination || !isClient || !isLoggedIn) return;

    const savedLikes = JSON.parse(localStorage.getItem('userLikes') || '[]');
    const savedBookmarks = JSON.parse(localStorage.getItem('userBookmarks') || '[]');

    if (isLiked && !savedLikes.includes(destination.id)) {
      const newLikes = [...savedLikes, destination.id];
      localStorage.setItem('userLikes', JSON.stringify(newLikes));
    } else if (!isLiked && savedLikes.includes(destination.id)) {
      const newLikes = savedLikes.filter((id: string) => id !== destination.id);
      localStorage.setItem('userLikes', JSON.stringify(newLikes));
    }

    if (isSaved && !savedBookmarks.includes(destination.id)) {
      const newBookmarks = [...savedBookmarks, destination.id];
      localStorage.setItem('userBookmarks', JSON.stringify(newBookmarks));
    } else if (!isSaved && savedBookmarks.includes(destination.id)) {
      const newBookmarks = savedBookmarks.filter((id: string) => id !== destination.id);
      localStorage.setItem('userBookmarks', JSON.stringify(newBookmarks));
    }
  }, [isLiked, isSaved, destination, isClient, isLoggedIn]);

  if (loading) {
    return (
      <div className={`${quicksand.className} bg-[#0a0a0a] min-h-screen flex items-center justify-center`}>
        <motion.div
          className="w-16 h-16 border-t-2 border-teal-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${quicksand.className} bg-[#0a0a0a] min-h-screen text-white flex flex-col items-center justify-center p-6`}>
        <h1 className={`${spaceGrotesk.className} text-3xl mb-4`}>Error</h1>
        <p className={`${inter.className} text-white/70 mb-8`}>{error}</p>
        <Link href="/explore">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-teal-500/20 hover:bg-teal-500/30 px-6 py-3 rounded-lg"
          >
            <FiArrowLeft />
            <span>Back to explore</span>
          </motion.button>
        </Link>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className={`${quicksand.className} bg-[#0a0a0a] min-h-screen text-white flex flex-col items-center justify-center p-6`}>
        <h1 className={`${spaceGrotesk.className} text-3xl mb-4`}>Destination not found</h1>
        <p className={`${inter.className} text-white/70 mb-8`}>We couldn't find the destination you're looking for.</p>
        <Link href="/explore">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-teal-500/20 hover:bg-teal-500/30 px-6 py-3 rounded-lg"
          >
            <FiArrowLeft />
            <span>Back to explore</span>
          </motion.button>
        </Link>
      </div>
    );
  }

  // Mock gallery images - in a real app, these would come from your data
  const galleryImages = [
    destination.image,
    // Generate alternative views by adding query params to make them look different
    `${destination.image}?v=2`,
    `${destination.image}?v=3`,
    `${destination.image}?v=4`,
  ];

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



      {/* Hero Section */}
      <div className="relative h-[70vh] mt-16">
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            scale: heroScale,
            opacity: heroOpacity
          }}
        >
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]" />
        </motion.div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Link href="/explore">
            <motion.button
              className="flex items-center space-x-2 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full p-3 border border-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <FiArrowLeft className="text-white" />
            </motion.button>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 z-20 flex space-x-3">
          <motion.button
            className={`p-3 rounded-full backdrop-blur-md border transition-colors ${isLiked ? 'bg-rose-500/30 text-rose-400 border-rose-500/30' : 'bg-black/30 text-white border-white/10 hover:border-white/20'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={handleLike}
          >
            <FiHeart className={`${isLiked ? 'fill-rose-400' : ''}`} />
          </motion.button>

          <motion.button
            className={`p-3 rounded-full backdrop-blur-md border transition-colors ${isSaved ? 'bg-teal-500/30 text-teal-300 border-teal-500/30' : 'bg-black/30 text-white border-white/10 hover:border-white/20'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={handleSave}
          >
            <FiBookmark className={`${isSaved ? 'fill-teal-400' : ''}`} />
          </motion.button>

          <motion.button
            className="p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 hover:border-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <FiShare2 />
          </motion.button>
        </div>

        {/* Title and Location */}
        <motion.div
          className="absolute bottom-8 left-0 w-full px-6 md:px-10 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        >
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl lg:text-6xl font-bold mb-3`}>
            {destination.name}
          </h1>

          <div className="flex items-center space-x-2">
            <FiMapPin className="text-teal-400" />
            <span className={`${inter.className} text-lg md:text-xl text-white/90`}>{destination.location}</span>
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 px-6 md:px-10 lg:px-20 -mt-6">
        <div className="max-w-6xl mx-auto">
          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
              <div className={`${inter.className} text-xs text-white/60 mb-1`}>Category</div>
              <div className={`${spaceGrotesk.className} text-lg`}>{destination.category}</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
              <div className={`${inter.className} text-xs text-white/60 mb-1`}>City</div>
              <div className={`${spaceGrotesk.className} text-lg capitalize`}>{destination.region}</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
              <div className={`${inter.className} text-xs text-white/60 mb-1`}>Rating</div>
              <div className={`${spaceGrotesk.className} text-lg flex items-center`}>
                {destination.rating}
                <div className="ml-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xs ${i < Math.floor(destination.rating) ? 'text-teal-400' : 'text-white/20'}`}>★</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
              <div className={`${inter.className} text-xs text-white/60 mb-1`}>Best Time to Visit</div>
              <div className={`${spaceGrotesk.className} text-lg`}>
                {destination.category === "Beaches" && "Apr-Oct"}
                {destination.category === "Mountains" && "May-Sep"}
                {destination.category === "Temples" && "Year-round"}
                {destination.category === "Islands" && "May-Oct"}
                {destination.category === "Villages" && "Apr-Oct"}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="flex flex-wrap gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            <a href="#" className="flex items-center space-x-2 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 rounded-lg px-4 py-2 text-teal-300">
              <FiExternalLink size={16} />
              <span>Official Website</span>
            </a>

            {/* Tambahkan tombol Tandai Sudah Dikunjungi di sini */}
            {isLoggedIn && (
              <button
                onClick={() => hasVisited
                  ? removeVisitedDestination(destinationId)
                  : addVisitedDestination(destinationId)
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  hasVisited
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{hasVisited ? "✓" : "+"}</span>
                <span>{hasVisited ? "Sudah Dikunjungi" : "Tandai Sudah Dikunjungi"}</span>
              </button>
            )}

            {/* Tombol Tambah Favorit - BARU */}
            {isLoggedIn && (
              <motion.button
                onClick={() => isFavorited
                  ? removeFavoriteDestination(destinationId)
                  : addFavoriteDestination(destinationId)
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  isFavorited
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiHeart
                  size={16}
                  className={isFavorited ? "fill-rose-400" : ""}
                />
                <span>{isFavorited ? "Favorit" : "Tambah ke Favorit"}</span>
              </motion.button>
            )}

            {isLiked ? (
              <div className="flex items-center space-x-1 text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                <FiHeart size={16} className="fill-rose-400" />
                <span className="text-sm">You and {destination.likes} others like this</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-white/60 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <FiHeart size={16} />
                <span className="text-sm">{destination.likes} likes</span>
              </div>
            )}
          </motion.div>

          {/* Description */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-4`}>Overview</h2>
            <p className={`${inter.className} text-lg leading-relaxed text-white/80`}>
              {destination.description}

              {/* Extended description - would come from API in real implementation */}
              <span className="block mt-4">
                {destination.category === "Temples" && "This ancient temple stands as a testament to Indonesia's rich cultural heritage. Visitors can explore the intricately carved reliefs depicting Buddhist teachings and stories, climb to the top for panoramic views, and experience the spiritual atmosphere that has drawn pilgrims for centuries."}

                {destination.category === "Islands" && "The crystal-clear waters surrounding this island paradise host some of the world's most diverse marine ecosystems. Snorkelers and divers can witness spectacular coral formations and encounter countless species of colorful fish, while beachgoers can relax on pristine shores and take in breathtaking sunsets."}

                {destination.category === "Mountains" && "The dramatic volcanic landscape offers unforgettable trekking experiences with routes suitable for both beginners and experienced hikers. Early morning expeditions are particularly popular for witnessing the golden sunrise above the clouds, creating a surreal and ethereal atmosphere."}

                {destination.category === "Villages" && "This cultural center showcases traditional ways of life that have been preserved through generations. Local artisans demonstrate ancient crafts, while community performances featuring traditional music and dance provide insight into Indonesia's rich cultural tapestry."}

                {destination.category === "Beaches" && "The coastline features a stunning mix of white sand beaches and dramatic cliffs. The underwater world is equally impressive, with vibrant coral gardens and an abundance of marine life making it a premier destination for diving enthusiasts from around the world."}
              </span>
            </p>
          </motion.div>

          {/* Image Gallery */}
          <ImageGallery images={galleryImages} />

          {/* Travel Info */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-4`}>Travel Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className={`${spaceGrotesk.className} text-lg font-medium mb-3 flex items-center`}>
                  <FiClock className="mr-2 text-teal-400" />
                  Best Times to Visit
                </h3>
                <ul className={`${inter.className} space-y-2 text-white/80`}>
                  <li className="flex items-start">
                    <FiStar className="mr-2 text-teal-400 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Peak Season:</strong> {destination.category === "Beaches" || destination.category === "Islands" ? "July to August" : "May to September"} – Expect larger crowds but perfect weather conditions.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FiStar className="mr-2 text-teal-400 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Shoulder Season:</strong> {destination.category === "Mountains" ? "April, October" : "March to April, September to October"} – Fewer tourists with still-favorable weather.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FiAlertCircle className="mr-2 text-amber-400 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Avoid:</strong> {destination.category === "Mountains" || destination.category === "Temples" ? "November to February (rainy season)" : "December to February (monsoon season)"} – Heavy rainfall can limit activities.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className={`${spaceGrotesk.className} text-lg font-medium mb-3 flex items-center`}>
                  <FiDollarSign className="mr-2 text-teal-400" />
                  Budget Information
                </h3>
                <ul className={`${inter.className} space-y-2 text-white/80`}>
                  <li className="flex items-start">
                    <FiStar className="mr-2 text-teal-400 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Entrance Fees:</strong> {destination.category === "Temples" ? "IDR 50,000-350,000" : destination.category === "Islands" ? "IDR 50,000-100,000 for marine park fees" : "IDR 25,000-75,000"} per person
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FiStar className="mr-2 text-teal-400 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Local Transportation:</strong> IDR 100,000-300,000 per day depending on distance and type
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FiStar className="mr-2 text-teal-400 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Meals:</strong> IDR 25,000-150,000 per meal from street food to restaurants
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-6`}>Features</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex space-x-3 items-start p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="bg-teal-500/20 p-2 rounded-lg">
                  <FiCamera className="text-teal-400" />
                </div>
                <div>
                  <h3 className={`${spaceGrotesk.className} font-medium mb-1`}>Photography Spots</h3>
                  <p className={`${inter.className} text-sm text-white/70`}>Discover perfect locations for stunning photographs</p>
                </div>
              </div>

              <div className="flex space-x-3 items-start p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="bg-teal-500/20 p-2 rounded-lg">
                  <FiInfo className="text-teal-400" />
                </div>
                <div>
                  <h3 className={`${spaceGrotesk.className} font-medium mb-1`}>Cultural Significance</h3>
                  <p className={`${inter.className} text-sm text-white/70`}>Learn about the rich heritage and traditions</p>
                </div>
              </div>

              <div className="flex space-x-3 items-start p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="bg-teal-500/20 p-2 rounded-lg">
                  <FiMapPin className="text-teal-400" />
                </div>
                <div>
                  <h3 className={`${spaceGrotesk.className} font-medium mb-1`}>Guided Tours</h3>
                  <p className={`${inter.className} text-sm text-white/70`}>Explore with knowledgeable local guides</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Things To Do */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-6`}>Things To Do</h2>

            <div className="space-y-4">
              {[1, 2, 3].map(idx => (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4 md:p-5 hover:bg-white/8 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`${spaceGrotesk.className} text-lg font-medium mb-2`}>
                        {destination.category === "Beaches" && idx === 1 && "Snorkeling & Diving Tours"}
                        {destination.category === "Beaches" && idx === 2 && "Sunset Cruise Experience"}
                        {destination.category === "Beaches" && idx === 3 && "Beach Yoga & Meditation"}

                        {destination.category === "Mountains" && idx === 1 && "Summit Sunrise Hike"}
                        {destination.category === "Mountains" && idx === 2 && "Photography Expedition"}
                        {destination.category === "Mountains" && idx === 3 && "Crater Lake Exploration"}

                        {destination.category === "Temples" && idx === 1 && "Guided Historical Tour"}
                        {destination.category === "Temples" && idx === 2 && "Meditation Experience"}
                        {destination.category === "Temples" && idx === 3 && "Sunrise Photography Session"}

                        {destination.category === "Islands" && idx === 1 && "Island Hopping Adventure"}
                        {destination.category === "Islands" && idx === 2 && "Traditional Boat Tour"}
                        {destination.category === "Islands" && idx === 3 && "Marine Life Safari"}

                        {destination.category === "Villages" && idx === 1 && "Traditional Craft Workshop"}
                        {destination.category === "Villages" && idx === 2 && "Cultural Dance Performance"}
                        {destination.category === "Villages" && idx === 3 && "Local Cuisine Cooking Class"}
                      </h3>
                      <p className={`${inter.className} text-white/70 mb-3`}>
                        {idx === 1 && "Experience the most popular activity with expert guides and all equipment provided."}
                        {idx === 2 && "A unique perspective on this magnificent destination that you won't want to miss."}
                        {idx === 3 && "Dive deeper into the cultural and natural aspects with this specialized activity."}
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-white/60">
                          <FiClock className="mr-1" />
                          <span>{idx === 1 ? "3-4" : idx === 2 ? "2-3" : "1-2"} hours</span>
                        </div>
                        <div className="flex items-center text-sm text-white/60">
                          <FiDollarSign className="mr-1" />
                          <span>
                            {idx === 1 ? "IDR 350,000" : idx === 2 ? "IDR 250,000" : "IDR 150,000"}/person
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      className="bg-white/10 hover:bg-white/20 rounded-full p-2 text-white/70 hover:text-white"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiChevronRight />
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {destination && (
  <UserComments
    destinationId={destination.id}
    destinationName={destination.name}
  />
)}

          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-6`}>Similar Destinations</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden">
              {allDestinations
                .filter(d => d.id !== destination.id && (d.region === destination.region || d.category === destination.category))
                .slice(0, 3)
                .map(item => (
                  <Link href={`/explore/${item.id}`} key={item.id}>
                    <motion.div
                      className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-teal-400/30 transition-colors duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60"></div>
                      </div>

                      <div className="p-4">
                        <h3 className={`${spaceGrotesk.className} text-lg font-medium group-hover:text-teal-300 transition-colors`}>
                          {item.name}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-white/70">
                          <FiMapPin className="mr-1 text-teal-400" />
                          {item.location}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sticky Header (appears on scroll) */}
      <motion.div
        className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-40 py-4 px-6"
        style={{ opacity: headerOpacity }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link href="/explore">
              <motion.div
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.97 }}
                className="text-white/70 hover:text-white"
              >
                <FiArrowLeft />
              </motion.div>
            </Link>
            <h3 className={`${spaceGrotesk.className} font-medium`}>{destination.name}</h3>
          </div>

          <div className="flex space-x-2">
            <motion.button
              className={`p-2 rounded-full ${isLiked ? 'text-rose-400' : 'text-white/70 hover:text-white'}`}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
            >
              <FiHeart className={`${isLiked ? 'fill-rose-400' : ''}`} />
            </motion.button>

            <motion.button
              className={`p-2 rounded-full ${isSaved ? 'text-teal-300' : 'text-white/70 hover:text-white'}`}
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
            >
              <FiBookmark className={`${isSaved ? 'fill-teal-400' : ''}`} />
            </motion.button>

            <motion.button
              className="p-2 rounded-full text-white/70 hover:text-white"
              whileTap={{ scale: 0.9 }}
            >
              <FiShare2 />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}
