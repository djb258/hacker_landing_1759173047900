import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Search, Filter, Download, RefreshCw, Calendar } from 'lucide-react';
import AuditLogTable from './components/AuditLogTable';
import HistoryTimeline from './components/HistoryTimeline';

import ErrorCard from './components/ErrorCard';

const SystemAuditHistoryCenter = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('audit');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  // Mock data for demonstration
  const [auditData, setAuditData] = useState([
    {
      id: 'AUD001',
      timestamp: new Date()?.toISOString(),
      event: 'User Login',
      user: 'admin@system.com',
      entity: 'AUTH_SERVICE',
      action: 'LOGIN_SUCCESS',
      severity: 'info',
      status: 'success',
      details: { ip: '192.168.1.100', userAgent: 'Chrome 119.0' }
    },
    {
      id: 'AUD002',
      timestamp: new Date(Date.now() - 300000)?.toISOString(),
      event: 'Data Export',
      user: 'operator@system.com',
      entity: 'EXPORT_MODULE',
      action: 'EXPORT_COMPLETE',
      severity: 'info',
      status: 'success',
      details: { records: 1247, format: 'CSV' }
    },
    {
      id: 'AUD003',
      timestamp: new Date(Date.now() - 600000)?.toISOString(),
      event: 'System Error',
      user: 'system',
      entity: 'DATABASE_CONN',
      action: 'CONNECTION_FAILED',
      severity: 'error',
      status: 'error',
      details: { error: 'Connection timeout', retries: 3 }
    }
  ]);

  const [historyData, setHistoryData] = useState([
    {
      id: 'HIST001',
      timestamp: new Date()?.toISOString(),
      entity: 'COMPANY_12345',
      event: 'Profile Updated',
      type: 'update',
      details: { fields: ['contact_email', 'phone'], confidence: 0.95 }
    },
    {
      id: 'HIST002',
      timestamp: new Date(Date.now() - 900000)?.toISOString(),
      entity: 'COMPANY_12345',
      event: 'Contact Verified',
      type: 'verification',
      details: { method: 'email_bounce', result: 'valid' }
    },
    {
      id: 'HIST003',
      timestamp: new Date(Date.now() - 1800000)?.toISOString(),
      entity: 'COMPANY_12345',
      event: 'Entity Created',
      type: 'creation',
      details: { source: 'web_scraping', provider: 'linkedin' }
    }
  ]);

  const [criticalErrors, setCriticalErrors] = useState([
    {
      id: 'ERR001',
      pattern: 'Database Connection Timeout',
      count: 15,
      lastOccurrence: new Date(Date.now() - 180000)?.toISOString(),
      severity: 'critical',
      affected: ['USER_AUTH', 'DATA_EXPORT']
    },
    {
      id: 'ERR002',
      pattern: 'API Rate Limit Exceeded',
      count: 8,
      lastOccurrence: new Date(Date.now() - 420000)?.toISOString(),
      severity: 'warning',
      affected: ['EXTERNAL_API']
    }
  ]);

  // Page load animation
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(loadTimer);
  }, []);

  // Real-time updates simulation
  useEffect(() => {
    if (!realTimeUpdates) return;

    const interval = setInterval(() => {
      // Randomly add new audit entries
      if (Math.random() < 0.3) {
        const newEntry = {
          id: `AUD${String(auditData?.length + Math.floor(Math.random() * 1000))?.padStart(3, '0')}`,
          timestamp: new Date()?.toISOString(),
          event: ['User Login', 'Data Access', 'System Check', 'Export Complete']?.[Math.floor(Math.random() * 4)],
          user: ['admin@system.com', 'operator@system.com', 'system']?.[Math.floor(Math.random() * 3)],
          entity: ['AUTH_SERVICE', 'DATA_MODULE', 'EXPORT_SERVICE']?.[Math.floor(Math.random() * 3)],
          action: ['LOGIN_SUCCESS', 'ACCESS_GRANTED', 'CHECK_COMPLETE']?.[Math.floor(Math.random() * 3)],
          severity: ['info', 'warning', 'error']?.[Math.floor(Math.random() * 3)],
          status: ['success', 'warning', 'error']?.[Math.floor(Math.random() * 3)],
          details: { note: 'Real-time generated event' }
        };
        setAuditData(prev => [newEntry, ...prev]?.slice(0, 50));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [realTimeUpdates, auditData?.length]);

  const handleExport = (format) => {
    const data = activeTab === 'audit' ? auditData : historyData;
    console.log(`Exporting ${data?.length} records as ${format}`);
    // Export simulation
    alert(`Exporting ${data?.length} records as ${format?.toUpperCase()}`);
  };

  const handleRefresh = () => {
    setAuditData(prev => [...prev]);
    setHistoryData(prev => [...prev]);
  };

  const filteredAuditData = auditData?.filter(entry => {
    const matchesSearch = !searchQuery || 
      entry?.event?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      entry?.user?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      entry?.entity?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    const matchesFilter = filterType === 'all' || entry?.severity === filterType;
    
    return matchesSearch && matchesFilter;
  }) || [];

  return (
    <>
      <Helmet>
        <title>System Audit & History Center</title>
        <meta name="description" content="Comprehensive logging and historical tracking for operational transparency and compliance monitoring" />
      </Helmet>
      <div className={`
        min-h-screen bg-gray-50 transition-all duration-500
        ${isLoaded ? 'opacity-100' : 'opacity-0'}
      `}>
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  System Audit & History Center
                </h1>
                <p className="text-gray-600">
                  Comprehensive operational transparency and compliance monitoring
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={realTimeUpdates}
                    onChange={(e) => setRealTimeUpdates(e?.target?.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">Real-time updates</span>
                </label>
                
                <button
                  onClick={handleRefresh}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
                
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleExport('csv')}
                    className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => handleExport('json')}
                    className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>JSON</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Errors Banner */}
        {criticalErrors?.length > 0 && (
          <div className="px-6 py-4 bg-red-50 border-b border-red-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-red-800 mb-2">Critical Events Requiring Attention</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {criticalErrors?.map(error => (
                <ErrorCard 
                  key={error?.id} 
                  error={error} 
                  onDismiss={() => setCriticalErrors(prev => prev.filter(e => e.id !== error.id))}
                  onViewDetails={() => console.log('View details for:', error.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'audit' ?'border-blue-500 text-blue-600' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Audit Logs
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'history' ?'border-blue-500 text-blue-600' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  History Timeline
                </button>
              </nav>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="mb-6 bg-white rounded-lg shadow-sm p-4 border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search events, users, entities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Filter Type */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Severity</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-end">
                <span className="text-sm text-gray-600">
                  Showing {activeTab === 'audit' ? filteredAuditData?.length : historyData?.length || 0} entries
                </span>
              </div>
            </div>
          </div>

          {/* Content Panes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-400px)]">
            {/* Primary Pane - Audit Logs or History Timeline */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border overflow-hidden">
              {activeTab === 'audit' ? (
                <AuditLogTable 
                  data={filteredAuditData} 
                  onSelectEntry={setSelectedEntity}
                />
              ) : (
                <HistoryTimeline 
                  data={historyData} 
                  selectedEntity={selectedEntity}
                  onSelectEntry={setSelectedEntity}
                />
              )}
            </div>

            {/* Secondary Pane - Cross Reference */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                  {activeTab === 'audit' ? 'Entity Timeline' : 'Related Audit Events'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedEntity 
                    ? `Cross-reference for ${selectedEntity}` 
                    : 'Select an entry to see related information'
                  }
                </p>
              </div>
              
              <div className="p-4 overflow-y-auto h-full">
                {selectedEntity ? (
                  activeTab === 'audit' ? (
                    <HistoryTimeline 
                      data={historyData?.filter(h => h?.entity === selectedEntity)} 
                      compact={true}
                    />
                  ) : (
                    <AuditLogTable 
                      data={auditData?.filter(a => a?.entity === selectedEntity)} 
                      compact={true}
                    />
                  )
                ) : (
                  <div className="text-center text-gray-500 mt-8">
                    <p className="text-sm">Select an entry from the main panel to view cross-referenced information</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SystemAuditHistoryCenter;