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
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden pointer-events-none"
        style={{ perspective: "1000px" }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Left Half of the Box */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full bg-[#68482E] flex justify-end items-center shadow-2xl"
          initial={{ rotateY: 0, x: 0 }}
          animate={isOpen ? { rotateY: -15, x: "-100%" } : { rotateY: 0, x: 0 }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 1 }}
          style={{ transformOrigin: "left center" }}
        >
          {/* Gold Ribbon (Left) */}
          <motion.div 
            className="w-12 md:w-24 h-full bg-gradient-to-r from-[#b08d57] via-[#C6A36A] to-[#a88755] border-r border-[#e8d5b5]/30"
            initial={{ opacity: 1 }}
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Right Half of the Box */}
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full bg-[#68482E] flex justify-start items-center shadow-2xl"
          initial={{ rotateY: 0, x: 0 }}
          animate={isOpen ? { rotateY: 15, x: "100%" } : { rotateY: 0, x: 0 }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 1 }}
          style={{ transformOrigin: "right center" }}
        >
          {/* Gold Ribbon (Right) */}
          <motion.div 
            className="w-12 md:w-24 h-full bg-gradient-to-l from-[#b08d57] via-[#C6A36A] to-[#a88755] border-l border-[#e8d5b5]/30"
            initial={{ opacity: 1 }}
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Center Logo & Seal */}
        <motion.div
          className="absolute z-10 flex flex-col items-center justify-center text-cream bg-[#C6A36A] rounded-full w-32 h-32 md:w-40 md:h-40 shadow-[0_0_50px_rgba(198,163,106,0.4)] border border-cream/20"
          initial={{ opacity: 1, scale: 1, rotate: 0 }}
          animate={isOpen ? { opacity: 0, scale: 1.8, rotate: 15 } : { opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-serif text-xl md:text-3xl tracking-[0.2em] text-[#68482E] font-medium">LUNA</h1>
          <div className="w-8 h-px bg-[#68482E]/50 my-1"></div>
          <h1 className="font-serif text-xl md:text-3xl tracking-[0.2em] text-[#68482E] font-medium">MIA</h1>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}