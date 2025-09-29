import React, { useState, useEffect } from 'react';
        import { Helmet } from 'react-helmet';
        import Sidebar from '../operator-dashboard/components/Sidebar';
        import ScrapingConsole from './components/ScrapingConsole';
        import VerificationConsole from './components/VerificationConsole';
        import OutreachConsole from './components/OutreachConsole';

        const ProcessConsoleHub = () => {
          const [activeTab, setActiveTab] = useState('scraping');
          const [isLoaded, setIsLoaded] = useState(false);

          // Page load animation
          useEffect(() => {
            const loadTimer = setTimeout(() => {
              setIsLoaded(true);
            }, 300);
            return () => clearTimeout(loadTimer);
          }, []);

          const tabs = [
            {
              id: 'scraping',
              label: 'Scraping Operations',
              icon: '🕷️',
              description: 'Web crawling and data extraction'
            },
            {
              id: 'verification',
              label: 'Verification Processes',
              icon: '✅',
              description: 'Data validation and quality assurance'
            },
            {
              id: 'outreach',
              label: 'Outreach Management',
              icon: '📤',
              description: 'Communication campaigns and engagement'
            }
          ];

          const renderActiveConsole = () => {
            switch (activeTab) {
              case 'scraping':
                return <ScrapingConsole />;
              case 'verification':
                return <VerificationConsole />;
              case 'outreach':
                return <OutreachConsole />;
              default:
                return <ScrapingConsole />;
            }
          };

          return (
            <>
              <Helmet>
                <title>Process Console Hub - Barton Outreach Core</title>
                <meta name="description" content="Dedicated interfaces for managing core operational workflows" />
              </Helmet>
              
              <div className={`
                min-h-screen bg-background text-foreground font-mono
                transition-all duration-500
                ${isLoaded ? 'opacity-100' : 'opacity-0'}
              `}>
                <div className="flex">
                  {/* Sidebar Navigation */}
                  <Sidebar currentPath="/process-console-hub" />
                  
                  {/* Main Content */}
                  <main className="flex-1 ml-64 p-6">
                    {/* Header */}
                    <div className="mb-8">
                      <h1 className="text-3xl font-bold text-primary mb-2">
                        <span className="text-accent">&gt;</span> PROCESS CONSOLE HUB
                      </h1>
                      <p className="text-muted-foreground font-terminal">
                        Dedicated interfaces for managing core operational workflows
                      </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="mb-6">
                      <div className="flex space-x-1 bg-card/30 p-1 rounded-lg border border-primary/30">
                        {tabs?.map((tab) => (
                          <button
                            key={tab?.id}
                            onClick={() => setActiveTab(tab?.id)}
                            className={`
                              flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-lg
                              font-terminal text-sm transition-all
                              ${activeTab === tab?.id
                                ? 'bg-primary/20 text-primary border border-primary' :'text-muted-foreground hover:text-primary hover:bg-primary/10'
                              }
                            `}
                          >
                            <span className="text-lg">{tab?.icon}</span>
                            <div className="text-left hidden md:block">
                              <div className="font-semibold">{tab?.label}</div>
                              <div className="text-xs opacity-75">{tab?.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Console */}
                    <div className="transition-all duration-300">
                      {renderActiveConsole()}
                    </div>
                  </main>
                </div>
              </div>
            </>
          );
        };

        export default ProcessConsoleHub;