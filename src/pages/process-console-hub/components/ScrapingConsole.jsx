import React, { useState } from 'react';
        import RunnerButton from './RunnerButton';
        import ProcessCard from './ProcessCard';
        import ControlPanel from './ControlPanel';

        const ScrapingConsole = () => {
          const [activeJobs, setActiveJobs] = useState([
            {
              id: 'scrape-001',
              name: 'LinkedIn Profile Extraction',
              status: 'running',
              progress: 67,
              target: 'linkedin.com',
              itemsExtracted: 1247,
              startTime: '14:23:15',
              runner: 'Apify'
            },
            {
              id: 'scrape-002',
              name: 'Company Data Crawl',
              status: 'queued',
              progress: 0,
              target: 'crunchbase.com',
              itemsExtracted: 0,
              startTime: 'Pending',
              runner: 'Apify'
            }
          ]);

          const [config, setConfig] = useState({
            targetUrl: '',
            crawlDepth: 3,
            respectRobots: true,
            concurrent: 5,
            delay: 1000
          });

          const handleStartJob = (jobConfig) => {
            const newJob = {
              id: `scrape-${Date.now()}`,
              name: jobConfig?.name || 'Custom Scraping Job',
              status: 'running',
              progress: 0,
              target: jobConfig?.targetUrl,
              itemsExtracted: 0,
              startTime: new Date()?.toLocaleTimeString(),
              runner: jobConfig?.runner || 'Apify'
            };
            
            setActiveJobs(prev => [...prev, newJob]);
            
            // Simulate progress
            const progressInterval = setInterval(() => {
              setActiveJobs(prevJobs => 
                prevJobs?.map(job => 
                  job?.id === newJob?.id 
                    ? { 
                        ...job, 
                        progress: Math.min(100, job?.progress + Math.random() * 10),
                        itemsExtracted: job?.itemsExtracted + Math.floor(Math.random() * 50)
                      }
                    : job
                )
              );
            }, 2000);

            setTimeout(() => {
              clearInterval(progressInterval);
              setActiveJobs(prevJobs => 
                prevJobs?.map(job => 
                  job?.id === newJob?.id ? { ...job, status: 'completed', progress: 100 } : job
                )
              );
            }, 15000);
          };

          return (
            <div className="space-y-6">
              {/* Control Panel */}
              <ControlPanel
                title="Scraping Configuration"
                config={config}
                setConfig={setConfig}
                onStartJob={handleStartJob}
              />
              {/* Runner Controls */}
              <div className="bg-card/50 border border-primary/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-4 font-terminal">
                  CRAWLER CONTROLS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <RunnerButton
                    title="Apify Crawler"
                    description="Advanced web scraping"
                    status="active"
                    onClick={() => handleStartJob({ name: 'Apify Job', runner: 'Apify', targetUrl: config?.targetUrl })}
                  />
                  <RunnerButton
                    title="Playwright Scraper"
                    description="Browser automation"
                    status="idle"
                    onClick={() => handleStartJob({ name: 'Playwright Job', runner: 'Playwright', targetUrl: config?.targetUrl })}
                  />
                  <RunnerButton
                    title="Selenium Grid"
                    description="Distributed scraping"
                    status="warning"
                    onClick={() => alert('Selenium Grid requires configuration')}
                  />
                  <RunnerButton
                    title="Custom Parser"
                    description="Specialized extraction"
                    status="idle"
                    onClick={() => handleStartJob({ name: 'Custom Parser Job', runner: 'Custom', targetUrl: config?.targetUrl })}
                  />
                </div>
              </div>
              {/* Active Jobs */}
              <div className="bg-card/50 border border-primary/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-4 font-terminal">
                  ACTIVE SCRAPING JOBS
                </h3>
                <div className="space-y-4">
                  {activeJobs?.map((job) => (
                    <ProcessCard
                      key={job?.id}
                      process={job}
                      type="scraping"
                    />
                  ))}
                  {activeJobs?.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground font-terminal">
                      No active scraping jobs
                    </div>
                  )}
                </div>
              </div>
              {/* Recent Extraction Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card/30 border border-primary/20 rounded p-4">
                  <div className="text-sm text-muted-foreground font-terminal mb-1">Total Extracted</div>
                  <div className="text-2xl font-bold text-primary font-terminal">
                    {activeJobs?.reduce((sum, job) => sum + job?.itemsExtracted, 0)?.toLocaleString()}
                  </div>
                </div>
                <div className="bg-card/30 border border-primary/20 rounded p-4">
                  <div className="text-sm text-muted-foreground font-terminal mb-1">Success Rate</div>
                  <div className="text-2xl font-bold text-success font-terminal">94.2%</div>
                </div>
                <div className="bg-card/30 border border-primary/20 rounded p-4">
                  <div className="text-sm text-muted-foreground font-terminal mb-1">Avg Speed</div>
                  <div className="text-2xl font-bold text-accent font-terminal">12.3/sec</div>
                </div>
              </div>
            </div>
          );
        };

        export default ScrapingConsole;