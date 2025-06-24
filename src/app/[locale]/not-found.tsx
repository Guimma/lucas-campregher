"use client";

import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NotFound() {
  const locale = useLocale();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          {/* 404 Number */}
          <motion.h1 
            className="text-9xl md:text-[12rem] font-bold mb-8"
            variants={fadeInUp}
          >
            <span className="gradient-text">404</span>
          </motion.h1>
          
          {/* Error Message */}
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            {locale === 'pt' ? 'Página não encontrada' : 'Page Not Found'}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-12 leading-relaxed"
            variants={fadeInUp}
          >
            {locale === 'pt' 
              ? 'Ops! Parece que você se perdeu no código. A página que você está procurando não existe.'
              : 'Oops! Looks like you got lost in the code. The page you\'re looking for doesn\'t exist.'
            }
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <Link href={`/${locale}`}>
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-150 flex items-center gap-2 justify-center"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Home size={20} />
                {locale === 'pt' ? 'Voltar ao Início' : 'Go to Home'}
              </motion.button>
            </Link>
            
            <motion.button
              onClick={() => window.history.back()}
              className="px-8 py-4 glass text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-150 flex items-center gap-2 justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
              {locale === 'pt' ? 'Voltar' : 'Go Back'}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 