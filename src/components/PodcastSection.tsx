"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SiSpotify } from 'react-icons/si';
import { Mic, Play, Users, TrendingUp } from 'lucide-react';

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

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    // Extract number from value string (e.g., "+100" -> 100, "+20.000" -> 20000)
    const numberMatch = value.match(/[\d.,]+/);
    if (!numberMatch) return;

    const targetNumber = parseInt(numberMatch[0].replace(/[.,]/g, ''));
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * targetNumber);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  // Format the count based on original value format
  const formatCount = (num: number) => {
    if (value.includes('.')) {
      return num.toLocaleString('pt-BR');
    }
    return num.toString();
  };

  const prefix = value.match(/^\+/) ? '+' : '';
  
  return (
    <div ref={countRef} className="tabular-nums">
      {prefix}{formatCount(count)}
    </div>
  );
};

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
          
          {/* Impact Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
            {/* Episodes as Host */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-white/8 backdrop-blur-md border border-white/15 rounded-3xl p-8 md:p-10 shadow-2xl transform group-hover:scale-105 group-hover:bg-white/12 transition-all duration-500 podcast-stats-card stats-card-hover-effect">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 stats-icon-glow stats-icon-purple">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </div>
                
                {/* Counter */}
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 leading-none stats-number">
                  <AnimatedCounter value={t('stats.episodes')} duration={2.5} />
                </div>
                
                {/* Label */}
                <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed">
                  {t('stats.episodesLabel')}
                </p>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-pulse stats-particle"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-1000 stats-particle"></div>
                <div className="absolute top-1/2 left-2 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-500 stats-particle"></div>
              </div>
            </motion.div>

            {/* Streamings */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-white/8 backdrop-blur-md border border-white/15 rounded-3xl p-8 md:p-10 shadow-2xl transform group-hover:scale-105 group-hover:bg-white/12 transition-all duration-500 podcast-stats-card stats-card-hover-effect">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 stats-icon-glow stats-icon-blue">
                    <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </div>
                
                {/* Counter */}
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 leading-none stats-number">
                  <AnimatedCounter value={t('stats.appearances')} duration={3} />
                </div>
                
                {/* Label */}
                <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed">
                  {t('stats.appearancesLabel')}
                </p>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500 stats-particle"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-1500 stats-particle"></div>
                <div className="absolute top-1/2 left-2 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-700 stats-particle"></div>
              </div>
            </motion.div>

            {/* Developers Impacted */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-white/8 backdrop-blur-md border border-white/15 rounded-3xl p-8 md:p-10 shadow-2xl transform group-hover:scale-105 group-hover:bg-white/12 transition-all duration-500 podcast-stats-card stats-card-hover-effect">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 stats-icon-glow stats-icon-orange">
                    <Users className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </div>
                
                {/* Counter */}
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 leading-none stats-number">
                  <AnimatedCounter value={t('stats.reach')} duration={2.8} />
                </div>
                
                {/* Label */}
                <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed">
                  {t('stats.reachLabel')}
                </p>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-700 stats-particle"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-1200 stats-particle"></div>
                <div className="absolute top-1/2 left-2 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-900 stats-particle"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="w-full overflow-hidden relative py-12">
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
            style={{ paddingTop: '24px', paddingBottom: '24px' }}
          >
            {podcastEpisodes.map((episode, index) => (
              <motion.div 
                key={index}
                className="min-w-[20rem] md:min-w-[24rem] min-h-[32rem] md:min-h-[36rem]"
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                style={{ margin: '0 12px', padding: '8px' }}
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