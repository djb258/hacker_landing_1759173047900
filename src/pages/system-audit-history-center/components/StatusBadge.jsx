import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Clock, Info } from 'lucide-react';
import Icon from '../../../components/AppIcon';


const StatusBadge = ({ status, variant = 'status', size = 'sm' }) => {
  const getStatusConfig = (status, variant) => {
    if (variant === 'severity') {
      switch (status) {
        case 'critical':
          return {
            color: 'bg-red-100 text-red-800 border-red-200',
            icon: XCircle,
            label: 'Critical'
          };
        case 'error':
          return {
            color: 'bg-red-100 text-red-800 border-red-200',
            icon: XCircle,
            label: 'Error'
          };
        case 'warning':
          return {
            color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            icon: AlertTriangle,
            label: 'Warning'
          };
        case 'info':
          return {
            color: 'bg-blue-100 text-blue-800 border-blue-200',
            icon: Info,
            label: 'Info'
          };
        default:
          return {
            color: 'bg-gray-100 text-gray-800 border-gray-200',
            icon: Clock,
            label: status
          };
      }
    }

    // Default status variant
    switch (status) {
      case 'success':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          label: 'Success'
        };
      case 'warning':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: AlertTriangle,
          label: 'Warning'
        };
      case 'error':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle,
          label: 'Error'
        };
      case 'pending':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Clock,
          label: 'Pending'
        };
      case 'active':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          label: 'Active'
        };
      case 'inactive':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          label: 'Inactive'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          label: status || 'Unknown'
        };
    }
  };

  const config = getStatusConfig(status, variant);
  const Icon = config?.icon;
  
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-base'
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <span className={`
      inline-flex items-center space-x-1 font-medium rounded-full border
      ${config?.color} ${sizeClasses?.[size]}
    `}>
      <Icon className={iconSizes?.[size]} />
      <span className="capitalize">{config?.label}</span>
    </span>
  );
};

export default StatusBadge;