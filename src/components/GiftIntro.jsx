import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftIntro({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Wait 2 seconds so the user can admire the 3D box
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    // Finish after the lid opens and fades
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-[#E6D8C8]"
        initial={{ opacity: 1 }}
        animate={isOpen ? { opacity: 0, filter: "blur(10px)" } : { opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
      >
        {/* Background Texture (Cream linen feel) */}
        <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} />

        {/* 3D Gift Box Container */}
        <motion.div
          className="relative w-64 h-64 md:w-80 md:h-80"
          style={{ perspective: "1000px" }}
          animate={isOpen ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* THE BOX BASE */}
          <div 
            className="absolute bottom-0 w-full h-48 md:h-60 bg-[#68482E] rounded-sm shadow-2xl"
            style={{
              boxShadow: "inset 0 -20px 40px rgba(0,0,0,0.5), 0 30px 40px rgba(0,0,0,0.3)",
              background: "linear-gradient(135deg, #7a5738 0%, #4a3220 100%)"
            }}
          >
            {/* Ribbon wrapping around the box (Vertical) */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 md:w-12 bg-gradient-to-r from-[#b08d57] via-[#C6A36A] to-[#a88755] shadow-lg opacity-90" />
            {/* Ribbon wrapping around the box (Horizontal) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-8 md:h-12 bg-gradient-to-b from-[#b08d57] via-[#C6A36A] to-[#a88755] shadow-lg opacity-90" />
          </div>

          {/* THE LID */}
          <motion.div
            className="absolute top-10 w-[110%] -left-[5%] h-16 md:h-20 bg-[#68482E] rounded-sm z-10 shadow-xl"
            style={{
              background: "linear-gradient(135deg, #7a5738 0%, #4a3220 100%)",
              boxShadow: "inset 0 5px 10px rgba(255,255,255,0.1), 0 10px 20px rgba(0,0,0,0.4)"
            }}
            animate={isOpen ? { y: -200, rotateZ: -10, opacity: 0 } : { y: 0, rotateZ: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Lid Ribbon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 md:w-12 h-full bg-gradient-to-r from-[#b08d57] via-[#C6A36A] to-[#a88755] opacity-90" />
            </div>
          </motion.div>

          {/* THE RIBBON BOW (Floating on top of the lid) */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex justify-center items-center w-32 h-20"
            animate={isOpen ? { y: -200, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Left Loop */}
            <div className="absolute w-14 h-10 bg-gradient-to-tr from-[#8c6c3e] via-[#C6A36A] to-[#f4e4c1] rounded-[100%] rotate-[-20deg] shadow-lg border border-[#a88755]/50" />
            {/* Right Loop */}
            <div className="absolute w-14 h-10 bg-gradient-to-tl from-[#8c6c3e] via-[#C6A36A] to-[#f4e4c1] rounded-[100%] rotate-[20deg] shadow-lg border border-[#a88755]/50" />
            {/* Center Knot */}
            <div className="absolute w-6 h-8 bg-gradient-to-b from-[#C6A36A] to-[#8c6c3e] rounded-md z-30 shadow-inner" />
            
            {/* Ribbon Tails Hanging Down */}
            <div className="absolute top-6 left-2 w-4 h-16 bg-gradient-to-b from-[#C6A36A] to-[#8c6c3e] rotate-[15deg] rounded-b-sm shadow-md" />
            <div className="absolute top-6 right-2 w-4 h-16 bg-gradient-to-b from-[#C6A36A] to-[#8c6c3e] rotate-[-15deg] rounded-b-sm shadow-md" />
          </motion.div>
        </motion.div>

        {/* Minimalist Logo below the box */}
        <motion.div 
          className="absolute bottom-20 text-center"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-2xl md:text-3xl tracking-[0.4em] text-[#68482E] mb-2 font-medium ml-2">LUNA MIA</h1>
          <p className="text-[#C6A36A] text-[10px] tracking-[0.3em] uppercase">A Little Luxury</p>
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
}