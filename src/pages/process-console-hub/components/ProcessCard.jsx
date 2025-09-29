import React from 'react';

        const ProcessCard = ({ process, type }) => {
          const getStatusColor = (status) => {
            switch (status) {
              case 'running':
                return 'text-primary border-primary bg-primary/10';
              case 'completed':
                return 'text-success border-success bg-success/10';
              case 'paused':
                return 'text-warning border-warning bg-warning/10';
              case 'error':
                return 'text-error border-error bg-error/10';
              default:
                return 'text-muted-foreground border-muted bg-muted/10';
            }
          };

          const getTypeIcon = (type) => {
            switch (type) {
              case 'scraping':
                return '🕷️';
              case 'verification':
                return '✅';
              case 'outreach':
                return '📤';
              default:
                return '⚙️';
            }
          };

          const getStatusIcon = (status) => {
            switch (status) {
              case 'running':
                return '▶️';
              case 'completed':
                return '✅';
              case 'paused':
                return '⏸️';
              case 'error':
                return '❌';
              default:
                return '⏹️';
            }
          };

          const statusColors = getStatusColor(process?.status);
          const typeIcon = getTypeIcon(type);
          const statusIcon = getStatusIcon(process?.status);

          return (
            <div className={`
              border rounded-lg p-4 ${statusColors}
              transition-all hover:scale-102
            `}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{typeIcon}</span>
                  <div>
                    <h4 className="font-bold font-terminal">{process?.name}</h4>
                    <p className="text-sm opacity-75 font-terminal">Runner: {process?.runner}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{statusIcon}</span>
                  <span className="text-xs font-terminal font-bold uppercase px-2 py-1 rounded bg-current/20">
                    {process?.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3 text-sm font-terminal">
                <div>
                  <div className="opacity-75">Target</div>
                  <div className="font-bold">{process?.target}</div>
                </div>
                <div>
                  <div className="opacity-75">
                    {type === 'scraping' ? 'Extracted' : type === 'verification' ? 'Processed' : 'Sent'}
                  </div>
                  <div className="font-bold">{process?.itemsExtracted || process?.itemsProcessed}</div>
                </div>
                <div>
                  <div className="opacity-75">Started</div>
                  <div className="font-bold">{process?.startTime}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1 text-xs font-terminal">
                  <span>Progress</span>
                  <span>{process?.progress}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      process?.status === 'running' ? 'bg-current animate-pulse' : 'bg-current'
                    }`}
                    style={{ width: `${process?.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {process?.status === 'running' && (
                  <button className="flex-1 py-1 px-3 text-xs font-terminal border border-current rounded hover:bg-current/20 transition-colors">
                    PAUSE
                  </button>
                )}
                {process?.status === 'paused' && (
                  <button className="flex-1 py-1 px-3 text-xs font-terminal border border-current rounded hover:bg-current/20 transition-colors">
                    RESUME
                  </button>
                )}
                <button className="flex-1 py-1 px-3 text-xs font-terminal border border-current rounded hover:bg-current/20 transition-colors">
                  DETAILS
                </button>
                <button className="flex-1 py-1 px-3 text-xs font-terminal border border-current rounded hover:bg-current/20 transition-colors">
                  LOGS
                </button>
              </div>
            </div>
          );
        };

        export default ProcessCard;