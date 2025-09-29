import React, { useState, useEffect } from 'react';
        import { Helmet } from 'react-helmet';
        import { useNavigate } from 'react-router-dom';
        import Sidebar from './components/Sidebar';
        import StatusCard from './components/StatusCard';
        import MetricCard from './components/MetricCard';
        import AlertCard from './components/AlertCard';
        import QuickActions from './components/QuickActions';

        const OperatorDashboard = () => {
          const navigate = useNavigate();
          const [isLoaded, setIsLoaded] = useState(false);
          const [refreshTrigger, setRefreshTrigger] = useState(0);

          // Mock real-time data
          const [dashboardData, setDashboardData] = useState({
            systemHealth: 98.5,
            activeProcesses: 12,
            successRate: 94.2,
            totalOperations: 1847,
            errors: 3,
            warnings: 7,
            lastUpdate: new Date()?.toLocaleTimeString()
          });

          // Page load animation
          useEffect(() => {
            const loadTimer = setTimeout(() => {
              setIsLoaded(true);
            }, 300);
            return () => clearTimeout(loadTimer);
          }, []);

          // Simulate real-time updates
          useEffect(() => {
            const interval = setInterval(() => {
              setDashboardData(prev => ({
                ...prev,
                systemHealth: Math.max(90, Math.min(100, prev?.systemHealth + (Math.random() - 0.5) * 2)),
                activeProcesses: Math.max(0, prev?.activeProcesses + Math.floor((Math.random() - 0.5) * 3)),
                successRate: Math.max(80, Math.min(100, prev?.successRate + (Math.random() - 0.5) * 1)),
                totalOperations: prev?.totalOperations + Math.floor(Math.random() * 5),
                lastUpdate: new Date()?.toLocaleTimeString()
              }));
            }, 5000);

            return () => clearInterval(interval);
          }, []);

          const handleRefresh = () => {
            setRefreshTrigger(prev => prev + 1);
            // Simulate data refresh
            setDashboardData(prev => ({
              ...prev,
              lastUpdate: new Date()?.toLocaleTimeString()
            }));
          };

          return (
            <>
              <Helmet>
                <title>Operator Dashboard - Barton Outreach Core</title>
                <meta name="description" content="Central command center for monitoring system operations and key performance metrics" />
              </Helmet>
              
              <div className={`
                min-h-screen bg-background text-foreground font-mono
                transition-all duration-500
                ${isLoaded ? 'opacity-100' : 'opacity-0'}
              `}>
                <div className="flex">
                  {/* Sidebar Navigation */}
                  <Sidebar currentPath="/operator-dashboard" />
                  
                  {/* Main Content */}
                  <main className="flex-1 ml-64 p-6">
                    {/* Header */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center">
                        <div>
                          <h1 className="text-3xl font-bold text-primary mb-2">
                            <span className="text-accent">&gt;</span> OPERATOR DASHBOARD
                          </h1>
                          <p className="text-muted-foreground font-terminal">
                            Central command center for system operations
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-muted-foreground font-terminal">
                            Last Update: {dashboardData?.lastUpdate}
                          </div>
                          <button
                            onClick={handleRefresh}
                            className="px-4 py-2 bg-primary/20 border border-primary text-primary rounded font-terminal text-sm hover:bg-primary/30 transition-colors"
                          >
                            REFRESH
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <MetricCard
                        title="System Health"
                        value={`${dashboardData?.systemHealth?.toFixed(1)}%`}
                        status={dashboardData?.systemHealth > 95 ? 'success' : dashboardData?.systemHealth > 85 ? 'warning' : 'error'}
                        icon="💚"
                      />
                      <MetricCard
                        title="Active Processes"
                        value={dashboardData?.activeProcesses}
                        status="active"
                        icon="⚡"
                      />
                      <MetricCard
                        title="Success Rate"
                        value={`${dashboardData?.successRate?.toFixed(1)}%`}
                        status={dashboardData?.successRate > 90 ? 'success' : 'warning'}
                        icon="✅"
                      />
                      <MetricCard
                        title="Total Operations"
                        value={dashboardData?.totalOperations?.toLocaleString()}
                        status="idle"
                        icon="📊"
                      />
                    </div>

                    {/* Status Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                      <StatusCard
                        title="Scraping Operations"
                        status="active"
                        count={5}
                        description="Active crawlers extracting data"
                        onViewDetails={() => navigate('/process-console-hub')}
                      />
                      <StatusCard
                        title="Verification Processes"
                        status="warning"
                        count={3}
                        description="Data validation in progress"
                        onViewDetails={() => navigate('/process-console-hub')}
                      />
                      <StatusCard
                        title="Outreach Campaigns"
                        status="success"
                        count={4}
                        description="Communication workflows active"
                        onViewDetails={() => navigate('/process-console-hub')}
                      />
                    </div>

                    {/* Alerts and Quick Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Recent Alerts */}
                      <div className="bg-card/50 border border-primary/30 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-primary mb-4 font-terminal">
                          RECENT ALERTS
                        </h3>
                        <div className="space-y-3">
                          <AlertCard
                            type="error"
                            message="Scraper timeout on target domain"
                            timestamp="2 minutes ago"
                          />
                          <AlertCard
                            type="warning"
                            message="High API rate limit usage detected"
                            timestamp="5 minutes ago"
                          />
                          <AlertCard
                            type="success"
                            message="Batch verification completed successfully"
                            timestamp="12 minutes ago"
                          />
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="bg-card/50 border border-primary/30 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-primary mb-4 font-terminal">
                          QUICK ACTIONS
                        </h3>
                        <QuickActions onNavigate={navigate} />
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </>
          );
        };

        export default OperatorDashboard;