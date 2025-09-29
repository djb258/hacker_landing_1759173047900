import React, { useState } from 'react';
import { Clock, Database, CheckCircle, AlertCircle, Plus, Edit, Trash2 } from 'lucide-react';

const HistoryTimeline = ({ data = [], selectedEntity, compact = false }) => {
  const [expandedEntries, setExpandedEntries] = useState(new Set());

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedEntries);
    if (newExpanded?.has(id)) {
      newExpanded?.delete(id);
    } else {
      newExpanded?.add(id);
    }
    setExpandedEntries(newExpanded);
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'creation':
        return <Plus className="w-4 h-4 text-green-500" />;
      case 'update':
        return <Edit className="w-4 h-4 text-blue-500" />;
      case 'deletion':
        return <Trash2 className="w-4 h-4 text-red-500" />;
      case 'verification':
        return <CheckCircle className="w-4 h-4 text-purple-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'creation':
        return 'border-green-200 bg-green-50';
      case 'update':
        return 'border-blue-200 bg-blue-50';
      case 'deletion':
        return 'border-red-200 bg-red-50';
      case 'verification':
        return 'border-purple-200 bg-purple-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const eventTime = new Date(timestamp);
    const diffMs = now - eventTime;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} days ago`;
    }
  };

  const sortedData = [...data]?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  if (compact) {
    return (
      <div className="space-y-3">
        {sortedData?.slice(0, 10)?.map((entry, index) => (
          <div key={entry?.id} className="flex items-start space-x-3">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${getEventColor(entry?.type)}`}>
              {getEventIcon(entry?.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{entry?.event}</p>
              <p className="text-xs text-gray-500">{formatRelativeTime(entry?.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-semibold text-gray-900">Entity Lifecycle Timeline</h3>
        <p className="text-sm text-gray-600 mt-1">
          {selectedEntity 
            ? `Timeline for ${selectedEntity}` 
            : 'Interactive timeline of entity state changes and process milestones'
          }
        </p>
      </div>
      {/* Timeline */}
      <div className="flex-1 overflow-auto p-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200"></div>

          {/* Timeline entries */}
          <div className="space-y-6">
            {sortedData?.map((entry, index) => (
              <div key={entry?.id} className="relative flex items-start space-x-4">
                {/* Timeline marker */}
                <div className={`
                  relative z-10 flex-shrink-0 w-12 h-12 rounded-full border-2 
                  flex items-center justify-center bg-white shadow-sm
                  ${getEventColor(entry?.type)}
                `}>
                  {getEventIcon(entry?.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-6">
                  <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow">
                    {/* Event header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{entry?.event}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatRelativeTime(entry?.timestamp)}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Database className="w-3 h-3 mr-1" />
                            {entry?.entity}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleExpanded(entry?.id)}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {expandedEntries?.has(entry?.id) ? 'Less' : 'More'}
                      </button>
                    </div>

                    {/* Event type badge */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${entry?.type === 'creation' ? 'bg-green-100 text-green-800' : ''}
                        ${entry?.type === 'update' ? 'bg-blue-100 text-blue-800' : ''}
                        ${entry?.type === 'deletion' ? 'bg-red-100 text-red-800' : ''}
                        ${entry?.type === 'verification' ? 'bg-purple-100 text-purple-800' : ''}
                        ${entry?.type === 'error' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {entry?.type?.toUpperCase()}
                      </span>
                      
                      {entry?.details?.confidence && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Confidence: {Math.round(entry?.details?.confidence * 100)}%
                        </span>
                      )}
                    </div>

                    {/* Expanded details */}
                    {expandedEntries?.has(entry?.id) && entry?.details && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Event Details</h5>
                        <div className="bg-gray-50 rounded p-3">
                          <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                            {JSON.stringify(entry?.details, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Quick summary for common types */}
                    {!expandedEntries?.has(entry?.id) && entry?.details && (
                      <div className="text-sm text-gray-600">
                        {entry?.type === 'update' && entry?.details?.fields && (
                          <p>Updated fields: {entry?.details?.fields?.join(', ')}</p>
                        )}
                        {entry?.type === 'verification' && entry?.details?.result && (
                          <p>Result: {entry?.details?.result} via {entry?.details?.method}</p>
                        )}
                        {entry?.type === 'creation' && entry?.details?.source && (
                          <p>Source: {entry?.details?.source} ({entry?.details?.provider})</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedData?.length === 0 && (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No timeline entries found</p>
              {selectedEntity && (
                <p className="text-sm text-gray-400 mt-1">
                  No history available for {selectedEntity}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryTimeline;