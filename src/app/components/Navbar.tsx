"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiHeart, FiMapPin, FiCompass, FiLogOut, FiSettings } from 'react-icons/fi';
import { useAuth } from '@/app/context/AuthContext';

// Font imports and styling
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  // Gunakan AuthContext untuk cek login state
  const { user, isAuthenticated, logout } = useAuth();

  const isLinkActive = (path: string) => pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
  ];

  // Menu links khusus untuk yang sudah login
  const authenticatedLinks = [
    { name: "Favorit", path: "/favorites", icon: <FiHeart className="mr-2" /> },
    { name: "Dikunjungi", path: "/visited", icon: <FiMapPin className="mr-2" /> },
    { name: "Profil", path: "/profile", icon: <FiUser className="mr-2" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className={`text-xl font-bold text-white flex items-center ${spaceGrotesk.className}`}>
              <span className="text-teal-400">W</span>istara
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm ${inter.className} ${
                  isLinkActive(link.path)
                    ? 'text-teal-400'
                    : 'text-white/70 hover:text-white transition-colors'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Tampilkan menu tambahan jika sudah login */}
            {isAuthenticated && authenticatedLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm ${inter.className} ${
                  isLinkActive(link.path)
                    ? 'text-teal-400'
                    : 'text-white/70 hover:text-white transition-colors'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 rounded-full hover:bg-white/5 p-1.5 transition-colors"
                >
                  <div className="w-8 h-8 bg-teal-500/20 border border-teal-500/30 rounded-full flex items-center justify-center">
                    <span className={`${inter.className} text-sm text-teal-300`}>
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 mt-2 w-56 bg-[#111111] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className={`${inter.className} text-sm font-medium text-white`}>
                          {user?.name}
                        </p>
                        <p className={`${inter.className} text-xs text-white/60 mt-0.5 truncate`}>
                          {user?.email}
                        </p>
                      </div>

                      <div className="py-1">
                        {authenticatedLinks.map((link) => (
                          <Link
                            key={link.path}
                            href={link.path}
                            className="flex items-center px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            {link.icon}
                            {link.name}
                          </Link>
                        ))}

                        <Link
                          href="/settings"
                          className="flex items-center px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiSettings className="mr-2" />
                          Pengaturan
                        </Link>

                        <hr className="border-t border-white/10 my-1" />

                        <button
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10"
                        >
                          <FiLogOut className="mr-2" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/login"
                  className={`${inter.className} text-sm py-2 px-4 text-white/80 hover:text-white transition-colors`}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 text-black font-medium py-1.5 px-4 rounded-lg text-sm"
                >
                  Daftar
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="inline-flex md:hidden items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6 text-white" />
              ) : (
                <FiMenu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#0a0a0a] border-t border-white/5"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block px-3 py-2 rounded-lg ${
                    isLinkActive(link.path)
                      ? 'bg-teal-500/10 text-teal-400'
                      : 'text-white/70 hover:bg-white/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Tampilkan menu tambahan jika sudah login */}
              {isAuthenticated ? (
                <>
                  {authenticatedLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`flex items-center px-3 py-2 rounded-lg ${
                        isLinkActive(link.path)
                          ? 'bg-teal-500/10 text-teal-400'
                          : 'text-white/70 hover:bg-white/5'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  ))}

                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10"
                  >
                    <FiLogOut className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-white/10">
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-black font-medium text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
