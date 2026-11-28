import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftIntro({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 1. Wait 2.5 seconds, then trigger the exit animation
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2500);

    // 2. Tell the main website to show up after the animation finishes
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4200);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden pointer-events-none bg-[#68482E]"
        initial={{ opacity: 1, scale: 1 }}
        animate={isOpen ? { opacity: 0, scale: 1.1, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Vertical Gold Ribbon Background */}
        <motion.div
          className="absolute top-0 w-12 md:w-24 h-full bg-gradient-to-b from-[#b08d57] via-[#C6A36A] to-[#a88755] opacity-90"
          initial={{ opacity: 0.9 }}
          animate={isOpen ? { opacity: 0, scaleY: 1.5 } : { opacity: 0.9, scaleY: 1 }}
          transition={{ duration: 1.2, ease: "easeIn" }}
        />

        {/* Center Wax Seal / Logo */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-[#68482E] bg-[#C6A36A] rounded-full w-40 h-40 md:w-56 md:h-56 shadow-[0_0_60px_rgba(198,163,106,0.3)] border border-cream/20"
          initial={{ opacity: 1, scale: 1 }}
          animate={isOpen ? { opacity: 0, scale: 1.5 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="font-serif text-2xl md:text-4xl tracking-[0.25em] font-medium ml-2">LUNA</h1>
          <div className="w-12 h-px bg-[#68482E]/40 my-2 md:my-3"></div>
          <h1 className="font-serif text-2xl md:text-4xl tracking-[0.25em] font-medium ml-2">MIA</h1>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}