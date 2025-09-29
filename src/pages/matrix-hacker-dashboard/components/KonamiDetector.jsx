import React, { useEffect, useCallback } from 'react';

const KonamiDetector = ({ onKonamiComplete = () => {}, onProgressUpdate = () => {} }) => {
  // Konami Code Sequence
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  const handleKonamiDetection = useCallback(() => {
    let konamiIndex = 0;
    let konamiTimeout;

    const handleKeyDown = (event) => {
      const expectedKey = konamiCode?.[konamiIndex];
      
      if (event?.code === expectedKey) {
        konamiIndex++;
        const progress = (konamiIndex / konamiCode?.length) * 100;
        onProgressUpdate(progress);
        
        // Reset timeout
        clearTimeout(konamiTimeout);
        konamiTimeout = setTimeout(() => {
          konamiIndex = 0;
          onProgressUpdate(0);
        }, 2000);

        // Complete sequence
        if (konamiIndex === konamiCode?.length) {
          onKonamiComplete();
          konamiIndex = 0;
          clearTimeout(konamiTimeout);
          onProgressUpdate(0);
        }
      } else {
        konamiIndex = 0;
        onProgressUpdate(0);
        clearTimeout(konamiTimeout);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(konamiTimeout);
    };
  }, [konamiCode, onKonamiComplete, onProgressUpdate]);

  useEffect(() => {
    const cleanup = handleKonamiDetection();
    return cleanup;
  }, [handleKonamiDetection]);

  return null; // This component doesn't render anything
};

export default KonamiDetector;