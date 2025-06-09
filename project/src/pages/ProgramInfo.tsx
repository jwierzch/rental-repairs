import React from 'react';
import { CheckCircle, AlertCircle, DollarSign, Clock, FileText, Phone } from 'lucide-react';

const ProgramInfo = () => {
  const eligibilityRequirements = [
    'Property must be located in Philadelphia',
    'Property must be used as rental housing',
    'Landlord must be current on property taxes',
  ];

  const fundingLimits = [
    { category: 'Small Repairs', amount: '$10,000 to $24,999', description: 'Repairs needed do not exceed $24,000' },
    { category: 'Large Repairs', amount: '$25,000 to $100,000', description: 'Repairs needed do not exceed $100,000' },
  ];

  const applicationProcess = [
    { step: 1, title: 'Initial Consultation', description: 'Complete our assessment and receive personalized guidance on your application strategy' },
    { step: 2, title: 'Document Preparation', description: 'Our team helps gather and prepare all required documentation for your application' },
    { step: 3, title: 'Application Submission', description: 'We submit your complete application package to the government program on your behalf' },
    { step: 4, title: 'Follow-up & Advocacy', description: 'Ongoing communication with program officials and advocacy throughout the approval process' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Government Fund Programs for Small Landlords
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive information about available government funding programs and how our professional application service helps small landlords access these opportunities.
          </p>
        </div>

        {/* Program Overview */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">About Government Fund Programs</h2>
          <p className="text-blue-800 leading-relaxed mb-4">
            There are government programs designed to help small landlords maintain safe, quality rental housing. 
            These programs provide financial assistance for repairs and improvements to rental properties.
          </p>
          <p className="text-blue-800 leading-relaxed">
            Our professional application service specializes in helping small local landlords navigate these complex government programs, 
            ensuring applications are complete, accurate, and positioned for the highest chance of approval.
          </p>
        </div>

        {/* Eligibility Requirements */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Government Program Eligibility</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibilityRequirements.map((requirement, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{requirement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Funding Limits */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <DollarSign className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Available Government Fund Categories</h2>
          </div>
          <div className="space-y-6">
            {fundingLimits.map((category, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                  <span className="text-2xl font-bold text-blue-600">{category.amount}</span>
                </div>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Service Process */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Our Professional Application Service</h2>
          </div>
          <div className="space-y-6">
            {applicationProcess.map((process, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-semibold text-sm">{process.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Benefits */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 mb-8">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Why Small Landlords Use Our Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-green-700">Specialized knowledge of government requirements</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-green-700">Higher approval rates than self-applications</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-green-700">Complete application management and advocacy</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-green-700">Dedicated support for small property owners</span>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Important Program Requirements</h3>
              <ul className="space-y-2 text-amber-700">
                <li>• All work must be performed by licensed and insured contractors</li>
                <li>• Properties subject to pre and post repair inspections</li>
                <li>• Our professional service fee is separate from government funds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramInfo;