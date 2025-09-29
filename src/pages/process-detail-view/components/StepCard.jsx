import React from 'react';
import { Play, CheckCircle, Clock, AlertCircle, Wrench, Database } from 'lucide-react';
import AppIcon from '../../../components/AppIcon';


const StatusIcon = ({ status }) => {
  const icons = {
    pending: Clock,
    in_progress: Play,
    completed: CheckCircle,
    failed: AlertCircle
  };

  const colors = {
    pending: 'text-gray-400',
    in_progress: 'text-blue-500',
    completed: 'text-green-500',
    failed: 'text-red-500'
  };

  const Icon = icons?.[status] || Clock;
  const colorClass = colors?.[status] || 'text-gray-400';

  return <Icon className={`h-5 w-5 ${colorClass}`} />;
};

const StepCard = ({ step, onClick }) => {
  const getStatusBadgeClass = (status) => {
    const classes = {
      pending: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };
    return classes?.[status] || classes?.pending;
  };

  return (
    <div
      onClick={() => onClick?.(step)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:border-blue-300"
    >
      <div className="p-6">
        {/* Header with Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {step?.title}
            </h3>
            <p className="text-sm text-gray-500">
              {step?.unique_id}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <StatusIcon status={step?.status} />
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(step?.status)}`}>
              {step?.status?.replace('_', ' ')?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">
          {step?.description}
        </p>

        {/* Process ID */}
        <div className="mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            Process: {step?.process_id}
          </span>
        </div>

        {/* Tool ID or Table Reference */}
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {step?.tool_id && (
            <div className="flex items-center space-x-1">
              <Wrench className="h-4 w-4" />
              <span>Tool: {step?.tool_id}</span>
            </div>
          )}
          
          {step?.table_reference && (
            <div className="flex items-center space-x-1">
              <Database className="h-4 w-4" />
              <span>Table: {step?.table_reference}</span>
            </div>
          )}
        </div>
      </div>
      {/* Bottom border with hover effect */}
      <div className="h-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 rounded-b-lg" />
    </div>
  );
};

export default StepCard;