import React from 'react';

        const StatusCard = ({ title, status, count, description, onViewDetails }) => {
          const getStatusConfig = (status) => {
            switch (status) {
              case 'active':
                return {
                  color: 'text-primary',
                  bgColor: 'bg-primary/20',
                  borderColor: 'border-primary',
                  badge: 'ACTIVE',
                  icon: '🟢'
                };
              case 'warning':
                return {
                  color: 'text-warning',
                  bgColor: 'bg-warning/20',
                  borderColor: 'border-warning',
                  badge: 'WARNING',
                  icon: '🟡'
                };
              case 'error':
                return {
                  color: 'text-error',
                  bgColor: 'bg-error/20',
                  borderColor: 'border-error',
                  badge: 'ERROR',
                  icon: '🔴'
                };
              case 'success':
                return {
                  color: 'text-success',
                  bgColor: 'bg-success/20',
                  borderColor: 'border-success',
                  badge: 'SUCCESS',
                  icon: '✅'
                };
              default:
                return {
                  color: 'text-muted-foreground',
                  bgColor: 'bg-muted/20',
                  borderColor: 'border-muted',
                  badge: 'IDLE',
                  icon: '⚪'
                };
            }
          };

          const config = getStatusConfig(status);

          return (
            <div className={`
              bg-card/50 border ${config?.borderColor} rounded-lg p-6 
              hover:bg-card/70 transition-all cursor-pointer
              transform hover:scale-105
            `}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-foreground font-terminal">
                  {title}
                </h3>
                <div className={`
                  px-2 py-1 rounded text-xs font-terminal font-bold
                  ${config?.bgColor} ${config?.color}
                `}>
                  {config?.badge}
                </div>
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">{config?.icon}</span>
                <div>
                  <div className={`text-2xl font-bold ${config?.color} font-terminal`}>
                    {count}
                  </div>
                  <div className="text-sm text-muted-foreground font-terminal">
                    {description}
                  </div>
                </div>
              </div>
              <button
                onClick={onViewDetails}
                className={`
                  w-full py-2 px-4 border rounded font-terminal text-sm
                  ${config?.borderColor} ${config?.color}
                  hover:${config?.bgColor} transition-colors
                `}
              >
                VIEW DETAILS
              </button>
            </div>
          );
        };

        export default StatusCard;