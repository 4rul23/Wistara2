"use client"

import { useState, useEffect } from 'react';
import { useVisited } from '@/app/context/VisitedContext';
import { allDestinations, Destination } from '@/app/data/destinations';
import { Inter, Space_Grotesk, Quicksand } from "next/font/google";
import { useAuth } from '@/app/context/AuthContext';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiCalendar, FiChevronRight, FiCheck } from 'react-icons/fi';

// Font configuration
const quicksand = Quicksand({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const isClient = typeof window !== "undefined";

export default function VisitedPage() {
  const { visitedDestinations } = useVisited();
  const { isLoggedIn } = useAuth();
  const [visitedDestinationDetails, setVisitedDestinationDetails] = useState<Destination[]>([]);

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

  useEffect(() => {
    // Filter destinations that have been visited
    const visitedDetails = allDestinations.filter(
      destination => visitedDestinations.includes(destination.id)
    );
    setVisitedDestinationDetails(visitedDetails);
  }, [visitedDestinations]);

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

        {/* Content */}
        <div className="min-h-screen pt-32 px-4 sm:px-8 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className={`${spaceGrotesk.className} text-3xl sm:text-4xl font-bold mb-6`}>
              Sudah Dikunjungi
            </h1>

            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8"
              whileHover={{ boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.2)", y: -2 }}
            >
              <p className={`${inter.className} text-white/70 text-lg`}>
                Silakan login untuk melihat destinasi yang sudah Anda kunjungi.
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

      {/* Content */}
      <div className="relative z-10 min-h-screen pt-32 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className={`${spaceGrotesk.className} text-3xl sm:text-4xl md:text-5xl font-bold mb-8`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Destinasi yang Sudah Dikunjungi
          </motion.h1>

          {visitedDestinationDetails.length === 0 ? (
            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.2)", y: -2 }}
            >
              <p className={`${inter.className} text-white/70 text-lg`}>
                Anda belum menandai destinasi yang sudah dikunjungi.
              </p>
              <motion.button
                onClick={() => window.location.href = '/explore'}
                className="mt-6 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 rounded-lg px-6 py-3 text-teal-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Jelajahi Destinasi
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {visitedDestinationDetails.map((destination, index) => (
                <DestinationItem
                  key={destination.id}
                  destination={destination}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Sticky Header (appears on scroll) */}
      <motion.div
        className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-40 py-4 px-6"
        style={{ opacity: headerOpacity }}
      >
        <div className="max-w-7xl mx-auto">
          <h3 className={`${spaceGrotesk.className} font-medium text-xl`}>Destinasi yang Sudah Dikunjungi</h3>
        </div>
      </motion.div>
    </div>
  );
}

// Enhanced destination item component
function DestinationItem({ destination, index }: { destination: Destination, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.1 + (index * 0.1),
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
      className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-teal-500/30 transition-colors group"
    >
      <Link href={`/explore/${destination.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={destination.coverImage || destination.image}
              alt={destination.name}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-70"></div>

          {/* Category badge */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/90">
            {destination.category}
          </div>

          {/* Visited badge */}
          <div className="absolute top-3 right-3 bg-emerald-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white font-medium flex items-center">
            <FiCheck size={12} className="mr-1" />
            <span>Sudah Dikunjungi</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className={`${spaceGrotesk.className} text-lg font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors`}>
            {destination.name}
          </h3>

          <div className="flex items-center text-white/60 text-sm mb-3">
            <FiMapPin size={14} className="mr-1 text-teal-400" />
            <span>{destination.location}</span>
          </div>

          <p className={`${inter.className} text-sm text-white/70 mb-4 line-clamp-2`}>
            {destination.shortDescription ||
             `${destination.name} adalah salah satu destinasi terindah di ${destination.region} yang menawarkan pemandangan alam yang menakjubkan.`}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-white/50">
              <FiCalendar size={12} className="mr-1 text-teal-400/70" />
              <span>Dikunjungi baru-baru ini</span>
            </div>

            <motion.div
              className="text-teal-400 text-sm flex items-center group-hover:translate-x-1 transition-transform"
              whileHover={{ x: 3 }}
            >
              <span className="mr-1">Detail</span>
              <FiChevronRight size={16} />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
