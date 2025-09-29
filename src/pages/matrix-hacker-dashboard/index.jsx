import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import MatrixRain from './components/MatrixRain';
import HackerCard from './components/HackerCard';
import MatrixHeader from './components/MatrixHeader';
import KonamiDetector from './components/KonamiDetector';
import GlitchEffect from './components/GlitchEffect';

const MatrixHackerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isBreachMode, setIsBreachMode] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [globalGlitch, setGlobalGlitch] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hacker tools data with exact titles and upvotes
  const hackerTools = [
    {
      id: 1,
      title: "Neural Network Infiltrator",
      upvotes: 1337,
      description: `Advanced AI-powered penetration testing framework designed to bypass modern security protocols through machine learning pattern recognition and adaptive exploitation techniques.`,
      difficulty: "hard"
    },
    {
      id: 2,
      title: "Quantum Encryption Breaker",
      upvotes: 2048,
      description: `Revolutionary quantum computing exploit that leverages superposition algorithms to crack RSA-4096 encryption in real-time through parallel universe calculations.`,
      difficulty: "hard"
    },
    {
      id: 3,
      title: "Social Engineering Toolkit",
      upvotes: 892,
      description: `Comprehensive psychological manipulation framework with automated phishing campaigns, deepfake voice synthesis, and behavioral analysis for human vulnerability exploitation.`,
      difficulty: "medium"
    },
    {
      id: 4,
      title: "Blockchain Vulnerability Scanner",
      upvotes: 1564,
      description: `Smart contract auditing tool that identifies zero-day exploits in DeFi protocols, enabling flash loan attacks and reentrancy vulnerabilities discovery.`,
      difficulty: "medium"
    },
    {
      id: 5,
      title: "IoT Botnet Commander",
      upvotes: 756,
      description: `Distributed network control system for compromised Internet of Things devices, creating massive botnets for coordinated cyber attacks and data harvesting operations.`,
      difficulty: "easy"
    },
    {
      id: 6,
      title: "Zero-Day Exploit Generator",
      upvotes: 3421,
      description: `Automated vulnerability discovery engine that generates custom exploits for unknown security flaws using fuzzing algorithms and reverse engineering techniques.`,
      difficulty: "hard"
    },
    {
      id: 7,
      title: "Memory Injection Framework",
      upvotes: 2156,
      description: `Advanced process memory manipulation tool that bypasses ASLR and DEP protections, enabling arbitrary code execution through sophisticated shellcode injection techniques.`,
      difficulty: "hard"
    },
    {
      id: 8,
      title: "Steganography Decoder Suite",
      upvotes: 1089,
      description: `Multi-format hidden data extraction toolkit for images, audio, and video files using advanced statistical analysis and cryptographic pattern recognition algorithms.`,
      difficulty: "medium"
    },
    {
      id: 9,
      title: "DNS Tunneling Orchestrator",
      upvotes: 643,
      description: `Covert communication framework that establishes encrypted channels through DNS queries, bypassing firewalls and deep packet inspection systems undetected.`,
      difficulty: "easy"
    },
    {
      id: 10,
      title: "Biometric Bypass Engine",
      upvotes: 1798,
      description: `Cutting-edge spoofing system that defeats fingerprint, facial recognition, and iris scanners using 3D printing, synthetic media generation, and sensor manipulation.`,
      difficulty: "medium"
    },
    {
      id: 11,
      title: "Cryptocurrency Wallet Cracker",
      upvotes: 2893,
      description: `High-performance GPU-accelerated tool for brute-forcing cryptocurrency private keys and recovering lost wallet passwords using distributed computing architectures.`,
      difficulty: "hard"
    },
    {
      id: 12,
      title: "Radio Frequency Analyzer",
      upvotes: 567,
      description: `Software-defined radio toolkit for intercepting wireless communications, including GSM, WiFi, Bluetooth, and IoT protocols with real-time signal processing.`,
      difficulty: "easy"
    },
    {
      id: 13,
      title: "Machine Learning Adversary",
      upvotes: 1432,
      description: `AI model poisoning framework that crafts adversarial examples to fool neural networks, bypass ML-based security systems, and manipulate automated decision-making.`,
      difficulty: "medium"
    },
    {
      id: 14,
      title: "Cloud Infrastructure Hijacker",
      upvotes: 2764,
      description: `Multi-cloud exploitation platform targeting AWS, Azure, and GCP instances through misconfigured IAM policies, container escapes, and serverless function abuse.`,
      difficulty: "hard"
    },
    {
      id: 15,
      title: "Surveillance Evasion Kit",
      upvotes: 934,
      description: `Privacy protection suite combining facial recognition countermeasures, location spoofing, digital fingerprint randomization, and anti-forensics capabilities.`,
      difficulty: "easy"
    }
  ];

  // Page load animation
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(loadTimer);
  }, []);

  // Global glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < (isBreachMode ? 0.2 : 0.05)) {
        setGlobalGlitch(true);
        setTimeout(() => setGlobalGlitch(false), 300);
      }
    }, 3000 + Math.random() * 5000);

    return () => clearInterval(glitchInterval);
  }, [isBreachMode]);

  // Konami code handlers
  const handleKonamiComplete = useCallback(() => {
    setIsBreachMode(true);
    
    // Auto-disable breach mode after 30 seconds
    setTimeout(() => {
      setIsBreachMode(false);
      setKonamiProgress(0);
    }, 30000);
  }, []);

  const handleKonamiProgress = useCallback((progress) => {
    setKonamiProgress(progress);
  }, []);

  // Search handler
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Filter tools based on search
  const filteredTools = hackerTools?.filter(tool =>
    tool?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    tool?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Matrix Hacker Dashboard - Cyberpunk Terminal Interface</title>
        <meta name="description" content="Immersive Matrix-inspired hacker dashboard with terminal aesthetics, animated rain effects, and cyberpunk tools for tech enthusiasts." />
        <meta name="keywords" content="matrix, hacker, dashboard, cyberpunk, terminal, react, animation" />
      </Helmet>
      <div className={`
        min-h-screen bg-background text-foreground font-mono relative overflow-x-hidden
        transition-all duration-500
        ${isLoaded ? 'opacity-100' : 'opacity-0'}
        ${globalGlitch ? 'animate-pulse' : ''}
      `}>
        {/* Konami Code Detector */}
        <KonamiDetector
          onKonamiComplete={handleKonamiComplete}
          onProgressUpdate={handleKonamiProgress}
        />

        {/* Matrix Rain Background */}
        <MatrixRain isBreachMode={isBreachMode} />

        {/* Matrix Header */}
        <MatrixHeader
          onSearch={handleSearch}
          searchQuery={searchQuery}
          isBreachMode={isBreachMode}
          konamiProgress={konamiProgress}
        />

        {/* Main Content */}
        <main className="relative z-10 pt-24 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title Section */}
            <GlitchEffect isActive={globalGlitch} intensity="medium">
              <div className="text-center mb-12">
                <h2 className={`
                  text-4xl md:text-5xl font-bold font-terminal mb-4 tracking-wider
                  ${isBreachMode ? 'text-error animate-pulse' : 'text-primary'}
                `}>
                  <span className="text-accent">&gt;</span><span className="text-accent">&lt;</span>
                </h2>
                <p className="text-muted-foreground font-terminal text-lg max-w-3xl mx-auto">
                  {isBreachMode 
                    ? "BREACH MODE ACTIVATED - UNLIMITED ACCESS GRANTED" :"Advanced cybersecurity tools and exploits for ethical penetration testing"
                  }
                </p>
                
                {/* System Stats */}
                <div className="flex justify-center items-center space-x-8 mt-6 text-sm font-terminal">
                  <div className="flex items-center space-x-2">
                    <div className={`
                      w-2 h-2 rounded-full animate-pulse
                      ${isBreachMode ? 'bg-error' : 'bg-primary'}
                    `}></div>
                    <span className="text-muted-foreground">
                      {filteredTools?.length} TOOLS AVAILABLE
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                    <span className="text-muted-foreground">
                      SECURITY LEVEL: {isBreachMode ? 'COMPROMISED' : 'MAXIMUM'}
                    </span>
                  </div>
                </div>
              </div>
            </GlitchEffect>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTools?.map((tool, index) => (
                <GlitchEffect 
                  key={tool?.id} 
                  isActive={globalGlitch} 
                  intensity="low"
                >
                  <div 
                    className="animate-fade-in"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <HackerCard
                      title={tool?.title}
                      upvotes={tool?.upvotes}
                      description={tool?.description}
                      difficulty={tool?.difficulty}
                      isBreachMode={isBreachMode}
                    />
                  </div>
                </GlitchEffect>
              ))}
            </div>

            {/* No Results Message */}
            {searchQuery && filteredTools?.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-terminal text-primary mb-2">
                  NO EXPLOITS FOUND
                </h3>
                <p className="text-muted-foreground font-terminal">
                  No tools match your search query: "{searchQuery}"
                </p>
                <div className="mt-4 text-sm font-terminal text-accent">
                  Try: "neural", "quantum", "blockchain", "iot", "zero-day", "memory", "crypto", "cloud"
                </div>
              </div>
            )}

            {/* Breach Mode Indicator */}
            {isBreachMode && (
              <div className="fixed bottom-6 right-6 z-50">
                <div className="bg-error/20 border border-error rounded-lg p-4 backdrop-blur-sm animate-pulse">
                  <div className="flex items-center space-x-3 text-error font-terminal">
                    <div className="w-3 h-3 rounded-full bg-error animate-ping"></div>
                    <span className="font-semibold">BREACH MODE ACTIVE</span>
                  </div>
                  <div className="text-xs text-error/80 mt-1">
                    Enhanced access granted - Auto-disable in 30s
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Terminal Footer */}
        <footer className="relative z-10 border-t border-primary/30 bg-background/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="font-terminal text-sm text-muted-foreground">
                <span className="text-accent">©</span> {new Date()?.getFullYear()} Matrix Hacker Dashboard
                <span className="mx-2">|</span>
                <span>For educational purposes only</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm font-terminal">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-muted-foreground">System Status: OPERATIONAL</span>
                </div>
                <div className="text-muted-foreground">
                  Build: v2.1.0-{new Date()?.getFullYear()}
                </div>
              </div>
            </div>
            
            {/* Easter Egg Hint */}
            <div className="mt-4 text-center text-xs font-terminal text-muted-foreground/50">
              Hint: Try the Konami Code for enhanced access...
            </div>
          </div>
        </footer>
      </div>
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .shadow-terminal {
          box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
        }
        
        .shadow-terminal-lg {
          box-shadow: 0 0 30px rgba(0, 255, 0, 0.4);
        }
      `}</style>
    </>
  );
};

export default MatrixHackerDashboard;