import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Landlord Application Service</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Professional application assistance helping small Philadelphia landlords navigate government funding programs for rental property repairs and improvements.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-center text-sm text-gray-400">
            © 2025 Goldfish Enterprises LLC. All rights reserved. | Independent professional service for small landlords
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;