import React, { useState } from 'react';
        import RunnerButton from './RunnerButton';
        import ProcessCard from './ProcessCard';
        import ControlPanel from './ControlPanel';

        const VerificationConsole = () => {
          const [activeJobs, setActiveJobs] = useState([
            {
              id: 'verify-001',
              name: 'Email Validation Batch',
              status: 'running',
              progress: 43,
              target: 'email-list-2024.csv',
              itemsProcessed: 892,
              startTime: '13:45:22',
              runner: 'MillionVerifier'
            }
          ]);

          const [config, setConfig] = useState({
            batchSize: 1000,
            validationLevel: 'standard',
            removeInvalid: true,
            exportFormat: 'csv'
          });

          const handleStartVerification = (jobConfig) => {
            const newJob = {
              id: `verify-${Date.now()}`,
              name: jobConfig?.name || 'Data Verification Job',
              status: 'running',
              progress: 0,
              target: jobConfig?.target || 'dataset.csv',
              itemsProcessed: 0,
              startTime: new Date()?.toLocaleTimeString(),
              runner: jobConfig?.runner || 'MillionVerifier'
            };
            
            setActiveJobs(prev => [...prev, newJob]);
            
            // Simulate progress
            const progressInterval = setInterval(() => {
              setActiveJobs(prevJobs => 
                prevJobs?.map(job => 
                  job?.id === newJob?.id 
                    ? { 
                        ...job, 
                        progress: Math.min(100, job?.progress + Math.random() * 8),
                        itemsProcessed: job?.itemsProcessed + Math.floor(Math.random() * 30)
                      }
                    : job
                )
              );
            }, 2500);

            setTimeout(() => {
              clearInterval(progressInterval);
              setActiveJobs(prevJobs => 
                prevJobs?.map(job => 
                  job?.id === newJob?.id ? { ...job, status: 'completed', progress: 100 } : job
                )
              );
            }, 20000);
          };

          return (
            <div className="space-y-6">
              {/* Control Panel */}
              <ControlPanel
                title="Verification Configuration"
                config={config}
                setConfig={setConfig}
                onStartJob={handleStartVerification}
                type="verification"
              />

              {/* Verification Tools */}
              <div className="bg-card/50 border border-primary/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-4 font-terminal">
                  VALIDATION TOOLS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <RunnerButton
                    title="MillionVerifier"
                    description="Email validation service"
                    status="active"
                    onClick={() => handleStartVerification({ name: 'Email Verification', runner: 'MillionVerifier', target: 'email-list.csv' })}
                  />
                  <RunnerButton
                    title="Phone Validator"
                    description="Phone number verification"
                    status="idle"
                    onClick={() => handleStartVerification({ name: 'Phone Verification', runner: 'PhoneValidator', target: 'phone-list.csv' })}
                  />
                  <RunnerButton
                    title="Data Quality Check"
                    description="Comprehensive validation"
                    status="idle"
                    onClick={() => handleStartVerification({ name: 'Quality Check', runner: 'DataQuality', target: 'contact-db.csv' })}
                  />
                  <RunnerButton
                    title="Duplicate Remover"
                    description="Deduplication process"
                    status="warning"
                    onClick={() => alert('Duplicate remover requires dataset selection')}
                  />
                </div>
              </div>

              {/* Active Verification Jobs */}
              <div className="bg-card/50 border border-primary/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-4 font-terminal">
                  ACTIVE VERIFICATION JOBS
                </h3>
                <div className="space-y-4">
                  {activeJobs?.map((job) => (
                    <ProcessCard
                      key={job?.id}
                      process={job}
                      type="verification"
                    />
                  ))}
                  {activeJobs?.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground font-terminal">
                      No active verification jobs
                    </div>
                  )}
                </div>
              </div>

              {/* Verification Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card/30 border border-success/20 rounded p-4">
                  <div className="text-sm text-muted-foreground font-terminal mb-1">Valid Records</div>
                  <div className="text-2xl font-bold text-success font-terminal">78.4%</div>
                </div>
                <div className="bg-card/30 border border-warning/20 rounded p-4">
                  <div className="text-sm text-muted-foreground font-terminal mb-1">Risky Records</div>
                  <div className="text-2xl font-bold text-warning font-terminal">15.2%</div>
                </div>
                <div className="bg-card/30 border border-error/20 rounded p-4">
                  <div className="text-sm text-muted-foreground font-terminal mb-1">Invalid Records</div>
                  <div className="text-2xl font-bold text-error font-terminal">6.4%</div>
                </div>
                <div className="bg-card/30 border border-primary/20 rounded p-4">
                  <div className="text-sm text-muted-foreground font-terminal mb-1">Processing Speed</div>
                  <div className="text-2xl font-bold text-primary font-terminal">2.1k/min</div>
                </div>
              </div>
            </div>
          );
        };

        export default VerificationConsole;