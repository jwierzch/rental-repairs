import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, Users, CheckCircle, FileText, Home, Wrench } from 'lucide-react';

const HomePage = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Access Up to $100,000',
      description: 'Help small landlords access substantial government funding for essential repairs and property improvements.'
    },
    {
      icon: FileText,
      title: 'Expert Application Guidance',
      description: 'Professional assistance navigating complex government application processes with experienced specialists.'
    },
    {
      icon: CheckCircle,
      title: 'End-to-End Support',
      description: 'Complete service from initial assessment through application submission and follow-up with government agencies.'
    },
    {
      icon: Users,
      title: 'Small Landlord Focus',
      description: 'Specialized service designed specifically for small property owners and local Philadelphia landlords.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Aid for rental repairs.
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                We specialize in helping small landlords navigate government funding applications. 
                Our experts guide you through every step to access up to $100,000 in government aid for rental property repairs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/qualify"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center group"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/program-info"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Home className="h-12 w-12 text-blue-200 mx-auto mb-3" />
                    <p className="text-2xl font-bold">$100K</p>
                    <p className="text-blue-200 text-sm">Max Available</p>
                  </div>
                  <div className="text-center">
                    <Wrench className="h-12 w-12 text-blue-200 mx-auto mb-3" />
                    <p className="text-2xl font-bold">Any</p>
                    <p className="text-blue-200 text-sm">Repair Type</p>
                  </div>
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-blue-200 mx-auto mb-3" />
                    <p className="text-2xl font-bold">Expert</p>
                    <p className="text-blue-200 text-sm">Guidance</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-blue-200 mx-auto mb-3" />
                    <p className="text-2xl font-bold">Free</p>
                    <p className="text-blue-200 text-sm">Assessment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Small Landlords Choose Our Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Government funding applications can be overwhelming for small property owners. Our specialized service provides the expertise and support you need to succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <benefit.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Our Application Service Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've simplified the government funding application process into manageable steps designed specifically for small landlords.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Assessment</h3>
              <p className="text-gray-600">
                Complete our comprehensive assessment to determine your property's eligibility and potential funding opportunities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Application Preparation</h3>
              <p className="text-gray-600">
                Our specialists prepare and submit your complete application package to the appropriate government programs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ongoing Advocacy</h3>
              <p className="text-gray-600">
                We manage the entire process, advocating for your application through approval and funding distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Access Government Funding?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join the small landlords who trust our professional application service to secure government aid for their properties.
          </p>
          <Link
            to="/qualify"
            className="bg-white text-green-600 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center group"
          >
            Start Your Assessment Today
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;