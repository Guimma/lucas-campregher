"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PodcastEpisode } from '../types/podcast';

interface PodcastSectionProps {
  episodes: PodcastEpisode[];
}

// Animation variants matching your site's style
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function PodcastSection({ episodes }: PodcastSectionProps) {
  const t = useTranslations();

  return (
    <section id="podcasts" className="py-20 relative" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="section-icon-container">
                <div className="section-icon-glow"></div>
                <motion.div
                  className="flex items-center justify-center w-16 h-16 glass rounded-full"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mic className="w-8 h-8 text-blue-400" />
                </motion.div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">{t('podcasts.title')}</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('podcasts.description')}
            </p>
          </motion.div>

          {/* Episodes Grid */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {episodes.map((episode, index) => (
              <PodcastCard key={episode.id} episode={episode} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface PodcastCardProps {
  episode: PodcastEpisode;
  index: number;
}

function PodcastCard({ episode, index }: PodcastCardProps) {
  const cardVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group relative"
    >
      <motion.div
        className="glass rounded-2xl p-4 transition-all duration-300 group-hover:scale-[1.02]"
        whileHover={{ 
          boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)" 
        }}
      >
        {/* Spotify Embed */}
        <div className="relative rounded-xl overflow-hidden">
          <iframe
            src={episode.embedUrl}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
          />
          
          {/* Elegant overlay gradient for glass effect */}
          <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-t from-transparent via-transparent to-blue-500/5" />
        </div>
      </motion.div>
    </motion.div>
  );
} 