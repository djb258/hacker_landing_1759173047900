import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import TerminalSearch from './TerminalSearch';

const MatrixHeader = ({ 
  onSearch = () => {}, 
  searchQuery = '', 
  isBreachMode = false,
  konamiProgress = 0,
  className = '' 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState('ONLINE');
  const [blinkTitle, setBlinkTitle] = useState(true);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Title cursor blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkTitle(prev => !prev);
    }, 800);
    return () => clearInterval(blinkInterval);
  }, []);

  // System status updates
  useEffect(() => {
    if (isBreachMode) {
      setSystemStatus('BREACH MODE');
    } else if (konamiProgress > 0) {
      setSystemStatus('SEQUENCE DETECTED');
    } else {
      setSystemStatus('ONLINE');
    }
  }, [isBreachMode, konamiProgress]);

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

  const getStatusColor = () => {
    if (isBreachMode) return 'text-error';
    if (konamiProgress > 0) return 'text-warning';
    return 'text-primary';
  };

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm 
      border-b border-primary/30 font-terminal
      ${isBreachMode ? 'border-accent/50 shadow-accent/20' : ''}
      ${className}
    `}>
      <div className="w-full px-6 py-2">
        {/* Main Header Row */}
        <div className="flex items-center justify-between mb-2">
          {/* Terminal Status Indicators */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`
                w-2 h-2 rounded-full animate-pulse
                ${isBreachMode ? 'bg-error' : 'bg-primary'}
              `}></div>
              <div className={`
                w-2 h-2 rounded-full animate-pulse
                ${isBreachMode ? 'bg-warning' : 'bg-accent'}
              `} style={{ animationDelay: '0.2s' }}></div>
              <div className={`
                w-2 h-2 rounded-full animate-pulse
                ${isBreachMode ? 'bg-primary' : 'bg-success'}
              `} style={{ animationDelay: '0.4s' }}></div>
            </div>
            
            {/* Matrix Title */}
            <div className="flex items-center space-x-3">
              <h1 className={`
                text-lg font-bold tracking-wider
                ${isBreachMode ? 'text-error animate-pulse' : 'text-primary'}
              `}>
                <span className="text-accent">[</span>
                MATRIX HACKER DASHBOARD
                <span className="text-accent">]</span>
                <span className={`ml-1 ${blinkTitle ? 'opacity-100' : 'opacity-0'}`}>_</span>
              </h1>
              
              <div className="text-xs text-muted-foreground">
                v2.1.0-{isBreachMode ? 'BREACH' : 'STABLE'}
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="flex items-center space-x-4">
            {/* Konami Progress */}
            {konamiProgress > 0 && (
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={14} className="text-warning animate-pulse" />
                <div className="w-16 h-1.5 bg-card border border-primary/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-warning transition-all duration-300"
                    style={{ width: `${konamiProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              <div className={`
                w-1.5 h-1.5 rounded-full animate-pulse
                ${isBreachMode ? 'bg-error' : 'bg-primary'}
              `}></div>
              <span className={`text-xs font-semibold ${getStatusColor()}`}>
                {systemStatus}
              </span>
            </div>

            {/* System Controls */}
            <div className="flex items-center space-x-1">
              <button className={`
                p-1.5 rounded transition-colors
                ${isBreachMode 
                  ? 'text-error hover:bg-error/20' :'text-muted-foreground hover:text-primary hover:bg-card/50'
                }
              `}>
                <Icon name="Settings" size={16} />
              </button>
              <button className={`
                p-1.5 rounded transition-colors
                ${isBreachMode 
                  ? 'text-error hover:bg-error/20' :'text-muted-foreground hover:text-primary hover:bg-card/50'
                }
              `}>
                <Icon name="Terminal" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Search Interface */}
        <div className="max-w-2xl mx-auto mb-2">
          <TerminalSearch
            onSearch={onSearch}
            searchQuery={searchQuery}
            isBreachMode={isBreachMode}
          />
        </div>

        {/* System Status Only */}
        <div className="flex justify-end text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>CPU: {Math.floor(Math.random() * 30 + 20)}%</span>
            <span>MEM: {Math.floor(Math.random() * 40 + 30)}%</span>
            <span>NET: {isBreachMode ? 'ENCRYPTED' : 'SECURE'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MatrixHeader;