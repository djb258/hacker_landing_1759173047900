import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import StatusBadge from './StatusBadge';

const AuditLogTable = ({ data = [], onSelectEntry, compact = false }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(id)) {
      newExpanded?.delete(id);
    } else {
      newExpanded?.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const sortedData = [...data]?.sort((a, b) => {
    if (!sortConfig?.key) return 0;
    
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (sortConfig?.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date?.toLocaleDateString(),
      time: date?.toLocaleTimeString()
    };
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  if (compact) {
    return (
      <div className="space-y-2">
        {sortedData?.map((entry) => (
          <div 
            key={entry?.id} 
            className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onSelectEntry?.(entry?.entity)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(entry?.status)}
                <span className="font-medium text-sm">{entry?.event}</span>
              </div>
              <span className="text-xs text-gray-500">
                {formatTimestamp(entry?.timestamp)?.time}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{entry?.entity}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-semibold text-gray-900">Audit Log Entries</h3>
        <p className="text-sm text-gray-600 mt-1">Chronological system events with detailed context</p>
      </div>
      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b sticky top-0">
            <tr>
              <th className="w-8 px-4 py-3"></th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('timestamp')}
              >
                Timestamp
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('event')}
              >
                Event
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('user')}
              >
                User
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('entity')}
              >
                Entity
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData?.map((entry) => (
              <React.Fragment key={entry?.id}>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleExpanded(entry?.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {expandedRows?.has(entry?.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {formatTimestamp(entry?.timestamp)?.date}
                      </div>
                      <div className="text-gray-500">
                        {formatTimestamp(entry?.timestamp)?.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{entry?.event}</div>
                    <div className="text-sm text-gray-500">{entry?.action}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{entry?.user}</td>
                  <td className="px-4 py-3">
                    <span 
                      className="text-sm font-mono bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => onSelectEntry?.(entry?.entity)}
                    >
                      {entry?.entity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <StatusBadge status={entry?.status} />
                      <StatusBadge status={entry?.severity} variant="severity" />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      className="text-blue-600 hover:text-blue-800 p-1"
                      onClick={() => onSelectEntry?.(entry?.entity)}
                      title="View related timeline"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>

                {/* Expanded Details */}
                {expandedRows?.has(entry?.id) && (
                  <tr>
                    <td colSpan="7" className="px-4 py-3 bg-gray-50 border-t">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Event Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-gray-500 uppercase">Event ID</label>
                              <p className="text-sm font-mono">{entry?.id}</p>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 uppercase">Severity</label>
                              <p className="text-sm capitalize">{entry?.severity}</p>
                            </div>
                          </div>
                        </div>
                        
                        {entry?.details && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Additional Context</h4>
                            <pre className="text-xs bg-gray-100 p-3 rounded border overflow-auto">
                              {JSON.stringify(entry?.details, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {sortedData?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No audit entries match your current filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogTable;