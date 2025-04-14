"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Inter, Space_Grotesk, Playfair_Display } from "next/font/google";
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiGlobe, FiArrowRight, FiMail } from 'react-icons/fi'; // Removed FiMessageSquare for simplicity
import { useRouter } from 'next/navigation';

// Font configuration
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

// --- Component Start ---
export default function UniqueFramerAboutPage() {
  const router = useRouter();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"] // Ensure progress covers the entire container scroll
  });

  // Helper for smoother progress mapping within sections
  const sectionProgress = (start: number, end: number) => {
    // Clamp ensures progress stays between 0 and 1 within the section
    return useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });
  };

  // --- Section 1: Hero ---
  // Slightly longer fade out for smoother transition
  const heroProgress = sectionProgress(0, 0.20); // Section takes 20% of scroll
  const heroOpacity = useTransform(heroProgress, [0, 0.8, 1], [1, 1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.9]); // Scale down more subtly
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "-30%"]);
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "15%"]); // Parallax effect
  const heroImageOpacity = useTransform(heroProgress, [0, 1], [0.35, 0]); // Start slightly dimmer

  // --- Section 2: The Spark (Origin) ---
  const sparkProgress = sectionProgress(0.18, 0.40); // Overlaps slightly with hero end
  const sparkOpacity = useTransform(sparkProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const sparkTextX = useTransform(sparkProgress, [0.1, 0.9], ["-50%", "50%"]); // Text slides across
  const sparkTextOpacity = useTransform(sparkProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const sparkImageScale = useTransform(sparkProgress, [0, 1], [1.2, 0.8]); // Image scales down
  const sparkImageRotate = useTransform(sparkProgress, [0, 1], [-10, 10]); // Image rotates slightly
  const sparkImageOpacity = useTransform(sparkProgress, [0, 1], [0, 0.4]); // Fade in image

  // --- Section 3: Building (Development) ---
  const buildProgress = sectionProgress(0.38, 0.60); // Overlaps slightly
  const buildOpacity = useTransform(buildProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const buildTextY = useTransform(buildProgress, [0, 1], ["40%", "-40%"]); // Text moves vertically
  const buildImageScale = useTransform(buildProgress, [0, 1], [0.7, 1.1]); // Image zooms in
  const buildImageOpacity = useTransform(buildProgress, [0, 0.5, 1], [0, 0.4, 0]); // Fade in then out

  // --- Section 4: Vision ---
  const visionProgress = sectionProgress(0.58, 0.80); // Overlaps slightly
  const visionOpacity = useTransform(visionProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const visionTextScale = useTransform(visionProgress, [0, 1], [0.8, 1.1]); // Text scales up
  const visionTextOpacity = useTransform(visionProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const visionImageY = useTransform(visionProgress, [0, 1], ["-20%", "20%"]); // Image parallax
  const visionImageOpacity = useTransform(visionProgress, [0, 1], [0, 0.35]); // Fade in image

  // --- Section 5: Connect (CTA) ---
  const connectProgress = sectionProgress(0.78, 1.0); // Overlaps slightly
  const connectOpacity = useTransform(connectProgress, [0, 0.4], [0, 1]); // Faster fade in
  const connectScale = useTransform(connectProgress, [0, 1], [0.7, 1]); // Scale in
  const connectRotate = useTransform(connectProgress, [0, 1], [15, 0]); // Rotate in
  const connectImageOpacity = useTransform(connectProgress, [0, 1], [0, 0.3]); // Fade in background

  // --- Header ---
  const headerOpacity = useTransform(scrollYProgress, [0, 0.03], [0, 1]); // Quick fade in

  return (
    <div ref={targetRef} className={`relative bg-black text-white ${inter.className} overflow-hidden`}>
      {/* Sticky Header (Blend mode for contrast) */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] p-4 flex justify-between items-center mix-blend-difference"
        style={{ opacity: headerOpacity }}
      >
        <motion.button
          onClick={() => router.push('/')}
          className="flex items-center gap-1 text-xs text-white/80 hover:text-white"
          whileHover={{ x: -2 }}
        >
          <FiArrowLeft /> Home
        </motion.button>
        <Link href="/" className={`flex items-center gap-1 ${spaceGrotesk.className} text-base font-medium text-white`}>
          <FiGlobe className="text-teal-400" /> WISTARA
        </Link>
        <Link href="/explore" className="text-xs text-white/80 hover:text-white flex items-center gap-1">
          Explore <FiArrowRight />
        </Link>
      </motion.header>

      {/* Scrollable Content Area */}
      <div className="relative h-[500vh]">

        {/* --- Section 1: Hero --- */}
        <motion.section
          style={{ opacity: heroOpacity }}
          className="h-screen sticky top-0 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
        >
          {/* Background Image with Parallax */}
          <motion.div
            style={{ opacity: heroImageOpacity, y: heroImageY, scale: 1.1 }} // Slightly zoomed in for parallax room
            className="absolute inset-[-5%] z-0" // Inset negative to allow scaling without gaps
          >
            <Image
              src="/images/bali-pagoda-sunrise-indonesia.jpg"
              alt="Sunrise over Bali Pagoda"
              fill quality={85} priority className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </motion.div>
          {/* Text Content */}
          <motion.div style={{ y: heroTextY, scale: heroScale }} className="relative z-10">
            <h1 className={`${playfair.className} text-5xl md:text-7xl font-bold mb-3`}>
              WISTARA
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-lg mx-auto">
              Gerbang Digital Anda Menuju Kekayaan Jiwa Indonesia.
            </p>
          </motion.div>
        </motion.section>

        {/* --- Section 2: The Spark (Origin) --- */}
        <motion.section
          style={{ opacity: sparkOpacity }}
          className="h-screen sticky top-0 flex items-center justify-center text-center p-6 overflow-hidden"
        >
          {/* Background Image with Scale/Rotate */}
          <motion.div
            style={{
              opacity: sparkImageOpacity,
              scale: sparkImageScale,
              rotate: sparkImageRotate,
            }}
            className="absolute inset-0 z-0"
          >
            <Image
              src="/images/bromo.png"
              alt="Mount Bromo Landscape"
              fill quality={75} className="object-cover"
            />
             <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/30 to-black/70"></div>
          </motion.div>
          {/* Text Content Sliding */}
          <motion.div
            style={{ x: sparkTextX, opacity: sparkTextOpacity }}
            className="relative z-10 max-w-md"
          >
            <span className={`${spaceGrotesk.className} text-teal-400 text-sm block mb-2`}>2020</span>
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-semibold mb-3`}>Percikan Ide</h2>
            <p className="text-white/70">
              Berawal dari kerinduan berbagi keindahan Nusantara di tengah keterbatasan, Wistara lahir.
            </p>
          </motion.div>
        </motion.section>

        {/* --- Section 3: Building (Development) --- */}
        <motion.section
          style={{ opacity: buildOpacity }}
          className="h-screen sticky top-0 flex items-center justify-center text-center p-6 overflow-hidden"
        >
           {/* Background Image Zoom */}
           <motion.div
             style={{ opacity: buildImageOpacity, scale: buildImageScale }}
             className="absolute inset-0 z-0"
           >
            <Image
              src="/images/borobudur.jpg"
              alt="Borobudur Temple Structure"
              fill quality={75} className="object-cover"
            />
             <div className="absolute inset-0 bg-black/60"></div>
          </motion.div>
          {/* Text Content Vertical Move */}
          <motion.div style={{ y: buildTextY }} className="relative z-10 max-w-md">
             <span className={`${spaceGrotesk.className} text-teal-400 text-sm block mb-2`}>2022</span>
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-semibold mb-3`}>Membangun Jembatan</h2>
            <p className="text-white/70">
              Meluncurkan platform beta, menghadirkan destinasi virtual 360° pertama kami.
            </p>
          </motion.div>
        </motion.section>

        {/* --- Section 4: Vision --- */}
        <motion.section
          style={{ opacity: visionOpacity }}
          className="h-screen sticky top-0 flex items-center justify-center text-center p-6 overflow-hidden"
        >
           {/* Background Image Parallax */}
           <motion.div
             style={{ opacity: visionImageOpacity, y: visionImageY, scale: 1.1 }}
             className="absolute inset-[-5%] z-0"
           >
            <Image
              src="/images/bantimurung.png"
              alt="Bantimurung Waterfall Nature"
              fill quality={75} className="object-cover"
            />
             <div className="absolute inset-0 bg-black/70"></div>
          </motion.div>
          {/* Text Content Scaling */}
          <motion.div
            style={{ scale: visionTextScale, opacity: visionTextOpacity }}
            className="relative z-10 max-w-lg"
          >
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-semibold mb-4`}>Visi Masa Depan</h2>
            <p className="text-white/70">
              Menuju pengalaman imersif (VR/AR), pelestarian warisan digital, dan menghubungkan komunitas global yang peduli pada wisata berkelanjutan.
            </p>
          </motion.div>
        </motion.section>

        {/* --- Section 5: Connect (CTA) --- */}
        <motion.section
          style={{ opacity: connectOpacity }}
          className="h-screen sticky top-0 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
        >
           {/* Background Image Fade In */}
           <motion.div
             style={{ opacity: connectImageOpacity }}
             className="absolute inset-0 z-0"
           >
            <Image
              src="/images/indonesia-map.jpg"
              alt="Map of Indonesia"
              fill quality={65} className="object-cover"
            />
             <div className="absolute inset-0 bg-black/75"></div>
          </motion.div>
          {/* Content Scale/Rotate In */}
          <motion.div
            style={{ scale: connectScale, rotate: connectRotate }}
            className="relative z-10"
          >
            <h2 className={`${playfair.className} text-4xl md:text-5xl font-semibold mb-6`}>
              Mari <span className="text-teal-400">Terhubung</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Jelajahi Indonesia, bergabung dengan komunitas, atau hubungi kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Buttons can have individual entrance animations if desired, but kept simple here */}
              <motion.a
                href="/explore"
                className={`px-6 py-2.5 bg-teal-500 text-black rounded-full font-medium hover:bg-teal-400 transition-colors ${spaceGrotesk.className} text-sm flex items-center justify-center gap-2`}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              >
                <FiArrowRight /> Jelajahi Peta
              </motion.a>
              <motion.a
                href="mailto:contact@wistara.id"
                className={`px-6 py-2.5 bg-white/10 border border-white/20 rounded-full font-medium hover:bg-white/20 transition-colors ${spaceGrotesk.className} text-sm flex items-center justify-center gap-2`}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              >
                <FiMail /> Hubungi Kami
              </motion.a>
            </div>
          </motion.div>
           {/* Simple Footer integrated */}
           <div className={`absolute bottom-6 left-0 right-0 text-xs text-white/40 ${inter.className}`}>
             © {new Date().getFullYear()} Wistara.
           </div>
        </motion.section>

      </div> {/* End Scrollable Content Area */}
    </div>
  );
}
