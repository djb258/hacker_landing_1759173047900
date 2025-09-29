import React, { useState, useEffect, useCallback, useRef } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const TerminalSearch = ({ 
  onSearch = () => {}, 
  searchQuery = '', 
  isBreachMode = false,
  className = '' 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const inputRef = useRef(null);

  // Terminal typing animation for placeholder
  useEffect(() => {
    const phrases = [
      'Search the Matrix...',
      'Enter command...',
      'Access mainframe...',
      'Hack the system...',
      'Breach protocol...',
      'Initialize scan...'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeWriter = () => {
      const currentPhrase = phrases?.[phraseIndex];
      
      if (isDeleting) {
        setTypingText(currentPhrase?.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypingText(currentPhrase?.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentPhrase?.length) {
        setTimeout(() => { isDeleting = true; }, isBreachMode ? 1000 : 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases?.length;
      }
    };

    const typingInterval = setInterval(typeWriter, isDeleting ? 50 : 100);
    return () => clearInterval(typingInterval);
  }, [isBreachMode]);

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < (isBreachMode ? 0.4 : 0.15)) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(glitchInterval);
  }, [isBreachMode]);

  const handleInputChange = useCallback((e) => {
    onSearch(e?.target?.value);
  }, [onSearch]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e?.key === 'Enter' && searchQuery?.trim()) {
      // Trigger search action with enter key
      console.log('Executing search:', searchQuery);
    }
  }, [searchQuery]);

  const clearSearch = useCallback(() => {
    onSearch('');
    inputRef?.current?.focus();
  }, [onSearch]);

  // Compute container classes for cleaner JSX
  const containerClasses = `
    relative flex items-center bg-card/30 backdrop-blur-sm border rounded-lg
    transition-all duration-300 font-terminal
    ${isFocused ? 'border-accent shadow-terminal bg-card/50 shadow-accent/30' : 'border-primary/30 hover:border-primary/50'}
    ${glitchActive ? 'border-error shadow-error/50 animate-pulse' : ''}
    ${isBreachMode ? 'border-accent/70 shadow-accent/40' : ''}
  `?.trim();

  return (
    <div className={`relative ${className}`}>
      {/* Terminal Search Container */}
      <div className={containerClasses}>
        {/* Terminal Prompt */}
        <div className="flex items-center px-4 py-3 text-accent">
          <Icon name="Terminal" size={16} className="mr-2" />
          <span className="font-semibold">$</span>
        </div>

        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={!searchQuery && !isFocused ? `${typingText}${showCursor ? '_' : ' '}` : ''}
          className={`
            flex-1 bg-transparent text-primary font-terminal py-3 pr-12
            placeholder:text-muted-foreground focus:outline-none
            ${glitchActive ? 'text-error' : ''}
          `}
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon name="X" size={16} />
          </button>
        )}

        {/* Glitch Overlay */}
        {glitchActive && (
          <div className="absolute inset-0 bg-error/5 rounded-lg pointer-events-none"></div>
        )}
      </div>

      {/* Terminal Command Line Indicator */}
      <div className="mt-2 flex items-center space-x-2 text-xs font-terminal text-muted-foreground">
        <span className="text-accent">user@matrix:~$</span>
        <span>
          {searchQuery ? `Searching for "${searchQuery}"...` : 'Ready for input...'}
        </span>
        <span className={`animate-pulse text-accent ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
          |
        </span>
      </div>

      {/* Search Results Hint */}
      {searchQuery && (
        <div className="mt-3 p-3 bg-card/20 border border-primary/20 rounded text-xs font-terminal">
          <div className="flex items-center space-x-2 text-primary">
            <Icon name="Search" size={12} />
            <span>Scanning matrix for: "{searchQuery}"</span>
          </div>
          <div className="mt-1 text-muted-foreground">
            Press Enter to execute search protocol
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalSearch;