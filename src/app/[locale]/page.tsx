"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Rocket, 
  Brain, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  ChevronDown,
  Users,
  Shield,
  Mic,
  Calendar,
  Briefcase,
  GraduationCap,
  School,
  Wrench,
  Cloud as CloudIcon,
  Sparkles,
  Globe,
  Home as HomeIcon,
  Building2
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LanguageToggle from '../../components/LanguageToggle';
import PodcastSection from '../../components/PodcastSection';
import { useContactForm } from '@/hooks/useContactForm';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Navigation items (moved outside component for performance)
const navigationItems = [
  { key: 'about', section: 'about', icon: HomeIcon },
  { key: 'career', section: 'career', icon: Briefcase },
  { key: 'skills', section: 'skills', icon: Wrench },
  { key: 'projects', section: 'projects', icon: Rocket },
  { key: 'podcasts', section: 'podcasts', icon: Mic },
  { key: 'blog', section: 'blog', icon: Sparkles },
  { key: 'contact', section: 'contact', icon: Mail }
];

// About section cards (moved outside component for performance)
const aboutCards = [
  { icon: Code2, key: 'backend' },
  { icon: Palette, key: 'frontend' },
  { icon: Users, key: 'leadership' },
  { icon: Rocket, key: 'cloud' },
  { icon: Shield, key: 'privacy' },
  { icon: Mic, key: 'communication' }
];

// Social links (moved outside component for performance)
const socialLinks = [
  { Icon: Github, href: "https://github.com/Guimma", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/lucas-campregher/", label: "LinkedIn" },
  { Icon: Mail, href: "mailto:lucas@campregher.com", label: "Email" }
];

// Tech skills (moved outside component for performance)
const techSkills = ['Java', '.Net', 'C#', 'Azure', 'TypeScript', 'Python', 'Flutter', 'SQL', 'Spring Boot', 'AI'];

interface BlogPost {
  title: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  date: string;
  category: string;
  url: string;
}

export default function Home() {
  const t = useTranslations();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const { sendWhatsApp, sendEmail } = useContactForm();

  const toggleCard = (key: string) => {
    setExpandedCard(expandedCard === key ? null : key);
  };

  // Smooth scroll function with easing
  const smoothScrollTo = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 2000; // 2 seconds
    let start: number | null = null;

    // Easing function (ease-in-out cubic)
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * easeProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  // Effect para detectar seção ativa e posição do scroll
  React.useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          // Detectar se está no topo (com margem de 100px)
          setIsAtTop(scrollY < 100);
          
          // Detectar seção ativa
          const sections = ['about', 'career', 'skills', 'projects', 'podcasts', 'blog', 'contact'];
          const scrollPosition = scrollY + window.innerHeight / 2;

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(sections[i]);
              break;
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect para fechar menu mobile quando clicar fora
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (mobileMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
      setMobileMenuOpen(false);
    }
  }, [mobileMenuOpen]);

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [mobileMenuOpen, handleClickOutside]);


    

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-4 w-full z-50 h-16 flex items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo + Nome à esquerda - visível apenas no topo */}
            <AnimatePresence>
              {isAtTop && (
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
              <div className="flex items-center justify-center w-10 h-10">
                <Image
                  src="/mbm.png"
                  alt="MBM Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white uppercase tracking-wide">{t('navigation.name')}</span>
                <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">MONKEYS BYTE ME</span>
              </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Spacer quando logo não está visível */}
            {!isAtTop && <div></div>}

            {/* Opções à direita - visível apenas no topo */}
            <AnimatePresence>
              {isAtTop && (
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
              <LanguageToggle />
              
              {/* Menu mobile */}
              <div className="md:hidden">
                <motion.button
                  className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 mobile-menu cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </motion.button>
              </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* Navegação central com glassmorfismo - posicionada absolutamente no centro */}
      <motion.div 
        className="fixed top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center bg-white/15 backdrop-blur-sm rounded-2xl p-2 shadow-2xl gap-1">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <motion.button
                key={item.key}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(item.section);
                }}
                className={`relative p-3 rounded-xl transition-all duration-300 group cursor-pointer ${
                  isActive ? 'bg-white shadow-lg shadow-white/30' : 'hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={t(`navigation.${item.key}`)}
              >
                <item.icon 
                  size={18} 
                  className={`transition-colors duration-300 ${
                    isActive ? 'text-black' : 'text-gray-300 group-hover:text-white'
                  }`} 
                />
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
                      {/* Menu Content */}
          <motion.div
            className="fixed top-20 left-0 right-0 z-40 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
              <div className="glass m-4 rounded-2xl p-4 border border-white/10 mobile-menu">
                              <div className="grid grid-cols-4 gap-4">
                {navigationItems.map((item) => {
                    const isActive = activeSection === item.section;
                    return (
                      <motion.button
                        key={item.key}
                        onClick={(e) => {
                          e.preventDefault();
                          smoothScrollTo(item.section);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                          isActive ? 'bg-white/90' : 'hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <item.icon 
                          size={20} 
                          className={`transition-colors duration-300 mb-1 ${
                            isActive ? 'text-black' : 'text-gray-400'
                          }`} 
                        />
                        <span className={`text-xs ${
                          isActive ? 'text-black' : 'text-gray-400'
                        }`}>
                          {t(`navigation.${item.key}`)}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden enhanced-animated-bg">
        {/* Enhanced Floating Elements with Multiple Colors - OPTIMIZED */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Reduced to 4 main lights for better performance */}
          
          {/* Purple Light - Top Left */}
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl"
            style={{ 
              background: 'radial-gradient(circle, rgba(84, 13, 110, 0.4) 0%, rgba(84, 13, 110, 0.1) 50%, transparent 100%)',
              willChange: 'transform'
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-8, 8, -8],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 20, // Reduced from 25
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Pink/Red Light - Top Right */}
          <motion.div
            className="absolute top-32 right-24 w-80 h-80 rounded-full blur-3xl"
            style={{ 
              background: 'radial-gradient(circle, rgba(238, 66, 102, 0.3) 0%, rgba(238, 66, 102, 0.1) 50%, transparent 100%)',
              willChange: 'transform'
            }}
            animate={{
              y: [12, -12, 12],
              x: [6, -6, 6],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 22, // Reduced from 25
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Teal Light - Bottom Left */}
          <motion.div
            className="absolute bottom-24 left-32 w-96 h-96 rounded-full blur-3xl"
            style={{ 
              background: 'radial-gradient(circle, rgba(59, 206, 172, 0.25) 0%, rgba(59, 206, 172, 0.08) 50%, transparent 100%)',
              willChange: 'transform'
            }}
            animate={{
              y: [16, -16, 16],
              x: [8, -8, 8],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 24, // Reduced from 25
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Green Light - Bottom Right */}
          <motion.div
            className="absolute bottom-16 right-16 w-64 h-64 rounded-full blur-3xl"
            style={{ 
              background: 'radial-gradient(circle, rgba(14, 173, 105, 0.3) 0%, rgba(14, 173, 105, 0.1) 50%, transparent 100%)',
              willChange: 'transform'
            }}
            animate={{
              y: [-14, 14, -14],
              x: [-12, 12, -12],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 26, // Reduced from 25
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Profile Photo */}
            <motion.div 
              className="mb-8"
              variants={fadeInUp}
            >
              <div className="relative inline-block">
                <motion.div
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto overflow-hidden shadow-2xl"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: '0 35px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/lucas-avatar.jpg"
                    alt="Lucas Campregher"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              variants={fadeInUp}
            >
              <span className="text-white">{t('hero.greeting')}</span>
              <span className="text-white">{t('hero.name')}</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              variants={fadeInUp}
            >
              <motion.button
                onClick={() => smoothScrollTo('projects')}
                className="px-8 py-4 bg-white text-black rounded-full font-semibold shadow-lg shadow-white/30"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <Rocket size={20} />
                  {t('hero.viewWork')}
                </div>
              </motion.button>
              <motion.button
                onClick={() => smoothScrollTo('contact')}
                className="px-8 py-4 glass text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-150"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.getInTouch')}
              </motion.button>
            </motion.div>

            <motion.div 
              className="flex justify-center space-x-6"
              variants={fadeInUp}
            >
              {socialLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-full hover:bg-white/20 transition-all duration-150"
                  whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.9 }}
                  title={item.label}
                >
                  <item.Icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} className="text-gray-300/70" />
        </motion.div>
        
        {/* Smooth transition gradient to About section */}
        <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8), #000000)'
        }} />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
        
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white">{t('about.title')}</span>
            </motion.h2>
            
            <motion.div
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                  {t('about.paragraph1')}
                </p>
                <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                  {t('about.paragraph2')}
                </p>
                <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                  {t('about.paragraph3')}
                </p>
                <div className="flex flex-wrap gap-3">
                  {techSkills.map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="about-tech-tag"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {aboutCards.map((item, index) => (
                  <motion.div
                    key={item.key}
                    className="about-card-gradient"
                    whileHover={{ 
                      transition: { duration: 0.3 } 
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <item.icon className="w-8 h-8 text-white mb-4" />
                    <h3 className="font-semibold mb-2 text-white">{t(`about.cards.${item.key}.title`)}</h3>
                    <p className="text-sm text-gray-300">{t(`about.cards.${item.key}.description`)}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Career Section */}
      <section id="career" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="section-icon-container">
                <div className="section-icon-glow"></div>
                <motion.div
                  className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full shadow-2xl relative z-10"
                >
                  <Briefcase className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="text-white">{t('career.title')}</span>
            </h2>
            <p className="text-xl text-gray-300 text-center mb-8 max-w-3xl mx-auto">
              {t('career.description')}
            </p>
            
            {/* CV Download Button */}
            <motion.div 
              className="flex justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <CVDownloadButton />
            </motion.div>
            
            <div className="relative max-w-4xl mx-auto pr-[104px] md:pr-[112px]">
              {/* Enhanced Timeline Line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              
              {/* Progressive Timeline Fill with rainbow gradient */}
              <motion.div
                className="absolute left-6 md:left-8 top-0 w-px career-timeline-line"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              
              {/* Timeline Items */}
              <div className="space-y-20">
                {[
                  { 
                    key: 'devpro', 
                    techs: ['Microservices', 'Global Scale', 'C#', '.NET', 'Azure', 'Kubernetes'],
                    clients: [
                      { 
                        key: 'starbucks',
                        name: t('career.experiences.devpro.clients.starbucks.name'), 
                        logo: '/sbux.png',
                        description: t('career.experiences.devpro.clients.starbucks.description')
                      }
                    ]
                  },
                  { 
                    key: 'dti', 
                    techs: ['Java', 'C#', '.NET', 'Angular', 'Flutter', 'AWS', 'Azure'],
                    clients: [
                      { 
                        key: 'bancoInter',
                        name: t('career.experiences.dti.clients.bancoInter.name'), 
                        logo: '/inter.png',
                        description: t('career.experiences.dti.clients.bancoInter.description')
                      },
                      { 
                        key: 'landor',
                        name: 'Landor & Fitch',
                        logo: '/landor.png',
                        description: t('career.experiences.dti.clients.landor.description')
                      },
                      { 
                        key: 'valeGeotec',
                        name: t('career.experiences.dti.clients.valeGeotec.name'), 
                        logo: '/vale.png',
                        description: t('career.experiences.dti.clients.valeGeotec.description')
                      },
                      { 
                        key: 'valeGcm',
                        name: t('career.experiences.dti.clients.valeGcm.name'), 
                        logo: '/vale.png',
                        description: t('career.experiences.dti.clients.valeGcm.description')
                      },
                      { 
                        key: 'bancoBS2',
                        name: t('career.experiences.dti.clients.bancoBS2.name'), 
                        logo: '/bs2.png',
                        description: t('career.experiences.dti.clients.bancoBS2.description')
                      },
                      { 
                        key: 'entreChaves',
                        name: t('career.experiences.dti.clients.entreChaves.name'), 
                        logo: '/ec.jpg',
                        description: t('career.experiences.dti.clients.entreChaves.description')
                      }
                    ]
                  },
                  { 
                    key: 'anp', 
                    techs: ['Visual Basic', 'Excel', 'Data Processing'],
                    clients: [
                      { 
                        key: 'anp',
                        name: t('career.experiences.anp.clients.anp.name'), 
                        logo: '/anp.png',
                        description: t('career.experiences.anp.clients.anp.description')
                      }
                    ]
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.key}
                    className="relative flex items-start"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.2,
                      delay: index * 0.02,
                      ease: "easeOut"
                    }}
                  >
                    {/* Enhanced Timeline Node */}
                    <motion.div
                      className="absolute left-6 md:left-8 career-timeline-node transform -translate-x-1/2 z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.02 + 0.1,
                        type: "spring",
                        stiffness: 300
                      }}
                      whileHover={{ 
                        scale: 1.2,
                        transition: { duration: 0.2 }
                      }}
                    />



                    {/* Redesigned Content Card */}
                    <motion.div
                      className={`ml-20 flex-1 group ${
                        expandedCard && expandedCard !== item.key ? 'opacity-50' : 'opacity-100'
                      }`}
                    >
                      <div className="relative">
                        <motion.div 
                          className={`career-card ${item.clients ? 'cursor-pointer' : ''}`}
                          onClick={() => item.clients && toggleCard(item.key)}
                        >
                          
                          {/* Topbar com badge de data no topo esquerdo */}
                          <div className="flex items-start w-full mb-2">
                            <motion.div 
                              className="career-period-badge"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.25, delay: index * 0.02 + 0.15 }}
                            >
                              <Calendar size={16} className="inline mr-1" />
                              {t(`career.experiences.${item.key}.period`)}
                            </motion.div>
                          </div>
                          {/* Logo, nome, cargo, etc. */}
                          <div className="career-header w-full">
                            <motion.div 
                              className="career-logo-container"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.15, delay: index * 0.02 + 0.2 }}
                            >
                              <a 
                                href={
                                  item.key === 'devpro' ? 'https://dev.pro/' :
                                  item.key === 'dti' ? 'https://www.dtidigital.com.br/' :
                                  item.key === 'anp' ? 'https://www.gov.br/anp/pt-br' : 
                                  'https://www.dtidigital.com.br/'
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="career-logo"
                              >
                                <Image 
                                  src={
                                    item.key === 'devpro' ? '/devpro.png' :
                                    item.key === 'dti' ? '/dti.png' :
                                    item.key === 'anp' ? '/anp.png' : 
                                    '/dti.png'
                                  }
                                  alt={t(`career.experiences.${item.key}.company`)}
                                  width={120}
                                  height={120}
                                  className={
                                    (item.key === 'devpro' || item.key === 'anp' || item.key === 'dti') 
                                      ? 'w-46 h-24 object-contain company-logo-white' 
                                      : 'w-24 h-24 object-contain'
                                  }
                                />
                              </a>
                            </motion.div>
                            <motion.h3 
                              className="text-3xl font-bold text-white mb-2 text-center"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.15, delay: index * 0.02 + 0.25 }}
                            >
                              {t(`career.experiences.${item.key}.company`)}
                            </motion.h3>
                            <motion.div 
                              className="flex items-center justify-center gap-2 text-xl text-gray-300 mb-1"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.15, delay: index * 0.02 + 0.3 }}
                            >
                              <Briefcase size={18} />
                              <span>{t(`career.experiences.${item.key}.title`)}</span>
                            </motion.div>
                          </div>

                          {/* Description */}
                          <motion.p 
                            className="text-gray-300 leading-relaxed mb-4 text-base flex-shrink-0 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.15, delay: index * 0.02 + 0.35 }}
                          >
                            {t(`career.experiences.${item.key}.description`)}
                          </motion.p>

                          {/* Technologies Section */}
                          <motion.div 
                            className="flex flex-wrap gap-3 justify-center mb-4 flex-shrink-0"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.15, delay: index * 0.02 + 0.4 }}
                          >
                            {item.techs.map((tech: string, techIndex: number) => (
                              <motion.span
                                key={tech}
                                className="tech-tag-glow"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ 
                                  duration: 0.1, 
                                  delay: index * 0.02 + 0.4 + techIndex * 0.02
                                }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </motion.div>

                          {/* Client Logos Section */}
                          {item.clients && (
                            <motion.div 
                              className="flex flex-wrap gap-3 justify-center mb-6 flex-shrink-0"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.15, delay: index * 0.02 + 0.45 }}
                            >
                              {item.clients.slice(0, 4).map((client, clientIndex) => (
                                <motion.div
                                  key={client.name}
                                  className="client-preview-item client-logo-bg-glass"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ 
                                    duration: 0.1, 
                                    delay: index * 0.02 + 0.45 + clientIndex * 0.02
                                  }}
                                  title={client.name}
                                >
                                  <Image 
                                    src={client.logo}
                                    alt={client.name}
                                    width={36}
                                    height={36}
                                    className={`w-9 h-9 object-contain ${(client.logo === '/landor.png' ) ? 'company-logo-white' : ''}`}
                                  />
                                </motion.div>
                              ))}
                              {item.clients.length > 4 && (
                                <motion.div
                                  className="client-preview-item bg-white/5"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ 
                                    duration: 0.1, 
                                    delay: index * 0.02 + 0.45 + 4 * 0.02
                                  }}
                                >
                                  <span className="text-xs font-medium text-white">
                                    +{item.clients.length - 4}
                                  </span>
                                </motion.div>
                              )}
                            </motion.div>
                          )}

                          {/* Expand Arrow */}
                          <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.15, delay: index * 0.02 + 0.4 }}
                          >
                            <motion.button
                              className="p-4 rounded-xl hover:bg-white/15 transition-all duration-300 flex items-center justify-center"
                              onClick={() => item.clients && toggleCard(item.key)}
                              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                              whileTap={{ scale: 0.95 }}
                              disabled={!item.clients}
                            >
                              <motion.div
                                animate={{ rotate: expandedCard === item.key ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                              >
                                <ChevronDown size={20} className="text-gray-400 hover:text-white transition-colors duration-300" />
                              </motion.div>
                            </motion.button>
                          </motion.div>

                          {/* Expanded Clients Section */}
                          <AnimatePresence initial={false}>
                            {item.clients && expandedCard === item.key && (
                              <motion.div
                                key="expanded-clients"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                style={{ overflow: 'hidden' }}
                              >
                                <div className="space-y-5 mt-2">
                                  {item.clients.map((client, clientIndex) => (
                                    <motion.div
                                      key={client.name}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.15, delay: clientIndex * 0.03 }}
                                      className="flex flex-row items-center gap-6 w-full bg-transparent border-none shadow-none min-h-0"
                                      style={{ minHeight: 'unset', boxShadow: 'none', background: 'none' }}
                                    >
                                      {/* Client Logo */}
                                      <div className="flex items-center justify-center w-16 h-16 flex-shrink-0">
                                        <a 
                                          href={
                                            client.logo === '/sbux.png' ? 'https://www.starbucks.com.br/' :
                                            client.logo === '/inter.png' ? 'https://www.bancointer.com.br/' :
                                            client.logo === '/vale.png' ? 'https://vale.com/' :
                                            client.logo === '/bs2.png' ? 'https://www.bancobs2.com.br/' :
                                            client.logo === '/landor.png' ? 'https://landor.com/' :
                                            client.logo === '/ec.jpg' ? 'https://open.spotify.com/show/1ub9YZKamdMKdKbLia4YrX?si=fc775f395d994ae8' :
                                            '#'
                                          }
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="block hover:scale-105 transition-transform duration-300"
                                        >
                                          <Image 
                                            src={client.logo}
                                            alt={client.name}
                                            width={56}
                                            height={56}
                                            className={`w-14 h-14 object-contain ${(client.logo === '/landor.png' || client.logo === '/anp.png') ? 'company-logo-white' : ''}`}
                                          />
                                        </a>
                                      </div>
                                      
                                      {/* Client Info */}
                                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <h5 className="font-semibold text-white mb-1 text-base text-left">{client.name}</h5>
                                        <p className="text-sm text-gray-300 leading-relaxed text-left m-0">{client.description}</p>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section (Timeline) */}
      <section id="education" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="section-icon-container">
                <div className="section-icon-glow"></div>
                <motion.div
                  className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full shadow-2xl relative z-10"
                >
                  <GraduationCap className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="text-white">{t('education.title')}</span>
            </h2>
            <p className="text-xl text-gray-300 text-center mb-8 max-w-3xl mx-auto">
              {t('education.description')}
            </p>
            
            {/* CV Download Button */}
            <motion.div 
              className="flex justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <CVDownloadButton />
            </motion.div>
            
            <div className="relative max-w-4xl mx-auto pr-[104px] md:pr-[112px]">
              {/* Enhanced Timeline Line - same as career */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              
              {/* Progressive Timeline Fill with rainbow gradient - same as career */}
              <motion.div
                className="absolute left-6 md:left-8 top-0 w-px career-timeline-line"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              
              {/* Timeline Items */}
              <div className="space-y-20">
                {[
                  {
                    key: 'puc',
                    icon: GraduationCap,
                    degree: t('education.items.puc.degree'),
                    institution: t('education.items.puc.name'),
                    period: t('education.items.puc.period'),
                  },
                  {
                    key: 'magnum',
                    icon: School,
                    degree: t('education.items.magnum.degree'),
                    institution: t('education.items.magnum.name'),
                    period: t('education.items.magnum.period'),
                  }
                ].map((edu, index) => (
                  <motion.div
                    key={edu.key}
                    className="relative flex items-start"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.2,
                      delay: index * 0.02,
                      ease: "easeOut"
                    }}
                  >
                    {/* Enhanced Timeline Node - same as career */}
                    <motion.div
                      className="absolute left-6 md:left-8 career-timeline-node transform -translate-x-1/2 z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.02 + 0.1,
                        type: "spring",
                        stiffness: 300
                      }}
                      whileHover={{ 
                        scale: 1.2,
                        transition: { duration: 0.2 }
                      }}
                    />

                    {/* Education Card - simplified version of career card */}
                    <motion.div
                      className="ml-20 flex-1 group"
                    >
                      <div className="relative">
                        <motion.div className="education-card">
                          
                          {/* Topbar com badge de data no topo esquerdo */}
                          <div className="flex items-start w-full mb-2">
                            <motion.div 
                              className="career-period-badge"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.25, delay: index * 0.02 + 0.15 }}
                            >
                                                             <Calendar size={16} className="inline mr-1" />
                               {edu.period}
                            </motion.div>
                          </div>

                          {/* Education Icon and Institution */}
                          <div className="career-header w-full">
                            <motion.div 
                              className="career-logo-container"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.15, delay: index * 0.02 + 0.2 }}
                            >
                              <div className="career-logo bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
                                <edu.icon className="w-10 h-10 text-white" />
                              </div>
                            </motion.div>
                            <motion.h3 
                              className="text-2xl font-bold text-white mb-1 text-center"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.15, delay: index * 0.02 + 0.25 }}
                            >
                              {edu.degree}
                            </motion.h3>
                            <motion.div 
                              className="flex items-center justify-center gap-2 text-lg text-gray-300 mb-2"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.15, delay: index * 0.02 + 0.3 }}
                            >
                              <Building2 size={16} />
                              <span>{edu.institution}</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="section-icon-container">
                <div className="section-icon-glow"></div>
                <motion.div
                  className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full shadow-2xl relative z-10"
                >
                  <Wrench className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="text-white">{t('skills.title')}</span>
            </h2>
            <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
              {t('skills.description')}
            </p>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Coluna Esquerda */}
              <div className="flex-1 flex flex-col gap-8">
                <SkillCard
                  title={t('skills.areas.languages')}
                  icon={Code2}
                  delay={0.1}
                  skills={[
                    { name: 'Java', value: 100 },
                    { name: 'C#', value: 100 },
                    { name: 'Javascript', value: 90 },
                    { name: 'Python', value: 85 },
                    { name: 'Dart', value: 70 },
                    { name: 'SQL', value: 85 },
                  ]}
                />

                <SkillCard
                  title={t('skills.areas.cloud')}
                  icon={CloudIcon}
                  delay={0.3}
                  skills={[
                    { name: 'Azure Cloud', value: 80 },
                    { name: 'AWS Cloud', value: 70 },
                    { name: 'Cloud', value: 80 },
                    { name: 'Devops', value: 75 },
                    { name: 'Agile', value: 95 },
                    { name: 'Cost-Effective Thinking', value: 85 },
                  ]}
                />

                <SkillCard
                  title={t('skills.areas.ai')}
                  icon={Sparkles}
                  delay={0.5}
                  skills={[
                    { name: 'Cursor', value: 90 },
                    { name: 'Copilot', value: 80 },
                    { name: 'Data Privacy', value: 90 },
                  ]}
                />
              </div>

              {/* Coluna Direita */}
              <div className="flex-1 flex flex-col gap-8">
                <SkillCard
                  title={t('skills.areas.frameworks')}
                  icon={Wrench}
                  delay={0.2}
                  skills={[
                    { name: 'Spring Boot', value: 100 },
                    { name: 'Micronaut', value: 90 },
                    { name: '.NET', value: 100 },
                    { name: 'Flutter', value: 70 },
                    { name: 'Angular', value: 80 },
                    { name: 'Vue', value: 70 },
                    { name: 'Next.js', value: 60 },
                    { name: 'NoSQL', value: 80 },
                    { name: 'Event Streaming', value: 80 },
                    { name: 'Logs & Monitoring', value: 90 },
                    { name: 'AI', value: 90 },
                  ]}
                />

                <SkillCard
                  title={t('skills.areas.software')}
                  icon={Brain}
                  delay={0.4}
                  skills={[
                    { name: 'Software Architecture', value: 80 },
                    { name: 'Clean Code & Design Patterns', value: 90 },
                    { name: 'Creativity & Innovation', value: 100 },
                    { name: 'Communication', value: 100 },
                  ]}
                />

                <SkillCard
                  title={t('skills.areas.spokenTitle')}
                  icon={Globe}
                  delay={0.6}
                  skills={[
                    { name: t('spoken.portuguese'), value: 100 },
                    { name: t('spoken.english'), value: 100 },
                  ]}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="section-icon-container">
                <div className="section-icon-glow"></div>
                <motion.div
                  className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full shadow-2xl relative z-10"
                >
                  <Rocket className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="text-white">{t('projects.title')}</span>
            </h2>
            <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
              {t('projects.description')}
            </p>
            <motion.div 
              className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              {/* BetterBet */}
              <motion.div
                className="project-card-wrapper group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0 }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { 
                    duration: 0.15,
                    ease: "easeOut"
                  }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="project-card">
                <div className="project-card-image flex items-center justify-center bg-white dark:bg-gray-900">
                  <Image src="/betterbet.svg" alt="BetterBet Logo" width={180} height={60} className="object-contain h-20" />
                </div>
                <div className="project-card-content">
                  <h3 className="project-card-title">{t('projects.items.betterbet.title')}</h3>
                  <p className="project-card-description">{t('projects.items.betterbet.description')}</p>
                  <div className="project-card-tags">
                    {Array.isArray(t.raw && t.raw('projects.items.betterbet.tags')) ? t.raw('projects.items.betterbet.tags').map((tech: string) => (
                      <span key={tech} className="project-card-tag blog-tag-1">{tech}</span>
                    )) : null}
                  </div>
                  <div className="project-card-actions">
                    <motion.a 
                      href="https://github.com/Guimma/betterbet" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-card-button-secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16}/>View Code
                    </motion.a>
                  </div>
                </div>
              </div>
              </motion.div>
              {/* Glenio Campregher - Fotografia */}
              <motion.div
                className="project-card-wrapper group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { 
                    duration: 0.15,
                    ease: "easeOut"
                  }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="project-card">
                <div className="project-card-image">
                  <Image src="/glenio.png" alt="Glenio Campregher" fill className="object-cover" />
                  <motion.a 
                    href="https://guimma.github.io/vue-photosite/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-card-redirect-icon"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                </div>
                <div className="project-card-content">
                  <h3 className="project-card-title">{t('projects.items.glenio.title')}</h3>
                  <p className="project-card-description">{t('projects.items.glenio.description')}</p>
                  <div className="project-card-tags">
                    {Array.isArray(t.raw && t.raw('projects.items.glenio.tags')) ? t.raw('projects.items.glenio.tags').map((tech: string) => (
                      <span key={tech} className="project-card-tag blog-tag-2">{tech}</span>
                    )) : null}
                  </div>
                  <div className="project-card-actions">
                    <motion.a 
                      href="https://github.com/Guimma/vue-photosite" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-card-button-secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16}/>View Code
                    </motion.a>
                    <motion.a 
                      href="https://guimma.github.io/vue-photosite/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-card-button-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16}/>Visit Site
                    </motion.a>
                  </div>
                </div>
              </div>
              </motion.div>
              {/* 433 Fantasy */}
              <motion.div
                className="project-card-wrapper group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { 
                    duration: 0.15,
                    ease: "easeOut"
                  }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="project-card">
                <div className="project-card-image bg-black">
                  <Image src="/433.jpg" alt="433 Fantasy" fill className="object-cover" />
                  <motion.a 
                    href="https://guimma.github.io/fantasy-web/#/home" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-card-redirect-icon"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                </div>
                <div className="project-card-content">
                  <h3 className="project-card-title">{t('projects.items.433.title')}</h3>
                  <p className="project-card-description">{t('projects.items.433.description')}</p>
                  <div className="project-card-tags">
                    {Array.isArray(t.raw && t.raw('projects.items.433.tags')) ? t.raw('projects.items.433.tags').map((tech: string) => (
                      <span key={tech} className="project-card-tag blog-tag-3">{tech}</span>
                    )) : null}
                  </div>
                  <div className="project-card-actions">
                    <motion.a 
                      href="https://github.com/Guimma/fantasy-web" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-card-button-secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16}/>View Code
                    </motion.a>
                    <motion.a 
                      href="https://guimma.github.io/fantasy-web/#/home" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-card-button-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16}/>Visit Site
                    </motion.a>
                  </div>
                </div>
              </div>
              </motion.div>
              {/* Christmas Cats */}
              <motion.div
                className="project-card-wrapper group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { 
                    duration: 0.15,
                    ease: "easeOut"
                  }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="project-card">
                <div className="project-card-image">
                  <Image src="/cats.png" alt="Christmas Cats" fill className="object-cover" />
                  <motion.a 
                    href="https://guimma.github.io/Christmas-Cats/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-card-redirect-icon"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                </div>
                <div className="project-card-content">
                  <h3 className="project-card-title">{t('projects.items.cats.title')}</h3>
                  <p className="project-card-description">{t('projects.items.cats.description')}</p>
                  <div className="project-card-tags">
                    {Array.isArray(t.raw && t.raw('projects.items.cats.tags')) ? t.raw('projects.items.cats.tags').map((tech: string) => (
                      <span key={tech} className="project-card-tag blog-tag-4">{tech}</span>
                    )) : null}
                  </div>
                  <div className="project-card-actions">
                    <motion.a 
                      href="https://github.com/Guimma/Christmas-Cats" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-card-button-secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16}/>View Code
                    </motion.a>
                    <motion.a 
                      href="https://guimma.github.io/Christmas-Cats/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-card-button-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16}/>Visit Site
                    </motion.a>
                  </div>
                </div>
              </div>
              </motion.div>
            </motion.div>

            {/* GitHub Call-to-Action */}
            <motion.div
              className="github-cta-container"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{
                y: -8,
                transition: { 
                  duration: 0.3,
                  ease: "easeOut"
                }
              }}
            >
              {/* Background particles - Enhanced starfield */}
              <div className="github-cta-particles">
                <div className="github-cta-particle"></div>
                <div className="github-cta-particle"></div>
                <div className="github-cta-particle"></div>
                <div className="github-cta-particle"></div>
                <div className="github-cta-particle"></div>
                <div className="github-cta-particle"></div>
                <div className="github-cta-particle"></div>
                <div className="github-cta-particle"></div>
                <div className="github-cta-particle"></div>
                <div className="github-cta-particle"></div>
                <div className="github-cta-particle"></div>
                <div className="github-cta-particle"></div>
              </div>

              <motion.div 
                className="github-cta-icon"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Github className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="github-cta-title">{t('projects.githubCta.title')}</h3>
              <p className="github-cta-description">{t('projects.githubCta.description')}</p>

              <motion.a
                href="https://github.com/Guimma"
                target="_blank"
                rel="noopener noreferrer"
                className="github-cta-button"
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                {t('projects.githubCta.button')}
                <ExternalLink size={16} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Podcasts Section */}
      <PodcastSection />

      {/* Blog Section */}
      <section id="blog" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <div className="text-center mb-20">
              <motion.div 
                className="flex items-center justify-center mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="section-icon-container">
                  <div className="section-icon-glow"></div>
                  <motion.div
                    className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full shadow-2xl relative z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="text-white">{t('blog.title')}</span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-300 text-center max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t('blog.subtitle')}
              </motion.p>
            </div>
            
            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(t.raw('blog.posts')).map(([key, post], index) => {
                // Map blog post keys to their respective images
                const blogImages: { [key: string]: string } = {
                  aiAbstraction: '/ai.jpeg',
                  enzimasPrivacy: '/enzimas.jpg',
                  techshotPrivacy: '/privacidade.png',
                  techshotWallE: '/caseWalle.png',
                  socialDilemma: '/dilema.jpg',
                  privacyByDesign: '/insta_privacy.png'
                };
                
                const postData = post as BlogPost;
                const isPrivacyByDesign = key === 'privacyByDesign';
                
                return (
                  <motion.div
                    key={key}
                    className="project-card-wrapper group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{
                      y: -12,
                      scale: 1.02,
                      transition: { 
                        duration: 0.15,
                        ease: "easeOut"
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="project-card">
                      {/* Blog post image */}
                      <div className="project-card-image">
                        <Image
                          src={blogImages[key] || '/ai.jpeg'}
                          alt={postData.title}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        
                        {/* Category overlay */}
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-md text-xs font-medium text-white shadow-lg" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                            {postData.category}
                          </span>
                        </div>
                        
                        {/* Date overlay */}
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-md text-xs font-medium text-white shadow-lg" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                            <Calendar size={12} />
                            {new Date(postData.date).toLocaleDateString(
                              t('navigation.name').includes('Lucas') ? 'en-US' : 'pt-BR',
                              { month: 'short', year: 'numeric' }
                            )}
                          </span>
                        </div>
                        
                        {/* Read Time overlay */}
                        {(postData.category !== 'Podcast' && postData.category !== 'Techshot') || key === 'enzimasPrivacy' ? (
                          <div className="absolute bottom-3 right-3">
                            <span className="inline-block px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-md text-xs font-medium text-white shadow-lg" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                              {postData.readTime} min
                            </span>
                          </div>
                        ) : null}
                        
                        {/* Read More Icon - similar to redirect icon */}
                        <motion.a 
                          href={postData.url}
                          target={isPrivacyByDesign ? undefined : "_blank"}
                          rel={isPrivacyByDesign ? undefined : "noopener noreferrer"}
                          download={isPrivacyByDesign ? true : undefined}
                          className="project-card-redirect-icon"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={18} />
                        </motion.a>
                      </div>
                      
                      {/* Blog post content */}
                      <div className="project-card-content">
                        
                        <h3 className="project-card-title">{postData.title}</h3>
                        <p className="project-card-description line-clamp-4">{postData.excerpt}</p>
                        
                        {/* Tags */}
                        <div className="project-card-tags">
                          {postData.tags.slice(0, 4).map((tag: string) => (
                            <span key={tag} className={`project-card-tag blog-tag-${(index % 5) + 1}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Actions */}
                        <div className="project-card-actions">
                          <motion.a 
                            href={postData.url}
                            target={isPrivacyByDesign ? undefined : "_blank"}
                            rel={isPrivacyByDesign ? undefined : "noopener noreferrer"}
                            download={isPrivacyByDesign ? true : undefined}
                            className="project-card-button-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink size={16}/>{t('blog.readMore')}
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative overflow-hidden contact-section-bg">
        {/* Smooth Transition Gradient from Previous Section */}
        <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.8) 25%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.1) 75%, transparent 100%)'
        }} />
        
        {/* Enhanced Rainbow Background with Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary Rainbow Lights - Pure Colors */}
          <motion.div
            className="absolute top-1/6 left-1/5 w-[28rem] h-[28rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(84, 13, 110, 0.18) 0%, rgba(84, 13, 110, 0.06) 40%, rgba(84, 13, 110, 0.02) 70%, transparent 100%)' }}
            animate={{
              y: [-25, 35, -25],
              x: [-15, 20, -15],
              scale: [1, 1.2, 0.9, 1],
              rotate: [0, 15, -10, 0],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute top-1/4 right-1/6 w-[24rem] h-[24rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(238, 66, 102, 0.16) 0%, rgba(238, 66, 102, 0.05) 40%, rgba(238, 66, 102, 0.015) 70%, transparent 100%)' }}
            animate={{
              y: [20, -25, 30, 20],
              x: [12, -18, 8, 12],
              scale: [1, 1.15, 0.85, 1],
              rotate: [0, -20, 25, 0],
            }}
            transition={{
              duration: 42,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-1/5 left-1/4 w-[22rem] h-[22rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(255, 210, 63, 0.14) 0%, rgba(255, 210, 63, 0.045) 40%, rgba(255, 210, 63, 0.012) 70%, transparent 100%)' }}
            animate={{
              y: [-22, 28, -15, -22],
              x: [-18, 15, -25, -18],
              scale: [1, 0.9, 1.25, 1],
              rotate: [0, 30, -15, 0],
            }}
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[26rem] h-[26rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(59, 206, 172, 0.15) 0%, rgba(59, 206, 172, 0.05) 40%, rgba(59, 206, 172, 0.015) 70%, transparent 100%)' }}
            animate={{
              y: [18, -22, 25, 18],
              x: [10, -15, 20, 10],
              scale: [1, 1.18, 0.95, 1],
              rotate: [0, -25, 20, 0],
            }}
            transition={{
              duration: 33,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute top-2/5 left-2/5 w-[20rem] h-[20rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(14, 173, 105, 0.13) 0%, rgba(14, 173, 105, 0.04) 40%, rgba(14, 173, 105, 0.01) 70%, transparent 100%)' }}
            animate={{
              y: [-20, 25, -30, -20],
              x: [-22, 18, -12, -22],
              scale: [1, 1.3, 0.8, 1],
              rotate: [0, 40, -30, 0],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Additional Organic Movement Lights */}
          <motion.div
            className="absolute top-3/5 right-1/5 w-[18rem] h-[18rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.035) 40%, transparent 70%)' }}
            animate={{
              y: [15, -20, 25, 15],
              x: [8, -12, 16, 8],
              scale: [1, 0.9, 1.15, 1],
              rotate: [0, -35, 25, 0],
            }}
            transition={{
              duration: 36,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Secondary Flowing Lights */}
          <motion.div
            className="absolute top-1/8 right-2/5 w-32 h-32 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(circle, rgba(84, 13, 110, 0.08) 0%, transparent 70%)' }}
            animate={{
              y: [12, -18, 22, 12],
              x: [6, -10, 14, 6],
              opacity: [0.6, 0.9, 0.4, 0.6],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-1/8 left-1/8 w-36 h-36 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(circle, rgba(238, 66, 102, 0.07) 0%, transparent 70%)' }}
            animate={{
              y: [-15, 20, -25, -15],
              x: [8, -12, 18, 8],
              opacity: [0.5, 0.8, 0.3, 0.5],
              scale: [1, 0.85, 1.25, 1],
            }}
            transition={{
              duration: 31,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="absolute top-1/2 right-1/8 w-28 h-28 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(circle, rgba(255, 210, 63, 0.06) 0%, transparent 70%)' }}
            animate={{
              y: [10, -15, 20, 10],
              x: [5, -8, 12, 5],
              opacity: [0.7, 1, 0.5, 0.7],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 27,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Enhanced Section Header */}
            <div className="text-center mb-4 mt-16">
              <motion.div 
                className="flex items-center justify-center mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="section-icon-container">
                  <div className="section-icon-glow"></div>
                  <motion.div
                    className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full shadow-2xl relative z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Mail className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="text-white">{t('contact.title')}</span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-200 text-center max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t('contact.description')}
              </motion.p>
              
              {/* CV Download Button in Contact Section */}
              <motion.div 
                className="flex justify-center mt-6 mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <CVDownloadButton />
              </motion.div>
            </div>
            
            {/* Contact Cards Layout */}
            <div className="grid lg:grid-cols-5 gap-8 lg:items-stretch mt-6">
              {/* Quick Contact Cards */}
              <motion.div
                className="lg:col-span-2 flex flex-col space-y-5"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Email Card */}
                <motion.a
                  href="mailto:lucas@campregher.com"
                  className="contact-quick-card group"
                  whileHover={{ 
                    scale: 1.02, 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="contact-card-icon-container bg-gradient-to-br from-blue-500/20 to-blue-600/30">
                    <Mail className="w-7 h-7 text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                    <p className="text-gray-300 text-sm mb-2">{t('contact.info.email')}</p>
                    <span className="text-xs text-blue-300 font-medium">Click to send email →</span>
                  </div>
                </motion.a>

                {/* WhatsApp Card */}
                <motion.a
                  href="https://api.whatsapp.com/send?phone=5531996964056"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-quick-card group"
                  whileHover={{ 
                    scale: 1.02, 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="contact-card-icon-container bg-gradient-to-br from-green-500/20 to-green-600/30">
                    <svg className="w-7 h-7 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-1">WhatsApp</h4>
                    <p className="text-gray-300 text-sm mb-2">{t('contact.info.phone')}</p>
                    <span className="text-xs text-green-300 font-medium">Click to chat →</span>
                  </div>
                </motion.a>

                {/* LinkedIn Card */}
                <motion.a
                  href="https://www.linkedin.com/in/lucas-campregher/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-quick-card group"
                  whileHover={{ 
                    scale: 1.02, 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="contact-card-icon-container bg-gradient-to-br from-blue-600/20 to-blue-700/30">
                    <Linkedin className="w-7 h-7 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-1">LinkedIn</h4>
                    <p className="text-gray-300 text-sm mb-2">Professional Network</p>
                    <span className="text-xs text-blue-400 font-medium">Connect with me →</span>
                  </div>
                </motion.a>

                                 {/* Location Card */}
                 <motion.div
                   className="contact-info-card"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.4, delay: 0.2 }}
                 >
                   <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-lg flex items-center justify-center">
                       <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                       </svg>
                     </div>
                     <div>
                       <p className="text-sm text-gray-400 font-medium">Location</p>
                       <p className="text-white font-medium">{t('contact.info.location')}</p>
                     </div>
                   </div>
                 </motion.div>

                 {/* Professional Availability Card */}
                 <motion.div
                   className="contact-info-card flex-1"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.4, delay: 0.3 }}
                 >
                   <div className="space-y-4">
                     <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 rounded-lg flex items-center justify-center">
                         <Briefcase className="w-5 h-5 text-emerald-400" />
                       </div>
                       <div>
                         <p className="text-sm text-gray-400 font-medium">Professional Status</p>
                         <p className="text-white font-medium">Open to Opportunities</p>
                       </div>
                     </div>
                     
                     <div className="pl-13 space-y-2">
                       <div className="flex items-center space-x-2">
                         <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                         <span className="text-sm text-gray-300">Full-time positions & career opportunities</span>
                       </div>
                       <div className="flex items-center space-x-2">
                         <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                         <span className="text-sm text-gray-300">Freelance projects & consulting</span>
                       </div>
                       <div className="flex items-center space-x-2">
                         <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                         <span className="text-sm text-gray-300">Software solutions partnerships</span>
                       </div>
                     </div>
                   </div>
                 </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="lg:col-span-3 flex flex-col"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="contact-form-card flex-1 flex flex-col">
                  <motion.div
                    className="mb-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-3">{t('contact.form.title')}</h3>
                    <p className="text-gray-300">{t('contact.info.description')}</p>
                  </motion.div>
                  
                  <form id="contact-form" className="space-y-6 flex-1 flex flex-col">
                    <div className="flex-1 space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <label className="block text-sm font-medium mb-3 text-gray-300">{t('contact.form.name')}</label>
                        <input
                          type="text"
                          name="fullname"
                          className="contact-form-input"
                          placeholder={t('contact.form.namePlaceholder')}
                          required
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <label className="block text-sm font-medium mb-3 text-gray-300">{t('contact.form.email')}</label>
                        <input
                          type="email"
                          name="email"
                          className="contact-form-input"
                          placeholder={t('contact.form.emailPlaceholder')}
                          required
                        />
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      <label className="block text-sm font-medium mb-3 text-gray-300">{t('contact.form.subject')}</label>
                      <input
                        type="text"
                        name="subject"
                        className="contact-form-input"
                        placeholder={t('contact.form.subjectPlaceholder')}
                        required
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                    >
                      <label className="block text-sm font-medium mb-3 text-gray-300">{t('contact.form.message')}</label>
                      <textarea
                        rows={5}
                        name="message"
                        className="contact-form-input resize-none"
                        placeholder={t('contact.form.messagePlaceholder')}
                        required
                      ></textarea>
                    </motion.div>
                    </div>
                    
                    <motion.div 
                      className="flex flex-col sm:flex-row gap-4 pt-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                    >
                      <motion.button
                        type="button"
                        onClick={sendWhatsApp}
                        className="contact-cta-button contact-cta-whatsapp"
                        whileHover={{ 
                          scale: 1.02, 
                          y: -3,
                          boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.4)",
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787z"/>
                        </svg>
                        {t('contact.form.sendWhatsApp')}
                      </motion.button>
                      
                      <motion.button
                        type="button"
                        onClick={sendEmail}
                        className="contact-cta-button contact-cta-email"
                        whileHover={{ 
                          scale: 1.02, 
                          y: -3,
                          boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4)",
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                        {t('contact.form.sendEmail')}
                      </motion.button>
                    </motion.div>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="pt-12 pb-6 relative" style={{ backgroundColor: '#000000' }}>
        {/* Top Separator Line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}></div>
        
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="grid md:grid-cols-5 gap-8 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Brand Column */}
              <motion.div 
                className="md:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div 
                    className="flex items-center justify-center w-10 h-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/mbm.png"
                      alt="MBM Logo"
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                      priority
                    />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-white uppercase tracking-wide">{t('navigation.name')}</span>
                    <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">MONKEYS BYTE ME</span>
                  </div>
                </div>
                <p className="text-gray-200 text-sm leading-relaxed mb-4">
                  {t('footer.description')}
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-3">
                  {socialLinks.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target={item.href.startsWith('mailto') ? undefined : "_blank"}
                      rel={item.href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                      className="p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
                      title={item.label}
                    >
                      <item.Icon size={18} />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Navigation</h4>
                <div className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.key}
                      onClick={() => smoothScrollTo(item.section)}
                      className="block text-left text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer text-sm py-1"
                      whileHover={{ x: 3 }}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.03 }}
                    >
                      {t(`navigation.${item.key}`)}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Tech */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Tech</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-400">{t('footer.builtWith')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-purple-400 font-medium">{t('footer.poweredBy')}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-gray-400 text-xs block mb-2">{t('footer.openSource')}</span>
                    <motion.a
                      href="https://github.com/Guimma/lucas-campregher"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm"
                      whileHover={{ scale: 1.05, x: 3 }}
                    >
                      <Github size={16} />
                      <span>View Source</span>
                    </motion.a>
                  </div>

                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contact</h4>
                <div className="space-y-3">
                  {socialLinks.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      target={item.href.startsWith('mailto') ? undefined : "_blank"}
                      rel={item.href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                      whileHover={{ x: 3 }}
                    >
                      <item.Icon size={14} className="text-purple-400" />
                      <span>{item.label}</span>
                    </motion.a>
                  ))}
                  <div className="flex items-center space-x-2 text-gray-300 text-sm">
                    <svg className="w-3.5 h-3.5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>{t('contact.info.location')}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Footer Bottom */}
            <motion.div 
              className="pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative">
                {/* Copyright - Centralized */}
                <div className="text-center">
                  <motion.p 
                    className="text-gray-300 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    {t('footer.copyright')}
                  </motion.p>
                </div>
                
                {/* Back to Top - Right aligned */}
                <motion.button
                  onClick={() => smoothScrollTo('about')}
                  className="absolute right-0 top-0 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer text-sm"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <span>↑</span>
                  <span>Back to Top</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

// Reusable SkillCard component
interface SkillCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: Array<{ name: string; value: number }>;
  delay: number;
  className?: string;
}

function SkillCard({ title, icon: Icon, skills, delay, className = "" }: SkillCardProps) {
  return (
    <motion.div
      className={`skills-card group ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { 
          duration: 0.15,
          ease: "easeOut"
        }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="text-xl font-semibold mb-6 skills-card-title flex items-center gap-3">
        <Icon className="w-7 h-7 skills-card-icon" />
        {title}
      </h3>
      {skills.map(skill => (
        <SkillBar key={skill.name} name={skill.name} value={skill.value} />
      ))}
    </motion.div>
  );
}

// Enhanced SkillBar component
function SkillBar({ name, value }: { name: string; value: number }) {
  return (
    <div className="skill-bar-container">
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-value">{value}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
} 

// CV Download Component
interface CVDownloadButtonProps {
  className?: string;
}

function CVDownloadButton({ className = "" }: CVDownloadButtonProps) {
  const t = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);

  const downloadCV = (language: 'pt' | 'en') => {
    const fileName = language === 'pt' ? 'Lucas_Campregher_PT.pdf' : 'Lucas_Campregher_EN.pdf';
    const link = document.createElement('a');
    link.href = `/${fileName}`;
    link.download = fileName;
    link.click();
    setIsExpanded(false);
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Main Button - Same style as View My Work */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-8 py-4 bg-white text-black rounded-full font-semibold shadow-lg shadow-white/30"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{t('cv.download')}</span>
          <motion.div 
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </motion.button>

      {/* Expanded Options */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg shadow-white/20 overflow-hidden z-10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.button
              onClick={() => downloadCV('pt')}
              className="w-full flex items-center gap-3 px-6 py-3 text-black hover:bg-gray-50 transition-colors duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <Image src="/pt-br.png" alt="Portuguese" width={20} height={20} className="w-5 h-5 object-cover rounded" />
              <span className="font-medium">Português</span>
            </motion.button>
            
            <div className="h-px bg-gray-200"></div>
            
            <motion.button
              onClick={() => downloadCV('en')}
              className="w-full flex items-center gap-3 px-6 py-3 text-black hover:bg-gray-50 transition-colors duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.15 }}
            >
              <Image src="/en-us.png" alt="English" width={20} height={20} className="w-5 h-5 object-cover rounded" />
              <span className="font-medium">English</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

