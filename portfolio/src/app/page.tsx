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
  return (
    <div className="min-h-screen animated-bg">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 glass"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              Portfolio
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
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
              <span className="text-white">Lucas</span>{' '}
              <span className="creative-text">Campregher</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Software Engineer specialized in backend development, data privacy, 
              and technical leadership with 6+ years building scalable solutions.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              variants={fadeInUp}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
              <motion.button
                className="px-8 py-4 glass text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
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
                  className="p-3 glass rounded-full hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
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
              <span className="gradient-text">About Me</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  I'm a creative and communicative software engineer with over 6 years of market experience. 
                  I specialize in backend development and am passionate about data privacy and security. 
                  I constantly evolve and quickly adapt to new challenges in my professional journey.
                </p>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Throughout my career, I've worked with diverse technologies - from developing complex APIs 
                  to web and mobile frontend applications. I've also gained experience with DevOps and Cloud computing. 
                  As a technical leader, I focus on improving team deliveries and agile methodologies.
                </p>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Beyond my development work, I co-host "Entre Chaves," a podcast for the developer community. 
                  I'm passionate about mentoring developers and have participated in team hiring and planning processes.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Node.js', 'Python', 'Java', 'AWS', 'Docker', 'PostgreSQL', 'React', 'TypeScript'].map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-4 py-2 glass rounded-full text-sm"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
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
                  { icon: Code2, title: 'Backend Development', desc: 'API development of rich and complex domains' },
                  { icon: Palette, title: 'Technical Leadership', desc: 'Leading development teams and improving deliveries' },
                  { icon: Rocket, title: 'Cloud & DevOps', desc: 'AWS infrastructure and cloud computing management' },
                  { icon: Brain, title: 'Data Privacy', desc: 'Enthusiast in data security and privacy solutions' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-6 glass rounded-2xl hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <item.icon className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
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
              <span className="gradient-text">Skills & Expertise</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  category: 'Backend',
                  skills: ['Node.js', 'Python', 'Java', 'Spring Boot', 'Express.js'],
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  category: 'Cloud & DevOps',
                  skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  category: 'Data & Tools',
                  skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Apache Kafka', 'Git'],
                  color: 'from-emerald-500 to-teal-500'
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  className="p-8 glass rounded-2xl hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} mb-6 flex items-center justify-center`}>
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: (index * 0.2) + (skillIndex * 0.1) }}
                      >
                        <span className="text-gray-300">{skill}</span>
                        <motion.div 
                          className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden"
                          initial={{ width: 0 }}
                          whileInView={{ width: 64 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: (index * 0.2) + (skillIndex * 0.1) }}
                        >
                          <motion.div
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                            initial={{ width: '0%' }}
                            whileInView={{ width: '85%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: (index * 0.2) + (skillIndex * 0.1) + 0.3 }}
                          />
                        </motion.div>
                      </motion.div>
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
              <span className="gradient-text">Featured Projects</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'E-Commerce Platform',
                  description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration',
                  tags: ['React', 'Node.js', 'MongoDB', 'Stripe']
                },
                {
                  title: 'Task Management App',
                  description: 'Collaborative project management tool with real-time updates',
                  tags: ['Next.js', 'TypeScript', 'Prisma', 'WebSockets']
                },
                {
                  title: 'AI Chat Interface',
                  description: 'Modern chat interface with AI integration and voice commands',
                  tags: ['React', 'Python', 'OpenAI', 'WebRTC']
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  className="group glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-purple-500/40"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
                        >
                          {tag}
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
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="gradient-text">Let's Create Something Amazing</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's collaborate and build something extraordinary together.
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.a
                href="mailto:your.email@example.com"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                Send Email
              </motion.a>
              <motion.a
                href="#"
                className="px-8 py-4 glass text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                View GitHub
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 glass mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Your Name. Crafted with ❤️ and lots of coffee.
          </p>
        </div>
      </footer>
    </div>
  );
} 