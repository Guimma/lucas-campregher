"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SiSpotify } from 'react-icons/si';

interface PodcastEpisode {
  title: string;
  image: string;
  url: string;
  podcastName: string;
}

const podcastEpisodes: PodcastEpisode[] = [
  {
    title: 'Como fazer testes unitários em minutos com o TestMaster – Entre Chaves #185',
    image: '/testmaster.png',
    url: 'https://www.dtidigital.com.br/entrechaves/como-fazer-testes-unitarios-em-minutos-com-o-testmaster-entre-chaves-185',
    podcastName: 'Entre Chaves'
  },
  {
    title: 'Dicas práticas para aumentar a produtividade usando o GitHub Copilot – Entre Chaves #184',
    image: '/ec.png',
    url: 'https://www.dtidigital.com.br/entrechaves/dicas-praticas-para-aumentar-a-produtividade-usando-o-github-copilot-entre-chaves-184',
    podcastName: 'Entre Chaves'
  },
  {
    title: 'Estratégias de DDD para tornar a arquitetura mais limpa – Entre Chaves #181',
    image: '/ddd.png',
    url: 'https://www.dtidigital.com.br/entrechaves/estrategias-de-ddd-para-tornar-a-arquitetura-mais-limpa-entre-chaves-181',
    podcastName: 'Entre Chaves'
  },
  {
    title: 'Clean Architecture: dos livros à prática – Entre Chaves #179',
    image: '/clean.png',
    url: 'https://www.dtidigital.com.br/entrechaves/clean-architecture-dos-livros-a-pratica-entre-chaves-179',
    podcastName: 'Entre Chaves'
  },
  {
    title: 'O papel da operação na eficiência dos times de desenvolvimento – Entre Chaves #177',
    image: '/ops.png',
    url: 'https://www.dtidigital.com.br/entrechaves/o-papel-da-operacao-na-eficiencia-dos-times-de-desenvolvimento-entre-chaves-177',
    podcastName: 'Entre Chaves'
  },
  {
    title: 'OpenTelemetry: uma revolução na observabilidade – Entre Chaves #171',
    image: '/open.png',
    url: 'https://www.dtidigital.com.br/entrechaves/opentelemetry-uma-revolucao-na-observabilidade-entre-chaves-171',
    podcastName: 'Entre Chaves'
  },
  {
    title: 'Building Microservices: dos livros à prática – Entre Chaves #167',
    image: '/ms.png',
    url: 'https://www.dtidigital.com.br/entrechaves/building-microservices-dos-livros-a-pratica-entre-chaves-167',
    podcastName: 'Entre Chaves'
  },
  {
    title: 'SRE: técnicas para aumentar a confiabilidade da sua aplicação – Entre Chaves #164',
    image: '/sre.png',
    url: 'https://www.dtidigital.com.br/entrechaves/sre-tecnicas-para-aumentar-a-confiabilidade-da-sua-aplicacao-entre-chaves-164',
    podcastName: 'Entre Chaves'
  },
  {
    title: 'GPT em Chatbots: uma revolução na comunicação inteligente – Entre Cases #20',
    image: '/chatbots.png',
    url: 'https://www.dtidigital.com.br/entrechaves/gpt-em-chatbots-uma-revolucao-na-comunicacao-inteligente-entre-cases-20',
    podcastName: 'Entre Cases'
  },
  {
    title: 'Apache Kafka: um olhar profundo sobre a tecnologia de streaming – Entre Chaves #173',
    image: '/kafka.png',
    url: 'https://www.dtidigital.com.br/entrechaves/apache-kafka-um-olhar-profundo-sobre-a-tecnologia-de-streaming-entre-chaves-173',
    podcastName: 'Entre Chaves'
  },
  {
    title: 'Ouça mais episódios do Entre Chaves!',
    image: '/ec.jpg',
    url: 'https://www.dtidigital.com.br/entrechaves',
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
                <div className="glass rounded-2xl overflow-hidden h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden flex-shrink-0">
                    <img
                      src={episode.image}
                      alt={episode.title}
                      className="w-full h-full object-contain pointer-events-none transition-transform duration-500 hover:scale-105"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg"
                      >
                        <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </motion.div>
                    </div>


                  </div>

                                      {/* Content */}
                    <div className="p-4 md:p-6 flex-1 flex flex-col">
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
                        className="podcast-button inline-flex items-center gap-3 w-full justify-center px-4 md:px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base mt-auto"
                        whileHover={{ y: -2, scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => e.stopPropagation()} // Prevent drag when clicking button
                      >
                        <SiSpotify className="w-4 h-4 md:w-5 md:h-5" />
                        {t('listenOnSpotify')}
                      </motion.a>
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