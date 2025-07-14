"use client";

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import Image from 'next/image';

const languages = [
  { code: 'en', flag: '/en-us.png', name: 'English' },
  { code: 'pt', flag: '/pt-br.png', name: 'Português' }
];

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const changeLanguage = (newLocale: string) => {
    router.push(`/${newLocale}`);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === locale);

  if (!isMounted) {
    return (
      <div className="w-10 h-10 glass rounded-full flex items-center justify-center opacity-50">
        <Globe size={18} className="text-gray-400" />
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-150 relative overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Current: ${currentLanguage?.name}`}
      >
        {currentLanguage?.flag ? (
          <Image 
            src={currentLanguage.flag} 
            alt={currentLanguage.name}
            width={24}
            height={24}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              // Fallback se a imagem não carregar
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <Globe size={18} className="text-gray-400 hidden" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="absolute top-12 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div className="glass rounded-2xl p-3 shadow-2xl border border-white/20">
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-150 mb-2 last:mb-0 cursor-pointer ${
                    language.code === locale
                      ? 'bg-blue-500/20 ring-2 ring-blue-400/50'
                      : 'hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={language.name}
                >
                  <Image 
                    src={language.flag} 
                    alt={language.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover"
                    onError={(e) => {
                      // Fallback se a imagem não carregar
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden text-xs font-bold text-gray-300">
                    {language.code.toUpperCase()}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 