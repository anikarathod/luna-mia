import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftIntro({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, #68482E 0%, #2A1B12 100%)",
        }}
        initial={{ opacity: 1 }}
        animate={isOpen ? { opacity: 0, scale: 1.05, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-paper.png')" }} />

        {/* REALISTIC SILK RIBBON */}
        <motion.div
          className="absolute top-0 w-16 md:w-24 h-full"
          style={{
            // 5-stop gradient to simulate light hitting the folds of the silk
            background: "linear-gradient(90deg, #4a3220 0%, #8c6c3e 15%, #C6A36A 35%, #f4e4c1 50%, #C6A36A 65%, #8c6c3e 85%, #4a3220 100%)",
            boxShadow: "0 0 50px rgba(0,0,0,0.8), inset 0 0 15px rgba(0,0,0,0.4)",
            borderLeft: "1px solid rgba(255,255,255,0.05)",
            borderRight: "1px solid rgba(255,255,255,0.05)"
          }}
          initial={{ opacity: 1 }}
          animate={isOpen ? { opacity: 0, scaleY: 1.2 } : { opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
        />

        {/* GOLD WAX SEAL */}
        <motion.div
          className="relative z-10 flex items-center justify-center w-48 h-48 md:w-64 md:h-64"
          initial={{ opacity: 1, scale: 1 }}
          animate={isOpen ? { opacity: 0, scale: 1.5 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Spinning Outer Ring */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-dashed border-[#C6A36A]/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />

          {/* Metallic Gold Seal */}
          <div
            className="relative z-10 flex flex-col items-center justify-center rounded-full w-40 h-40 md:w-56 md:h-56"
            style={{
              background: "radial-gradient(circle at 35% 35%, #fdf0d5 0%, #C6A36A 40%, #8c6c3e 100%)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.5)"
            }}
          >
            <h1 className="font-serif text-2xl md:text-4xl tracking-[0.25em] text-[#2A1B12] font-medium ml-2 drop-shadow-sm">LUNA</h1>
            <div className="w-12 h-px bg-[#2A1B12]/30 my-2 md:my-3"></div>
            <h1 className="font-serif text-2xl md:text-4xl tracking-[0.25em] text-[#2A1B12] font-medium ml-2 drop-shadow-sm">MIA</h1>
            
            {/* Inner embossed ring */}
            <div className="absolute inset-2 md:inset-3 rounded-full border border-[#2A1B12]/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)]" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}