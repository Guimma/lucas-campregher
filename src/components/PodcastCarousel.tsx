"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PodcastEpisode {
  id: string;
  embedUrl: string;
}

const podcastEpisodes: PodcastEpisode[] = [
  {
    id: "copilot-184",
    embedUrl: "https://open.spotify.com/embed/episode/1jddVtYxTc0NHkQ60a0P2U?utm_source=generator&theme=0"
  },
  {
    id: "ddd-181",
    embedUrl: "https://open.spotify.com/embed/episode/2Bq6Of15RCYUrGT0VdyzrS?utm_source=generator&theme=0"
  },
  {
    id: "clean-179",
    embedUrl: "https://open.spotify.com/embed/episode/6Nj3KlF2z5V5n1I3pLpywE?utm_source=generator&theme=0"
  },
  {
    id: "ops-177",
    embedUrl: "https://open.spotify.com/embed/episode/1W9WTWZW2qZA5hUoAxz3Xv?utm_source=generator&theme=0"
  },
  {
    id: "opentelemetry-171",
    embedUrl: "https://open.spotify.com/embed/episode/7mszNxKgO6suP8DoWWvUSb?utm_source=generator&theme=0"
  },
  {
    id: "microservices-167",
    embedUrl: "https://open.spotify.com/embed/episode/4GPvd8VeSGSDuJquy6fNPm?utm_source=generator&theme=0"
  },
  {
    id: "sre-164",
    embedUrl: "https://open.spotify.com/embed/episode/6YqOGmqatuRRelTpBs8FyM?utm_source=generator&theme=0"
  },
  {
    id: "chatbots-20",
    embedUrl: "https://open.spotify.com/embed/episode/5qLKkWQULsPmNKMQjI98B9?utm_source=generator&theme=0"
  },
  {
    id: "kafka-173",
    embedUrl: "https://open.spotify.com/embed/episode/11l0xTs7300mAT875Vm5CM?utm_source=generator&theme=0"
  }
];

export default function PodcastCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === podcastEpisodes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? podcastEpisodes.length - 1 : prevIndex - 1
    );
  };

  const getEpisodeIndex = (offset: number) => {
    const index = (currentIndex + offset + podcastEpisodes.length) % podcastEpisodes.length;
    return index;
  };

  // Animation variants for fade
  const fadeVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Carousel Container */}
      <div className="relative flex items-center justify-center h-[420px] w-full">
        {/* Previous Episode (Left) */}
        <motion.div
          className="absolute left-1/2 -translate-x-[calc(100%+60px)] w-[500px] h-[320px] opacity-30 scale-95 hidden md:block"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass p-4 rounded-2xl border border-white/10 w-full h-full flex items-center justify-center">
            <iframe 
              style={{borderRadius: '16px'}} 
              src={podcastEpisodes[getEpisodeIndex(-1)].embedUrl}
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Current Episode (Center) with fade animation */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            className="relative z-10 w-[700px] h-[400px]"
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="glass p-6 rounded-2xl border border-white/10 w-full h-full flex items-center justify-center">
              <iframe 
                style={{borderRadius: '18px'}} 
                src={podcastEpisodes[currentIndex].embedUrl}
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next Episode (Right) */}
        <motion.div
          className="absolute right-1/2 translate-x-[calc(100%+60px)] w-[500px] h-[320px] opacity-30 scale-95 hidden md:block"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass p-4 rounded-2xl border border-white/10 w-full h-full flex items-center justify-center">
            <iframe 
              style={{borderRadius: '16px'}} 
              src={podcastEpisodes[getEpisodeIndex(1)].embedUrl}
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-32 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-all border border-white/10 shadow-md z-20"
          aria-label="Previous episode"
        >
          <ChevronLeft size={28} className="text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-32 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-all border border-white/10 shadow-md z-20"
          aria-label="Next episode"
        >
          <ChevronRight size={28} className="text-white" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {podcastEpisodes.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            aria-label={`Go to episode ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 