import React from 'react';

        const AlertCard = ({ type, message, timestamp }) => {
          const getAlertConfig = (type) => {
            switch (type) {
              case 'error':
                return {
                  icon: '🚨',
                  color: 'text-error',
                  bgColor: 'bg-error/10',
                  borderColor: 'border-error/30'
                };
              case 'warning':
                return {
                  icon: '⚠️',
                  color: 'text-warning',
                  bgColor: 'bg-warning/10',
                  borderColor: 'border-warning/30'
                };
              case 'success':
                return {
                  icon: '✅',
                  color: 'text-success',
                  bgColor: 'bg-success/10',
                  borderColor: 'border-success/30'
                };
              default:
                return {
                  icon: 'ℹ️',
                  color: 'text-primary',
                  bgColor: 'bg-primary/10',
                  borderColor: 'border-primary/30'
                };
            }
          };

          const config = getAlertConfig(type);

          return (
            <div className={`
              flex items-start space-x-3 p-3 rounded-lg border
              ${config?.bgColor} ${config?.borderColor}
            `}>
              <span className="text-lg mt-0.5">{config?.icon}</span>
              <div className="flex-1">
                <p className={`text-sm font-terminal ${config?.color} mb-1`}>
                  {message}
                </p>
                <p className="text-xs text-muted-foreground font-terminal">
                  {timestamp}
                </p>
              </div>
            </div>
          );
        };

        export default AlertCard;