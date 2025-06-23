"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const trailRef = useRef<TrailPoint[]>([]);

  useEffect(() => {
    setIsMounted(true);
    
    const updateMousePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      // Add to trail
      const newTrailPoint: TrailPoint = {
        x: newPosition.x,
        y: newPosition.y,
        timestamp: Date.now()
      };
      
      trailRef.current = [...trailRef.current, newTrailPoint].slice(-15); // Keep last 15 points
      setTrail([...trailRef.current]);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="hover"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', updateMousePosition);

    // Clean up old trail points
    const trailCleanup = setInterval(() => {
      const now = Date.now();
      trailRef.current = trailRef.current.filter(point => now - point.timestamp < 1000);
      setTrail([...trailRef.current]);
    }, 50);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      clearInterval(trailCleanup);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Don't render on server to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Glowing light area */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10005]"
        style={{
          background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(147, 51, 234, 0.08) 0%, 
            rgba(59, 130, 246, 0.05) 30%, 
            rgba(147, 51, 234, 0.03) 60%, 
            transparent 100%)`,
          width: '100vw',
          height: '100vh',
        }}
        animate={{
          opacity: isHovering ? 1 : 0.7,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Trail particles */}
      {trail.map((point, index) => {
        const age = Date.now() - point.timestamp;
        const opacity = Math.max(0, 1 - age / 1000);
        const scale = Math.max(0.1, 1 - age / 1000);
        
        return (
          <motion.div
            key={`${point.timestamp}-${index}`}
            className="fixed top-0 left-0 pointer-events-none z-[10007]"
            style={{
              x: point.x - 4,
              y: point.y - 4,
              opacity: opacity * 0.6,
              scale: scale,
            }}
            animate={{
              scale: [scale, scale * 0.5],
              opacity: [opacity * 0.6, 0],
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut"
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-[1px]" />
          </motion.div>
        );
      })}

      {/* Main cursor glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10008]"
        animate={{
          x: mousePosition.x - 25,
          y: mousePosition.y - 25,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
          mass: 0.3,
        }}
      >
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-full blur-lg animate-pulse" />
      </motion.div>

      {/* Main cursor dot - removed the border ring */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full pointer-events-none z-[10009]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 30,
          mass: 0.2,
        }}
        style={{
          boxShadow: `0 0 20px rgba(147, 51, 234, ${isHovering ? 0.8 : 0.5})`,
          border: 'none',
          outline: 'none',
        }}
      />

      {/* Sparkle effects */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[10006]"
          animate={{
            x: mousePosition.x - 15,
            y: mousePosition.y - 15,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              animate={{
                x: [0, Math.cos(i * Math.PI / 2) * 20],
                y: [0, Math.sin(i * Math.PI / 2) * 20],
                opacity: [1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      )}

      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        body, html {
          cursor: none !important;
        }
        
        a, button, input, textarea, select, [data-cursor="hover"] {
          cursor: none !important;
        }

        /* Remove any default outlines and borders from all elements */
        *, *:before, *:after {
          outline: none !important;
          border: none !important;
        }

        /* Specifically target any cursor-related styles */
        *:focus, *:active, *:hover {
          outline: none !important;
          border: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor; 