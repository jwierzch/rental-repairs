import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertTriangle, Download, Eye, Phone, Mail } from 'lucide-react';

interface UnitInfo {
  unitNumber: string;
  monthlyRent: string;
}

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  numberOfUnits: string;
  rentedOut: string;
  units: UnitInfo[];
  repairType: string[];
  estimatedCost: string;
}

const Dashboard = () => {
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [eligibilityScore, setEligibilityScore] = useState(0);
  const [eligibilityStatus, setEligibilityStatus] = useState('');
  const [estimatedFunding, setEstimatedFunding] = useState('');

  useEffect(() => {
    // Load application data from localStorage
    const savedData = localStorage.getItem('landlordApplication');
    if (savedData) {
      const data = JSON.parse(savedData);
      setApplicationData(data);
      calculateEligibility(data);
    }
  }, []);

  const calculateEligibility = (data: ApplicationData) => {
    let score = 0;
    let funding = '$0';
    let status = '';

    // Basic scoring algorithm
    if (data.propertyAddress.toLowerCase().includes('philadelphia') || data.propertyAddress.includes('PA')) score += 25;
    if (data.rentedOut === 'yes' || data.rentedOut === 'preparing') score += 20;
    if (parseInt(data.numberOfUnits) >= 2) score += 15; // Multi-unit properties
    if (data.repairType.length >= 3) score += 15; // Multiple repair types

    // Determine funding based on repair cost and urgency
    if (score >= 75) {
      status = 'Highly Eligible';
      if (data.estimatedCost === '76-100k') funding = '$100,000';
      else if (data.estimatedCost === '51-75k') funding = '$75,000';
      else if (data.estimatedCost === '26-50k') funding = '$50,000';
      else funding = '$25,000';
    } else if (score >= 50) {
      status = 'Likely Eligible';
      if (data.estimatedCost === '76-100k') funding = '$75,000';
      else if (data.estimatedCost === '51-75k') funding = '$50,000';
      else if (data.estimatedCost === '26-50k') funding = '$35,000';
      else funding = '$20,000';
    } else {
      status = 'Requires Review';
      funding = 'To be determined';
    }

    setEligibilityScore(score);
    setEligibilityStatus(status);
    setEstimatedFunding(funding);
  };

  const getStatusColor = () => {
    if (eligibilityScore >= 75) return 'text-green-600 bg-green-100';
    if (eligibilityScore >= 50) return 'text-blue-600 bg-blue-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  const getStatusIcon = () => {
    if (eligibilityScore >= 75) return CheckCircle;
    if (eligibilityScore >= 50) return Clock;
    return AlertTriangle;
  };

  const getTotalMonthlyRent = () => {
    if (!applicationData?.units) return 0;
    return applicationData.units.reduce((total, unit) => {
      return total + (parseFloat(unit.monthlyRent) || 0);
    }, 0);
  };

  const formatCostRange = (costRange: string) => {
    switch (costRange) {
      case '0-25k': return '$0 - $25,000';
      case '26-50k': return '$26,000 - $50,000';
      case '51-75k': return '$51,000 - $75,000';
      case '76-100k': return '$76,000 - $100,000';
      default: return costRange;
    }
  };

  if (!applicationData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Assessment Data Found</h2>
          <p className="text-gray-600 mb-6">Please complete the initial property assessment first.</p>
          <a href="/qualify" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Start Assessment
          </a>
        </div>
      </div>
    );
  }

  const StatusIcon = getStatusIcon();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Government Aid Assessment Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {applicationData.firstName}! Here's your eligibility assessment and next steps for accessing government aid.
          </p>
        </div>

        {/* Status Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${getStatusColor()}`}>
                <StatusIcon className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{eligibilityStatus}</h2>
                <p className="text-gray-600">Assessment Score: {eligibilityScore}/100</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Potential Government Aid</p>
              <p className="text-3xl font-bold text-green-600">{estimatedFunding}</p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Next Steps with Our Professional Service</h3>
            {eligibilityScore >= 75 ? (
              <div className="space-y-2">
                <p className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Your assessment shows strong potential for government aid approval
                </p>
                <p className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Our application specialist will contact you within 1 business day
                </p>
                <p className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  We'll begin preparing your government application immediately
                </p>
              </div>
            ) : eligibilityScore >= 50 ? (
              <div className="space-y-2">
                <p className="flex items-center text-blue-700">
                  <Clock className="h-4 w-4 mr-2" />
                  Your property shows good potential for government aid
                </p>
                <p className="flex items-center text-blue-700">
                  <Clock className="h-4 w-4 mr-2" />
                  Our team will review your case and provide strategic guidance
                </p>
                <p className="flex items-center text-blue-700">
                  <Clock className="h-4 w-4 mr-2" />
                  We may recommend additional documentation to strengthen your application
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="flex items-center text-yellow-700">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Your case requires detailed review by our specialists
                </p>
                <p className="flex items-center text-yellow-700">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  We'll explore alternative aid strategies and program options
                </p>
                <p className="flex items-center text-yellow-700">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Our team will contact you to discuss your specific situation
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Application Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Property Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600">Address</p>
                <p className="text-gray-900">{applicationData.propertyAddress}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Number of Units</p>
                  <p className="text-gray-900">{applicationData.numberOfUnits}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Rental Status</p>
                  <p className="text-gray-900 capitalize">{applicationData.rentedOut.replace('-', ' ')}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Monthly Rent</p>
                <p className="text-gray-900">${getTotalMonthlyRent().toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Unit Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Unit Details</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {applicationData.units.map((unit, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{unit.unitNumber}</span>
                  <span className="text-gray-700">${unit.monthlyRent}/month</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Repair Details */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Repair Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600">Repair Types</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {applicationData.repairType.map((type, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Estimated Cost</p>
                <p className="text-gray-900">{formatCostRange(applicationData.estimatedCost)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Download Assessment</span>
            </button>
            <button className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Eye className="h-4 w-4" />
              <span>View Full Report</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              <Phone className="h-4 w-4" />
              <span>Schedule Consultation</span>
            </button>
          </div>
        </div>

        {/* Contact Information */}
      </div>
    </div>
  );
};

export default Dashboard;