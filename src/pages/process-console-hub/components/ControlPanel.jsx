import React from 'react';

        const ControlPanel = ({ title, config, setConfig, onStartJob, type = 'scraping' }) => {
          const handleConfigChange = (key, value) => {
            setConfig(prev => ({ ...prev, [key]: value }));
          };

          const handleStart = () => {
            onStartJob(config);
          };

          const renderScrapingControls = () => (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-terminal text-muted-foreground mb-2">Target URL</label>
                  <input
                    type="url"
                    value={config?.targetUrl || ''}
                    onChange={(e) => handleConfigChange('targetUrl', e?.target?.value)}
                    className="w-full p-3 bg-input border border-primary/30 rounded font-terminal text-sm focus:border-primary focus:outline-none"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-terminal text-muted-foreground mb-2">Crawl Depth</label>
                  <select
                    value={config?.crawlDepth || 3}
                    onChange={(e) => handleConfigChange('crawlDepth', parseInt(e?.target?.value))}
                    className="w-full p-3 bg-input border border-primary/30 rounded font-terminal text-sm focus:border-primary focus:outline-none"
                  >
                    <option value={1}>1 Level</option>
                    <option value={2}>2 Levels</option>
                    <option value={3}>3 Levels</option>
                    <option value={5}>5 Levels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-terminal text-muted-foreground mb-2">Concurrent Requests</label>
                  <input
                    type="number"
                    value={config?.concurrent || 5}
                    onChange={(e) => handleConfigChange('concurrent', parseInt(e?.target?.value))}
                    className="w-full p-3 bg-input border border-primary/30 rounded font-terminal text-sm focus:border-primary focus:outline-none"
                    min="1"
                    max="20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-terminal text-muted-foreground mb-2">Delay (ms)</label>
                  <input
                    type="number"
                    value={config?.delay || 1000}
                    onChange={(e) => handleConfigChange('delay', parseInt(e?.target?.value))}
                    className="w-full p-3 bg-input border border-primary/30 rounded font-terminal text-sm focus:border-primary focus:outline-none"
                    min="0"
                    max="10000"
                    step="500"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-4">
                <label className="flex items-center space-x-2 font-terminal text-sm">
                  <input
                    type="checkbox"
                    checked={config?.respectRobots}
                    onChange={(e) => handleConfigChange('respectRobots', e?.target?.checked)}
                    className="rounded border-primary/30 bg-input"
                  />
                  <span>Respect robots.txt</span>
                </label>
              </div>
            </>
          );

          const renderVerificationControls = () => (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-terminal text-muted-foreground mb-2">Batch Size</label>
                  <select
                    value={config?.batchSize || 1000}
                    onChange={(e) => handleConfigChange('batchSize', parseInt(e?.target?.value))}
                    className="w-full p-3 bg-input border border-primary/30 rounded font-terminal text-sm focus:border-primary focus:outline-none"
                  >
                    <option value={100}>100 records</option>
                    <option value={500}>500 records</option>
                    <option value={1000}>1,000 records</option>
                    <option value={5000}>5,000 records</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-terminal text-muted-foreground mb-2">Validation Level</label>
                  <select
                    value={config?.validationLevel || 'standard'}
                    onChange={(e) => handleConfigChange('validationLevel', e?.target?.value)}
                    className="w-full p-3 bg-input border border-primary/30 rounded font-terminal text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-terminal text-muted-foreground mb-2">Export Format</label>
                  <select
                    value={config?.exportFormat || 'csv'}
                    onChange={(e) => handleConfigChange('exportFormat', e?.target?.value)}
                    className="w-full p-3 bg-input border border-primary/30 rounded font-terminal text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="csv">CSV</option>
                    <option value="json">JSON</option>
                    <option value="xlsx">Excel</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-4">
                <label className="flex items-center space-x-2 font-terminal text-sm">
                  <input
                    type="checkbox"
                    checked={config?.removeInvalid}
                    onChange={(e) => handleConfigChange('removeInvalid', e?.target?.checked)}
                    className="rounded border-primary/30 bg-input"
                  />
                  <span>Remove invalid records</span>
                </label>
              </div>
            </>
          );

          const renderOutreachControls = () => (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-terminal text-muted-foreground mb-2">Campaign Type</label>
                  <select
                    value={config?.campaignType || 'cold-email'}
                    onChange={(e) => handleConfigChange('campaignType', e?.target?.value)}
                    className="w-full p-3 bg-input border border-primary/30 rounded font-terminal text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="cold-email">Cold Email</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="multi-channel">Multi-channel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-terminal text-muted-foreground mb-2">Daily Limit</label>
                  <input
                    type="number"
                    value={config?.dailyLimit || 50}
                    onChange={(e) => handleConfigChange('dailyLimit', parseInt(e?.target?.value))}
                    className="w-full p-3 bg-input border border-primary/30 rounded font-terminal text-sm focus:border-primary focus:outline-none"
                    min="1"
                    max="1000"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-4">
                <label className="flex items-center space-x-2 font-terminal text-sm">
                  <input
                    type="checkbox"
                    checked={config?.personalization}
                    onChange={(e) => handleConfigChange('personalization', e?.target?.checked)}
                    className="rounded border-primary/30 bg-input"
                  />
                  <span>Enable personalization</span>
                </label>
                <label className="flex items-center space-x-2 font-terminal text-sm">
                  <input
                    type="checkbox"
                    checked={config?.trackOpens}
                    onChange={(e) => handleConfigChange('trackOpens', e?.target?.checked)}
                    className="rounded border-primary/30 bg-input"
                  />
                  <span>Track opens/clicks</span>
                </label>
              </div>
            </>
          );

          return (
            <div className="bg-card/50 border border-primary/30 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-primary font-terminal">
                  {title}
                </h3>
                <button
                  onClick={handleStart}
                  className="px-6 py-2 bg-primary/20 border border-primary text-primary rounded font-terminal text-sm hover:bg-primary/30 transition-colors"
                >
                  START JOB
                </button>
              </div>

              {type === 'scraping' && renderScrapingControls()}
              {type === 'verification' && renderVerificationControls()}
              {type === 'outreach' && renderOutreachControls()}
            </div>
          );
        };

        export default ControlPanel;