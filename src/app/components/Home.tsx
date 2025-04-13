"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

import {
	motion,
	AnimatePresence,
	useInView,
	useScroll,
	useTransform,
	useMotionValue,
	useSpring,
} from "framer-motion";
import {
	FiSearch,
	FiChevronRight,
	FiChevronLeft,
	FiBookOpen,
	FiCompass,
	FiInfo,
	FiGlobe,
} from "react-icons/fi";
import {
	Quicksand,
	Inter,
	Space_Grotesk,
} from "next/font/google";

// Font configuration
const quicksand = Quicksand({ subsets: ["latin"] }); // Used as main wrapper class
const inter = Inter({ subsets: ["latin"] }); // Used for paragraphs, stats text
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] }); // Used heavily for neo-brutalist style

// Slide interface definition
interface Slide {
	image: string;
	id: string;
	title: string;
	subtitle: string;
}

// Client-side detection helper
const isClient = typeof window !== "undefined";

// CountUp Component for animated number counting
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

const Home: React.FC = () => {
	// --- State Variables ---
	const [currentSlide, setCurrentSlide] = useState<number>(0);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [isHovering, setIsHovering] = useState<boolean>(false);
	const searchRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(searchRef, { once: false, amount: 0.3 });

	// --- Animation Controls Removed ---
	// const controls = useAnimationControls(); // Removed

	const { scrollY } = useScroll();

	// --- Scroll Animations ---
	const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);
	const headerY = useTransform(scrollY, [0, 100], [0, -10]);
	const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
	const springHeaderY = useSpring(headerY, springConfig);

	// --- Mouse Parallax ---
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const smoothMouseX = useSpring(mouseX, springConfig);
	const smoothMouseY = useSpring(mouseY, springConfig);

	// Track mouse position
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

	// --- Slides Data ---
	const slides: Slide[] = [
		{ image: "/images/pexels-ahmad-syahrir-107128-758742.jpg", id: "01", title: "Ancient Temple Records", subtitle: "Delve into the intricate history and cultural significance of Indonesia's sacred sites." },
		{ image: "/images/bali-pagoda-sunrise-indonesia.jpg", id: "02", title: "Coastal Ecosystem Guide", subtitle: "Explore the diverse marine life, coral reefs, and volcanic beaches shaping the archipelago." },
		{ image: "/images/bali.jpg", id: "03", title: "Flora & Fauna Atlas", subtitle: "Discover the unique biodiversity across Indonesia's rainforests, mountains, and islands." },
		{ image: "/images/raja-ampat.png", id: "04", title: "Archipelago Deep Dive", subtitle: "Navigate the vast network of islands, understanding their geology, culture, and traditions." },
	];

	// --- useEffect controlling 'controls' removed ---
	// useEffect(() => { ... controls.start ... }, [currentSlide, controls]);

	// --- Slide Navigation Handlers ---
	const goToSlide = useCallback((index: number): void => {
		setCurrentSlide(index);
	}, []);

	const nextSlide = useCallback(() => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	}, [slides.length]);

	const prevSlide = useCallback(() => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	}, [slides.length]);

	// --- Animation Variants ---
	const titleVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: 0.2 + 0.1 * i,
				duration: 0.8,
				ease: [0.22, 1, 0.36, 1],
			},
		}),
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.3 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<div className={`relative bg-[#0a0a0a] min-h-screen text-white ${quicksand.className} overflow-hidden`}>
			<div className="relative h-screen">
				{/* Background Grid Pattern */}
				<motion.div
					className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.04] z-0 pointer-events-none"
					style={{
						x: useTransform(smoothMouseX, [-1, 1], [-15, 15]),
						y: useTransform(smoothMouseY, [-1, 1], [-15, 15]),
					}}
				/>

				{/* Background Noise Overlay */}
				<motion.div
					className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] z-0 pointer-events-none mix-blend-overlay"
					animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
					transition={{ duration: 120, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
				/>

				{/* Background Image Slider */}
				<AnimatePresence initial={false} mode="wait">
					<motion.div
						key={currentSlide}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.8, ease: "easeInOut" }}
						className="absolute inset-0 z-0"
					>
						{/* Inner div for Ken Burns & Parallax */}
						<motion.div
							animate={{ scale: [1.1, 1] }}
							transition={{ duration: 10, ease: "linear" }}
							style={{
								backgroundImage: `url('${slides[currentSlide].image}')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								height: "100%",
								width: "100%",
								x: useTransform(smoothMouseX, [-1, 1], [25, -25]),
								y: useTransform(smoothMouseY, [-1, 1], [25, -25]),
								scale: 1.1,
							}}
							className="relative"
						>
							{/* Gradient Overlays */}
							<motion.div
								className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70"
								style={{ opacity: useTransform(smoothMouseY, [-1, 1], [0.7, 0.9]) }}
							/>
							<motion.div
								className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"
								style={{ opacity: useTransform(smoothMouseX, [-1, 1], [0.8, 0.5]) }}
							/>

							{/* Decorative Animated Gradients/Shapes */}
							<motion.div
								className="absolute inset-0 mix-blend-color-dodge opacity-20 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-teal-900/30 via-transparent to-transparent"
								animate={{ opacity: [0.15, 0.25, 0.15] }}
								transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
							/>
							<motion.div
								className="absolute bottom-0 left-0 w-1/3 h-1/4 bg-gradient-to-tr from-teal-500/5 to-transparent"
								style={{ x: useTransform(smoothMouseX, [-1, 1], [-25, 25]), y: useTransform(smoothMouseY, [-1, 1], [25, -25]) }}
								animate={{ opacity: [0.05, 0.15, 0.05] }}
								transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
							/>
						</motion.div>
					</motion.div>
				</AnimatePresence>

				{/* Header Navigation */}
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
										<motion.div className="relative overflow-hidden" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
											<FiGlobe className="text-teal-400 text-2xl" />
										</motion.div>
										<motion.div className={`text-xl md:text-2xl font-bold text-white ${spaceGrotesk.className} tracking-wide uppercase`}>Wistara</motion.div>
									</Link>
								</motion.div>
								{/* Desktop Navigation */}
								<nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
									{["Explore", "About", "Map"].map((item, i) => (
										<motion.div key={item} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i, duration: 0.5, ease: "easeOut" }}>
											<Link href={item === "Map" ? "/map" : `/${item.toLowerCase()}`} className={`text-sm text-white/70 hover:text-white transition-colors relative group ${spaceGrotesk.className} uppercase tracking-wider`}>
												{item}
												<motion.span className="absolute -bottom-1 left-0 h-[2px] bg-teal-400 w-0 origin-left" whileHover={{ width: "100%" }} transition={{ duration: 0.3, ease: "easeOut" }} />
											</Link>
										</motion.div>
									))}
								</nav>
								{/* Auth Buttons */}
								<div className="flex items-center space-x-3">
									<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }} className="hidden sm:block">
										<Link href="/login" className={`text-sm text-white/70 hover:text-white px-4 py-2 rounded-md transition-colors relative overflow-hidden group ${spaceGrotesk.className} uppercase tracking-wider`}>
											<span className="relative z-10">Login</span>
											<motion.span className="absolute inset-0 bg-white/5 opacity-0" whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />
										</Link>
									</motion.div>
									<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="relative overflow-hidden rounded-md">
										<motion.div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/50 to-emerald-500/50 rounded-md blur-sm" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }} />
										<Link href="/register" className={`relative block bg-teal-500 text-black hover:bg-teal-400 px-4 py-2 md:px-5 md:py-2.5 rounded-md text-sm font-semibold transition-colors duration-300 border-2 border-teal-300 hover:border-teal-200 z-10 ${spaceGrotesk.className} uppercase tracking-wider`}>Sign Up</Link>
									</motion.div>
								</div>
							</div>
						</motion.div>
					</div>
				</motion.header>

				{/* Hero Content Section */}
				<div className="relative z-10 h-full flex items-center justify-center text-center lg:text-left px-4 sm:px-6">
					<div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
						{/* Left Content Area */}
						<div className="lg:col-span-7 order-2 lg:order-1">
							<AnimatePresence mode="wait">
								<motion.div
									key={`content-${currentSlide}`}
									initial="hidden" // Use variants for initial state
                                    animate="visible" // Use variants for animate state
									exit={{ opacity: 0, y: -20 }} // Keep a simple exit
									transition={{ duration: 0.6, ease: "easeInOut" }}
									className="space-y-6 md:space-y-8"
								>
									{/* Tag Buttons */}
									<motion.div
										custom={0} // Pass index for stagger
										variants={titleVariants} // Use defined variants
										className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
									>
										<motion.span className={`inline-block px-4 py-1 bg-teal-500/80 text-black text-xs md:text-sm rounded-md border border-teal-300 font-semibold ${spaceGrotesk.className} uppercase tracking-wider cursor-default`} whileHover={{ scale: 1.05, backgroundColor: "rgb(20 184 166)" }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
											WIKI ENCYCLOPEDIA
										</motion.span>
										<motion.span className={`inline-block px-4 py-1 bg-black/20 text-white/80 text-xs md:text-sm rounded-md border border-white/20 font-medium ${spaceGrotesk.className} uppercase tracking-wider cursor-default`} whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(255, 255, 255, 0.3)" }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
											<span className="text-teal-300 mr-1">Discover</span> Indonesia
										</motion.span>
									</motion.div>

									{/* Main Headline */}
									<motion.h1
										className={`text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter ${spaceGrotesk.className} max-w-4xl mx-auto lg:mx-0`}
										custom={1} // Pass index for stagger
										variants={titleVariants} // Use defined variants
									>
										<motion.span className="relative inline-block" style={{ x: useTransform(smoothMouseX, [-1, 1], [-8, 8]), y: useTransform(smoothMouseY, [-1, 1], [-4, 4]) }}>
											{slides[currentSlide].title}
											<motion.span className="absolute -bottom-1 left-0 h-1.5 bg-teal-400" initial={{ width: 0 }} animate={{ width: "40%" }} transition={{ duration: 0.8, delay: 0.8 + 0.1*1, ease: [0.22, 1, 0.36, 1] }} /> {/* Add variant delay to underline animation */}
										</motion.span>
									</motion.h1>

									{/* Subtitle */}
									<motion.p
										className={`text-white/70 text-base md:text-lg max-w-xl font-light ${inter.className} leading-relaxed mx-auto lg:mx-0`}
										custom={2} // Pass index for stagger
										variants={titleVariants} // Use defined variants
									>
										{slides[currentSlide].subtitle}
									</motion.p>

									{/* Action Buttons */}
									<motion.div
										custom={3} // Pass index for stagger
										variants={titleVariants} // Use defined variants
										className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
									>
										<motion.button whileHover={{ scale: 1.03, boxShadow: "0 5px 20px rgba(45, 212, 191, 0.3)" }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className={`bg-teal-500 text-black px-6 py-3 rounded-md font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 hover:bg-teal-400 border-2 border-teal-300 ${spaceGrotesk.className} uppercase tracking-wider`}>
											<motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}><FiBookOpen className="text-lg" /></motion.div>
											<span>Explore</span>
										</motion.button>
										<motion.button whileHover={{ scale: 1.03, borderColor: "rgba(45, 212, 191, 0.5)", backgroundColor: "rgba(255, 255, 255, 0.05)" }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className={`bg-black/20 border-2 border-white/20 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${spaceGrotesk.className} uppercase tracking-wider`}>
											<motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}><FiCompass className="text-lg text-teal-300" /></motion.div>
											<span>View Map</span>
										</motion.button>
									</motion.div>

									{/* Statistics Bar */}
									<motion.div
										custom={4} // Pass index for stagger
										variants={titleVariants} // Use defined variants
										className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10"
									>
										{[
											{ value: 500, label: "Destinations", suffix: "+", delay: 0.8 + 0.1*4 }, // Adjust delay based on variant
											{ value: 1750, label: "Wiki Articles", suffix: "+", delay: 1.0 + 0.1*4 }, // Adjust delay based on variant
											{ value: 50, label: "Monthly Users", suffix: "K+", delay: 1.2 + 0.1*4 }, // Adjust delay based on variant
										].map((stat, index) => (
											<motion.div key={index} className="text-center" whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
												<motion.p className={`text-teal-300 text-2xl md:text-3xl font-bold ${spaceGrotesk.className}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: stat.delay, duration: 0.5 }}>
													{isClient && <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />}
													{!isClient && <span>{stat.value}{stat.suffix}</span>}
												</motion.p>
												<motion.p className={`text-white/50 text-xs md:text-sm ${inter.className} uppercase tracking-wider`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: stat.delay + 0.2, duration: 0.5 }}>
													{stat.label}
												</motion.p>
											</motion.div>
										))}
									</motion.div>
								</motion.div>
							</AnimatePresence>
						</div>

						{/* Right Content Area (Search Card) */}
						<div className="lg:col-span-5 order-1 lg:order-2">
							<motion.div
								ref={searchRef}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
								transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
								className="w-full max-w-md mx-auto lg:max-w-none"
								onHoverStart={() => setIsHovering(true)}
								onHoverEnd={() => setIsHovering(false)}
								style={{
									x: useTransform(smoothMouseX, [-1, 1], [12, -12]),
									y: useTransform(smoothMouseY, [-1, 1], [6, -6]),
								}}
							>
								<div className="relative">
									<motion.div
										className="absolute -inset-1 bg-gradient-to-br from-teal-600/30 via-emerald-500/10 to-transparent rounded-lg blur-md"
										animate={{ opacity: isHovering ? 0.8 : 0.4 }}
										transition={{ duration: 0.4 }}
									/>
									<motion.div
										className="relative bg-black/20 backdrop-blur-lg rounded-lg p-6 md:p-8 shadow-xl border border-white/10 hover:border-teal-400/40 transition-colors duration-300 overflow-hidden"
										whileHover={{ boxShadow: "0 15px 35px -15px rgba(0, 0, 0, 0.3)", y: -5 }}
										transition={{ type: "spring", stiffness: 300, damping: 20 }}
									>
										<motion.div className="absolute top-0 right-0 w-16 h-16 bg-teal-500/5 -mr-8 -mt-8" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}/>
										<motion.div className="absolute bottom-0 left-0 w-16 h-16 bg-teal-500/5 -ml-8 -mb-8" animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 1 }}/>
										<motion.h3 className={`text-white text-lg md:text-xl font-medium mb-6 ${spaceGrotesk.className} flex items-center uppercase tracking-wider`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
											<motion.span className="bg-teal-400 w-1.5 h-5 mr-3 inline-block" animate={{ height: ["1.25rem", "0.75rem", "1.25rem"] }} transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror" }} />
											Search Wiki
										</motion.h3>
										<div className="space-y-5 relative z-10">
											<motion.div className="group flex items-center space-x-3 border-b border-white/15 pb-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} whileHover={{ borderColor: "rgba(45, 212, 191, 0.4)" }}>
												<motion.div className="text-teal-300 text-lg p-2 rounded-md bg-teal-400/10 group-hover:bg-teal-400/20 transition-colors duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><FiSearch /></motion.div>
												<motion.input type="text" placeholder="Destinations, culture, history..." className={`bg-transparent text-white placeholder-white/40 focus:outline-none text-sm w-full ${spaceGrotesk.className}`} whileFocus={{ scale: 1.01 }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
											</motion.div>
											<motion.div className="pt-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
												<motion.p className={`text-white/50 text-xs mb-3 ${spaceGrotesk.className} uppercase tracking-widest`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>Popular Searches</motion.p>
												<motion.div className="flex flex-wrap gap-2" variants={containerVariants} initial="hidden" animate="visible">
													{["Bali", "Jakarta", "Borobudur", "Komodo", "Batik", "Raja Ampat"].map((tag) => (
														<motion.button key={tag} variants={itemVariants} className={`px-3 py-1 bg-white/5 text-white/70 text-xs rounded-md border border-white/10 hover:border-teal-400/50 hover:bg-white/10 hover:text-white cursor-pointer transition-all duration-200 ${spaceGrotesk.className}`} whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} onClick={() => setSearchQuery(tag)}>{tag}</motion.button>
													))}
												</motion.div>
											</motion.div>
										</div>
										<motion.div className="mt-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }}>
											<motion.button whileHover={{ scale: 1.03, boxShadow: "0 5px 25px rgba(45, 212, 191, 0.4)" }} whileTap={{ scale: 0.97 }} className={`w-full bg-gradient-to-r from-teal-500 to-teal-600 text-black px-6 py-3 rounded-md font-semibold transition-all duration-300 flex items-center justify-center space-x-2 border-2 border-teal-300 ${spaceGrotesk.className} relative overflow-hidden uppercase tracking-wider`}>
												<motion.div className="absolute inset-0 bg-white/30" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
												<span className="relative z-10">Search Now</span>
												<FiSearch className="text-lg relative z-10" />
											</motion.button>
										</motion.div>
									</motion.div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>

				{/* Bottom Controls: Slide Indicators */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }} className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-3">
					{slides.map((_, index) => (
						<motion.button key={index} onClick={() => goToSlide(index)} whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.5)" }} whileTap={{ scale: 0.9 }} className={`h-1.5 rounded-full transition-all duration-300 ease-out focus:outline-none`} animate={{ width: currentSlide === index ? '2.5rem' : '0.5rem', background: currentSlide === index ? 'linear-gradient(to right, #2dd4bf, #34d399)' : 'rgba(255, 255, 255, 0.3)' }} aria-label={`Go to slide ${index + 1}`} />
					))}
				</motion.div>

				{/* Bottom Controls: Slide Number */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }} className="absolute bottom-6 md:bottom-8 right-6 md:right-12 z-20">
					<div className="flex items-baseline space-x-1">
						<AnimatePresence mode="wait">
							<motion.div key={slides[currentSlide].id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="relative" style={{ fontVariantNumeric: 'tabular-nums' }}>
								<span className={`text-white font-bold text-sm md:text-base ${spaceGrotesk.className}`}>{slides[currentSlide].id}</span>
								<motion.div className="absolute -bottom-0.5 left-0 h-[2px] bg-teal-400 w-full" initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
							</motion.div>
						</AnimatePresence>
						<span className="text-white/40 text-xs md:text-sm">/</span>
						<span className={`text-white/40 text-xs md:text-sm ${spaceGrotesk.className}`}>{String(slides.length).padStart(2, '0')}</span>
					</div>
				</motion.div>

				{/* Side Navigation Arrows */}
				<div className="absolute inset-y-0 left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-3 md:px-6 z-20 pointer-events-none">
					<motion.button onClick={prevSlide} whileHover={{ scale: 1.1, x: -3, backgroundColor: "rgba(0, 0, 0, 0.2)" }} whileTap={{ scale: 0.95 }} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }} className="p-2.5 md:p-3 rounded-md bg-black/10 backdrop-blur-sm border border-white/10 hover:border-teal-400/50 transition-all duration-300 pointer-events-auto group" aria-label="Previous Slide"><FiChevronLeft className="text-white/80 text-xl md:text-2xl group-hover:text-teal-300 transition-colors" /></motion.button>
					<motion.button onClick={nextSlide} whileHover={{ scale: 1.1, x: 3, backgroundColor: "rgba(0, 0, 0, 0.2)" }} whileTap={{ scale: 0.95 }} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }} className="p-2.5 md:p-3 rounded-md bg-black/10 backdrop-blur-sm border border-white/10 hover:border-teal-400/50 transition-all duration-300 pointer-events-auto group" aria-label="Next Slide"><FiChevronRight className="text-white/80 text-xl md:text-2xl group-hover:text-teal-300 transition-colors" /></motion.button>
				</div>

				{/* Floating Feature Highlights */}
				<motion.div className="absolute bottom-16 md:bottom-20 left-6 md:left-12 z-20 hidden lg:block" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}>
					<motion.div className="bg-black/20 backdrop-blur-md rounded-lg p-3 border border-white/10 flex items-center space-x-3 max-w-[220px]" whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 0, 0, 0.3)", borderColor: "rgba(45, 212, 191, 0.4)" }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
						<motion.div className="bg-teal-500/20 p-2 rounded-md text-teal-300" animate={{ rotate: [0, 10, -5, 0], scale: [1, 1.05, 0.95, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><FiGlobe className="text-lg" /></motion.div>
						<div><h4 className={`text-white text-xs font-medium ${spaceGrotesk.className} uppercase`}>Interactive Maps</h4><p className="text-white/50 text-[10px] mt-0.5">Explore locations visually</p></div>
					</motion.div>
				</motion.div>
				<motion.div className="absolute bottom-16 md:bottom-20 right-6 md:right-12 z-20 hidden lg:block" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}>
					<motion.div className="bg-black/20 backdrop-blur-md rounded-lg p-3 border border-white/10 flex items-center space-x-3 max-w-[220px]" whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 0, 0, 0.3)", borderColor: "rgba(45, 212, 191, 0.4)" }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
						<motion.div className="bg-teal-500/20 p-2 rounded-md text-teal-300" animate={{ rotate: [0, -10, 5, 0], scale: [1, 1.05, 0.95, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}><FiInfo className="text-lg" /></motion.div>
						<div><h4 className={`text-white text-xs font-medium ${spaceGrotesk.className} uppercase`}>Detailed Articles</h4><p className="text-white/50 text-[10px] mt-0.5">In-depth cultural info</p></div>
					</motion.div>
				</motion.div>

				{/* Scroll Down Indicator */}
				<motion.div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 hidden md:flex flex-col items-center pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}>
					<span className={`text-white/50 text-[10px] mb-1 ${spaceGrotesk.className} uppercase tracking-widest`}>Scroll</span>
					<motion.div className="w-px h-5 bg-white/20" initial={{ scaleY: 0, originY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 2.0, duration: 0.6 }}>
						<motion.div className="w-full h-1/3 bg-teal-400" animate={{ y: ["0%", "200%"], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};

export default Home;
