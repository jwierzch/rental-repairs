import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, Home, User, FileText, DollarSign } from 'lucide-react';

interface UnitInfo {
  unitNumber: string;
  monthlyRent: string;
}

interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Property Info
  propertyAddress: string;
  numberOfUnits: string;
  
  // Rental Info
  rentedOut: string;
  units: UnitInfo[];
  
  // Repair Info
  repairType: string[];
  estimatedCost: string;
}

const QualificationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    numberOfUnits: '',
    rentedOut: '',
    units: [],
    repairType: [],
    estimatedCost: '',
  });

  const steps = [
    { id: 1, title: 'Personal Information', icon: User, description: 'Tell us about yourself' },
    { id: 2, title: 'Property Details', icon: Home, description: 'Your rental property information' },
    { id: 3, title: 'Rental Information', icon: FileText, description: 'Unit details and rental status' },
    { id: 4, title: 'Repair Details', icon: DollarSign, description: 'What repairs do you need?' }
  ];

  const repairTypes = [
    'Plumbing', 'Electrical', 'HVAC', 'Roofing', 'Windows', 'Flooring',
    'Exterior Repairs', 'Kitchen Renovation', 'Bathroom Renovation', 'Safety Improvements'
  ];

  const handleInputChange = (field: string, value: string | string[] | UnitInfo[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNumberOfUnitsChange = (value: string) => {
    const numUnits = parseInt(value) || 0;
    const units: UnitInfo[] = Array.from({ length: numUnits }, (_, index) => ({
      unitNumber: `Unit ${index + 1}`,
      monthlyRent: ''
    }));
    
    setFormData(prev => ({ 
      ...prev, 
      numberOfUnits: value,
      units: units
    }));
  };

  const handleUnitChange = (index: number, field: keyof UnitInfo, value: string) => {
    const updatedUnits = [...formData.units];
    updatedUnits[index] = { ...updatedUnits[index], [field]: value };
    handleInputChange('units', updatedUnits);
  };

  const handleRepairTypeChange = (repairType: string, checked: boolean) => {
    if (checked) {
      handleInputChange('repairType', [...formData.repairType, repairType]);
    } else {
      handleInputChange('repairType', formData.repairType.filter(type => type !== repairType));
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  //const handleSubmit = () => {
    // Store form data and navigate to dashboard
  //  localStorage.setItem('landlordApplication', JSON.stringify(formData));
  //  navigate('/dashboard');
  //};

  const handleSubmit = async () => {
  try {
    // Send form data to the backend API
    await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    // Optionally keep this for local user experience
    localStorage.setItem('landlordApplication', JSON.stringify(formData));

    // Navigate to dashboard
    navigate('/dashboard');
  } catch (error) {
    // Optionally handle errors (show a message, etc.)
    alert('There was an error submitting your application. Please try again.');
    console.error(error);
  }
};


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(215) 555-0123"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Address *
              </label>
              <input
                type="text"
                value={formData.propertyAddress}
                onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1234 Main Street, Philadelphia, PA 19102"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Rental Units *
              </label>
              <select
                value={formData.numberOfUnits}
                onChange={(e) => handleNumberOfUnitsChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select number of units</option>
                <option value="1">1 Unit</option>
                <option value="2">2 Units</option>
                <option value="3">3 Units</option>
                <option value="4">4 Units</option>
                <option value="5">5 Units</option>
                <option value="6">6 Units</option>
                <option value="7">7 Units</option>
                <option value="8">8 Units</option>
                <option value="9">9 Units</option>
                <option value="10">10 Units</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Is this property currently rented out? *
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="yes"
                    checked={formData.rentedOut === 'yes'}
                    onChange={(e) => handleInputChange('rentedOut', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3">Yes, currently rented</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="vacant"
                    checked={formData.rentedOut === 'vacant'}
                    onChange={(e) => handleInputChange('rentedOut', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3">Currently vacant</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="preparing"
                    checked={formData.rentedOut === 'preparing'}
                    onChange={(e) => handleInputChange('rentedOut', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3">Preparing to rent</span>
                </label>
              </div>
            </div>

            {formData.numberOfUnits && parseInt(formData.numberOfUnits) > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Unit Information *
                </label>
                <div className="space-y-4">
                  {formData.units.map((unit, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Unit Number/Identifier
                        </label>
                        <input
                          type="text"
                          value={unit.unitNumber}
                          onChange={(e) => handleUnitChange(index, 'unitNumber', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={`Unit ${index + 1}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Monthly Rent ($)
                        </label>
                        <input
                          type="number"
                          value={unit.monthlyRent}
                          onChange={(e) => handleUnitChange(index, 'monthlyRent', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="1200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What type of repairs do you need? (Select all that apply) *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {repairTypes.map((type) => (
                  <label key={type} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.repairType.includes(type)}
                      onChange={(e) => handleRepairTypeChange(type, e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Repair Cost *
                </label>
                <select
                  value={formData.estimatedCost}
                  onChange={(e) => handleInputChange('estimatedCost', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select cost range</option>
                  <option value="0-25k">$0 - $25,000</option>
                  <option value="26-50k">$26,000 - $50,000</option>
                  <option value="51-75k">$51,000 - $75,000</option>
                  <option value="76-100k">$76,000 - $100,000</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Government Funding Assessment
          </h1>
          <p className="text-gray-600">
            Complete this assessment to determine your eligibility for Philadelphia rental repair funding
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                <div className="text-center">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 hidden md:block">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block w-full h-1 mt-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} style={{ width: '100px', marginLeft: '50px' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep - 1].description}
            </p>
          </div>

          {renderStepContent()}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Complete Assessment
                <CheckCircle className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationForm;