import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertTriangle, Download, Eye, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleEdit = (step: number) => {
    navigate(`/qualify?step=${step}`);
  };

  useEffect(() => {
    // Load application data from localStorage
    const savedData = localStorage.getItem('landlordApplication');
    if (savedData) {
      setApplicationData(JSON.parse(savedData));
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Information Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {applicationData.firstName}! Here's your eligibility assessment and next steps for accessing government funds.
          </p>
        </div>

        {/* Application Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
              <button
                    onClick={() => handleEdit(1)}
                    className="text-blue-600 hover:underline text-sm"
              > Edit
              </button>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">First Name</p>
                  <p className="text-gray-900">{applicationData.firstName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Name</p>
                  <p className="text-gray-900">{applicationData.lastName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-gray-900">{applicationData.email || <span className="text-gray-400 italic">Not provided</span>}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Phone</p>
                  <p className="text-gray-900">{applicationData.phone || <span className="text-gray-400 italic">Not provided</span>}</p>
                </div>
              </div>
          </div>

          {/* Property Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Information</h3>
            <button
                onClick={() => handleEdit(2)}
                className="text-blue-600 hover:underline text-sm"
            >
                Edit
                </button>
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
              </div>
            </div>
          </div>

          {/* Rental Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Rental Information</h3>
            <button
                onClick={() => handleEdit(3)}
                className="text-blue-600 hover:underline text-sm"
            >
                Edit
            </button>
            <div>
                <p className="text-sm font-medium text-gray-600">Total Monthly Rent</p>
                <p className="text-gray-900">${getTotalMonthlyRent().toLocaleString()}</p>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {applicationData.units.map((unit, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{unit.unitNumber}</span>
                  <span className="text-gray-700">${unit.monthlyRent}/month</span>
                </div>
              ))}
            </div>
          </div>

           {/* Repair Details */}
           <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Repair Details</h3>
              <button
                onClick={() => handleEdit(3)}
                className="text-blue-600 hover:underline text-sm"
              > Edit
              </button>
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
        </div>
        {/* Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h3>
          <p className="text-gray-600">
            We will reach out to you within 5 business days. We just need a few days to review your details, and prepare everything so we can schedule a call to discuss your application and the next steps for accessing government funds. In the meantime, you can review your information above and ensure everything is accurate.
          </p>
        </div>

        {/* Contact Information */}
      </div>
    </div>
  );
};

export default Dashboard;