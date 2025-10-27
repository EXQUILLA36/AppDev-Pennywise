import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundCircle() {
      const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, -400]);

  return (
    <div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden h-[100vw]">
        <motion.div
          initial={{ opacity: 0.2, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute top-30 -right-90 w-[90vw] aspect-square bg-[#1D1D1D] rounded-full z-0"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0.2, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-70 -right-40 w-[70vw] aspect-square bg-[#1A1A1A] rounded-full z-0"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0.6, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute top-150 right-30 w-[40vw] aspect-square bg-[#191818] rounded-full z-0"
        ></motion.div>

        <motion.div
          style={{ opacity, y }}
          initial={{ opacity: 0.9, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute w-[8vw] top-[8vw] right-[50vw] aspect-square bg-[#191919] rounded-full shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] z-0"
        ></motion.div>
        <motion.div
          style={{ opacity, y }}
          initial={{ opacity: 0.8, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute w-[10vw] top-[30vw] left-[30vw] aspect-square bg-[#191919] rounded-full shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] z-0"
        ></motion.div>
        <motion.div
          style={{ opacity, y }}
          initial={{ opacity: 0.8, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute w-[5vw] top-[43vw] right-[2vw] aspect-square bg-[#191919] rounded-full shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] z-0"
        ></motion.div>
      </div>
    </div>
  );
}
