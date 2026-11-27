import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftIntro({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Automatically start the animation after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    // When the animation finishes, tell the main website to show up
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden pointer-events-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Left Half of the Box */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full bg-[#68482E] flex justify-end items-center"
          initial={{ x: 0 }}
          animate={isOpen ? { x: "-100%" } : { x: 0 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
        >
          {/* Gold Ribbon on Left */}
          <motion.div 
            className="w-8 md:w-16 h-full bg-[#C6A36A]"
            initial={{ opacity: 1 }}
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Right Half of the Box */}
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full bg-[#68482E] flex justify-start items-center"
          initial={{ x: 0 }}
          animate={isOpen ? { x: "100%" } : { x: 0 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
        >
          {/* Gold Ribbon on Right */}
          <motion.div 
            className="w-8 md:w-16 h-full bg-[#C6A36A]"
            initial={{ opacity: 1 }}
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Center Seal / Logo */}
        <motion.div
          className="absolute z-10 flex flex-col items-center justify-center text-cream"
          initial={{ opacity: 1, scale: 1 }}
          animate={isOpen ? { opacity: 0, scale: 1.5 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-3xl md:text-5xl tracking-[0.3em] mb-2">LUNA MIA</h1>
          <div className="w-12 h-px bg-[#C6A36A]"></div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}