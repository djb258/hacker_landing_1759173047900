import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { ArrowRight, Eye, Layers, Target, CheckCircle } from 'lucide-react';
import Icon from '../../components/AppIcon';


const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Navigate Projects at
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Every Altitude
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Master project execution with our altitude-based methodology. From 30,000ft vision to 10,000ft execution, 
            track every step of your journey with precision and clarity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/process/proj-001"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Demo Process
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link
              to="/"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color, altitudeLevel }) => {
  const colorClasses = {
    red: 'from-red-500 to-red-600 text-red-600 border-red-200 bg-red-50',
    yellow: 'from-yellow-500 to-yellow-600 text-yellow-600 border-yellow-200 bg-yellow-50',
    green: 'from-green-500 to-green-600 text-green-600 border-green-200 bg-green-50'
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-8">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${colorClasses?.[color]} mb-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        
        <div className="mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses?.[color]?.split(' ')?.[3]} ${colorClasses?.[color]?.split(' ')?.[4]}`}>
            {altitudeLevel}ft
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300" />
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Eye,
      title: 'Vision Level',
      description: 'Define strategic objectives and long-term goals at the highest altitude. Set the direction for your entire project with clarity and purpose.',
      color: 'red',
      altitudeLevel: '30,000'
    },
    {
      icon: Layers,
      title: 'Category Level',
      description: 'Organize resources, timelines, and dependencies. Break down your vision into manageable categories and actionable plans.',
      color: 'yellow',
      altitudeLevel: '20,000'
    },
    {
      icon: Target,
      title: 'Execution Level',
      description: 'Execute specific tasks with precision. Track progress, manage details, and deliver results at the ground level.',
      color: 'green',
      altitudeLevel: '10,000'
    }
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Three Levels of Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our altitude-based approach ensures no detail is missed while maintaining 
            strategic focus throughout your project lifecycle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features?.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CTASection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Ready to Elevate Your Projects?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Start tracking your processes with altitude-based precision today.
        </p>
        
        <Link
          to="/process/proj-001"
          className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <CheckCircle className="mr-2 h-5 w-5" />
          Start Your First Project
        </Link>
      </div>
    </div>
  );
};

const ProjectLandingPage = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </Layout>
  );
};

export default ProjectLandingPage;