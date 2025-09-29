import React from 'react';

        const QuickActions = ({ onNavigate }) => {
          const quickActions = [
            {
              id: 'process-console',
              label: 'Open Process Console',
              description: 'Access operation controls',
              icon: '🎛️',
              action: () => onNavigate('/process-console-hub'),
              primary: true
            },
            {
              id: 'emergency-stop',
              label: 'Emergency Stop',
              description: 'Stop all active processes',
              icon: '🛑',
              action: () => alert('Emergency stop initiated - All processes paused'),
              danger: true
            },
            {
              id: 'health-check',
              label: 'System Health Check',
              description: 'Run diagnostic scan',
              icon: '🔍',
              action: () => alert('System health check started')
            },
            {
              id: 'backup',
              label: 'Create Backup',
              description: 'Backup current state',
              icon: '💾',
              action: () => alert('Backup process initiated')
            }
          ];

          return (
            <div className="space-y-3">
              {quickActions?.map((action) => (
                <button
                  key={action?.id}
                  onClick={action?.action}
                  className={`
                    w-full text-left p-3 rounded-lg font-terminal text-sm 
                    border transition-all hover:scale-105
                    ${action?.primary
                      ? 'bg-primary/20 border-primary text-primary hover:bg-primary/30'
                      : action?.danger
                      ? 'bg-error/20 border-error text-error hover:bg-error/30' :'bg-card/50 border-primary/30 text-muted-foreground hover:bg-card/70 hover:text-primary'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{action?.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold">{action?.label}</div>
                      <div className="text-xs opacity-75">{action?.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          );
        };

        export default QuickActions;