"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mic, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PodcastEpisode } from '../types/podcast';
import Carousel, { Slider, SliderContainer, SliderPrevButton, SliderNextButton, SliderDotButton } from '@/components/ui/carousel';

interface PodcastCarouselProps {
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

export default function PodcastCarousel({ episodes }: PodcastCarouselProps) {
  const t = useTranslations();

  return (
    <section id="podcasts" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <motion.div
                className="flex items-center justify-center w-16 h-16 glass rounded-full"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Mic className="w-8 h-8 text-blue-400" />
              </motion.div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="creative-text">{t('podcasts.title')}</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('podcasts.description')}
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div variants={fadeInUp}>
            <Carousel 
              options={{ 
                align: 'start',
                slidesToScroll: 1,
                breakpoints: {
                  '(min-width: 768px)': { slidesToScroll: 2 },
                  '(min-width: 1024px)': { slidesToScroll: 3 }
                }
              }}
              className="relative"
            >
              <SliderContainer className="mb-8">
                {episodes.map((episode, index) => (
                  <Slider key={episode.id} className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] mr-6">
                    <PodcastCard episode={episode} index={index} />
                  </Slider>
                ))}
              </SliderContainer>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-6">
                <SliderPrevButton className="group flex items-center justify-center w-12 h-12 glass rounded-full hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100">
                  <ChevronLeft className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
                </SliderPrevButton>

                <SliderDotButton className="flex items-center gap-3" />

                <SliderNextButton className="group flex items-center justify-center w-12 h-12 glass rounded-full hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100">
                  <ChevronRight className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
                </SliderNextButton>
              </div>
            </Carousel>
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
      className="group relative h-full"
    >
      <motion.div
        className="glass rounded-2xl p-4 h-full transition-all duration-300 group-hover:scale-[1.02]"
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