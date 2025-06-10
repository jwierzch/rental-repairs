import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, Home, User, FileText, DollarSign } from 'lucide-react';
import { phillyAddresses } from '../data/phillyAddresses';
import { useNavigate, useLocation } from 'react-router-dom';

interface UnitInfo {
  unitNumber: string;
  monthlyRent: string;
  vacant?: boolean;
  ownerOccupied?: boolean;
}

interface FormData {
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
  preferredContact?: 'email' | 'phone';
}

function isValidPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const QualificationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialStep = parseInt(params.get('step') || '1', 10);
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [unitErrors, setUnitErrors] = useState<string[]>([]);
  const [costError, setCostError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    numberOfUnits: '1',
    rentedOut: '',
    units: [{ unitNumber: 'Unit 1', monthlyRent: '', vacant: false, ownerOccupied: false }],
    repairType: [],
    estimatedCost: '',
    preferredContact: undefined,
  });

  useEffect(() => {
      const saved = localStorage.getItem('landlordApplication');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFormData(parsed);
        } catch (e) {
          // If parsing fails, ignore and use default
        }
      }
  }, []);
  useEffect(() => {
      setCurrentStep(initialStep);
      // eslint-disable-next-line
  }, [location.search]);

  // Local address autocomplete state
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addressInputRef = useRef<HTMLInputElement>(null);
  



  const steps = [
    { id: 1, title: 'Personal Information', icon: User, description: 'Tell us about yourself.' },
    { id: 2, title: 'Property Details', icon: Home, description: 'Your rental property information' },
    { id: 3, title: 'Rental Information', icon: FileText, description: 'Unit details and rental status' },
    { id: 4, title: 'Repair Details', icon: DollarSign, description: 'What repairs do you need?' }
  ];

  const repairTypes = [
    'Plumbing', 'Electrical', 'HVAC', 'Roofing', 'Windows', 'Flooring',
    'Exterior Repairs', 'Kitchen Renovation', 'Bathroom Renovation', 'Safety Improvements'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNumberOfUnitsChange = (value: string) => {
    const numUnits = Math.max(1, parseInt(value) || 1);
    const units: UnitInfo[] = Array.from({ length: numUnits }, (_, index) => {
      const prev = formData.units[index] || {};
      return {
        unitNumber: prev.unitNumber || `Unit ${index + 1}`,
        monthlyRent: (prev.vacant || prev.ownerOccupied) ? '0' : (prev.monthlyRent || ''),
        vacant: prev.vacant || false,
        ownerOccupied: prev.ownerOccupied || false,
      };
    });
    setFormData(prev => ({
      ...prev,
      numberOfUnits: value,
      units: units
    }));
  };

  const handleUnitChange = (index: number, field: keyof UnitInfo, value: string | boolean) => {
    const updatedUnits = [...formData.units];
    if (field === 'vacant' || field === 'ownerOccupied') {
      updatedUnits[index][field] = value as boolean;
      if (value) {
        // Uncheck the other if this one is checked
        if (field === 'vacant') updatedUnits[index].ownerOccupied = false;
        if (field === 'ownerOccupied') updatedUnits[index].vacant = false;
        updatedUnits[index].monthlyRent = '0';
      }
    } else {
      updatedUnits[index][field] = value as string;
    }
    setFormData(prev => ({ ...prev, units: updatedUnits }));
  };

  const handleRepairTypeChange = (repairType: string, checked: boolean) => {
    if (checked) {
      handleInputChange('repairType', [...formData.repairType, repairType]);
    } else {
      handleInputChange('repairType', formData.repairType.filter(type => type !== repairType));
    }
  };

  // --- Step Validation Functions ---

  function validateStep1() {
    setEmailError(null);
    setPhoneError(null);
    let valid = true;

    if (!formData.email && !formData.phone) {
      setEmailError('At least one contact method is required.');
      setPhoneError('At least one contact method is required.');
      valid = false;
    }
    if (formData.email && !isValidEmail(formData.email.trim())) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }
    if (formData.phone && !isValidPhone(formData.phone.trim())) {
      setPhoneError('Please enter a valid 10-digit US phone number.');
      valid = false;
    }
    return valid;
  }

  function validateStep2() {
    setAddressError(null);
    let valid = true;
    if (!formData.propertyAddress.trim()) {
      setAddressError('Property address is required.');
      valid = false;
    }
    if (!formData.numberOfUnits || parseInt(formData.numberOfUnits) < 1) {
      setAddressError('Number of units is required.');
      valid = false;
    }
    return valid;
  }

  function validateStep3() {
    const errors: string[] = [];
    formData.units.forEach((unit, idx) => {
      if (
        (!unit.vacant && !unit.ownerOccupied && (!unit.monthlyRent || unit.monthlyRent === '0')) ||
        (unit.monthlyRent && parseFloat(unit.monthlyRent) < 0)
      ) {
        errors[idx] = 'Enter rent or check Vacant/Owner Occupied';
      } else {
        errors[idx] = '';
      }
    });
    setUnitErrors(errors);
    return errors.every(e => !e);
  }

  function validateStep4() {
    setCostError(null);
    if (!formData.estimatedCost) {
      setCostError('Estimated repair cost is required.');
      return false;
    }
    return true;
  }

  // --- Navigation ---

  const nextStep = () => {
    let valid = true;
    if (currentStep === 1) valid = validateStep1();
    if (currentStep === 2) valid = validateStep2();
    if (currentStep === 3) valid = validateStep3();
    if (valid && currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep4()) return;
    try {
      await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      localStorage.setItem('landlordApplication', JSON.stringify(formData));
      navigate('/dashboard');
    } catch (error) {
      alert('There was an error submitting your application. Please try again.');
      console.error(error);
    }
  };

  // --- Render Steps ---

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
                  onChange={e => handleInputChange('firstName', e.target.value)}
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
                  onChange={e => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => {
                  handleInputChange('email', e.target.value);
                  if (emailError) setEmailError(null);
                }}
                className={`w-full px-4 py-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Enter your email address"
              />
              {emailError && (
                <p className="text-red-600 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => {
                  const value = e.target.value;
                  if (/^[0-9()\-\s.]*$/.test(value)) {
                    handleInputChange('phone', value);
                    if (phoneError) setPhoneError(null);
                  }
                }}
                className={`w-full px-4 py-3 border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="(215) 555-0123"
                maxLength={14}
              />
              {phoneError && (
                <p className="text-red-600 text-sm mt-1">{phoneError}</p>
              )}
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Contact Method
            </label>
            <div className="flex gap-6">
            <label className="inline-flex items-center">
                <input
                type="checkbox"
                checked={formData.preferredContact === 'email'}
                onChange={e => handleInputChange('preferredContact', e.target.checked ? 'email' : undefined)}
                className="mr-2"
                disabled={!formData.email}
                />
                <span>Email</span>
            </label>
            <label className="inline-flex items-center">
                <input
                type="checkbox"
                checked={formData.preferredContact === 'phone'}
                onChange={e => handleInputChange('preferredContact', e.target.checked ? 'phone' : undefined)}
                className="mr-2"
                disabled={!formData.phone}
                />
                <span>Phone</span>
            </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">
            {(!formData.email && !formData.phone) && "Enter an email or phone to select a preferred method."}
            </p>
            <p className="text-xs text-gray-500 mt-4 italic">
              We will only use this information to reach back out to you about this specific service.
              We will never use your information for anything else or sell it to anyone ever.
            </p>
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
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={formData.propertyAddress}
                  onChange={e => {
                    const value = e.target.value;
                    handleInputChange('propertyAddress', value);
                    if (value.length > 2) {
                      const normalize = (str: string) =>
                        str.replace(/,/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
                      const suggestions = phillyAddresses.filter(addr =>
                        normalize(addr).startsWith(normalize(value))
                      ).slice(0, 8);
                      setAddressSuggestions(suggestions);
                      setShowSuggestions(suggestions.length > 0);
                    } else {
                      setShowSuggestions(false);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                  onFocus={() => {
                    const value = formData.propertyAddress;
                    if (value.length > 2) {
                      const normalize = (str: string) =>
                        str.replace(/,/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
                      const suggestions = phillyAddresses.filter(addr =>
                        normalize(addr).startsWith(normalize(value))
                      ).slice(0, 8);
                      setAddressSuggestions(suggestions);
                      setShowSuggestions(suggestions.length > 0);
                    }
                  }}
                  ref={addressInputRef}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1234 Main Street, Philadelphia, PA 19102"
                  autoComplete="off"
                />
                {showSuggestions && addressSuggestions.length > 0 && (
                  <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-48 overflow-y-auto rounded shadow">
                    {addressSuggestions.map((suggestion, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        onMouseDown={() => {
                          handleInputChange('propertyAddress', suggestion);
                          setShowSuggestions(false);
                          addressInputRef.current?.blur();
                        }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {addressError && (
                <p className="text-red-600 text-sm mt-1">{addressError}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Rental Units *
              </label>
              <select
                value={formData.numberOfUnits}
                onChange={e => handleNumberOfUnitsChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select number of units</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} Unit{ i > 0 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit Information *
              </label>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Rental Units *
                </label>
                <select
                  value={formData.numberOfUnits}
                  onChange={e => handleNumberOfUnitsChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} Unit{ i > 0 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                {formData.units.map((unit, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Unit Number/Identifier
                      </label>
                      <input
                        type="text"
                        value={unit.unitNumber}
                        onChange={e => handleUnitChange(index, 'unitNumber', e.target.value)}
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
                        disabled={unit.vacant || unit.ownerOccupied}
                        onChange={e => handleUnitChange(index, 'monthlyRent', e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${unit.vacant || unit.ownerOccupied ? 'bg-gray-100 text-gray-400' : ''}`}
                        placeholder="1200"
                        min="0"
                      />
                      {unitErrors[index] && (
                        <p className="text-red-600 text-sm mt-1">{unitErrors[index]}</p>
                      )}
                    </div>
                    <div className="flex flex-col justify-center gap-2 mt-6 md:mt-0">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={!!unit.vacant}
                          onChange={e => handleUnitChange(index, 'vacant', e.target.checked)}
                          className="mr-2"
                        />
                        Vacant
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={!!unit.ownerOccupied}
                          onChange={e => handleUnitChange(index, 'ownerOccupied', e.target.checked)}
                          className="mr-2"
                        />
                        Owner Occupied
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What type of repairs do you need? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {repairTypes.map(type => (
                  <label key={type} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.repairType.includes(type)}
                      onChange={e => handleRepairTypeChange(type, e.target.checked)}
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
                  onChange={e => handleInputChange('estimatedCost', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select cost range</option>
                  <option value="0-25k">$0 - $25,000</option>
                  <option value="26-50k">$26,000 - $50,000</option>
                  <option value="51-75k">$51,000 - $75,000</option>
                  <option value="76-100k">$76,000 - $100,000</option>
                </select>
                {costError && (
                  <p className="text-red-600 text-sm mt-1">{costError}</p>
                )}
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
