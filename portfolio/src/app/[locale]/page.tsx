"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Rocket, 
  Brain, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import LanguageToggle from '../../components/LanguageToggle';

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

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen animated-bg">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 glass nav-glass"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center relative z-10">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg">
                <span className="text-sm font-bold text-white font-mono">&lt;/&gt;</span>
              </div>
              <span className="text-lg font-medium text-white">{t('navigation.name')}</span>
            </motion.div>
            <div className="hidden md:flex space-x-8 items-center">
              {[
                { key: 'about', section: 'about' },
                { key: 'skills', section: 'skills' },
                { key: 'projects', section: 'projects' },
                { key: 'contact', section: 'contact' }
              ].map((item) => (
                <motion.a
                  key={item.key}
                  href={`#${item.section}`}
                  className="relative text-gray-300 hover:text-white transition-all duration-150 nav-link"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(`navigation.${item.key}`)}
                </motion.a>
              ))}
              <LanguageToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              y: [20, -20, 20],
              x: [10, -10, 10],
            }}
            transition={{
              duration: 8,
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
                <motion.img
                  src="/lucas-avatar.jpg"
                  alt="Lucas Campregher"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover border-4 border-white/20 shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-600/20"></div>
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              variants={fadeInUp}
            >
              <span className="text-white">{t('hero.greeting')}</span>
              <span className="creative-text">{t('hero.name')}</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              variants={fadeInUp}
            >
              <motion.a
                href="#projects"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-150"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.viewWork')}
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 glass text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-150"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.getInTouch')}
              </motion.a>
            </motion.div>

            <motion.div 
              className="flex justify-center space-x-6"
              variants={fadeInUp}
            >
              {[
                { Icon: Github, href: "https://github.com/Guimma", label: "GitHub" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/lucas-campregher/", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:lucas@campregher.com", label: "Email" }
              ].map((item, index) => (
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} className="text-gray-400" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="gradient-text">{t('about.title')}</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  {t('about.paragraph1')}
                </p>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  {t('about.paragraph2')}
                </p>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {t('about.paragraph3')}
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Node.js', 'Python', 'Java', 'AWS', 'Docker', 'PostgreSQL', 'React', 'TypeScript'].map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-4 py-2 glass rounded-full text-sm"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)", transition: { duration: 0.15 } }}
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
                {[
                  { icon: Code2, key: 'backend' },
                  { icon: Palette, key: 'leadership' },
                  { icon: Rocket, key: 'cloud' },
                  { icon: Brain, key: 'privacy' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-6 glass rounded-2xl hover:bg-white/10 transition-all duration-150"
                    whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.15 } }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <item.icon className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="font-semibold mb-2">{t(`about.cards.${item.key}.title`)}</h3>
                    <p className="text-sm text-gray-400">{t(`about.cards.${item.key}.description`)}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="gradient-text">{t('skills.title')}</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  key: 'backend',
                  icon: Code2,
                  skills: ['Node.js', 'Python', 'Java', 'PHP', 'C#']
                },
                {
                  key: 'cloud',
                  icon: Rocket,
                  skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Microservices']
                },
                {
                  key: 'data',
                  icon: Brain,
                  skills: ['PostgreSQL', 'Redis', 'MongoDB', 'Data Privacy', 'LGPD/GDPR']
                }
              ].map((category, index) => (
                <motion.div
                  key={category.key}
                  className="p-8 glass rounded-2xl hover:bg-white/10 transition-all duration-150"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.15 } }}
                >
                  <category.icon className="w-12 h-12 text-blue-400 mb-6" />
                  <h3 className="text-xl font-semibold mb-4">{t(`skills.categories.${category.key}.title`)}</h3>
                  <p className="text-gray-300 mb-6">{t(`skills.categories.${category.key}.description`)}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="gradient-text">{t('projects.title')}</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  key: 'dataPrivacy',
                  image: '/project-1.jpg',
                  tech: ['Python', 'PostgreSQL', 'LGPD']
                },
                {
                  key: 'microservices',
                  image: '/project-2.png',
                  tech: ['Node.js', 'Docker', 'AWS']
                },
                {
                  key: 'analytics',
                  image: '/project-3.jpg',
                  tech: ['Java', 'Apache Kafka', 'Redis']
                }
              ].map((project, index) => (
                <motion.div
                  key={project.key}
                  className="group glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-150"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.15 } }}
                >
                  <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-purple-600/40 opacity-80"></div>
                    <div className="absolute bottom-4 right-4">
                      <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{t(`projects.items.${project.key}.title`)}</h3>
                    <p className="text-gray-300 mb-4">{t(`projects.items.${project.key}.description`)}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="gradient-text">{t('contact.title')}</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold mb-6">{t('contact.subtitle')}</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  {t('contact.description')}
                </p>
                
                <div className="space-y-6">
                  {[
                    { Icon: Mail, label: 'lucas@campregher.com', href: 'mailto:lucas@campregher.com' },
                    { Icon: Linkedin, label: 'linkedin.com/in/lucas-campregher', href: 'https://www.linkedin.com/in/lucas-campregher/' },
                    { Icon: Github, label: 'github.com/Guimma', href: 'https://github.com/Guimma' }
                  ].map((contact, index) => (
                    <motion.a
                      key={index}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 glass rounded-lg hover:bg-white/20 transition-all duration-150"
                      whileHover={{ scale: 1.02, x: 10, transition: { duration: 0.15 } }}
                    >
                      <contact.Icon className="w-6 h-6 text-blue-400" />
                      <span className="text-gray-300">{contact.label}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="glass p-8 rounded-2xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('contact.form.name')}</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder={t('contact.form.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('contact.form.email')}</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('contact.form.message')}</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 transition-colors resize-none"
                      placeholder={t('contact.form.messagePlaceholder')}
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-2xl transition-all duration-150"
                    whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)", transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('contact.form.send')}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 glass mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
} 