import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HackerCard = ({ 
  title, 
  upvotes, 
  description, 
  difficulty = 'medium',
  isBreachMode = false,
  className = '' 
}) => {
  const [hackState, setHackState] = useState('idle'); // idle, hacking, accessed
  const [glitchActive, setGlitchActive] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < (isBreachMode ? 0.3 : 0.1)) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(glitchInterval);
  }, [isBreachMode]);

  // Upvote animation in breach mode
  useEffect(() => {
    if (isBreachMode && hackState === 'accessed') {
      const upvoteInterval = setInterval(() => {
        setCurrentUpvotes(prev => prev + Math.floor(Math.random() * 3) + 1);
      }, 1000);

      return () => clearInterval(upvoteInterval);
    }
  }, [isBreachMode, hackState]);

  const handleHack = useCallback(() => {
    if (hackState !== 'idle') return;

    setHackState('hacking');
    
    // Simulate hacking process
    const hackingDuration = 2000 + Math.random() * 2000;
    setTimeout(() => {
      setHackState('accessed');
      setCurrentUpvotes(prev => prev + Math.floor(Math.random() * 10) + 5);
    }, hackingDuration);
  }, [hackState]);

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'text-primary';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-error';
      default: return 'text-primary';
    }
  };

  const getHackButtonContent = () => {
    switch (hackState) {
      case 'hacking':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin"></div>
            <span>HACKING...</span>
          </div>
        );
      case 'accessed':
        return (
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={16} />
            <span>ACCESSED ✓</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2">
            <span>HACK</span>
            <Icon name="ExternalLink" size={16} />
          </div>
        );
    }
  };

  return (
    <div className={`
      group relative bg-card/30 backdrop-blur-sm border border-primary/30 rounded-lg p-6
      transition-all duration-300 hover:border-accent hover:shadow-terminal
      hover:transform hover:scale-105 hover:bg-card/50
      ${glitchActive ? 'animate-pulse border-error shadow-error/50' : ''}
      ${hackState === 'accessed' ? 'border-primary shadow-primary/30' : ''}
      ${isBreachMode ? 'border-accent/50 shadow-accent/20' : ''}
      ${className}
    `}>
      {/* Glitch overlay */}
      {glitchActive && (
        <div className="absolute inset-0 bg-error/10 rounded-lg pointer-events-none animate-pulse"></div>
      )}
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={`
            font-terminal text-lg font-semibold text-primary mb-2
            ${glitchActive ? 'text-error animate-pulse' : ''}
            ${hackState === 'accessed' ? 'text-accent' : ''}
          `}>
            {title}
          </h3>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="ArrowUp" size={14} className="text-accent" />
              <span className={`
                font-terminal font-semibold
                ${hackState === 'accessed' ? 'text-accent animate-pulse' : 'text-muted-foreground'}
              `}>
                {currentUpvotes?.toLocaleString()}
              </span>
            </div>
            
            <div className={`
              px-2 py-1 rounded text-xs font-terminal font-semibold
              ${getDifficultyColor()} bg-current/10 border border-current/30
            `}>
              {difficulty?.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          <div className={`
            w-2 h-2 rounded-full transition-colors duration-300
            ${hackState === 'idle' ? 'bg-muted-foreground' : ''}
            ${hackState === 'hacking' ? 'bg-warning animate-pulse' : ''}
            ${hackState === 'accessed' ? 'bg-primary animate-pulse' : ''}
          `}></div>
        </div>
      </div>
      {/* Description */}
      <p className="text-muted-foreground font-terminal text-sm mb-6 leading-relaxed">
        {description}
      </p>
      {/* Terminal Command Preview */}
      <div className="bg-background/50 border border-primary/20 rounded p-3 mb-6 font-terminal text-xs">
        <div className="flex items-center space-x-2 text-accent mb-1">
          <span>$</span>
          <span className="text-muted-foreground">./exploit.sh --target={title?.toLowerCase()?.replace(/\s+/g, '-')}</span>
        </div>
        <div className="text-primary/70">
          {hackState === 'idle' && 'Ready to execute...'}
          {hackState === 'hacking' && 'Executing payload... [████████░░] 80%'}
          {hackState === 'accessed' && 'Exploit successful! Access granted.'}
        </div>
      </div>
      {/* Hack Button */}
      <Button
        variant={hackState === 'accessed' ? 'success' : 'outline'}
        size="default"
        onClick={handleHack}
        disabled={hackState !== 'idle'}
        className={`
          w-full font-terminal font-semibold transition-all duration-300
          ${hackState === 'hacking' ? 'animate-pulse' : ''}
          ${hackState === 'accessed' ? 'shadow-primary/30' : ''}
          group-hover:shadow-accent/50
        `}
      >
        {getHackButtonContent()}
      </Button>
      {/* Animated Border Effect */}
      <div className={`
        absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300
        ${hackState === 'accessed' ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="absolute inset-0 rounded-lg border-2 border-primary/50 animate-pulse"></div>
      </div>
    </div>
  );
};

export default HackerCard;