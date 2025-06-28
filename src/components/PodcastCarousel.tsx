"use client";

import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import Carousel, {
  Slider,
  SliderContainer,
  SliderDotButton,
  SliderNextButton,
  SliderPrevButton,
} from '@/components/ui/carousel';
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
  const OPTIONS: EmblaOptionsType = { 
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
  };

  return (
    <div className='bg-transparent p-4'>
      <Carousel options={OPTIONS}>
        <SliderContainer>
          {podcastEpisodes.map((episode) => (
            <Slider key={episode.id} className='sm:w-[55%] w-[90%]'>
              <div className='glass rounded-2xl border border-white/10 h-[420px] sm:h-[400px] 2xl:h-[450px] p-4'>
                <iframe
                  style={{ borderRadius: 18 }}
                  src={episode.embedUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </Slider>
          ))}
        </SliderContainer>
        
        <SliderPrevButton className='absolute top-[50%] p-2 border-2 rounded-full left-4 bg-white/25 dark:bg-black/25 dark:border-white backdrop-blur-sm text-white disabled:opacity-20 hover:bg-white/35 dark:hover:bg-black/35 transition-all'>
          <ChevronLeft className='w-8 h-8' />
        </SliderPrevButton>
        
        <SliderNextButton className='absolute right-4 p-2 border-2 rounded-full top-[50%] bg-white/25 dark:bg-black/25 dark:border-white backdrop-blur-sm text-white disabled:opacity-20 hover:bg-white/35 dark:hover:bg-black/35 transition-all'>
          <ChevronRight className='w-8 h-8' />
        </SliderNextButton>
        
        <div className='flex justify-center py-4'>
          <SliderDotButton />
        </div>
      </Carousel>
    </div>
  );
} 