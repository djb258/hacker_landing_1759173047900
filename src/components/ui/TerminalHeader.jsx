import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../AppIcon';
import Input from './Input';

const TerminalHeader = ({ 
  onSearch = () => {}, 
  searchQuery = '', 
  isSearchFocused = false,
  onSearchFocus = () => {},
  onSearchBlur = () => {},
  className = ''
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [typingText, setTypingText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Terminal typing animation for placeholder
  useEffect(() => {
    const phrases = [
      'Search the Matrix...',
      'Enter command...',
      'Access mainframe...',
      'Hack the system...'
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
        setTimeout(() => { isDeleting = true; }, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases?.length;
      }
    };

    const typingInterval = setInterval(typeWriter, isDeleting ? 50 : 100);
    return () => clearInterval(typingInterval);
  }, []);

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleSearchChange = useCallback((e) => {
    onSearch(e?.target?.value);
  }, [onSearch]);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/30 ${className}`}>
      <div className="w-full px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Terminal Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-error animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-warning animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="font-terminal text-primary font-bold text-lg tracking-wider">
              <span className="text-accent">[</span>
              MATRIX
              <span className="text-accent">]</span>
              <span className="text-muted-foreground ml-2">v2.1.0</span>
            </div>
          </div>

          {/* Terminal Search Interface */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary font-terminal">
                <span className="text-accent">$</span>
              </div>
              <Input
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={onSearchFocus}
                onBlur={onSearchBlur}
                placeholder={!searchQuery && !isSearchFocused ? `${typingText}${showCursor ? '|' : ' '}` : ''}
                className={`
                  pl-8 pr-4 py-2 bg-card/50 border-primary/50 text-primary font-terminal
                  placeholder:text-muted-foreground focus:border-accent focus:ring-accent/30
                  transition-all duration-300 ${isSearchFocused ? 'shadow-terminal' : ''}
                `}
              />
              {searchQuery && (
                <button
                  onClick={() => onSearch('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
          </div>

          {/* System Status */}
          <div className="flex items-center space-x-6">
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="font-terminal text-sm text-primary">ONLINE</span>
            </div>

            {/* System Time */}
            <div className="font-terminal text-sm text-muted-foreground">
              <div className="text-right">
                <div className="text-primary font-semibold">{formatTime(currentTime)}</div>
                <div className="text-xs">{formatDate(currentTime)}</div>
              </div>
            </div>

            {/* Terminal Menu */}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-card/50 rounded">
                <Icon name="Settings" size={18} />
              </button>
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-card/50 rounded">
                <Icon name="HelpCircle" size={18} />
              </button>
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-card/50 rounded">
                <Icon name="Terminal" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* System Status Indicators Only */}
        <div className="mt-2 flex justify-end text-xs font-terminal text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>CPU: {Math.floor(Math.random() * 30 + 20)}%</span>
            <span>MEM: {Math.floor(Math.random() * 40 + 30)}%</span>
            <span>NET: SECURE</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TerminalHeader;