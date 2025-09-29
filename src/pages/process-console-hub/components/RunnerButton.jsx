import React from 'react';

        const RunnerButton = ({ title, description, status, onClick }) => {
          const getStatusConfig = (status) => {
            switch (status) {
              case 'active':
                return {
                  color: 'text-primary',
                  bgColor: 'bg-primary/20',
                  borderColor: 'border-primary',
                  hoverColor: 'hover:bg-primary/30',
                  indicator: '🟢'
                };
              case 'warning':
                return {
                  color: 'text-warning',
                  bgColor: 'bg-warning/20',
                  borderColor: 'border-warning',
                  hoverColor: 'hover:bg-warning/30',
                  indicator: '🟡'
                };
              case 'error':
                return {
                  color: 'text-error',
                  bgColor: 'bg-error/20',
                  borderColor: 'border-error',
                  hoverColor: 'hover:bg-error/30',
                  indicator: '🔴'
                };
              default:
                return {
                  color: 'text-muted-foreground',
                  bgColor: 'bg-muted/20',
                  borderColor: 'border-muted',
                  hoverColor: 'hover:bg-primary/20 hover:text-primary hover:border-primary',
                  indicator: '⚪'
                };
            }
          };

          const config = getStatusConfig(status);

          return (
            <button
              onClick={onClick}
              className={`
                w-full p-4 rounded-lg border font-terminal text-sm
                ${config?.bgColor} ${config?.borderColor} ${config?.color}
                ${config?.hoverColor} transition-all
                transform hover:scale-105 hover:shadow-lg
              `}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-lg">{config?.indicator}</span>
                <div className="text-xs opacity-75">CLICK TO RUN</div>
              </div>
              <div className="text-left">
                <div className="font-semibold mb-1">{title}</div>
                <div className="text-xs opacity-75">{description}</div>
              </div>
            </button>
          );
        };

        export default RunnerButton;