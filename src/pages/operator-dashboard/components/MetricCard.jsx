import React from 'react';

        const MetricCard = ({ title, value, status, icon }) => {
          const getStatusColor = (status) => {
            switch (status) {
              case 'success':
                return 'text-success border-success';
              case 'warning':
                return 'text-warning border-warning';
              case 'error':
                return 'text-error border-error';
              case 'active':
                return 'text-primary border-primary';
              default:
                return 'text-muted-foreground border-muted';
            }
          };

          const statusColors = getStatusColor(status);

          return (
            <div className={`
              bg-card/50 border rounded-lg p-6 
              ${statusColors}
              hover:bg-card/70 transition-all
            `}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{icon}</span>
                <div className={`
                  w-3 h-3 rounded-full animate-pulse
                  ${status === 'success' ? 'bg-success' : 
                    status === 'warning' ? 'bg-warning' :
                    status === 'error' ? 'bg-error' :
                    status === 'active' ? 'bg-primary' : 'bg-muted-foreground'}
                `}></div>
              </div>
              <div className="mb-1">
                <div className={`text-2xl font-bold font-terminal ${statusColors?.split(' ')?.[0]}`}>
                  {value}
                </div>
              </div>
              <div className="text-sm text-muted-foreground font-terminal">
                {title}
              </div>
            </div>
          );
        };

        export default MetricCard;