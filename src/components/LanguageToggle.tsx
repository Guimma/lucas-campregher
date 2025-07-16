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

interface LanguageToggleProps {
  mobileMenu?: boolean;
}

export default function LanguageToggle({ mobileMenu = false }: LanguageToggleProps) {
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
      <div className={`${
        mobileMenu 
          ? 'w-full h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center opacity-50' 
          : 'w-10 h-10 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full flex items-center justify-center opacity-50 shadow-lg min-w-[40px] min-h-[40px]'
      }`}>
        <Globe size={mobileMenu ? 20 : 18} className="text-gray-400" />
      </div>
    );
  }

  // Mobile menu version
  if (mobileMenu) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between gap-3">
          {languages.map((language) => (
            <motion.button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`flex-1 h-14 flex items-center justify-center gap-3 rounded-xl transition-all duration-300 cursor-pointer border ${
                language.code === locale
                  ? 'bg-white/90 border-white/20 text-black'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image 
                src={language.flag} 
                alt={language.name}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="hidden text-xs font-bold">
                {language.code.toUpperCase()}
              </div>
              <span className={`text-sm font-medium ${
                language.code === locale ? 'text-black' : 'text-current'
              }`}>
                {language.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Desktop version (original)
  return (
    <div className="relative w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center">
      <motion.button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="w-10 h-10 min-w-[40px] min-h-[40px] bg-white/15 backdrop-blur-sm border border-white/25 rounded-full flex items-center justify-center hover:bg-white/25 transition-all duration-300 relative overflow-hidden cursor-pointer shadow-lg"
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

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="absolute top-12 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{ minWidth: 48 }}
          >
            <div className="glass rounded-2xl p-3 shadow-2xl border border-white/20">
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl transition-all duration-150 mb-2 last:mb-0 cursor-pointer ${
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