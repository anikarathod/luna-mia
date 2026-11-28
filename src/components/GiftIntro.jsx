import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftIntro({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Start opening after 1.2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    // Finish completely after 2.4 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden pointer-events-none"
        // Rich chocolate gradient background with a spotlight effect
        style={{
          background: "radial-gradient(circle at center, #68482E 0%, #3A2617 100%)",
        }}
        initial={{ opacity: 1 }}
        animate={isOpen ? { opacity: 0, scale: 1.05, filter: "blur(8px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Subtle background texture overlay for a premium paper feel */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-paper.png')" }} />

        {/* The Silk Ribbon */}
        <motion.div
          className="absolute top-0 w-16 md:w-24 h-full shadow-2xl"
          style={{
            // Realistic silk gradient
            background: "linear-gradient(90deg, #8c6c3e 0%, #C6A36A 25%, #e8d5b5 50%, #C6A36A 75%, #8c6c3e 100%)",
            boxShadow: "0 0 40px rgba(0,0,0,0.6)"
          }}
          initial={{ opacity: 1 }}
          animate={isOpen ? { opacity: 0, scaleY: 1.2 } : { opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
        />

        {/* Glowing Golden Seal */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center rounded-full w-44 h-44 md:w-64 md:h-64 border border-[#e8d5b5]/30"
          style={{
            // Metallic gold gradient
            background: "radial-gradient(circle at 30% 30%, #f4e4c1 0%, #C6A36A 40%, #8c6c3e 100%)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6), inset 0 0 20px rgba(255,255,255,0.3)"
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={isOpen ? { opacity: 0, scale: 1.5 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="font-serif text-3xl md:text-5xl tracking-[0.3em] text-[#3A2617] font-medium ml-2 drop-shadow-sm">LUNA</h1>
          <div className="w-16 h-px bg-[#3A2617]/20 my-2 md:my-4"></div>
          <h1 className="font-serif text-3xl md:text-5xl tracking-[0.3em] text-[#3A2617] font-medium ml-2 drop-shadow-sm">MIA</h1>
          
          {/* Inner border ring for extra detail */}
          <div className="absolute inset-2 md:inset-3 rounded-full border border-[#3A2617]/10" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}