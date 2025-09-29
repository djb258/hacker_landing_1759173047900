import React, { useEffect, useRef, useState } from 'react';

const MatrixRain = ({ isBreachMode = false, className = '' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Matrix characters including alphanumeric and symbols
  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`";

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas || !dimensions?.width || !dimensions?.height) return;

    const ctx = canvas?.getContext('2d');
    canvas.width = dimensions?.width;
    canvas.height = dimensions?.height;

    const fontSize = 14;
    const columns = Math.floor(canvas?.width / fontSize);
    const drops = new Array(columns)?.fill(1);
    const speeds = new Array(columns)?.fill(0)?.map(() => Math.random() * 0.5 + 0.5);
    const glitchChance = new Array(columns)?.fill(0)?.map(() => Math.random());

    const draw = () => {
      // Create trailing effect
      ctx.fillStyle = isBreachMode ? 'rgba(10, 10, 10, 0.03)' : 'rgba(10, 10, 10, 0.05)';
      ctx?.fillRect(0, 0, canvas?.width, canvas?.height);

      ctx.font = `${fontSize}px 'Source Code Pro', monospace`;

      for (let i = 0; i < drops?.length; i++) {
        const char = matrixChars?.[Math.floor(Math.random() * matrixChars?.length)];
        const x = i * fontSize;
        const y = drops?.[i] * fontSize;

        // Determine color based on mode and position
        let color = '#00ff00';
        if (isBreachMode) {
          // Breach mode: more chaotic colors
          if (Math.random() < 0.1) {
            color = '#ff0040'; // Glitch red
          } else if (Math.random() < 0.2) {
            color = '#00ff41'; // Bright green
          } else if (Math.random() < 0.05) {
            color = '#ffff00'; // Terminal yellow
          }
        } else {
          // Normal mode: green variations
          if (drops?.[i] * fontSize < 100) {
            color = '#00ff41'; // Brighter at top
          } else if (Math.random() < 0.1) {
            color = '#00cc00'; // Darker variant
          }
        }

        // Add glow effect for leading characters
        if (drops?.[i] * fontSize < 50 || Math.random() < 0.05) {
          ctx.shadowColor = color;
          ctx.shadowBlur = isBreachMode ? 15 : 10;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = color;
        ctx?.fillText(char, x, y);

        // Reset drop when it reaches bottom or randomly
        if (y > canvas?.height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = Math.random() * 0.5 + 0.5;
        }

        // Move drop down at variable speed
        drops[i] += speeds?.[i];
      }
    };

    const animate = () => {
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, [dimensions, isBreachMode, matrixChars]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ 
        background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
        opacity: isBreachMode ? 0.9 : 0.7
      }}
    />
  );
};

export default MatrixRain;