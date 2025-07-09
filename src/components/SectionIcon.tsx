"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SectionIconProps {
  Icon: LucideIcon;
  className?: string;
}

export default function SectionIcon({ Icon, className = "" }: SectionIconProps) {
  return (
    <div className={`flex items-center justify-center mb-6 ${className}`}>
      <div className="section-icon-container">
        <div className="section-icon-glow"></div>
        <motion.div
          className="flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full shadow-2xl relative z-10"
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
      </div>
    </div>
  );
} 