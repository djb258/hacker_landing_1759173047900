import React from 'react';
import { AlertTriangle, Clock, ArrowRight, X } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ErrorCard = ({ error, onDismiss, onViewDetails, compact = false }) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const errorTime = new Date(timestamp);
    const diffMs = now - errorTime;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      return `${diffDays}d ago`;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50';
      case 'error':
        return 'border-red-400 bg-red-50';
      case 'warning':
        return 'border-yellow-400 bg-yellow-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': case'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  if (compact) {
    return (
      <div className={`
        p-3 rounded-lg border-l-4 ${getSeverityColor(error?.severity)}
        transition-all hover:shadow-sm cursor-pointer
      `}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-2">
            {getSeverityIcon(error?.severity)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {error?.pattern}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500">
                  {error?.count} occurrences
                </span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">
                  {formatTimeAgo(error?.lastOccurrence)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      rounded-lg border-2 ${getSeverityColor(error?.severity)}
      transition-all hover:shadow-md
    `}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            {getSeverityIcon(error?.severity)}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900">
                {error?.pattern}
              </h4>
              <StatusBadge status={error?.severity} variant="severity" size="xs" />
            </div>
          </div>

          {onDismiss && (
            <button
              onClick={() => onDismiss(error?.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Error Stats */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="bg-white rounded border p-2">
            <div className="text-lg font-bold text-gray-900">{error?.count}</div>
            <div className="text-xs text-gray-500">Occurrences</div>
          </div>
          <div className="bg-white rounded border p-2">
            <div className="flex items-center text-sm text-gray-900">
              <Clock className="w-3 h-3 mr-1" />
              {formatTimeAgo(error?.lastOccurrence)}
            </div>
            <div className="text-xs text-gray-500">Last seen</div>
          </div>
        </div>

        {/* Affected Systems */}
        {error?.affected && error?.affected?.length > 0 && (
          <div className="mb-3">
            <h5 className="text-xs font-medium text-gray-700 mb-2">Affected Systems:</h5>
            <div className="flex flex-wrap gap-1">
              {error?.affected?.map((system, index) => (
                <span 
                  key={index}
                  className="inline-block bg-white border border-gray-200 rounded px-2 py-1 text-xs font-mono text-gray-700"
                >
                  {system}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div className="flex space-x-2">
            <button
              onClick={() => onViewDetails?.(error?.id)}
              className="inline-flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="text-xs text-gray-500">
            ID: {error?.id}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;