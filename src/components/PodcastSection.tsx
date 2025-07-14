"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SiSpotify } from 'react-icons/si';
import { Mic } from 'lucide-react';

interface PodcastEpisode {
  title: string;
  image: string;
  url: string;
  podcastName: string;
}

const podcastEpisodes: PodcastEpisode[] = [
  {
    title: 'Building Microservices: dos livros à prática – Entre Chaves #167',
    image: '/ms.png',
    url: 'https://open.spotify.com/episode/4GPvd8VeSGSDuJquy6fNPm?si=71724bffd0884b1a',
    podcastName: 'Entre Chaves'
  },
  {
    title: '#171 - Planejamento sem ação é estagnação',
    image: '/planejamento.jpeg',
    url: 'https://open.spotify.com/episode/1rXPQ6ZoI3qrIbD4A2vUJv?si=b9abe88372ce4341',
    podcastName: 'os agilistas'
  },
  {
    title: 'Clean Architecture: dos livros à prática – Entre Chaves #179',
    image: '/clean.png',
    url: 'https://open.spotify.com/episode/6Nj3KlF2z5V5n1I3pLpywE?si=c21ee2cff1fb447b',
    podcastName: 'Entre Chaves'
  },
  {
    title: 'ENZIMAS #200 - Os riscos e desafios da falta de privacidade digital',
    image: '/riscosprivacidade.jpeg',
    url: 'https://open.spotify.com/episode/1PEiHaxf11zlf4MPEwMePz?si=1dde1faf5e354288',
    podcastName: 'os agilistas'
  },
  {
    title: 'Apache Kafka: um olhar profundo sobre a tecnologia de streaming – Entre Chaves #173',
    image: '/kafka.png',
    url: 'https://open.spotify.com/episode/11l0xTs7300mAT875Vm5CM?si=12b7f28cd16145cb',
    podcastName: 'Entre Chaves'
  },
  {
    title: '#215 - Tendências em tecnologia: novos caminhos para o desenvolvimento de software',
    image: '/tendencias.jpeg',
    url: 'https://open.spotify.com/episode/1K9Z3dMOsCvLjHoNvWEvcQ?si=d767a0f9ddbe4d2a',
    podcastName: 'os agilistas'
  },
  {
    title: 'Estratégias de DDD para tornar a arquitetura mais limpa – Entre Chaves #181',
    image: '/ddd.png',
    url: 'https://open.spotify.com/episode/2Bq6Of15RCYUrGT0VdyzrS?si=f376b5cbc9254759',
    podcastName: 'Entre Chaves'
  },
  {
    title: '#14 - O mundo mudou, bem vindo a LGPD',
    image: '/lgpd.jpeg',
    url: 'https://open.spotify.com/episode/0BRh6CD4EkjMyG1fV6iK2F?si=1c5594aada35404e',
    podcastName: 'Entre Chaves'
  },
  {
    title: 'SRE: técnicas para aumentar a confiabilidade da sua aplicação – Entre Chaves #164',
    image: '/sre.png',
    url: 'https://open.spotify.com/episode/6YqOGmqatuRRelTpBs8FyM?si=6b7596212aee4320',
    podcastName: 'Entre Chaves'
  },
  {
    title: '#165 - Um por todos e todos pelo produto, com Product Guru\'s',
    image: '/produto.jpeg',
    url: 'https://open.spotify.com/episode/4EuM9w4r7SMS3Uz2zNkj4y?si=0a60d50f69fa4e8a',
    podcastName: 'os agilistas'
  },
  {
    title: 'OpenTelemetry: uma revolução na observabilidade – Entre Chaves #171',
    image: '/open.png',
    url: 'https://open.spotify.com/episode/7mszNxKgO6suP8DoWWvUSb?si=9eecf888b02a45b4',
    podcastName: 'Entre Chaves'
  },
  {
    title: 'GPT em Chatbots: uma revolução na comunicação inteligente – Entre Cases #20',
    image: '/chatbots.png',
    url: 'https://open.spotify.com/episode/5qLKkWQULsPmNKMQjI98B9?si=1308baa69a174a9d',
    podcastName: 'Entre Cases'
  },
  {
    title: 'Dicas práticas para aumentar a produtividade usando o GitHub Copilot – Entre Chaves #184',
    image: '/ec.png',
    url: 'https://open.spotify.com/episode/1jddVtYxTc0NHkQ60a0P2U?si=ab0c3389afc94940',
    podcastName: 'Entre Chaves'
  },
  {
    title: 'O papel da operação na eficiência dos times de desenvolvimento – Entre Chaves #177',
    image: '/ops.png',
    url: 'https://open.spotify.com/episode/1W9WTWZW2qZA5hUoAxz3Xv?si=8b1ee5af9f5d4526',
    podcastName: 'Entre Chaves'
  },
  {
    title: 'Como fazer testes unitários em minutos com o TestMaster – Entre Chaves #185',
    image: '/testmaster.png',
    url: 'https://open.spotify.com/episode/74ig7MrzEMKDH20IRQkBwm?si=d5dcdf2bd575459a',
    podcastName: 'Entre Chaves'
  }
];

export default function PodcastSection() {
  const t = useTranslations('podcasts');
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <section id="podcasts" className="py-20 px-4 md:px-8 relative" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto">
          {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="section-icon-container">
              <div className="section-icon-glow"></div>
              <motion.div
                className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full shadow-2xl relative z-10"
              >
                <Mic className="w-8 h-8 text-white" />
              </motion.div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
            </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="w-full overflow-hidden relative">
          {/* Left fade gradient */}
          <div className="absolute top-0 left-0 w-16 md:w-24 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
          
          {/* Right fade gradient */}
          <div className="absolute top-0 right-0 w-16 md:w-24 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
          
          <motion.div 
            ref={carousel}
            drag="x"
            whileDrag={{ scale: 0.95 }}
            dragElastic={0.2}
            dragConstraints={{ right: 0, left: -width }}
            dragTransition={{ bounceDamping: 30 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex will-change-transform cursor-grab active:cursor-grabbing"
          >
            {podcastEpisodes.map((episode, index) => (
              <motion.div 
                key={index}
                className="min-w-[20rem] md:min-w-[24rem] min-h-[32rem] md:min-h-[36rem] p-2 md:p-3"
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="podcast-card-wrapper h-full">
                  <div className="podcast-card rounded-2xl overflow-hidden h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden flex-shrink-0">
                      <img
                        src={episode.image}
                        alt={episode.title}
                        className="w-full h-full object-contain pointer-events-none transition-transform duration-500 hover:scale-105"
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                        <motion.a
                          href={episode.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg"
                          onClick={(e) => e.stopPropagation()} // Prevent drag when clicking play button
                        >
                          <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </motion.a>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="podcast-card-content p-4 md:p-6 flex-1 flex flex-col">
                      <div className="mb-2">
                        <span className="text-sm text-gray-400 font-medium">{episode.podcastName}</span>
                      </div>
                      
                      <h3 className="text-lg md:text-xl font-bold text-white mb-4 leading-tight flex-1">
                        {episode.title}
                      </h3>

                      {/* Listen Button */}
                      <motion.a
                        href={episode.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="podcast-listen-button inline-flex items-center gap-3 w-full justify-center px-4 md:px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base mt-auto"
                        whileHover={{ y: -2, scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => e.stopPropagation()} // Prevent drag when clicking button
                      >
                        <SiSpotify className="w-4 h-4 md:w-5 md:h-5" />
                        {t('listenOnSpotify')}
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            <span className="hidden md:inline">← Arraste para navegar →</span>
            <span className="md:hidden">← {t('swipeToNavigate') || 'Deslize para navegar'} →</span>
          </p>
        </div>
      </div>
    </section>
  );
} 