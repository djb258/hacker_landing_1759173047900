import React, { useEffect, useState } from 'react';

const GlitchEffect = ({ 
  isActive = false, 
  intensity = 'medium', 
  children, 
  className = '' 
}) => {
  const [glitchState, setGlitchState] = useState(false);
  const [glitchType, setGlitchType] = useState('color');

  useEffect(() => {
    if (!isActive) return;

    const glitchTypes = ['color', 'position', 'scale', 'opacity'];
    const intensityMultiplier = {
      low: 0.5,
      medium: 1,
      high: 2
    };

    const baseInterval = 1000 / intensityMultiplier?.[intensity];

    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        setGlitchType(glitchTypes?.[Math.floor(Math.random() * glitchTypes?.length)]);
        setGlitchState(true);
        
        setTimeout(() => {
          setGlitchState(false);
        }, 100 + Math.random() * 200);
      }
    }, baseInterval + Math.random() * 1000);

    return () => clearInterval(glitchInterval);
  }, [isActive, intensity]);

  const getGlitchStyles = () => {
    if (!glitchState) return {};

    switch (glitchType) {
      case 'color':
        return {
          filter: 'hue-rotate(180deg) saturate(2)',
          textShadow: '2px 0 #ff0040, -2px 0 #00ff41'
        };
      case 'position':
        return {
          transform: `translateX(${Math.random() * 4 - 2}px) translateY(${Math.random() * 2 - 1}px)`
        };
      case 'scale':
        return {
          transform: `scale(${0.98 + Math.random() * 0.04})`
        };
      case 'opacity':
        return {
          opacity: 0.7 + Math.random() * 0.3
        };
      default:
        return {};
    }
  };

  return (
    <div 
      className={`
        transition-all duration-75
        ${glitchState ? 'animate-pulse' : ''}
        ${className}
      `}
      style={getGlitchStyles()}
    >
      {children}
    </div>
  );
};

export default GlitchEffect;