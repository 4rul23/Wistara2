// components/WistaraLogin.tsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiLogIn,
    FiLoader,
    FiAlertCircle,
    FiEye,
    FiEyeOff
} from 'react-icons/fi';
import {  Inter, Space_Grotesk } from 'next/font/google';
import Link from 'next/link';


const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] });


const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const formCardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    },
};

const formItemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
};

const formContainerStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }, // Delay children slightly more
};

const iconVariant = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 15 } },
    exit: { scale: 0.5, opacity: 0 }
};

const backgroundImageUrl = '/images/bali.jpg'; // Contoh: Pemandangan Bromo

const WistaraLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        setError(null);

        // --- SIMULASI PANGGILAN API LOGIN ---
        console.log('Attempting login with:', { email, password });
        await new Promise(resolve => setTimeout(resolve, 1500));
        const loginSuccess = Math.random() > 0.4;

        if (loginSuccess) {
            console.log('Login successful!');
            setError(null);
        } else {
            console.error('Login failed');
            setError('Email atau password tidak cocok. Periksa kembali.');
        }
        // ---------------------------------------

        setIsLoading(false);
    };

    return (
        // Container Utama dengan Background Image
        <motion.div
            className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-black" // Base black bg in case image fails
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat filter grayscale-[30%] brightness-50" // Apply filters to image
                style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            />
            {/* Dark Overlay Layer */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/60 via-black/80 to-black/70" />

            {/* Form Card Container (di atas overlay) */}
            <motion.div
                className="relative z-20 w-full max-w-md" // Pastikan z-index lebih tinggi dari overlay
                variants={formCardVariants} // Animasi untuk card
            >
                <motion.div
                    className="relative w-full p-8 md:p-10 bg-[#181818]/80 rounded-2xl border border-white/15 shadow-2xl dark:shadow-black/70 backdrop-blur-lg overflow-hidden" // Slightly more transparent bg
                    variants={formContainerStagger}
                    initial="hidden" // Stagger children after card appears
                    animate="visible"
                >
                    {/* Decorative elements inside card */}
                    <div className="absolute inset-0 z-0 opacity-[0.02] bg-[url('/images/noise.png')] mix-blend-overlay pointer-events-none"></div>
                    <motion.div
                        className="absolute -top-1/4 -right-1/4 w-40 h-40 bg-gradient-radial from-emerald-700/20 via-transparent to-transparent blur-2xl opacity-50 pointer-events-none -z-10"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                        className="absolute -bottom-1/4 -left-1/4 w-32 h-32 bg-gradient-radial from-cyan-700/20 via-transparent to-transparent blur-2xl opacity-40 pointer-events-none -z-10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 35, repeat: Infinity, ease: 'linear', delay: 5 }}
                    />

                    <motion.h2
                        variants={formItemVariant}
                        className={`text-3xl lg:text-4xl font-semibold text-center text-white mb-10 ${spaceGrotesk.className}`}
                    >
                        Welcome to Wistara
                    </motion.h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <motion.div variants={formItemVariant}>
                            <label
                                htmlFor="email"
                                className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}
                            >
                                Email or Username
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className={`form-input ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="your.email@example.com"
                            />
                        </motion.div>

                        {/* Password Input */}
                        <motion.div variants={formItemVariant} className="relative">
                            <label
                                htmlFor="password"
                                className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}
                            >
                                Password
                            </label>
                             <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                className={`form-input pr-10 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Enter your password"
                            />
                            <motion.button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 top-[calc(0.75rem+1.5rem)] pr-3 flex items-center text-white/50 hover:text-teal-300 transition duration-200 z-10"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                whileTap={{ scale: 0.9 }}
                                disabled={isLoading}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {showPassword ? (
                                        <motion.span key="eye-off" variants={iconVariant} initial="hidden" animate="visible" exit="exit">
                                             <FiEyeOff className="w-5 h-5" />
                                        </motion.span>
                                     ) : (
                                        <motion.span key="eye" variants={iconVariant} initial="hidden" animate="visible" exit="exit">
                                            <FiEye className="w-5 h-5" />
                                         </motion.span>
                                     )}
                                 </AnimatePresence>
                             </motion.button>
                         </motion.div>

                         {/* Error Message */}
                         <AnimatePresence>
                             {error && (
                                 <motion.div
                                    initial={{ opacity: 0, y: -10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: -5, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="flex items-start p-3 bg-rose-900/40 border border-rose-600/60 rounded-lg overflow-hidden"
                                    role="alert"
                                >
                                    <FiAlertCircle className="w-5 h-5 text-rose-300 mr-2.5 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-rose-200 leading-snug">{error}</p>
                                 </motion.div>
                             )}
                         </AnimatePresence>

                         {/* Submit Button */}
                         <motion.div variants={formItemVariant} className="pt-2">
                             <motion.button
                                type="submit"
                                disabled={isLoading}
                                className={`relative w-full inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-bold rounded-lg shadow-lg text-black bg-gradient-to-r from-teal-400 to-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#181818] focus:ring-emerald-400 transition-all duration-300 ease-in-out group overflow-hidden ${isLoading ? 'cursor-not-allowed' : 'hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.97] hover:brightness-110'} ${spaceGrotesk.className} uppercase tracking-wider`}
                                whileTap={{ scale: isLoading ? 1 : 0.97 }}
                             >
                                {/* Loading Overlay & Pulse */}
                                <AnimatePresence>
                                {isLoading && (
                                    <motion.div
                                        className="absolute inset-0 bg-black/30 flex items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                         <motion.div
                                            className="absolute inset-0 bg-emerald-600 opacity-50"
                                            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5]}}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                         <FiLoader className="animate-spin h-5 w-5 mr-2 z-10" />
                                        <span className="z-10">Processing...</span>
                                    </motion.div>
                                )}
                                </AnimatePresence>

                                {/* Default Button Text & Icon */}
                                 <span className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                                    Login
                                 </span>
                                 {!isLoading && <FiLogIn className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />}

                             </motion.button>
                         </motion.div>

                          {/* Optional Links */}
                          <motion.div
                             variants={formItemVariant}
                             className="text-sm text-center mt-8 flex justify-between items-center"
                         >
                              <Link href="/forgot-password" legacyBehavior>
                                 <a className={`font-medium text-teal-400 hover:text-emerald-300 transition-colors duration-200 ${inter.className}`}>
                                     Forgot Password?
                                  </a>
                              </Link>
                              <Link href="/signup" legacyBehavior>
                                  <a className={`font-medium text-teal-400 hover:text-emerald-300 transition-colors duration-200 ${inter.className}`}>
                                     Create Account
                                 </a>
                              </Link>
                          </motion.div>
                     </form>
                </motion.div>
            </motion.div>

             {/* Custom Input Styling (same as before) */}
             <style jsx global>{`
                .form-input {
                    width: 100%;
                    padding: 0.75rem 1rem; /* 12px 16px */
                    background-color: rgba(40, 40, 40, 0.8); /* Darker base #282828 */
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 0.5rem; /* 8px */
                    color: white;
                    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                    -webkit-appearance: none; /* Fix iOS styling */
                    appearance: none;
                }
                 .form-input::placeholder {
                     color: rgba(255, 255, 255, 0.4);
                 }
                 .form-input:focus {
                     outline: none;
                     border-color: rgba(45, 212, 191, 0.7); /* teal-400/70 */
                     background-color: rgba(34, 34, 34, 0.9); /* #222 on focus */
                     box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.3); /* teal-500/30 ring */
                 }
                 /* Target autofill styles for webkit browsers */
                 .form-input:-webkit-autofill,
                 .form-input:-webkit-autofill:hover,
                 .form-input:-webkit-autofill:focus,
                 .form-input:-webkit-autofill:active {
                     -webkit-box-shadow: 0 0 0 30px #181818 inset !important; /* Match card bg */
                     -webkit-text-fill-color: #ffffff !important; /* White text */
                     transition: background-color 5000s ease-in-out 0s; /* Long transition to override default */
                     caret-color: white; /* Ensure cursor is visible */
                 }

             `}</style>
         </motion.div>
     );
 };

 export default WistaraLogin;
