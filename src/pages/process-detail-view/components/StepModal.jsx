import React from 'react';
import { X, Wrench, Database } from 'lucide-react';

const StepModal = ({ isOpen, step, onClose }) => {
  if (!isOpen || !step) return null;

  const getStatusBadgeClass = (status) => {
    const classes = {
      pending: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };
    return classes?.[status] || classes?.pending;
  };

  const getAltitudeInfo = (altitude) => {
    const info = {
      30000: { label: 'Vision Level', color: 'bg-red-100 text-red-800', description: 'Strategic objectives and high-level goals' },
      20000: { label: 'Category Level', color: 'bg-yellow-100 text-yellow-800', description: 'Planning and resource organization' },
      10000: { label: 'Execution Level', color: 'bg-green-100 text-green-800', description: 'Detailed tasks and implementation' }
    };
    return info?.[altitude] || info?.[10000];
  };

  const altitudeInfo = getAltitudeInfo(step?.altitude);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 pt-6 pb-4 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {step?.title}
                </h3>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(step?.status)}`}>
                    {step?.status?.replace('_', ' ')?.toUpperCase()}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${altitudeInfo?.color}`}>
                    {altitudeInfo?.label} ({step?.altitude?.toLocaleString()}ft)
                  </span>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white px-6 py-6">
            {/* Description */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600 leading-relaxed">
                {step?.description}
              </p>
            </div>

            {/* Altitude Information */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Altitude Level</h4>
              <p className="text-gray-600">
                {altitudeInfo?.description}
              </p>
            </div>

            {/* Step Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Step Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Unique ID:</span>
                    <span className="text-gray-900 font-mono">{step?.unique_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Process ID:</span>
                    <span className="text-gray-900 font-mono">{step?.process_id}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Resources</h4>
                <div className="space-y-2">
                  {step?.tool_id && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Wrench className="h-4 w-4" />
                      <span>Tool: {step?.tool_id}</span>
                    </div>
                  )}
                  
                  {step?.table_reference && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Database className="h-4 w-4" />
                      <span>Table: {step?.table_reference}</span>
                    </div>
                  )}
                  
                  {!step?.tool_id && !step?.table_reference && (
                    <p className="text-sm text-gray-500 italic">No specific resources defined</p>
                  )}
                </div>
              </div>
            </div>

            {/* Placeholder for future content */}
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Step Details (Coming Soon)
                </h4>
                <p className="text-sm text-gray-500">
                  Detailed doctrine text, attachments, and step history will be available here.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepModal;