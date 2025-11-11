import React, { useState } from 'react';
import { TopNavbar } from '../components/navigation/TopNavbar';
import { SecondaryNavbar } from '../components/navigation/SecondaryNavbar';
import { Sidebar } from '../components/navigation/Sidebar';
import { CompanySummaryCard } from '../components/company/CompanySummaryCard';
import { CompanyTabs } from '../components/company/CompanyTabs';
import { VendorInformation } from '../components/company/VendorInformation';

export default function CompanyDetails() {
  const [isReseller, setIsReseller] = useState(true);

  const handleToggleCompanyType = () => {
    setIsReseller(!isReseller);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <TopNavbar />
      <SecondaryNavbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-8">
          {/* View Banner - Reseller or End Customer */}
          {isReseller ? (
            <div className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 border-2 border-purple-700 rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Distributor Manager View</h4>
                    <p className="text-purple-100 text-xs">Managing reseller partners and their end-customers</p>
                  </div>
                </div>
                <button
                  onClick={handleToggleCompanyType}
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium shadow-md"
                  title="Switch to End Customer view"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span>DEMO: Switch to End Customer</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-4 bg-gradient-to-r from-green-600 to-teal-600 border-2 border-green-700 rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">End Customer View</h4>
                    <p className="text-green-100 text-xs">Managing your organization's Microsoft services</p>
                  </div>
                </div>
                <button
                  onClick={handleToggleCompanyType}
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-green-600 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium shadow-md"
                  title="Switch to Reseller view"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span>DEMO: Switch to Reseller</span>
                </button>
              </div>
            </div>
          )}

          <CompanySummaryCard isReseller={isReseller} onToggleCompanyType={handleToggleCompanyType} />
          <CompanyTabs activeTab="Vendor Information" />
          <VendorInformation isReseller={isReseller} />
        </div>
      </div>
    </div>
  );
} 