import { useState, useEffect } from 'react';
import demoData from '../data/demo_processes.json';

export const useProcesses = () => {
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      try {
        setProcesses(demoData?.processes || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load processes');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getProcessById = (id) => {
    return processes?.find(process => process.id === id) || null;
  };

  const getStepsByAltitude = (processId, altitude) => {
    const process = getProcessById(processId);
    return process?.steps?.filter(step => step?.altitude === altitude) || [];
  };

  return {
    processes,
    loading,
    error,
    getProcessById,
    getStepsByAltitude
  };
};