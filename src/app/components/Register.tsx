// components/WistaraRegister.tsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiUserPlus, // Icon for register button
    FiLoader,
    FiAlertCircle,
    FiEye,
    FiEyeOff,
    FiUser,   // Icon for name
    FiMail    // Icon for email
} from 'react-icons/fi';
import { Quicksand, Inter, Space_Grotesk } from 'next/font/google';
import Link from 'next/link';

// --- Font Config ---
const quicksand = Quicksand({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] });

// --- Animation Variants ---
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
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const iconVariant = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 15 } },
    exit: { scale: 0.5, opacity: 0 }
};

// --- Placeholder Image URL (GANTI DENGAN URL GAMBAR ANDA) ---
const backgroundImageUrl = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'; // Contoh: Raja Ampat

const WistaraRegister: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null); // State for success message

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;
        setError(null); // Clear previous errors
        setSuccess(null); // Clear previous success

        // Basic Validation
        if (password !== confirmPassword) {
            setError('Konfirmasi password tidak cocok.');
            return;
        }
        if (password.length < 6) { // Example basic password length check
            setError('Password minimal harus 6 karakter.');
            return;
        }

        setIsLoading(true);

        // --- SIMULASI PANGGILAN API REGISTER ---
        console.log('Attempting registration with:', { name, email, password });
        await new Promise(resolve => setTimeout(resolve, 1500));
        const registrationSuccess = Math.random() > 0.3; // Simulate success/failure

        if (registrationSuccess) {
            console.log('Registration successful!');
            setSuccess('Pendaftaran berhasil! Silakan login.');
            // Optional: Reset form fields after successful registration
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            // Optional: Redirect ke halaman login atau verifikasi email
            // Contoh: setTimeout(() => router.push('/login'), 2000);
        } else {
            console.error('Registration failed');
            setError('Pendaftaran gagal. Email mungkin sudah terdaftar atau terjadi kesalahan server.');
        }
        // ---------------------------------------

        setIsLoading(false);
    };

    return (
        <motion.div
            className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-black"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat filter grayscale-[30%] brightness-50"
                style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            />
            {/* Dark Overlay Layer */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/70 via-black/85 to-black/80" />

            {/* Form Card Container */}
            <motion.div
                className="relative z-20 w-full max-w-md"
                variants={formCardVariants}
            >
                <motion.div
                    className="relative w-full p-8 md:p-10 bg-[#181818]/80 rounded-2xl border border-white/15 shadow-2xl dark:shadow-black/70 backdrop-blur-lg overflow-hidden"
                    variants={formContainerStagger}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Decorative elements inside card */}
                    <div className="absolute inset-0 z-0 opacity-[0.02] bg-[url('/images/noise.png')] mix-blend-overlay pointer-events-none"></div>
                    <motion.div
                        className="absolute -top-1/4 -left-1/4 w-48 h-48 bg-gradient-radial from-cyan-800/25 via-transparent to-transparent blur-2xl opacity-60 pointer-events-none -z-10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                        className="absolute -bottom-1/4 -right-1/4 w-40 h-40 bg-gradient-radial from-emerald-800/20 via-transparent to-transparent blur-2xl opacity-50 pointer-events-none -z-10"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: 'linear', delay: 3 }}
                    />

                    <motion.h2
                        variants={formItemVariant}
                        className={`text-3xl lg:text-4xl font-semibold text-center text-white mb-10 ${spaceGrotesk.className}`}
                    >
                        Buat Akun Wistara
                    </motion.h2>

                    <form onSubmit={handleSubmit} className="space-y-5"> {/* Reduced space-y slightly */}
                         {/* Name Input */}
                         <motion.div variants={formItemVariant}>
                            <label
                                htmlFor="name"
                                className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}
                            >
                                Nama Lengkap
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isLoading}
                                    className={`form-input pl-10 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} // Added padding left for icon
                                    placeholder="Nama Anda"
                                />
                            </div>
                        </motion.div>

                        {/* Email Input */}
                        <motion.div variants={formItemVariant}>
                            <label
                                htmlFor="email"
                                className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}
                            >
                                Email
                            </label>
                             <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                    className={`form-input pl-10 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    placeholder="email@anda.com"
                                />
                            </div>
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
                                autoComplete="new-password" // Important for password managers
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                className={`form-input pr-10 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Minimal 6 karakter"
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
                                    {showPassword ? ( <motion.span key="p-eye-off" variants={iconVariant} initial="hidden" animate="visible" exit="exit"><FiEyeOff className="w-5 h-5" /></motion.span>)
                                     : (<motion.span key="p-eye" variants={iconVariant} initial="hidden" animate="visible" exit="exit"><FiEye className="w-5 h-5" /></motion.span>)
                                     }
                                 </AnimatePresence>
                             </motion.button>
                         </motion.div>

                        {/* Confirm Password Input */}
                        <motion.div variants={formItemVariant} className="relative">
                            <label
                                htmlFor="confirmPassword"
                                className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}
                            >
                                Konfirmasi Password
                            </label>
                             <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isLoading}
                                className={`form-input pr-10 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Ulangi password"
                            />
                             <motion.button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 top-[calc(0.75rem+1.5rem)] pr-3 flex items-center text-white/50 hover:text-teal-300 transition duration-200 z-10"
                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                whileTap={{ scale: 0.9 }}
                                disabled={isLoading}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {showConfirmPassword ? (<motion.span key="cp-eye-off" variants={iconVariant} initial="hidden" animate="visible" exit="exit"><FiEyeOff className="w-5 h-5" /></motion.span>)
                                     : (<motion.span key="cp-eye" variants={iconVariant} initial="hidden" animate="visible" exit="exit"><FiEye className="w-5 h-5" /></motion.span>)}
                                 </AnimatePresence>
                             </motion.button>
                         </motion.div>

                         {/* Success Message */}
                         <AnimatePresence>
                         {success && (
                             <motion.div
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -5, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="flex items-start p-3 bg-emerald-900/40 border border-emerald-600/60 rounded-lg overflow-hidden" // Success styling
                                role="status"
                            >
                                {/* You can add a success icon here too if you like */}
                                <p className="text-sm text-emerald-200 leading-snug">{success}</p>
                             </motion.div>
                         )}
                         </AnimatePresence>

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
                         <motion.div variants={formItemVariant} className="pt-3">
                             <motion.button
                                type="submit"
                                disabled={isLoading}
                                className={`relative w-full inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-bold rounded-lg shadow-lg text-black bg-gradient-to-r from-teal-400 to-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#181818] focus:ring-emerald-400 transition-all duration-300 ease-in-out group overflow-hidden ${isLoading ? 'cursor-not-allowed' : 'hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.97] hover:brightness-110'} ${spaceGrotesk.className} uppercase tracking-wider`}
                                whileTap={{ scale: isLoading ? 1 : 0.97 }}
                             >
                                <AnimatePresence>
                                {isLoading && ( <motion.div /* ... (loading overlay unchanged) ... */ /> )}
                                </AnimatePresence>

                                 <span className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                                    Daftar
                                 </span>
                                 {!isLoading && <FiUserPlus className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />}

                             </motion.button>
                         </motion.div>

                          {/* Login Link */}
                          <motion.div
                             variants={formItemVariant}
                             className="text-sm text-center mt-8"
                         >
                              <Link href="/login" legacyBehavior>
                                 <a className={`font-medium text-teal-400 hover:text-emerald-300 transition-colors duration-200 ${inter.className}`}>
                                     Sudah punya akun? Login di sini
                                  </a>
                              </Link>
                          </motion.div>
                     </form>
                </motion.div>
            </motion.div>

             {/* Custom Input Styling */}
             <style jsx global>{`
                .form-input {
                    width: 100%;
                    padding: 0.75rem 1rem; /* 12px 16px */
                    background-color: rgba(40, 40, 40, 0.8); /* Darker base #282828 */
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 0.5rem; /* 8px */
                    color: white;
                    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                    -webkit-appearance: none;
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
                 /* Padding adjustment for icons */
                 .form-input.pl-10 { padding-left: 2.5rem; } /* 40px */
                 .form-input.pr-10 { padding-right: 2.5rem; } /* 40px */

                 /* Autofill styles */
                 .form-input:-webkit-autofill,
                 .form-input:-webkit-autofill:hover,
                 .form-input:-webkit-autofill:focus,
                 .form-input:-webkit-autofill:active {
                     -webkit-box-shadow: 0 0 0 30px #181818 inset !important;
                     -webkit-text-fill-color: #ffffff !important;
                     transition: background-color 5000s ease-in-out 0s;
                     caret-color: white;
                 }
             `}</style>
         </motion.div>
     );
 };

 export default WistaraRegister;
