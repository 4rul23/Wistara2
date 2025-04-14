"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FiUserPlus,
    FiLoader,
    FiAlertCircle,
    FiEye,
    FiEyeOff,
    FiUser,
    FiMail,
    FiMapPin,
    FiMap,
    FiDollarSign,
    FiStar,
    FiChevronRight,
    FiChevronLeft
} from 'react-icons/fi';
import { Quicksand, Inter, Space_Grotesk } from 'next/font/google';
import Link from 'next/link';

// --- Font Config ---
const quicksand = Quicksand({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] });

// --- Animation Variants ---
const formItemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// --- Placeholder Image URL ---
const backgroundImageUrl = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80';

// --- Data constants ---
const indonesianCities = [
    "Jakarta", "Surabaya", "Bandung", "Medan", "Semarang", "Makassar",
    "Palembang", "Yogyakarta", "Denpasar", "Malang", "Solo", "Manado",
    "Lombok", "Padang", "Pontianak", "Batam", "Balikpapan", "Jayapura"
];

const priceRangeOptions = [
    { value: "budget", label: "Budget (< Rp500k)" },
    { value: "midRange", label: "Menengah (Rp500k - Rp1.5jt)" },
    { value: "luxury", label: "Mewah (> Rp1.5jt)" }
];

// Kategori resmi sesuai data destinations
const travelCategories = [
    "Budaya", "Taman Hiburan", "Cagar Alam", "Bahari", "Pusat Perbelanjaan", "Tempat Ibadah"
];

// Tags minat wisata standar
const popularInterestTags = [
    'beach', 'hiking', 'cultural', 'historical', 'culinary', 'family',
    'adventure', 'photography', 'shopping', 'nature', 'free', 'solo',
    'religious', 'romantic', 'wildlife', 'resort', 'camping', 'art',
    'traditional', 'modern', 'museum', 'island', 'temple', 'mountain',
    'city', 'village', 'festival', 'local', 'luxury', 'budget',
    'spiritual', 'heritage', 'garden', 'forest', 'coastal', 'sunset',
    'sunrise', 'extreme', 'underrated', 'popular', 'eco-friendly'
];

// --- Main Component ---
const WistaraRegister: React.FC = () => {
    // Form steps state
    const [currentStep, setCurrentStep] = useState(0);
    const [formStepsCompleted, setFormStepsCompleted] = useState([false, false, false]);

    // Basic user info
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Location info
    const [city, setCity] = useState('');
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const [visitedPlaces, setVisitedPlaces] = useState<string[]>([]);
    const [visitedPlaceInput, setVisitedPlaceInput] = useState('');

    // Preferences
    const [priceRange, setPriceRange] = useState('');
    const [interestTags, setInterestTags] = useState<string[]>([]);
    const [preferredCategories, setPreferredCategories] = useState<string[]>([]);
    const [minRating, setMinRating] = useState(3.0);

    // Form state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Tag handling functions
    const handleAddTag = (tag: string, currentTags: string[], setTags: React.Dispatch<React.SetStateAction<string[]>>) => {
        if (tag.trim() !== "" && !currentTags.includes(tag.trim())) {
            setTags([...currentTags, tag.trim()]);
        }
    };

    const handleRemoveTag = (tagToRemove: string, currentTags: string[], setTags: React.Dispatch<React.SetStateAction<string[]>>) => {
        setTags(currentTags.filter(tag => tag !== tagToRemove));
    };

    const handleAddVisitedPlace = () => {
        if (visitedPlaceInput.trim() !== "" && !visitedPlaces.includes(visitedPlaceInput.trim())) {
            setVisitedPlaces([...visitedPlaces, visitedPlaceInput.trim()]);
            setVisitedPlaceInput('');
        }
    };

    // Detect user's location
    const detectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoordinates({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setError("Tidak dapat mendeteksi lokasi Anda.");
                }
            );
        } else {
            setError("Geolocation tidak didukung di browser ini.");
        }
    };

    // Form navigation
    const goToNextStep = () => {
        // Mark current step as completed
        const updatedSteps = [...formStepsCompleted];
        updatedSteps[currentStep] = true;
        setFormStepsCompleted(updatedSteps);

        // Update step
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 2));
    };

    const goToPrevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const validateStep = (step: number): boolean => {
        setError(null);

        switch (step) {
            case 0: // Basic info validation
                if (!name || !email || !password || !confirmPassword) {
                    setError('Semua field wajib diisi.');
                    return false;
                }
                if (password !== confirmPassword) {
                    setError('Konfirmasi password tidak cocok.');
                    return false;
                }
                if (password.length < 6) {
                    setError('Password minimal harus 6 karakter.');
                    return false;
                }
                return true;

            case 1: // Location validation
                if (!city) {
                    setError('Pilih kota Anda.');
                    return false;
                }
                return true;

            case 2: // Preferences validation
                if (!priceRange) {
                    setError('Pilih preferensi budget perjalanan Anda.');
                    return false;
                }
                return true;

            default:
                return true;
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;

        // Final validation
        if (!validateStep(currentStep)) return;

        setIsLoading(true);

        try {
            // Prepare user data
            const userData = {
                name,
                email,
                password,
                city,
                coordinates,
                visitedPlaces,
                priceRange,
                interestTags,
                preferredCategories,
                minRating
            };

            console.log('Registering user with data:', userData);

            // API call would go here
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Terjadi kesalahan saat mendaftar');
            }

            const data = await response.json();
            setSuccess('Pendaftaran berhasil! Silakan login.');

            // Reset form
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setCity('');
            setCoordinates(null);
            setVisitedPlaces([]);
            setPriceRange('');
            setInterestTags([]);
            setPreferredCategories([]);
            setMinRating(3.0);
            setCurrentStep(0);
        } catch (err) {
            console.error('Registration error:', err);
            setError(err instanceof Error ? err.message : 'Pendaftaran gagal. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    // Debug info
    useEffect(() => {
        console.log("Current step changed to:", currentStep);
    }, [currentStep]);

    return (
        <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-black">
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat filter grayscale-[30%] brightness-50"
                style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            />

            {/* Dark Overlay Layer */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/70 via-black/85 to-black/80" />

            {/* Form Card Container */}
            <div className="relative z-20 w-full max-w-md">
                <div className="relative w-full p-8 md:p-10 bg-[#181818]/80 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-lg">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/noise.png')] mix-blend-overlay pointer-events-none"></div>
                    <div className="absolute -top-1/4 -left-1/4 w-48 h-48 bg-gradient-radial from-cyan-800/25 via-transparent to-transparent blur-2xl opacity-60 pointer-events-none -z-10" />
                    <div className="absolute -bottom-1/4 -right-1/4 w-40 h-40 bg-gradient-radial from-emerald-800/20 via-transparent to-transparent blur-2xl opacity-50 pointer-events-none -z-10" />

                    <h2 className={`text-3xl lg:text-4xl font-semibold text-center text-white mb-6 ${spaceGrotesk.className}`}>
                        Buat Akun Wistara
                    </h2>

                    {/* Progress indicator */}
                    <div className="flex items-center justify-center mb-8 px-4">
                        {[0, 1, 2].map((step) => (
                            <React.Fragment key={step}>
                                <div className={`relative h-2 w-2 rounded-full transition-all duration-300 ${
                                    currentStep === step ? 'bg-teal-400 scale-125' :
                                    formStepsCompleted[step] ? 'bg-emerald-500' : 'bg-white/30'
                                }`} />
                                {step < 2 && (
                                    <div className={`h-0.5 w-10 mx-1 transition-colors duration-300 ${
                                        formStepsCompleted[step] ? 'bg-emerald-500' : 'bg-white/20'
                                    }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* STEP 1: Basic Information */}
                        <div className={currentStep === 0 ? "block space-y-5" : "hidden"}>
                            <h3 className={`text-lg font-medium text-white mb-4 ${inter.className}`}>
                                Informasi Dasar
                            </h3>

                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}>
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
                                        className={`form-input pl-10 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        placeholder="Nama Anda"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}>
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
                            </div>

                            {/* Password Input */}
                            <div className="relative">
                                <label htmlFor="password" className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}>
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                        className={`form-input pr-10 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        placeholder="Minimal 6 karakter"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-teal-300 transition"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div className="relative">
                                <label htmlFor="confirmPassword" className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}>
                                    Konfirmasi Password
                                </label>
                                <div className="relative">
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
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-teal-300 transition"
                                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                    >
                                        {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* STEP 2: Location */}
                        <div className={currentStep === 1 ? "block space-y-5" : "hidden"}>
                            <h3 className={`text-lg font-medium text-white mb-4 ${inter.className}`}>
                                Lokasi Anda
                            </h3>

                            {/* City Selection */}
                            <div>
                                <label htmlFor="city" className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}>
                                    Kota
                                </label>
                                <div className="relative">
                                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                                    <select
                                        id="city"
                                        name="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        disabled={isLoading}
                                        className={`form-input pl-10 pr-10 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        required
                                    >
                                        <option value="">Pilih kota</option>
                                        {indonesianCities.map((cityName) => (
                                            <option key={cityName} value={cityName}>{cityName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Location Detection */}
                            <div>
                                <label htmlFor="coordinates" className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}>
                                    Koordinat Lokasi (Opsional)
                                </label>
                                <div className="flex space-x-4 items-center">
                                    <button
                                        type="button"
                                        onClick={detectLocation}
                                        className="flex items-center justify-center px-4 py-2 text-sm border border-teal-500 rounded-lg text-teal-400 hover:bg-teal-600/20 transition-all duration-200"
                                        disabled={isLoading}
                                    >
                                        <FiMap className="mr-2" />
                                        Deteksi Lokasi
                                    </button>
                                    <div className="text-white/60 text-xs">
                                        {coordinates
                                            ? `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`
                                            : "Belum terdeteksi"}
                                    </div>
                                </div>
                            </div>

                            {/* Visited Places */}
                            <div>
                                <label htmlFor="visitedPlaces" className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}>
                                    Tempat yang Sudah Dikunjungi (Opsional)
                                </label>
                                <div className="space-y-3">
                                    <div className="flex space-x-2">
                                        <input
                                            id="visitedPlaceInput"
                                            type="text"
                                            value={visitedPlaceInput}
                                            onChange={(e) => setVisitedPlaceInput(e.target.value)}
                                            className="form-input flex-1"
                                            placeholder="Contoh: Bali, Yogyakarta"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddVisitedPlace}
                                            className="px-3 bg-teal-600/30 text-teal-300 border border-teal-500/50 rounded-lg hover:bg-teal-600/40"
                                        >
                                            Tambah
                                        </button>
                                    </div>

                                    {/* Tag display */}
                                    <div className="flex flex-wrap gap-2">
                                        {visitedPlaces.map((place) => (
                                            <div
                                                key={place}
                                                className="flex items-center bg-teal-900/50 border border-teal-600/30 text-teal-300 px-2 py-1 rounded-full text-xs"
                                            >
                                                {place}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(place, visitedPlaces, setVisitedPlaces)}
                                                    className="ml-1.5 hover:text-white"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* STEP 3: Preferences */}
                        <div className={currentStep === 2 ? "block space-y-5" : "hidden"}>
                            <h3 className={`text-lg font-medium text-white mb-4 ${inter.className}`}>
                                Preferensi Perjalanan
                            </h3>

                            {/* Price Range */}
                            <div>
                                <label htmlFor="priceRange" className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}>
                                    Budget Perjalanan
                                </label>
                                <div className="relative">
                                    <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                                    <select
                                        id="priceRange"
                                        name="priceRange"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(e.target.value)}
                                        className="form-input pl-10 pr-10"
                                        required
                                    >
                                        <option value="">Pilih budget</option>
                                        {priceRangeOptions.map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Interest Tags */}
                            <div>
                                <label className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}>
                                    Tags Minat Wisata
                                </label>
                                <div className="max-h-48 overflow-y-auto pr-2 pb-2">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {popularInterestTags.map((tag) => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => {
                                                    if (interestTags.includes(tag)) {
                                                        handleRemoveTag(tag, interestTags, setInterestTags);
                                                    } else {
                                                        handleAddTag(tag, interestTags, setInterestTags);
                                                    }
                                                }}
                                                className={`px-3 py-1.5 rounded-full text-sm transition-colors duration-200 ${
                                                    interestTags.includes(tag)
                                                        ? 'bg-emerald-600 text-white'
                                                        : 'bg-slate-700/50 text-white/70 hover:bg-slate-700'
                                                }`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-xs text-white/50 mt-1">
                                    Pilih tag minat wisata yang menarik bagi Anda
                                </div>

                                {interestTags.length > 0 && (
                                    <div className="mt-3">
                                        <div className="text-xs font-medium text-white/80 mb-2">
                                            Tag Terpilih ({interestTags.length}):
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {interestTags.map(tag => (
                                                <div
                                                    key={`selected-${tag}`}
                                                    className="bg-emerald-900/50 border border-emerald-600/40 text-emerald-300 px-2 py-1 rounded-full text-xs flex items-center"
                                                >
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveTag(tag, interestTags, setInterestTags)}
                                                        className="ml-1.5 hover:text-white"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Preferred Categories */}
                            <div>
                                <label className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}>
                                    Kategori Wisata Favorit
                                </label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {travelCategories.map((category) => (
                                        <button
                                            key={category}
                                            type="button"
                                            onClick={() => {
                                                if (preferredCategories.includes(category)) {
                                                    handleRemoveTag(category, preferredCategories, setPreferredCategories);
                                                } else {
                                                    handleAddTag(category, preferredCategories, setPreferredCategories);
                                                }
                                            }}
                                            className={`px-3 py-1.5 rounded-full text-sm transition-colors duration-200 ${
                                                preferredCategories.includes(category)
                                                    ? 'bg-cyan-600 text-white'
                                                    : 'bg-slate-700/50 text-white/70 hover:bg-slate-700'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                                <div className="text-xs text-white/50 mt-1">
                                    Pilih kategori wisata yang Anda sukai
                                </div>
                            </div>

                            {/* Min Rating */}
                            <div>
                                <label htmlFor="minRating" className={`block text-sm font-medium text-white/80 mb-2 ${inter.className}`}>
                                    Rating Minimum {minRating}/5
                                </label>
                                <div className="flex items-center space-x-4">
                                    <FiStar className="w-5 h-5 text-yellow-400" />
                                    <input
                                        id="minRating"
                                        type="range"
                                        min="0"
                                        max="5"
                                        step="0.5"
                                        value={minRating}
                                        onChange={(e) => setMinRating(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="text-white text-sm w-8 text-center">{minRating}</span>
                                </div>
                            </div>
                        </div>

                        {/* Error & Success Messages */}
                        {error && (
                            <div className="flex items-start p-3 bg-rose-900/40 border border-rose-600/60 rounded-lg overflow-hidden" role="alert">
                                <FiAlertCircle className="w-5 h-5 text-rose-300 mr-2.5 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-rose-200 leading-snug">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="flex items-start p-3 bg-emerald-900/40 border border-emerald-600/60 rounded-lg overflow-hidden" role="status">
                                <p className="text-sm text-emerald-200 leading-snug">{success}</p>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="pt-3 flex justify-between">
                            {currentStep > 0 ? (
                                <button
                                    type="button"
                                    onClick={goToPrevStep}
                                    disabled={isLoading}
                                    className="inline-flex items-center px-4 py-2 border border-white/20 text-sm font-medium rounded-lg text-white/80 hover:bg-white/10 transition-colors duration-200"
                                >
                                    <FiChevronLeft className="mr-2 h-5 w-5" />
                                    Kembali
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {currentStep < 2 ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (validateStep(currentStep)) {
                                            goToNextStep();
                                        }
                                    }}
                                    disabled={isLoading}
                                    className="inline-flex items-center px-5 py-2.5 border border-teal-500 text-sm font-medium rounded-lg text-teal-400 hover:bg-teal-600/20 transition-colors duration-200"
                                >
                                    Lanjut
                                    <FiChevronRight className="ml-2 h-5 w-5" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`relative inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-lg shadow-lg text-black bg-gradient-to-r from-teal-400 to-emerald-500 focus:outline-none transition-all duration-300 ${isLoading ? 'cursor-not-allowed' : 'hover:shadow-xl hover:brightness-110'} ${spaceGrotesk.className} uppercase tracking-wider`}
                                >
                                    {isLoading ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <FiLoader className="h-5 w-5 animate-spin text-white" />
                                        </div>
                                    ) : null}
                                    <span className={`${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                                        Daftar
                                    </span>
                                    {!isLoading && <FiUserPlus className="ml-2 h-5 w-5" />}
                                </button>
                            )}
                        </div>

                        {/* Login Link */}
                        <div className="text-sm text-center mt-6">
                            <Link
                                href="/login"
                                className={`font-medium text-teal-400 hover:text-emerald-300 transition-colors duration-200 ${inter.className}`}
                            >
                                Sudah punya akun? Login di sini
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Custom Input Styling */}
            <style jsx global>{`
                .form-input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background-color: rgba(40, 40, 40, 0.8);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 0.5rem;
                    color: white;
                    transition: all 0.2s ease-in-out;
                    -webkit-appearance: none;
                    appearance: none;
                }
                .form-input::placeholder {
                    color: rgba(255, 255, 255, 0.4);
                }
                .form-input:focus {
                    outline: none;
                    border-color: rgba(45, 212, 191, 0.7);
                    background-color: rgba(34, 34, 34, 0.9);
                    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.3);
                }
                .form-input.pl-10 { padding-left: 2.5rem; }
                .form-input.pr-10 { padding-right: 2.5rem; }

                select.form-input {
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
                    background-position: right 0.5rem center;
                    background-repeat: no-repeat;
                    background-size: 1.5em 1.5em;
                    padding-right: 2.5rem;
                }

                input[type="range"] {
                    -webkit-appearance: none;
                    height: 4px;
                    background: #374151;
                    border-radius: 5px;
                }

                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #10b981;
                    cursor: pointer;
                }

                input[type="range"]::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #10b981;
                    cursor: pointer;
                }

                .form-input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 30px #181818 inset !important;
                    -webkit-text-fill-color: #ffffff !important;
                    transition: background-color 5000s ease-in-out 0s;
                    caret-color: white;
                }
            `}</style>
        </div>
    );
};

export default WistaraRegister;
