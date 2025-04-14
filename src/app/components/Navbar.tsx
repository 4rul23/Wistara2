"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useTransform, useSpring, useScroll } from "framer-motion";
import { Inter, Space_Grotesk } from "next/font/google";
import { FiCompass } from "react-icons/fi";
import { useAuth } from '@/app/context/AuthContext';

// Font configuration
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Navbar() {
  // Get authentication state from context
  const { isLoggedIn, logout } = useAuth();

  // Animations and scroll effects
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 150], [1, 0.85]);
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);
  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  const springHeaderY = useSpring(headerY, springConfig);

  return (
    <motion.header
      style={{ opacity: headerOpacity, y: springHeaderY }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="my-4 md:my-6 bg-black/10 backdrop-blur-lg rounded-lg p-3 md:p-4 shadow-md border border-white/10 hover:border-teal-400/40 transition-colors duration-300"
          whileHover={{ boxShadow: "0 8px 25px -10px rgba(0, 0, 0, 0.2)", y: -2, borderColor: "rgba(45, 212, 191, 0.4)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="flex items-center space-x-2 group">
                <motion.div
                  className="relative overflow-hidden"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FiCompass className="text-teal-400 text-2xl" />
                </motion.div>
                <motion.div className={`text-xl md:text-2xl font-bold text-white ${spaceGrotesk.className} tracking-wide uppercase`}>
                  Wistara
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {/* Main navigation items */}
              <Link
                href="/explore"
                className="relative py-1.5 px-1 text-sm font-medium transition-colors duration-200 ease-out text-teal-300"
              >
                <span className={`${inter.className} tracking-wide`}>Explore</span>
                <motion.span
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-teal-400"
                  layoutId="navIndicator"
                />
              </Link>

              <Link
                href="/about"
                className="relative py-1.5 px-1 text-sm font-medium transition-colors duration-200 ease-out text-white/80 hover:text-white"
              >
                <span className={`${inter.className} tracking-wide`}>About</span>
              </Link>

              <Link
                href="/map"
                className="relative py-1.5 px-1 text-sm font-medium transition-colors duration-200 ease-out text-white/80 hover:text-white"
              >
                <span className={`${inter.className} tracking-wide`}>Map</span>
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    href="/Favorite"
                    className="relative py-1.5 px-1 text-sm font-medium transition-colors duration-200 ease-out text-white/80 hover:text-white"
                  >
                    <span className={`${inter.className} tracking-wide`}>Favorites</span>
                  </Link>

                  <Link
                    href="/Visited"
                    className="relative py-1.5 px-1 text-sm font-medium transition-colors duration-200 ease-out text-white/80 hover:text-white"
                  >
                    <span className={`${inter.className} tracking-wide`}>Sudah Dikunjungi</span>
                  </Link>

                  <Link
                    href="/profile"
                    className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 rounded-full px-4 py-1.5 transition-colors"
                  >
                    <div className="h-5 w-5 rounded-full bg-teal-400/80"></div>
                    <span className={`${inter.className} text-sm tracking-wide`}>Profile</span>
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 rounded-lg py-1.5 px-4 transition-colors duration-200 text-teal-300"
                >
                  <span className={`${inter.className} text-sm`}>Login</span>
                </Link>
              )}
            </nav>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
