import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

// Navigation State Context
const NavigationStateContext = createContext();

// Action Types
const NAVIGATION_ACTIONS = {
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SEARCH_FOCUS: 'SET_SEARCH_FOCUS',
  SET_LOADING: 'SET_LOADING',
  SET_SUGGESTIONS: 'SET_SUGGESTIONS',
  TOGGLE_MATRIX_MODE: 'TOGGLE_MATRIX_MODE',
  SET_KONAMI_PROGRESS: 'SET_KONAMI_PROGRESS',
  ACTIVATE_BREACH_MODE: 'ACTIVATE_BREACH_MODE',
  SET_TERMINAL_COMMAND: 'SET_TERMINAL_COMMAND',
  ADD_COMMAND_HISTORY: 'ADD_COMMAND_HISTORY',
  CLEAR_SEARCH: 'CLEAR_SEARCH'
};

// Initial State
const initialState = {
  searchQuery: '',
  isSearchFocused: false,
  isLoading: false,
  suggestions: [],
  isMatrixMode: false,
  konamiProgress: 0,
  isBreachMode: false,
  currentCommand: '',
  commandHistory: [],
  lastSearchTime: null,
  searchResults: []
};

// Reducer
const navigationReducer = (state, action) => {
  switch (action?.type) {
    case NAVIGATION_ACTIONS?.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action?.payload,
        lastSearchTime: Date.now()
      };

    case NAVIGATION_ACTIONS?.SET_SEARCH_FOCUS:
      return {
        ...state,
        isSearchFocused: action?.payload
      };

    case NAVIGATION_ACTIONS?.SET_LOADING:
      return {
        ...state,
        isLoading: action?.payload
      };

    case NAVIGATION_ACTIONS?.SET_SUGGESTIONS:
      return {
        ...state,
        suggestions: action?.payload
      };

    case NAVIGATION_ACTIONS?.TOGGLE_MATRIX_MODE:
      return {
        ...state,
        isMatrixMode: !state?.isMatrixMode
      };

    case NAVIGATION_ACTIONS?.SET_KONAMI_PROGRESS:
      return {
        ...state,
        konamiProgress: action?.payload
      };

    case NAVIGATION_ACTIONS?.ACTIVATE_BREACH_MODE:
      return {
        ...state,
        isBreachMode: action?.payload,
        isMatrixMode: action?.payload
      };

    case NAVIGATION_ACTIONS?.SET_TERMINAL_COMMAND:
      return {
        ...state,
        currentCommand: action?.payload
      };

    case NAVIGATION_ACTIONS?.ADD_COMMAND_HISTORY:
      return {
        ...state,
        commandHistory: [action?.payload, ...state?.commandHistory?.slice(0, 19)] // Keep last 20
      };

    case NAVIGATION_ACTIONS?.CLEAR_SEARCH:
      return {
        ...state,
        searchQuery: '',
        suggestions: [],
        isLoading: false
      };

    default:
      return state;
  }
};

// Navigation State Provider
export const NavigationStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  // Konami Code Sequence
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  // Konami Code Detection
  useEffect(() => {
    let konamiIndex = 0;
    let konamiTimeout;

    const handleKeyDown = (event) => {
      const expectedKey = konamiCode?.[konamiIndex];
      
      if (event?.code === expectedKey) {
        konamiIndex++;
        dispatch({ type: NAVIGATION_ACTIONS?.SET_KONAMI_PROGRESS, payload: konamiIndex });
        
        // Reset timeout
        clearTimeout(konamiTimeout);
        konamiTimeout = setTimeout(() => {
          konamiIndex = 0;
          dispatch({ type: NAVIGATION_ACTIONS?.SET_KONAMI_PROGRESS, payload: 0 });
        }, 2000);

        // Complete sequence
        if (konamiIndex === konamiCode?.length) {
          dispatch({ type: NAVIGATION_ACTIONS?.ACTIVATE_BREACH_MODE, payload: true });
          konamiIndex = 0;
          clearTimeout(konamiTimeout);
          
          // Auto-disable breach mode after 30 seconds
          setTimeout(() => {
            dispatch({ type: NAVIGATION_ACTIONS?.ACTIVATE_BREACH_MODE, payload: false });
          }, 30000);
        }
      } else {
        konamiIndex = 0;
        dispatch({ type: NAVIGATION_ACTIONS?.SET_KONAMI_PROGRESS, payload: 0 });
        clearTimeout(konamiTimeout);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(konamiTimeout);
    };
  }, []);

  // Action Creators
  const actions = {
    setSearchQuery: useCallback((query) => {
      dispatch({ type: NAVIGATION_ACTIONS?.SET_SEARCH_QUERY, payload: query });
    }, []),

    setSearchFocus: useCallback((focused) => {
      dispatch({ type: NAVIGATION_ACTIONS?.SET_SEARCH_FOCUS, payload: focused });
    }, []),

    setLoading: useCallback((loading) => {
      dispatch({ type: NAVIGATION_ACTIONS?.SET_LOADING, payload: loading });
    }, []),

    setSuggestions: useCallback((suggestions) => {
      dispatch({ type: NAVIGATION_ACTIONS?.SET_SUGGESTIONS, payload: suggestions });
    }, []),

    toggleMatrixMode: useCallback(() => {
      dispatch({ type: NAVIGATION_ACTIONS?.TOGGLE_MATRIX_MODE });
    }, []),

    activateBreachMode: useCallback((active) => {
      dispatch({ type: NAVIGATION_ACTIONS?.ACTIVATE_BREACH_MODE, payload: active });
    }, []),

    setTerminalCommand: useCallback((command) => {
      dispatch({ type: NAVIGATION_ACTIONS?.SET_TERMINAL_COMMAND, payload: command });
    }, []),

    addCommandHistory: useCallback((command) => {
      if (command?.trim()) {
        dispatch({ type: NAVIGATION_ACTIONS?.ADD_COMMAND_HISTORY, payload: command });
      }
    }, []),

    clearSearch: useCallback(() => {
      dispatch({ type: NAVIGATION_ACTIONS?.CLEAR_SEARCH });
    }, []),

    // Terminal Command Processor
    processTerminalCommand: useCallback((command) => {
      const cmd = command?.toLowerCase()?.trim();
      
      switch (cmd) {
        case 'matrix': 
        case 'matrix on':
          dispatch({ type: NAVIGATION_ACTIONS?.TOGGLE_MATRIX_MODE });
          break;
        case 'breach': 
        case 'hack':
          dispatch({ type: NAVIGATION_ACTIONS?.ACTIVATE_BREACH_MODE, payload: true });
          break;
        case 'clear': 
        case 'cls':
          dispatch({ type: NAVIGATION_ACTIONS?.CLEAR_SEARCH });
          break;
        case 'help':
          // Could trigger help modal or suggestions
          break;
        default:
          // Regular search
          dispatch({ type: NAVIGATION_ACTIONS?.SET_SEARCH_QUERY, payload: command });
      }
      
      dispatch({ type: NAVIGATION_ACTIONS?.ADD_COMMAND_HISTORY, payload: command });
    }, [])
  };

  const value = {
    state,
    actions,
    // Computed values
    isKonamiActive: state?.konamiProgress > 0,
    konamiProgress: (state?.konamiProgress / konamiCode?.length) * 100,
    hasSearchQuery: state?.searchQuery?.length > 0,
    canShowSuggestions: state?.suggestions?.length > 0 && state?.isSearchFocused
  };

  return (
    <NavigationStateContext.Provider value={value}>
      {children}
    </NavigationStateContext.Provider>
  );
};

// Custom Hook
export const useNavigationState = () => {
  const context = useContext(NavigationStateContext);
  if (!context) {
    throw new Error('useNavigationState must be used within NavigationStateProvider');
  }
  return context;
};

// HOC for components that need navigation state
export const withNavigationState = (Component) => {
  return function WrappedComponent(props) {
    const navigationState = useNavigationState();
    return <Component {...props} navigationState={navigationState} />;
  };
};

// Add this export to match the default export
export const NavigationStateManager = {
  NavigationStateProvider,
  useNavigationState,
  withNavigationState,
  NAVIGATION_ACTIONS
};

export default NavigationStateManager;