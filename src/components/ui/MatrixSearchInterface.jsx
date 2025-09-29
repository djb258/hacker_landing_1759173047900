import React, { useState, useEffect, useCallback, useRef } from 'react';
import Icon from '../AppIcon';

const MatrixSearchInterface = ({ 
  onSearch = () => {}, 
  searchQuery = '', 
  suggestions = [],
  isLoading = false,
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);

  // Terminal command history
  useEffect(() => {
    const savedHistory = localStorage.getItem('matrix-search-history');
    if (savedHistory) {
      setTerminalHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = useCallback((query) => {
    if (query?.trim() && !terminalHistory?.includes(query)) {
      const newHistory = [query, ...terminalHistory?.slice(0, 9)]; // Keep last 10
      setTerminalHistory(newHistory);
      localStorage.setItem('matrix-search-history', JSON.stringify(newHistory));
    }
  }, [terminalHistory]);

  const handleInputChange = useCallback((e) => {
    const value = e?.target?.value;
    onSearch(value);
    setSelectedSuggestion(-1);
    setShowSuggestions(value?.length > 0 && suggestions?.length > 0);
  }, [onSearch, suggestions?.length]);

  const handleKeyDown = useCallback((e) => {
    if (e?.key === 'Enter') {
      e?.preventDefault();
      if (selectedSuggestion >= 0 && suggestions?.[selectedSuggestion]) {
        onSearch(suggestions?.[selectedSuggestion]?.value);
        setShowSuggestions(false);
      } else if (searchQuery?.trim()) {
        saveToHistory(searchQuery);
        // Trigger search action
      }
      setSelectedSuggestion(-1);
    } else if (e?.key === 'ArrowDown') {
      e?.preventDefault();
      setSelectedSuggestion(prev => 
        prev < suggestions?.length - 1 ? prev + 1 : prev
      );
    } else if (e?.key === 'ArrowUp') {
      e?.preventDefault();
      if (selectedSuggestion > 0) {
        setSelectedSuggestion(prev => prev - 1);
      } else if (selectedSuggestion === -1 && terminalHistory?.length > 0) {
        setHistoryIndex(0);
        onSearch(terminalHistory?.[0]);
      } else if (historyIndex < terminalHistory?.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        onSearch(terminalHistory?.[newIndex]);
      }
    } else if (e?.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
      inputRef?.current?.blur();
    } else if (e?.key === 'Tab' && selectedSuggestion >= 0) {
      e?.preventDefault();
      onSearch(suggestions?.[selectedSuggestion]?.value);
      setShowSuggestions(false);
    }
  }, [searchQuery, selectedSuggestion, suggestions, terminalHistory, historyIndex, onSearch, saveToHistory]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setShowSuggestions(searchQuery?.length > 0 && suggestions?.length > 0);
  }, [searchQuery?.length, suggestions?.length]);

  const handleBlur = useCallback(() => {
    // Delay to allow suggestion clicks
    setTimeout(() => {
      setIsFocused(false);
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
      setHistoryIndex(-1);
    }, 150);
  }, []);

  const handleSuggestionClick = useCallback((suggestion) => {
    onSearch(suggestion?.value);
    setShowSuggestions(false);
    saveToHistory(suggestion?.value);
    inputRef?.current?.focus();
  }, [onSearch, saveToHistory]);

  const clearSearch = useCallback(() => {
    onSearch('');
    inputRef?.current?.focus();
  }, [onSearch]);

  return (
    <div className={`relative ${className}`}>
      {/* Terminal Search Input */}
      <div className={`
        relative flex items-center bg-card/30 border rounded-md transition-all duration-300
        ${isFocused 
          ? 'border-accent shadow-terminal bg-card/50' 
          : 'border-primary/30 hover:border-primary/50'
        }
      `}>
        {/* Terminal Prompt */}
        <div className="flex items-center px-3 py-2 text-accent font-terminal text-sm">
          <Icon name="Terminal" size={16} className="mr-2" />
          <span>$</span>
        </div>

        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Enter matrix command..."
          className="
            flex-1 bg-transparent text-primary font-terminal text-sm py-2 pr-12
            placeholder:text-muted-foreground focus:outline-none
          "
        />

        {/* Loading/Clear Button */}
        <div className="absolute right-3 flex items-center space-x-2">
          {isLoading && (
            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          )}
          {searchQuery && !isLoading && (
            <button
              onClick={clearSearch}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>
      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="
          absolute top-full left-0 right-0 mt-1 bg-card/95 backdrop-blur-sm
          border border-primary/30 rounded-md shadow-terminal-lg z-50 max-h-64 overflow-y-auto
        ">
          {suggestions?.map((suggestion, index) => (
            <button
              key={suggestion?.value}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`
                w-full text-left px-4 py-2 font-terminal text-sm transition-colors
                flex items-center justify-between
                ${index === selectedSuggestion 
                  ? 'bg-primary/20 text-primary' :'text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon name="Search" size={14} className="text-accent" />
                <span>{suggestion?.label || suggestion?.value}</span>
              </div>
              {suggestion?.type && (
                <span className="text-xs text-accent px-2 py-1 bg-accent/20 rounded">
                  {suggestion?.type}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
      {/* Terminal History Hint */}
      {isFocused && terminalHistory?.length > 0 && !showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-muted-foreground font-terminal">
          <div className="bg-card/50 border border-primary/20 rounded px-3 py-2">
            <div className="flex items-center space-x-2">
              <Icon name="History" size={12} />
              <span>Use ↑/↓ arrows to browse command history</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrixSearchInterface;