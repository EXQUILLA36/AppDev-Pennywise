import React from 'react'
import { motion } from "framer-motion";

export default function BackgroundClouds() {
    const clouds = [
        { src: "./images/login-images/cloud3.png", opacity: 0.8, duration: 0.6 },
        { src: "./images/login-images/cloud2.png", opacity: 0.4, duration: 0.5 },
        { src: "./images/login-images/cloud1.png", opacity: 0.2, duration: 0.3 },
    ];
  return (
    <div className='overflow-hidden z-0'>
    {/* LEFT SIDE CLOUDS */}
        {clouds.map((c, i) => (
        <motion.img
            key={`left-${i}`}
            src={c.src}
            alt=""
            className="absolute bottom-0 left-0"
            initial={{ opacity: c.opacity, y: 30 }} // start below
            animate={{ opacity: 1, y: 0 }}          // move up into place
            transition={{ duration: c.duration }}
        />
        ))}

        {/* RIGHT SIDE CLOUDS (mirrored) */}
        {clouds.map((c, i) => (
        <motion.img
            key={`right-${i}`}
            src={c.src}
            alt=""
            className="absolute bottom-0 right-0"
            initial={{ opacity: c.opacity, y: 30, scaleX: -1 }} // start below
            animate={{ opacity: 1, y: 0, scaleX: -1 }}         // move up and flip
            transition={{ duration: c.duration }}
        />
        ))}
    </div>
  )
}
