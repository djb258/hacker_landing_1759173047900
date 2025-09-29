import React from 'react';
        import { useNavigate } from 'react-router-dom';

        const Sidebar = ({ currentPath }) => {
          const navigate = useNavigate();

          const menuItems = [
            {
              id: 'dashboard',
              label: 'Dashboard',
              path: '/operator-dashboard',
              icon: '📊',
              description: 'System overview'
            },
            {
              id: 'consoles',
              label: 'Process Consoles',
              path: '/process-console-hub',
              icon: '🎛️',
              description: 'Operation controls'
            },
            {
              id: 'audit',
              label: 'Audit Logs',
              path: '/audit-log',
              icon: '📋',
              description: 'Coming soon...',
              disabled: true
            },
            {
              id: 'history',
              label: 'History',
              path: '/history',
              icon: '🕒',
              description: 'Coming soon...',
              disabled: true
            },
            {
              id: 'errors',
              label: 'Error Center',
              path: '/errors',
              icon: '🚨',
              description: 'Coming soon...',
              disabled: true
            }
          ];

          const handleNavigation = (item) => {
            if (!item?.disabled) {
              navigate(item?.path);
            }
          };

          return (
            <div className="fixed left-0 top-0 w-64 h-full bg-card/80 border-r border-primary/30 backdrop-blur-sm z-40">
              {/* Logo/Header */}
              <div className="p-6 border-b border-primary/30">
                <h2 className="text-xl font-bold text-primary font-terminal">
                  <span className="text-accent">&gt;</span> BARTON CORE
                </h2>
                <p className="text-xs text-muted-foreground mt-1 font-terminal">
                  Operator Cockpit v2.1
                </p>
              </div>
              {/* Navigation Menu */}
              <nav className="p-4">
                <div className="space-y-2">
                  {menuItems?.map((item) => (
                    <button
                      key={item?.id}
                      onClick={() => handleNavigation(item)}
                      disabled={item?.disabled}
                      className={`
                        w-full text-left p-3 rounded-lg font-terminal text-sm transition-all
                        ${currentPath === item?.path
                          ? 'bg-primary/20 border border-primary text-primary'
                          : item?.disabled
                          ? 'text-muted-foreground/50 cursor-not-allowed'
                          : 'text-muted-foreground hover:bg-primary/10 hover:text-primary border border-transparent'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{item?.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold">{item?.label}</div>
                          <div className="text-xs opacity-75">{item?.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </nav>
              {/* System Status */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary/30">
                <div className="flex items-center space-x-2 text-xs font-terminal">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-muted-foreground">System: OPERATIONAL</span>
                </div>
                <div className="text-xs text-muted-foreground/75 mt-1 font-terminal">
                  Build: {new Date()?.getFullYear()}.12.{new Date()?.getDate()}
                </div>
              </div>
            </div>
          );
        };

        export default Sidebar;