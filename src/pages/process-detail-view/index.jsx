import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useProcesses } from '../../hooks/useProcesses';

import StepModal from './components/StepModal';
import PhaseGroup from './components/PhaseGroup';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

const ProcessDetailView = () => {
  const { id } = useParams();
  const { processes, loading, error, getProcessById } = useProcesses();
  const [selectedStep, setSelectedStep] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const process = getProcessById(id);

  const handleStepClick = (step) => {
    setSelectedStep(step);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedStep(null);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading process details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Process</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!process) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Process Not Found</h2>
            <p className="text-gray-600 mb-4">The process with ID "{id}" could not be found.</p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Group steps by altitude
  const stepsByAltitude = {
    30000: process.steps?.filter(step => step?.altitude === 30000) || [],
    20000: process.steps?.filter(step => step?.altitude === 20000) || [],
    10000: process.steps?.filter(step => step?.altitude === 10000) || []
  };

  const altitudeConfig = [
    {
      altitude: 30000,
      title: 'Vision',
      color: 'red',
      description: 'Strategic objectives and high-level goals'
    },
    {
      altitude: 20000,
      title: 'Category',
      color: 'yellow',
      description: 'Planning and resource organization'
    },
    {
      altitude: 10000,
      title: 'Execution',
      color: 'green',
      description: 'Detailed tasks and implementation'
    }
  ];

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-blue-600 hover:text-blue-800">
                Home
              </Link>
              <span className="text-gray-500">/</span>
              <span className="text-gray-900">Process Details</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {process.name}
                </h1>
                <p className="text-gray-600 text-lg">
                  {process.description}
                </p>
                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                  <span>Process ID: {process.id}</span>
                  <span>•</span>
                  <span>{process.steps?.length || 0} steps</span>
                </div>
              </div>
              
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Process Steps by Altitude */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-12">
            {altitudeConfig?.map((config) => {
              const steps = stepsByAltitude?.[config?.altitude];
              
              return (
                <PhaseGroup
                  key={config?.altitude}
                  altitude={config?.altitude}
                  title={config?.title}
                  color={config?.color}
                  description={config?.description}
                  steps={steps}
                  onStepClick={handleStepClick}
                />
              );
            })}
          </div>
        </div>

        {/* Step Modal */}
        <StepModal
          isOpen={isModalOpen}
          step={selectedStep}
          onClose={handleModalClose}
        />
      </div>
    </Layout>
  );
};

export default ProcessDetailView;