import React from 'react';
import StepCard from './StepCard';
import { Eye, Layers, Target } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const PhaseGroup = ({ altitude, title, color, description, steps, onStepClick }) => {
  const getPhaseIcon = (altitudeLevel) => {
    const icons = {
      30000: Eye,
      20000: Layers,
      10000: Target
    };
    return icons?.[altitudeLevel] || Target;
  };

  const getColorClasses = (colorName) => {
    const classes = {
      red: {
        badge: 'bg-red-100 text-red-800 border-red-200',
        border: 'border-red-200',
        gradient: 'from-red-50 to-red-100'
      },
      yellow: {
        badge: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        border: 'border-yellow-200',
        gradient: 'from-yellow-50 to-yellow-100'
      },
      green: {
        badge: 'bg-green-100 text-green-800 border-green-200',
        border: 'border-green-200',
        gradient: 'from-green-50 to-green-100'
      }
    };
    return classes?.[colorName] || classes?.green;
  };

  const Icon = getPhaseIcon(altitude);
  const colorClasses = getColorClasses(color);

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div className={`bg-gradient-to-r ${colorClasses?.gradient} rounded-xl p-6 border ${colorClasses?.border}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${colorClasses?.badge}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {title} Level
              </h2>
              <p className="text-gray-600">
                {description}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colorClasses?.badge}`}>
              {altitude?.toLocaleString()}ft
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>{steps?.length || 0} steps</span>
          {steps?.length > 0 && (
            <>
              <span>•</span>
              <span>
                {steps?.filter(step => step?.status === 'completed')?.length} completed
              </span>
              <span>•</span>
              <span>
                {steps?.filter(step => step?.status === 'in_progress')?.length} in progress
              </span>
            </>
          )}
        </div>
      </div>
      {/* Steps Grid */}
      {steps && steps?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps?.map((step) => (
            <StepCard
              key={step?.unique_id}
              step={step}
              onClick={onStepClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Icon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No steps defined for {title} level
          </h3>
          <p className="text-gray-500">
            Steps for this altitude level will appear here once they are added to the process.
          </p>
        </div>
      )}
    </div>
  );
};

export default PhaseGroup;