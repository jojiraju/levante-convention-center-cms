import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [percentage, setPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Wait for exit animation
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundColor: '#050A1A',
            zIndex: 99999,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ marginBottom: '40px' }}
          >
            <img
              src="/logo.png"
              alt="Levante Logo"
              width={220}
              style={{ objectFit: 'contain' }}
            />
          </motion.div>

          {/* Progress Container */}
          <div style={{ width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  backgroundColor: 'var(--secondary-color)',
                }}
                animate={{ width: `${Math.min(percentage, 100)}%` }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
            </div>

            {/* Percentage Text */}
            <div style={{
              marginTop: '15px',
              color: 'var(--secondary-color)',
              fontSize: '0.65rem',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500
            }}>
              {Math.min(percentage, 100)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
