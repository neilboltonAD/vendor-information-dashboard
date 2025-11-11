import React, { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { ExpandableSection } from '../layout/ExpandableSection';
import { Toggle } from '../form/Toggle';

const initialGdapRelationships = [
  {
    name: 'Default_AppD_AppDirect De_875803572131294',
    customerName: 'Contoso Ltd',
    customerDomain: 'contoso.onmicrosoft.com',
    dateRange: '06/25/2025 - 12/22/2025',
    autoExtend: true,
    active: true,
    roles: [
      'Privileged authentication administrator',
      'Privileged role administrator',
      'User administrator',
      'Helpdesk administrator',
      'License administrator',
      'Application administrator',
      'Cloud application administrator',
      'Service support administrator',
      'Directory writers',
      'Directory readers',
      'Global reader',
    ],
  },
  {
    name: 'Fabrikam_Standard_Roles',
    customerName: 'Fabrikam Inc',
    customerDomain: 'fabrikam.onmicrosoft.com',
    dateRange: '06/25/2025 - 07/25/2025',
    autoExtend: false,
    active: true,
    roles: ['User administrator', 'License administrator', 'Helpdesk administrator'],
  },
  {
    name: 'AdventureWorks_Limited_Access',
    customerName: 'Adventure Works',
    customerDomain: 'adventureworks.onmicrosoft.com',
    dateRange: '06/25/2025 - 06/25/2027',
    autoExtend: true,
    active: true,
    roles: [
      'Cloud application administrator',
      'License administrator',
      'User administrator',
      'Directory readers',
    ],
  },
];

const initialSpecialQualifications = [
  {
    name: 'Education: Higher Education',
    domain: 'university.edu',
    active: true,
    lastModified: '06/25/2025',
  },
];

const gdapOptions = [
  'Default Marketplace roles',
  'Telstra M365',
  'Telstra Azure',
  'Telstra M365 & Azure'
];

const qualificationOptions = [
  'Education - K12',
  'Government - State Owned',
  'Government Community Cloud',
  'Not for Profit'
];

const ActionButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button
    className="px-4 py-1.5 text-xs rounded border border-blue-300 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors min-w-[60px] text-center font-medium"
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

const GdapOptionsModal = ({
  open,
  onClose,
  onSelectOption
}: {
  open: boolean;
  onClose: () => void;
  onSelectOption: (option: string) => void;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Choose a GDAP Relationship request type:</h2>
        <div className="space-y-3 mb-6">
          {gdapOptions.map((option) => (
            <button
              key={option}
              className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
              onClick={() => onSelectOption(option)}
            >
              <div className="font-medium text-gray-800">{option}</div>
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  selectedOption
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedOption: string;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm GDAP Relationship Request</h2>
        <p className="mb-6 text-gray-700">
          You have requested to send your customer a GDAP Relationship request for the <strong>{selectedOption}</strong> roles.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            onClick={onConfirm}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const McaAttestationModal = ({
  open,
  onClose,
  mcaSignatory,
  setMcaSignatory,
  onSubmit,
  isGenerateMode
}: {
  open: boolean;
  onClose: () => void;
  mcaSignatory: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    country: string;
    dateAccepted: string;
  };
  setMcaSignatory: React.Dispatch<React.SetStateAction<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    country: string;
    dateAccepted: string;
  }>>;
  onSubmit: () => void;
  isGenerateMode: boolean;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          {isGenerateMode ? 'Generate MCA Agreement' : 'Update MCA Authorization'}
        </h2>
        
        {!isGenerateMode && (
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Current Signatory Information</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <div><span className="font-semibold">Name:</span> {mcaSignatory.firstName} {mcaSignatory.lastName}</div>
              <div><span className="font-semibold">Email:</span> {mcaSignatory.email}</div>
              <div><span className="font-semibold">Phone:</span> {mcaSignatory.phoneNumber}</div>
              <div><span className="font-semibold">Country:</span> {mcaSignatory.country}</div>
              <div><span className="font-semibold">Date Accepted:</span> {mcaSignatory.dateAccepted}</div>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-600 mb-4">
          {isGenerateMode 
            ? 'Please provide the authorized signatory information to generate a new Microsoft Customer Agreement.'
            : 'Update the authorized signatory information for the Microsoft Customer Agreement.'
          }
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={mcaSignatory.firstName}
                onChange={(e) => setMcaSignatory(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={mcaSignatory.lastName}
                onChange={(e) => setMcaSignatory(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Smith"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={mcaSignatory.email}
              onChange={(e) => setMcaSignatory(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="john.smith@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={mcaSignatory.phoneNumber}
              onChange={(e) => setMcaSignatory(prev => ({ ...prev, phoneNumber: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              value={mcaSignatory.country}
              onChange={(e) => setMcaSignatory(prev => ({ ...prev, country: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">Select Country</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="India">India</option>
              <option value="Brazil">Brazil</option>
              <option value="Mexico">Mexico</option>
              <option value="Spain">Spain</option>
              <option value="Italy">Italy</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Singapore">Singapore</option>
              <option value="South Korea">South Korea</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Ireland">Ireland</option>
              <option value="Belgium">Belgium</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors text-sm font-medium"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium"
            onClick={onSubmit}
          >
            {isGenerateMode ? 'Generate Agreement' : 'Update Authorization'}
          </button>
        </div>
      </div>
    </div>
  );
};

const MpnSetupModal = ({
  open,
  onClose,
  mpnIdInput,
  setMpnIdInput,
  onSave,
  isLoading
}: {
  open: boolean;
  onClose: () => void;
  mpnIdInput: string;
  setMpnIdInput: (value: string) => void;
  onSave: () => void;
  isLoading?: boolean;
}) => {
  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Configure Microsoft Partner Network ID</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter the reseller's MPN ID (also known as PLA ID - Partner Location Account ID). This ID links the reseller to their Microsoft Partner Center account.
        </p>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            MPN ID / PLA ID
          </label>
          <input
            type="text"
            value={mpnIdInput}
            onChange={(e) => setMpnIdInput(e.target.value)}
            placeholder="e.g., 5347093"
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-2">
            The MPN ID can be found in the partner's Partner Center account under <strong>Account Settings → Identifiers</strong>.
          </p>
        </div>
        
        {isLoading && (
          <div className="mb-4 flex items-center justify-center space-x-3 py-3 bg-blue-50 border border-blue-200 rounded-lg">
            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm text-blue-700 font-medium">Validating MPN ID and configuring reseller...</span>
          </div>
        )}
        
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
            onClick={onSave}
            disabled={!mpnIdInput.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>Save MPN ID</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const PartnershipInviteModal = ({
  open,
  onClose,
  partnerEmailInput,
  setPartnerEmailInput,
  onSend,
  onCopyLink,
  onCopyTemplate,
  relationshipId
}: {
  open: boolean;
  onClose: () => void;
  partnerEmailInput: string;
  setPartnerEmailInput: (value: string) => void;
  onSend: () => void;
  onCopyLink: () => void;
  onCopyTemplate: () => void;
  relationshipId: string;
}) => {
  if (!open) return null;

  const inviteLink = `https://partner.microsoft.com/dashboard/v2/customers/indirectresellers/relationshiprequest/${relationshipId}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto py-8">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 m-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Send Partnership Invitation</h2>
        <p className="text-sm text-gray-600 mb-4">
          Invite this partner to establish a partnership in the Microsoft Cloud Solution Provider (CSP) program. Once they accept, you'll be able to provision Microsoft cloud solutions and assign subscriptions to them.
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Partner Email Address
          </label>
          <input
            type="email"
            value={partnerEmailInput}
            onChange={(e) => setPartnerEmailInput(e.target.value)}
            placeholder="partner@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Partnership Request Link */}
        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Partnership Request Link
            </label>
            <button
              onClick={onCopyLink}
              className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
            >
              Copy Link
            </button>
          </div>
          <div className="text-xs text-gray-600 break-all font-mono bg-white p-2 rounded border border-gray-200">
            {inviteLink}
          </div>
        </div>

        {/* Email Template Preview */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Email Template Preview
            </label>
            <button
              onClick={onCopyTemplate}
              className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
            >
              Copy Template
            </button>
          </div>
          <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded border border-gray-200 max-h-48 overflow-y-auto">
            <p className="font-semibold mb-2">Subject: Partnership Request from [Your Company Name]</p>
            <p className="mb-2">Dear Partner,</p>
            <p className="mb-2">We would like to invite you to establish a partnership with us in the Microsoft Cloud Solution Provider (CSP) program.</p>
            <p className="mb-2">To accept this partnership request, please click the link below:</p>
            <p className="mb-2 font-mono text-blue-600 break-all">{inviteLink}</p>
            <p className="mb-2">This partnership will allow us to:</p>
            <ul className="list-disc list-inside mb-2 ml-2">
              <li>Provision Microsoft cloud solutions to customers on your behalf</li>
              <li>Assign your PLA ID to subscriptions for incentives attribution</li>
              <li>Support your customers' Microsoft 365, Azure, and Dynamics 365 needs</li>
            </ul>
            <p className="mb-2"><strong>Important:</strong> You must have an active CSP indirect reseller tenant to accept this request.</p>
            <p>Best regards,<br />[Your Name]<br />[Your Company Name]</p>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-xs text-blue-800">
              <strong>Requirements:</strong> The partner must have an active CSP indirect reseller tenant and be in the same CSP region as your distributor account. 
              <a href="https://learn.microsoft.com/en-us/partner-center/customers/indirect-provider-tasks-in-partner-center" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 ml-1">
                Learn more about partner requirements
              </a>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:bg-gray-400"
            onClick={onSend}
            disabled={!partnerEmailInput.trim()}
          >
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

const QualificationOptionsModal = ({
  open,
  onClose,
  onSelectOption
}: {
  open: boolean;
  onClose: () => void;
  onSelectOption: (option: string) => void;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Choose a Special Qualification type:</h2>
        <div className="space-y-3 mb-6">
          {qualificationOptions.map((option) => (
            <button
              key={option}
              className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
              onClick={() => onSelectOption(option)}
            >
              <div className="font-medium text-gray-800">{option}</div>
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const DomainInputModal = ({
  open,
  onClose,
  onConfirm,
  selectedQualification
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (domain: string) => void;
  selectedQualification: string;
}) => {
  const [domain, setDomain] = React.useState('');

  const handleSubmit = () => {
    if (domain.trim()) {
      onConfirm(domain.trim());
      setDomain('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Enter your organization domain URL</h2>
        <div className="mb-6">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g www.besthighschool.edu"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoFocus
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={!domain.trim()}
          >
            Request Qualification
          </button>
        </div>
      </div>
    </div>
  );
};

const QualificationConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  selectedQualification,
  domain
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedQualification: string;
  domain: string;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Special Qualification Request</h2>
        <p className="mb-6 text-gray-700">
          You want to submit a request to Microsoft for this qualification, and you should be aware that this take a few days to be completed by Microsoft. <br/><br/>The status of this request will move from Pending to Active once completed - please keep checking back for updates.
        </p>
        <div className="bg-gray-50 p-3 rounded mb-6">
          <div className="text-sm font-medium text-gray-800 mb-1">Qualification:</div>
          <div className="text-sm text-gray-700">{selectedQualification}</div>
          <div className="text-sm font-medium text-gray-800 mb-1 mt-2">Domain:</div>
          <div className="text-sm text-gray-700">{domain}</div>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const UnlinkWarningModal = ({
  open,
  onClose,
  onConfirm,
  confirmation,
  onConfirmationChange
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmation: string;
  onConfirmationChange: (value: string) => void;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4 text-red-800">⚠️ High Risk Action</h2>
        <p className="mb-4 text-gray-700">
          This is a High Risk Action. By entering 'CONFIRM' in the text box and pressing the 'Unlink' button you understand that there must NOT be any subscriptions linked.
        </p>
        <div className="mb-6">
          <input
            type="text"
            value={confirmation}
            onChange={(e) => onConfirmationChange(e.target.value)}
            placeholder="Type 'CONFIRM' to proceed"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            autoFocus
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onConfirm}
            disabled={confirmation !== 'CONFIRM'}
          >
            Unlink
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateTenantModal = ({
  open,
  onClose,
  onConfirm
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (tenantData: any) => void;
}) => {
  const [formData, setFormData] = useState({
    companyName: '',
    domain: '',
    email: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    city: '',
    state: '',
    country: 'US',
    postalCode: '',
    phoneNumber: '',
    culture: 'en-US',
    language: 'en'
  });

  const [suggestedDomains, setSuggestedDomains] = useState<string[]>([]);

  // Generate 3 suggested domains based on company name
  const generateSuggestedDomains = (companyName: string) => {
    if (!companyName.trim()) {
      return [];
    }

    // Clean and format the company name
    const cleanName = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // Remove special characters and spaces
      .substring(0, 20); // Limit length

    if (cleanName.length === 0) {
      return [];
    }

    // Generate 3 variations
    const randomNum1 = Math.floor(Math.random() * 900) + 100; // 3-digit number
    const randomNum2 = Math.floor(Math.random() * 9000) + 1000; // 4-digit number

    const suffixes = ['tech', 'corp', 'group', 'inc', 'co', 'systems', 'solutions', 'digital', 'cloud', 'labs'];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return [
      `${cleanName}${randomNum1}.onmicrosoft.com`,
      `${cleanName}${randomSuffix}.onmicrosoft.com`,
      `${cleanName}${randomNum2}.onmicrosoft.com`
    ];
  };

  // Handle company name change
  const handleCompanyNameChange = (value: string) => {
    setFormData(prev => ({ ...prev, companyName: value, domain: '' }));
    
    if (value.trim()) {
      const domains = generateSuggestedDomains(value);
      setSuggestedDomains(domains);
    } else {
      setSuggestedDomains([]);
    }
  };

  const handleSubmit = () => {
    if (formData.companyName && formData.domain && formData.email && formData.firstName && 
        formData.lastName && formData.addressLine1 && formData.city && formData.state && 
        formData.country && formData.postalCode) {
      onConfirm(formData);
      // Reset form
      setFormData({
        companyName: '',
        domain: '',
        email: '',
        firstName: '',
        lastName: '',
        addressLine1: '',
        city: '',
        state: '',
        country: 'US',
        postalCode: '',
        phoneNumber: '',
        culture: 'en-US',
        language: 'en'
      });
      setSuggestedDomains([]);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      companyName: '',
      domain: '',
      email: '',
      firstName: '',
      lastName: '',
      addressLine1: '',
      city: '',
      state: '',
      country: 'US',
      postalCode: '',
      phoneNumber: '',
      culture: 'en-US',
      language: 'en'
    });
    setSuggestedDomains([]);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Create New Tenant</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleCompanyNameChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Domain *</label>
            {suggestedDomains.length > 0 ? (
              <>
                <div className="space-y-2">
                  {suggestedDomains.map((domain, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.domain === domain
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="domain"
                        value={domain}
                        checked={formData.domain === domain}
                        onChange={(e) => setFormData({...formData, domain: e.target.value})}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`ml-3 font-medium ${
                        formData.domain === domain ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        {domain}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Choose one of the suggested Microsoft tenant domains. This will be your organization's primary domain.
                </p>
              </>
            ) : (
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
                <p className="text-sm text-gray-500">
                  Enter a company name above to see suggested domain options
                </p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
            <input
              type="text"
              value={formData.addressLine1}
              onChange={(e) => setFormData({...formData, addressLine1: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State/Province *</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
            <input
              type="text"
              value={formData.postalCode}
              onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={!formData.companyName || !formData.domain || !formData.email || !formData.firstName || 
                     !formData.lastName || !formData.addressLine1 || !formData.city || !formData.state || 
                     !formData.country || !formData.postalCode}
          >
            Create Tenant
          </button>
        </div>
      </div>
    </div>
  );
};

const LinkTenantModal = ({
  open,
  onClose,
  onConfirm
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (domain: string) => void;
}) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = () => {
    if (domain.trim()) {
      onConfirm(domain.trim());
      setDomain('');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Link Existing Tenant</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Customer Microsoft Tenant Domain</label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="company.onmicrosoft.com"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoFocus
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={!domain.trim()}
          >
            Link Tenant
          </button>
        </div>
      </div>
    </div>
  );
};

const SyncModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            onClick={onConfirm}
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

interface MicrosoftSectionProps {
  isResellerCompany: boolean;
}

export const MicrosoftSection: React.FC<MicrosoftSectionProps> = ({ isResellerCompany }) => {
  const [gdapRelationships, setGdapRelationships] = useState(initialGdapRelationships);
  const [specialQualifications, setSpecialQualifications] = useState(initialSpecialQualifications);
  const [azureReservations, setAzureReservations] = useState(true);
  const [azureUsage, setAzureUsage] = useState(false);

  // Microsoft Partner information
  const [partnerInfo, setPartnerInfo] = useState({
    mpnId: '', // Empty initially - to be configured during onboarding
    isAuthorized: true,
    isReseller: isResellerCompany, // Controlled by parent component
    isConfigured: false // Track if MPN ID has been set up
  });

  // Update isReseller when isResellerCompany prop changes
  React.useEffect(() => {
    setPartnerInfo(prev => ({
      ...prev,
      isReseller: isResellerCompany
    }));
  }, [isResellerCompany]);

  // Toggle authorization status for demo purposes
  const toggleAuthorizationStatus = () => {
    setMcaStatus(prev => {
      if (prev === 'valid') return 'invalid';
      if (prev === 'invalid') return 'pending';
      if (prev === 'pending') return 'valid';
      return 'valid';
    });
  };

  // Toggle configuration status for demo purposes
  const toggleConfigurationStatus = () => {
    setPartnerInfo(prev => {
      const newConfigured = !prev.isConfigured;
      // For end-customers, also update relationship request status
      if (!prev.isReseller) {
        setRelationshipRequestStatus(newConfigured ? 'linked' : 'not_sent');
      }
      return {
        ...prev,
        isConfigured: newConfigured,
        mpnId: newConfigured ? '5347093' : '' // Set demo MPN ID when toggling to configured
      };
    });
  };

  // Onboarding states
  const [showMpnSetupModal, setShowMpnSetupModal] = useState(false);
  const [showPartnershipInviteModal, setShowPartnershipInviteModal] = useState(false);
  const [mpnIdInput, setMpnIdInput] = useState('');
  const [partnerEmailInput, setPartnerEmailInput] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false); // Loading state for MPN configuration
  
  // Distributor's unique relationship request ID (would come from backend in real implementation)
  const distributorRelationshipId = '5d3260c0-122a-4413-bcc5-1c1c5dab01ce';

  // Relationship request status for end-customers
  const [relationshipRequestStatus, setRelationshipRequestStatus] = useState<'not_sent' | 'pending' | 'linked'>('not_sent');

  // Tenant state - Only for end-customers, not resellers
  const [isTenantLinked, setIsTenantLinked] = useState(!partnerInfo.isReseller);
  const [tenantData, setTenantData] = useState({
    domain: 'appdirectdemonstration5.onmicrosoft.com',
    tenantId: '408f194e-dc4a-4a2e-ac65-d1d6b0c11a8a',
    globalAdmins: ['neil.bolton@xyzcompany.com', 'sarah.johnson@xyzcompany.com'],
    billingAdmins: ['finance.admin@xyzcompany.com', 'billing.team@xyzcompany.com'],
    agreementDate: '25/06/2025'
  });

  // End-customer data for resellers
  const [endCustomers] = useState([
    {
      id: '1',
      companyName: 'Contoso Ltd',
      domain: 'contoso.onmicrosoft.com',
      tenantId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      totalSeats: 250,
      assignedSeats: 235,
      activeUsers: 198,
      monthlyRevenue: 6250.00,
      marginPercent: 8.5,
      deploymentPercentage: 94.0,
      usagePercentage: 84.3,
      status: 'good',
      subscriptions: [
        { 
          name: 'Microsoft 365 Business Premium', 
          seats: 150, 
          assigned: 145, 
          active: 128, 
          revenue: 3750.00,
          marginPercent: 9.2,
          termTypes: [
            { type: 'Annual Upfront', seats: 80, assigned: 78, active: 68, revenue: 2000.00, marginPercent: 11.5 },
            { type: 'Annual billed Monthly', seats: 50, assigned: 48, active: 42, revenue: 1250.00, marginPercent: 7.8 },
            { type: 'Monthly billed Monthly', seats: 20, assigned: 19, active: 18, revenue: 500.00, marginPercent: 6.2 }
          ]
        },
        { 
          name: 'Microsoft 365 E3', 
          seats: 100, 
          assigned: 90, 
          active: 70, 
          revenue: 2500.00,
          marginPercent: 7.5,
          termTypes: [
            { type: 'Triannual Upfront', seats: 60, assigned: 55, active: 45, revenue: 1500.00, marginPercent: 8.8 },
            { type: 'Annual billed Monthly', seats: 40, assigned: 35, active: 25, revenue: 1000.00, marginPercent: 5.5 }
          ]
        }
      ],
      azurePlan: {
        active: true,
        dailyCost: 125.50,
        monthlyProjected: 3765.00,
        currentMonthSpend: 2850.75,
        costThreshold: 4000.00,
        daysInMonth: 30,
        currentDay: 23
      }
    },
    {
      id: '2',
      companyName: 'Fabrikam Inc',
      domain: 'fabrikam.onmicrosoft.com',
      tenantId: 'b2c3d4e5-f6g7-8901-bcde-fg2345678901',
      totalSeats: 450,
      assignedSeats: 380,
      activeUsers: 285,
      monthlyRevenue: 11250.00,
      marginPercent: 6.8,
      deploymentPercentage: 84.4,
      usagePercentage: 75.0,
      status: 'warning',
      subscriptions: [
        { 
          name: 'Microsoft 365 E5', 
          seats: 200, 
          assigned: 180, 
          active: 155, 
          revenue: 8000.00,
          marginPercent: 7.2,
          termTypes: [
            { type: 'Annual Upfront', seats: 120, assigned: 110, active: 95, revenue: 4800.00, marginPercent: 10.5 },
            { type: 'Triannual Upfront', seats: 50, assigned: 45, active: 40, revenue: 2000.00, marginPercent: 5.8 },
            { type: 'Annual billed Monthly', seats: 30, assigned: 25, active: 20, revenue: 1200.00, marginPercent: 3.2 }
          ]
        },
        { 
          name: 'Microsoft 365 Business Standard', 
          seats: 250, 
          assigned: 200, 
          active: 130, 
          revenue: 3250.00,
          marginPercent: 6.0,
          termTypes: [
            { type: 'Annual billed Monthly', seats: 150, assigned: 120, active: 80, revenue: 1950.00, marginPercent: 7.5 },
            { type: 'Monthly billed Monthly', seats: 100, assigned: 80, active: 50, revenue: 1300.00, marginPercent: 3.8 }
          ]
        }
      ],
      azurePlan: {
        active: true,
        dailyCost: 285.75,
        monthlyProjected: 8572.50,
        currentMonthSpend: 6573.25,
        costThreshold: 8000.00,
        daysInMonth: 30,
        currentDay: 23
      }
    },
    {
      id: '3',
      companyName: 'Adventure Works',
      domain: 'adventureworks.onmicrosoft.com',
      tenantId: 'c3d4e5f6-g7h8-9012-cdef-gh3456789012',
      totalSeats: 125,
      assignedSeats: 80,
      activeUsers: 45,
      monthlyRevenue: 2000.00,
      marginPercent: 11.2,
      deploymentPercentage: 64.0,
      usagePercentage: 56.3,
      status: 'poor',
      subscriptions: [
        { 
          name: 'Microsoft 365 Business Basic', 
          seats: 125, 
          assigned: 80, 
          active: 45, 
          revenue: 2000.00,
          marginPercent: 11.2,
          termTypes: [
            { type: 'Annual Upfront', seats: 60, assigned: 40, active: 25, revenue: 960.00, marginPercent: 12.8 },
            { type: 'Monthly billed Monthly', seats: 45, assigned: 28, active: 15, revenue: 720.00, marginPercent: 9.5 },
            { type: 'Triannual Upfront', seats: 20, assigned: 12, active: 5, revenue: 320.00, marginPercent: 10.3 }
          ]
        }
      ],
      azurePlan: {
        active: true,
        dailyCost: 45.20,
        monthlyProjected: 1356.00,
        currentMonthSpend: 1039.60,
        costThreshold: 1200.00,
        daysInMonth: 30,
        currentDay: 23
      }
    }
  ]);

  // GDAP dialog state
  const [showGdapOptions, setShowGdapOptions] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  // Special Qualifications dialog state
  const [showQualificationOptions, setShowQualificationOptions] = useState(false);
  const [showDomainInput, setShowDomainInput] = useState(false);
  const [showQualificationConfirmation, setShowQualificationConfirmation] = useState(false);
  const [selectedQualification, setSelectedQualification] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');

  // Special Qualifications form state (End Customer)
  const [specialQualification, setSpecialQualification] = useState('');
  const [specialQualificationSegment, setSpecialQualificationSegment] = useState('');
  const [specialQualificationWebsite, setSpecialQualificationWebsite] = useState('');
  const [showSpecialQualificationForm, setShowSpecialQualificationForm] = useState(false);
  const [pendingSpecialQualifications, setPendingSpecialQualifications] = useState<Array<{
    type: string;
    segment?: string;
    website: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedDate: string;
  }>>([]);

  // MCA Authorization state (End Customer)
  const [mcaStatus, setMcaStatus] = useState<'valid' | 'invalid' | 'pending'>('valid');
  const [showMcaModal, setShowMcaModal] = useState(false);
  const [isCreatingTenantFlow, setIsCreatingTenantFlow] = useState(false); // Track if MCA is for tenant creation
  const [mcaNotificationId, setMcaNotificationId] = useState<string | null>(null); // Track MCA notification for dismissal
  const [mcaSignatory, setMcaSignatory] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phoneNumber: '+1 (555) 123-4567',
    country: 'United States',
    dateAccepted: 'Jan 15, 2024',
  });

  // Section open/close state
  const [gdapSectionOpen, setGdapSectionOpen] = useState(false);
  const [specialQualificationsSectionOpen, setSpecialQualificationsSectionOpen] = useState(false);
  const [tenantDomainSectionOpen, setTenantDomainSectionOpen] = useState(true);
  const [adminSectionOpen, setAdminSectionOpen] = useState(true);

  // Sync modal state
  const [showGdapSyncModal, setShowGdapSyncModal] = useState(false);
  const [showSpecialQualificationsSyncModal, setShowSpecialQualificationsSyncModal] = useState(false);

  // Tenant management modal state
  const [showUnlinkWarning, setShowUnlinkWarning] = useState(false);
  const [unlinkConfirmation, setUnlinkConfirmation] = useState('');
  const [showCreateTenantModal, setShowCreateTenantModal] = useState(false);
  const [showLinkTenantModal, setShowLinkTenantModal] = useState(false);

  // Deployment and Usage Data section state
  const [deploymentUsageSectionOpen, setDeploymentUsageSectionOpen] = useState(true);
  const [entitlementSectionOpen, setEntitlementSectionOpen] = useState(true);
  const [activeSectionOpen, setActiveSectionOpen] = useState(true);
  const [deploymentSectionOpen, setDeploymentSectionOpen] = useState(true);
  const [usageSectionOpen, setUsageSectionOpen] = useState(true);

  const handleAutoExtendToggle = (idx: number, value: boolean) => {
    setGdapRelationships((prev) =>
      prev.map((rel, i) =>
        i === idx ? { ...rel, autoExtend: value } : rel
      )
    );
  };

  const isSpecialQualificationFormValid = () => {
    if (!specialQualification) return false;
    
    // For Education, require both segment and website
    if (specialQualification === 'Education') {
      return specialQualificationSegment !== '' && specialQualificationWebsite !== '';
    }
    
    // For other qualifications, just require the qualification type to be selected
    // Website is optional for non-Education qualifications
    return true;
  };

  const handleSpecialQualificationSync = () => {
    notifications.show({
      title: 'Syncing...',
      message: 'Refreshing Special Qualifications from Microsoft',
      color: 'blue',
      autoClose: 2000,
    });
  };

  const handleSpecialQualificationDemoReset = () => {
    setPendingSpecialQualifications([]);
    notifications.show({
      title: 'Reset Complete',
      message: 'All pending Special Qualifications have been cleared',
      color: 'gray',
      autoClose: 2000,
    });
  };

  const handleMcaSubmit = () => {
    setMcaStatus('pending');
    setShowMcaModal(false);
    
    // Dismiss the persistent MCA notification if it exists
    if (mcaNotificationId) {
      notifications.hide(mcaNotificationId);
      setMcaNotificationId(null);
    }
    
    if (isCreatingTenantFlow) {
      // If we're in the tenant creation flow, now show the Create Tenant modal
      notifications.show({
        title: 'MCA Attestation Complete',
        message: 'Now you can proceed to create the tenant.',
        color: 'green',
      });
      setIsCreatingTenantFlow(false);
      setShowCreateTenantModal(true);
    } else {
      notifications.show({
        title: 'MCA Authorization Submitted',
        message: 'Your Microsoft Customer Agreement authorization is being processed.',
        color: 'blue',
      });
    }
  };

  const handleGdapNew = () => {
    setShowGdapOptions(true);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowGdapOptions(false);
    setShowConfirmation(true);
  };

  const handleSendRequest = () => {
    // Show waiting notification
    notifications.show({
      id: 'gdap-request-waiting',
      title: 'Waiting',
      message: 'Waiting for GDAP relationship request to be completed...',
      color: 'yellow',
      autoClose: 3000,
    });

    // Simulate async request
    setTimeout(() => {
      // Close waiting notification
      notifications.hide('gdap-request-waiting');
      
      // Create a new pending GDAP relationship
      const newGdapRelationship = {
        name: selectedOption,
        customerName: partnerInfo.isReseller ? 'New Customer' : '',
        customerDomain: partnerInfo.isReseller ? 'newcustomer.onmicrosoft.com' : '',
        dateRange: 'Pending - Pending',
        autoExtend: true,
        active: false, // This will show as pending instead of active
        roles: getRolesForOption(selectedOption),
      };

      // Add the new relationship to the list
      setGdapRelationships((prev) => [...prev, newGdapRelationship]);
      
      // Show success notification
      notifications.show({
        title: 'Completed!',
        message: `GDAP relationship request for "${selectedOption}" has been sent successfully. The request is now pending customer approval.`,
        color: 'green',
        autoClose: 5000,
      });
      
      // Keep the GDAP section open and close the modal
      setGdapSectionOpen(true);
      setShowConfirmation(false);
      setSelectedOption('');
    }, 2000);
  };

  // Special Qualifications handlers
  const handleQualificationNew = () => {
    setShowQualificationOptions(true);
  };

  const handleQualificationOptionSelect = (option: string) => {
    setSelectedQualification(option);
    setShowQualificationOptions(false);
    setShowDomainInput(true);
  };

  const handleDomainSubmit = (domain: string) => {
    setSelectedDomain(domain);
    setShowDomainInput(false);
    setShowQualificationConfirmation(true);
  };

  const handleQualificationConfirm = () => {
    // Show waiting notification
    notifications.show({
      id: 'qualification-request-waiting',
      title: 'Waiting',
      message: 'Waiting for special qualification request to be completed...',
      color: 'yellow',
      autoClose: 3000,
    });

    // Simulate async request
    setTimeout(() => {
      // Close waiting notification
      notifications.hide('qualification-request-waiting');
      
      // Create a new pending special qualification
      const newQualification = {
        name: selectedQualification,
        domain: selectedDomain,
        active: false, // This will show as pending instead of active
        lastModified: new Date().toLocaleDateString('en-GB'),
      };

      // Add the new qualification to the list
      setSpecialQualifications((prev) => [...prev, newQualification]);
      
      // Show success notification
      notifications.show({
        title: 'Completed!',
        message: `Special qualification request for "${selectedQualification}" has been submitted successfully. The request is now pending Microsoft approval.`,
        color: 'green',
        autoClose: 5000,
      });
      
      // Keep the Special Qualifications section open and close the modal
      setSpecialQualificationsSectionOpen(true);
      setShowQualificationConfirmation(false);
      setSelectedQualification('');
      setSelectedDomain('');
    }, 2000);
  };

  // Sync handlers
  const handleGdapSync = () => {
    setShowGdapSyncModal(true);
  };

  const handleGdapSyncConfirm = () => {
    // Show waiting notification
    notifications.show({
      id: 'gdap-sync-waiting',
      title: 'Waiting',
      message: 'Now syncing GDAP relationships from Microsoft Partner Centre...',
      color: 'yellow',
      autoClose: 3000,
    });

    // Simulate async sync
    setTimeout(() => {
      // Close waiting notification
      notifications.hide('gdap-sync-waiting');
      
      // Create a new dummy GDAP relationship
      const newGdapRelationship = {
        name: `Synced_GDAP_${Date.now()}`,
        customerName: partnerInfo.isReseller ? 'Synced Customer' : '',
        customerDomain: partnerInfo.isReseller ? 'syncedcustomer.onmicrosoft.com' : '',
        dateRange: '06/25/2025 - 12/25/2025',
        autoExtend: true,
        active: true,
        roles: ['User administrator', 'License administrator'],
      };

      // Add the new relationship to the list
      setGdapRelationships((prev) => [...prev, newGdapRelationship]);
      
      // Show success notification
      notifications.show({
        title: 'Completed!',
        message: 'GDAP relationships have been successfully synced from Microsoft Partner Centre. New relationships have been added to your list.',
        color: 'green',
        autoClose: 5000,
      });
      
      // Keep the GDAP section open and close the modal
      setGdapSectionOpen(true);
      setShowGdapSyncModal(false);
    }, 2000);
  };

  const handleSpecialQualificationsSync = () => {
    setShowSpecialQualificationsSyncModal(true);
  };

  const handleSpecialQualificationsSyncConfirm = () => {
    // Show waiting notification
    notifications.show({
      id: 'qualifications-sync-waiting',
      title: 'Waiting',
      message: 'Now syncing Special Qualification statuses from Microsoft...',
      color: 'yellow',
      autoClose: 3000,
    });

    // Simulate async sync
    setTimeout(() => {
      // Close waiting notification
      notifications.hide('qualifications-sync-waiting');
      
      // Find a qualification option that's not already present
      const existingQualifications = specialQualifications.map(q => q.name);
      const availableOptions = qualificationOptions.filter(option => 
        !existingQualifications.some(existing => existing.includes(option.split(' - ')[0]))
      );
      
      // If no new options available, use a default one
      const newQualificationType = availableOptions.length > 0 
        ? availableOptions[0] 
        : 'Education - K12';

      // Create a new dummy special qualification
      const newQualification = {
        name: newQualificationType,
        domain: 'synced-domain.edu',
        active: true,
        lastModified: new Date().toLocaleDateString('en-GB'),
      };

      // Add the new qualification to the list
      setSpecialQualifications((prev) => [...prev, newQualification]);
      
      // Show success notification
      notifications.show({
        title: 'Completed!',
        message: 'Special Qualification statuses have been successfully synced from Microsoft. Updated qualification information is now available.',
        color: 'green',
        autoClose: 5000,
      });
      
      // Keep the Special Qualifications section open and close the modal
      setSpecialQualificationsSectionOpen(true);
      setShowSpecialQualificationsSyncModal(false);
    }, 2000);
  };

  // Tenant management handlers
  // MPN ID Setup handlers
  const handleConfigureMpnId = () => {
    setMpnIdInput('');
    setShowMpnSetupModal(true);
  };

  const handleSaveMpnId = () => {
    if (mpnIdInput.trim()) {
      setIsConfiguring(true);
      
      // Simulate processing/validation delay
      setTimeout(() => {
        setPartnerInfo(prev => ({
          ...prev,
          mpnId: mpnIdInput.trim(),
          isConfigured: true
        }));
        setShowMpnSetupModal(false);
        setIsConfiguring(false);
        notifications.show({
          title: 'MPN ID Configured',
          message: `Microsoft Partner Network ID ${mpnIdInput.trim()} has been successfully configured for this reseller.`,
          color: 'green',
        });
      }, 1000); // 1 second delay
    }
  };

  // Partnership Invitation handlers
  const handleInvitePartner = () => {
    setPartnerEmailInput('');
    setShowPartnershipInviteModal(true);
  };

  const handleSendResellerRelationshipRequest = () => {
    // In real implementation, this would send a relationship request to the customer
    setRelationshipRequestStatus('pending');
    notifications.show({
      title: 'Reseller Relationship Request Sent',
      message: 'The customer will receive a relationship request to connect their Microsoft tenant.',
      color: 'blue',
    });
  };

  const toggleRelationshipRequestStatus = () => {
    setRelationshipRequestStatus(prev => {
      if (prev === 'not_sent') return 'pending';
      if (prev === 'pending') return 'linked';
      return 'not_sent';
    });
    
    // When toggling to 'linked', also set configured status
    if (relationshipRequestStatus === 'pending') {
      setPartnerInfo(prev => ({
        ...prev,
        isConfigured: true,
        mpnId: '5347093' // Set demo MPN ID
      }));
    }
  };

  const handleSendPartnershipInvite = () => {
    if (partnerEmailInput.trim()) {
      // In real implementation, this would trigger an email via backend
      notifications.show({
        title: 'Partnership Request Sent',
        message: `Partnership invitation email has been sent to ${partnerEmailInput}`,
        color: 'green',
      });
      setShowPartnershipInviteModal(false);
    }
  };

  const handleCopyInviteLink = () => {
    const inviteLink = `https://partner.microsoft.com/dashboard/v2/customers/indirectresellers/relationshiprequest/${distributorRelationshipId}`;
    navigator.clipboard.writeText(inviteLink);
    notifications.show({
      title: 'Link Copied',
      message: 'Partnership request link has been copied to clipboard',
      color: 'blue',
    });
  };

  const handleCopyEmailTemplate = () => {
    const emailTemplate = `Subject: Partnership Request from [Your Company Name]

Dear Partner,

We would like to invite you to establish a partnership with us in the Microsoft Cloud Solution Provider (CSP) program.

To accept this partnership request and connect your CSP indirect reseller account with our distributor account, please click the link below:

${`https://partner.microsoft.com/dashboard/v2/customers/indirectresellers/relationshiprequest/${distributorRelationshipId}`}

This partnership will allow us to:
• Provision Microsoft cloud solutions to customers on your behalf
• Assign your Partner Location Account (PLA) ID to subscriptions for incentives attribution
• Support your customers' Microsoft 365, Azure, and Dynamics 365 needs

Important: You must have an active CSP indirect reseller tenant to accept this request. If you don't have one yet, please visit Partner Center to enroll.

If you have any questions, please don't hesitate to contact us.

Best regards,
[Your Name]
[Your Company Name]`;

    navigator.clipboard.writeText(emailTemplate);
    notifications.show({
      title: 'Email Template Copied',
      message: 'Partnership invitation email template has been copied to clipboard',
      color: 'blue',
    });
  };

  const handleUnlinkTenant = () => {
    setShowUnlinkWarning(true);
  };

  const handleUnlinkConfirm = () => {
    if (unlinkConfirmation === 'CONFIRM') {
      setIsTenantLinked(false);
      setShowUnlinkWarning(false);
      setUnlinkConfirmation('');
    }
  };

  const handleCreateNewTenant = () => {
    // MCA is required before creating a tenant
    const notificationId = notifications.show({
      title: 'MCA Attestation Required',
      message: 'We need you to attest an MCA before we create your tenant.',
      color: 'blue',
      autoClose: false, // Keep notification visible until user completes or cancels
      withCloseButton: false, // Don't allow manual dismissal
    });
    
    // Store notification ID so we can dismiss it later
    setMcaNotificationId(notificationId);
    
    // Set flag that we're in tenant creation flow
    setIsCreatingTenantFlow(true);
    
    // Show MCA modal
    setTimeout(() => {
      setShowMcaModal(true);
    }, 500); // Small delay so user can see the notification
  };

  const handleLinkTenant = () => {
    setShowLinkTenantModal(true);
  };

  const handleCreateTenantConfirm = (formData: any) => {
    // Generate dummy tenant data based on form input
    const newTenantData = {
      domain: formData.domain,
      tenantId: `tenant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      globalAdmins: [`${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}@${formData.domain}`, 'admin@' + formData.domain],
      billingAdmins: [`billing.${formData.firstName.toLowerCase()}@${formData.domain}`, 'finance@' + formData.domain],
      agreementDate: new Date().toLocaleDateString('en-GB')
    };
    
    setTenantData(newTenantData);
    setIsTenantLinked(true);
    setRelationshipRequestStatus('linked');
    setMcaStatus('valid'); // MCA is now valid since it was attested during tenant creation
    setPartnerInfo(prev => ({
      ...prev,
      isConfigured: true,
      mpnId: '5347093'
    }));
    setShowCreateTenantModal(false);
    
    notifications.show({
      title: 'Tenant Created Successfully',
      message: `New Microsoft 365 tenant ${formData.domain} has been created and configured with MCA attestation.`,
      color: 'green',
    });
  };

  const handleLinkTenantConfirm = (domain: string) => {
    // Generate dummy tenant data for linked tenant
    const newTenantData = {
      domain: domain,
      tenantId: `linked-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      globalAdmins: ['admin@' + domain, 'global.admin@' + domain],
      billingAdmins: ['billing@' + domain, 'finance@' + domain],
      agreementDate: new Date().toLocaleDateString('en-GB')
    };
    
    setTenantData(newTenantData);
    setIsTenantLinked(true);
    setShowLinkTenantModal(false);
  };

  // Deployment and Usage Data
  const deploymentData = {
    entitlements: {
      total: 150,
      active: 142,
      percentage: 94.7,
      status: 'good' // good, warning, poor
    },
    active: {
      total: 142,
      active: 98,
      percentage: 69.0,
      status: 'warning'
    },
    deployment: {
      assigned: 142,
      sold: 150,
      percentage: 94.7,
      status: 'good'
    },
    usage: {
      activeUsers: 98,
      totalUsers: 142,
      percentage: 69.0,
      status: 'warning'
    }
  };

  // End-customer subscription data with term type breakdown
  const endCustomerSubscriptions = [
    {
      name: 'Microsoft 365 Business Premium',
      seats: 100,
      assigned: 96,
      active: 82,
      revenue: 1200.00,
      marginPercent: 9.5,
      termTypes: [
        { type: 'Annual Upfront', seats: 60, assigned: 58, active: 50, revenue: 720.00, marginPercent: 11.2 },
        { type: 'Annual billed Monthly', seats: 30, assigned: 28, active: 24, revenue: 360.00, marginPercent: 8.5 },
        { type: 'Monthly billed Monthly', seats: 10, assigned: 10, active: 8, revenue: 120.00, marginPercent: 5.8 }
      ]
    },
    {
      name: 'Office 365 E3',
      seats: 50,
      assigned: 46,
      active: 36,
      revenue: 600.00,
      marginPercent: 7.8,
      termTypes: [
        { type: 'Triannual Upfront', seats: 35, assigned: 32, active: 26, revenue: 420.00, marginPercent: 9.2 },
        { type: 'Annual billed Monthly', seats: 15, assigned: 14, active: 10, revenue: 180.00, marginPercent: 4.8 }
      ]
    },
    {
      name: 'Power BI Pro',
      seats: 15,
      assigned: 15,
      active: 15,
      revenue: 150.00,
      marginPercent: 10.5,
      termTypes: [
        { type: 'Monthly billed Monthly', seats: 10, assigned: 10, active: 10, revenue: 100.00, marginPercent: 11.8 },
        { type: 'Annual billed Monthly', seats: 5, assigned: 5, active: 5, revenue: 50.00, marginPercent: 8.2 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-700 bg-green-100';
      case 'warning': return 'text-yellow-700 bg-yellow-100';
      case 'poor': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  // Helper function to get color classes for margin percentages
  const getMarginColor = (marginPercent: number) => {
    if (marginPercent >= 10) return 'text-green-700 font-semibold';
    if (marginPercent >= 5) return 'text-yellow-700 font-semibold';
    return 'text-red-700 font-semibold';
  };

  const getAzureCostStatus = (projected: number, threshold: number) => {
    const percentage = (projected / threshold) * 100;
    if (percentage <= 80) return { status: 'under', color: 'green', label: 'Under Budget' };
    if (percentage <= 95) return { status: 'near', color: 'yellow', label: 'Near Threshold' };
    return { status: 'over', color: 'red', label: 'Over Budget' };
  };

  const getRecommendations = (metric: string) => {
    switch (metric) {
      case 'entitlements':
        return [
          'Review license assignments monthly to ensure optimal allocation',
          'Consider license optimization tools to identify unused licenses',
          'Implement automated license management processes'
        ];
      case 'active':
        return [
          'Offer training courses to increase user adoption',
          'Create case studies and user testimonials for specific scenarios',
          'Provide tutorial blogs and videos for common tasks',
          'Consider in-person or online training sessions'
        ];
      case 'deployment':
        return [
          'Ensure all purchased licenses are properly assigned',
          'Review assignment policies and automate where possible',
          'Monitor for license assignment delays or issues'
        ];
      case 'usage':
        return [
          'Promote self-service options to reduce support calls',
          'Update support site with self-service resources',
          'Offer dual strategy: training + self-service promotion',
          'Create user onboarding programs for new employees'
        ];
      default:
        return [];
    }
  };

  // Azure Management Permissions component
  const AzureManagementPermissions = () => {
    // Check if Telstra Azure GDAP relationship exists and is active
    const telstraAzureGdap = gdapRelationships.find(rel => 
      rel.name === 'Telstra Azure'
    );
    const hasActiveAzureGdap = telstraAzureGdap && telstraAzureGdap.active;
    const hasPendingAzureGdap = telstraAzureGdap && !telstraAzureGdap.active;

    const handleRequestAzureGdap = () => {
      // Create a new pending Telstra Azure GDAP relationship
      const newAzureGdap = {
        name: 'Telstra Azure',
        customerName: partnerInfo.isReseller ? 'Azure Customer' : '',
        customerDomain: partnerInfo.isReseller ? 'azurecustomer.onmicrosoft.com' : '',
        dateRange: 'Pending - Pending',
        autoExtend: true,
        active: false, // This will show as pending
        roles: [
          'Cloud application administrator',
          'Application administrator',
        ],
      };

      // Add the new relationship to the GDAP list
      setGdapRelationships(prev => [...prev, newAzureGdap]);
      
      // Keep the GDAP section open to show the new relationship
      setGdapSectionOpen(true);
    };

    const handleToggleAzureStatus = () => {
      if (hasPendingAzureGdap) {
        // Update the GDAP relationship to active
        setGdapRelationships(prev => 
          prev.map(rel => 
            rel.name === 'Telstra Azure'
              ? { ...rel, active: true, dateRange: '06/25/2025 - 12/25/2025' }
              : rel
          )
        );
      }
    };

    if (hasActiveAzureGdap) {
      return (
        <div className="flex items-center justify-between">
          <div className="text-sm text-green-700 font-medium">
            The correct permissions to manage the customers Azure subscription are correct and present!
          </div>
          <span className="text-xs font-bold uppercase text-green-700 bg-green-100 rounded px-2 py-1">Active</span>
        </div>
      );
    }

    if (hasPendingAzureGdap) {
      return (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Azure GDAP relationship requested
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 text-xs rounded border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
              disabled
            >
              Requested
            </button>
            <button
              className="text-xs font-bold uppercase rounded px-2 py-1 cursor-pointer text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
              onClick={handleToggleAzureStatus}
            >
              Pending
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between">
        <div className="text-sm text-red-700">
          The correct permissions are not present - would you like to request these?
        </div>
        <button
          className="px-3 py-1 text-xs rounded border border-blue-300 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
          onClick={handleRequestAzureGdap}
        >
          Request Telstra Azure GDAP
        </button>
      </div>
    );
  };

  // Helper function to get roles based on the selected option
  const getRolesForOption = (option: string) => {
    switch (option) {
      case 'Default Marketplace roles':
        return [
          'Privileged authentication administrator',
          'Privileged role administrator',
          'User administrator',
          'Helpdesk administrator',
          'License administrator',
          'Application administrator',
          'Cloud application administrator',
          'Service support administrator',
          'Directory writers',
          'Directory readers',
          'Global reader',
        ];
      case 'Telstra M365':
        return [
          'User administrator',
          'License administrator',
          'Helpdesk administrator',
        ];
      case 'Telstra Azure':
        return [
          'Cloud application administrator',
          'Application administrator',
        ];
      case 'Telstra M365 & Azure':
        return [
          'User administrator',
          'License administrator',
          'Helpdesk administrator',
          'Cloud application administrator',
          'Application administrator',
        ];
      default:
        return ['User administrator'];
    }
  };

  const microsoftLogo = '/microsoft (1).png';

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-800">Microsoft</h3>
        <button
          onClick={toggleConfigurationStatus}
          className="flex items-center space-x-1.5 px-2 py-1 bg-indigo-50 border border-indigo-200 rounded hover:bg-indigo-100 transition-colors text-[10px] font-medium text-indigo-600 uppercase tracking-wide"
          title="Toggle between new and existing reseller experience"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Demo: {partnerInfo.isConfigured ? 'Show Onboarding' : 'Show Configured'}</span>
        </button>
      </div>
      
      {/* Partner Information Section - Always visible */}
      {!partnerInfo.isConfigured ? (
        partnerInfo.isReseller ? (
          // Reseller Onboarding UI - When MPN ID is not configured
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-lg shadow-lg p-6">
            <div className="flex items-start mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mr-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Complete Reseller Onboarding</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This reseller company needs to be configured with a Microsoft Partner Network (MPN) ID to manage customers and transact CSP products.
                </p>
              </div>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option 1: Configure MPN ID */}
            <div className="bg-white border-2 border-blue-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
              <div className="flex items-center mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mr-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800">Configure MPN ID</h4>
              </div>
              <p className="text-xs text-gray-600 mb-4">
                If the partner already has a Microsoft Partner Network ID (MPN ID / PLA ID), enter it here to complete the setup.
              </p>
              <button
                onClick={handleConfigureMpnId}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Enter MPN ID
              </button>
            </div>

            {/* Option 2: Invite Partner */}
            <div className="bg-white border-2 border-purple-200 rounded-lg p-4 hover:border-purple-400 transition-colors">
              <div className="flex items-center mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mr-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800">Invite Partner</h4>
              </div>
              <p className="text-xs text-gray-600 mb-4">
                Send a partnership request email to invite this partner to connect their CSP indirect reseller account with your distributor account.
              </p>
              <button
                onClick={handleInvitePartner}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium text-sm"
              >
                Send Invitation
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-xs text-blue-800">
                <strong>Note:</strong> The partner must have an active CSP indirect reseller tenant to be linked as Partner of Record (POR). 
                <a href="https://learn.microsoft.com/en-us/partner-center/customers/indirect-provider-tasks-in-partner-center" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 ml-1">
                  Learn more about CSP partnerships
                </a>
              </div>
            </div>
          </div>
        </div>
        ) : (
          // End-Customer Onboarding UI - Create or Link Microsoft Tenant
          <div className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg shadow-lg p-6">
            <div className="flex items-start mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full mr-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Setup Microsoft Tenant</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Create a new Microsoft 365 tenant for the customer or link their existing tenant to your organization.
                </p>
              </div>
            </div>

            {relationshipRequestStatus === 'not_sent' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option 1: Create New Tenant */}
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
                    <div className="flex items-center mb-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mr-3">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-gray-800">Create New Tenant</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-4">
                      Create a new Microsoft 365 tenant for a customer who doesn't have one yet. This will provision a new tenant with the customer's domain.
                    </p>
                    <button
                      onClick={handleCreateNewTenant}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                      Create New Tenant
                    </button>
                  </div>

                  {/* Option 2: Link Existing Tenant */}
                  <div className="bg-white border-2 border-green-200 rounded-lg p-4 hover:border-green-400 transition-colors">
                    <div className="flex items-center mb-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mr-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-gray-800">Link Existing Tenant</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-4">
                      Send a reseller relationship request to connect the customer's existing Microsoft 365 tenant. They must approve the relationship to proceed.
                    </p>
                    <button
                      onClick={handleSendResellerRelationshipRequest}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium text-sm"
                    >
                      Link Existing Tenant
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-xs text-green-800">
                      <strong>Note:</strong> When linking an existing tenant, the customer must have Global Administrator permissions to approve the relationship request. 
                      <a href="https://learn.microsoft.com/en-us/partner-center/customers/request-a-relationship-with-a-customer" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-900 ml-1">
                        Learn more about customer relationships
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : relationshipRequestStatus === 'pending' ? (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full mr-3">
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Relationship Request Pending</h4>
                      <p className="text-xs text-gray-600 mt-1">Awaiting customer approval</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleRelationshipRequestStatus}
                    className="flex items-center space-x-1.5 px-2 py-1 bg-indigo-50 border border-indigo-200 rounded hover:bg-indigo-100 transition-colors text-[10px] font-medium text-indigo-600 uppercase tracking-wide"
                    title="Demo: Toggle to Linked status"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Demo: Link</span>
                  </button>
                </div>
                <div className="bg-white rounded p-3 border border-amber-200">
                  <p className="text-xs text-gray-700 mb-2">
                    The customer needs to sign in to their Microsoft 365 Admin Center and approve the relationship request before the connection is established.
                  </p>
                  <div className="flex items-center text-xs text-amber-700 font-medium mt-2">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Request sent - pending customer action
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )
      ) : !partnerInfo.isReseller ? (
        // Configured UI for End-Customers - When MPN ID is set (1:1 relationship)
        <ExpandableSection
          title={
            <div className="w-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-gray-800">Customer Tenant Information</h3>
              </div>
              <div className="space-y-2">
                {/* Customer Tenant Information First */}
                <div className="flex items-center justify-between bg-gray-50 border-2 border-gray-300 rounded-lg p-2">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-2">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-700 uppercase tracking-wide">Customer Tenant Information</div>
                      <div className="text-sm font-bold text-gray-900 mt-0.5">{tenantData.domain}</div>
                      <div className="text-xs text-gray-600 font-mono mt-0.5">Tenant ID: {tenantData.tenantId}</div>
                    </div>
                  </div>
                </div>

                {/* MCA Authorization Status Second */}
                <div className={`rounded-lg p-2 border-2 ${
                  mcaStatus === 'valid' 
                    ? 'bg-green-50 border-green-300' 
                    : mcaStatus === 'pending'
                    ? 'bg-amber-50 border-amber-300'
                    : 'bg-red-50 border-red-300'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium uppercase tracking-wide text-gray-500">MCA Authorization Status</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAuthorizationStatus();
                      }}
                      className="flex items-center space-x-1 px-1.5 py-0.5 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-colors text-[9px] font-medium text-gray-600 uppercase tracking-wide"
                      title="Demo: Cycle through MCA statuses"
                    >
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Demo</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
                        mcaStatus === 'valid' ? 'bg-green-100' : mcaStatus === 'pending' ? 'bg-amber-100' : 'bg-red-100'
                      }`}>
                        {mcaStatus === 'valid' ? (
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ) : mcaStatus === 'pending' ? (
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div>
                        <div className={`text-lg font-bold ${
                          mcaStatus === 'valid' ? 'text-green-800' : mcaStatus === 'pending' ? 'text-amber-800' : 'text-red-800'
                        }`}>
                          {mcaStatus === 'valid' ? 'VALID' : mcaStatus === 'pending' ? 'PENDING' : 'NOT AUTHORIZED'}
                      </div>
                      </div>
                    </div>
                    <div className="ml-2">
                      {mcaStatus === 'valid' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMcaModal(true);
                          }}
                          className="px-3 py-1.5 text-xs rounded border border-green-300 bg-green-100 text-green-700 hover:bg-green-200 transition-colors font-medium"
                        >
                          Update
                        </button>
                      )}
                      {mcaStatus === 'invalid' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMcaModal(true);
                          }}
                          className="px-3 py-1.5 text-xs rounded border border-red-300 bg-red-100 text-red-700 hover:bg-red-200 transition-colors font-medium"
                        >
                          Generate Agreement
                        </button>
                      )}
                      {mcaStatus === 'pending' && (
                        <span className="px-3 py-1.5 text-xs rounded border border-amber-300 bg-amber-100 text-amber-700 font-medium">
                          Processing...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Reseller of Record (MPN ID) Third */}
                <div className="flex items-center justify-between bg-blue-50 border-2 border-blue-300 rounded-lg p-2">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-blue-700 uppercase tracking-wide">Reseller of Record (MPN ID)</div>
                      <div className="text-lg font-bold text-blue-800 font-mono">{partnerInfo.mpnId}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          defaultOpen={mcaStatus === 'invalid'}
          sectionId="microsoft-partner-info"
          className="mb-4 bg-white border border-gray-200 rounded-lg shadow"
        >
        {mcaStatus === 'invalid' && (
            <div className="mt-4 bg-red-50 border-2 border-red-300 rounded-lg p-4">
              <div className="flex items-start mb-3">
                <svg className="w-6 h-6 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <div className="text-base font-bold text-red-900 mb-2">⚠️ Authorization Required - CSP Access Restricted</div>
                  <div className="text-sm text-red-800 space-y-2">
                    <p>
                      <strong>This reseller is NOT AUTHORIZED</strong> to transact Microsoft Cloud Solution Provider (CSP) products. 
                      Without proper authorization, they <strong>CANNOT</strong>:
                    </p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li>Place any new orders for customers</li>
                      <li>Modify or renew existing customer subscriptions</li>
                      <li>Access customer tenants or manage delegated admin privileges</li>
                      <li>Transact any Microsoft 365, Azure, or Dynamics 365 products</li>
                    </ul>
                    <p className="mt-3">
                      <strong>Action Required by the Reseller:</strong> Complete all mandatory security requirements as a condition of their continued CSP authorization. 
                      This includes implementing Multi-Factor Authentication (MFA), meeting security compliance standards, and completing all required partner certifications.
                    </p>
                    <div className="mt-3 pt-3 border-t border-red-300">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-red-700">
                          <strong>Reference:</strong> Microsoft Partner Center Security Requirements (October 2025) | 
                          <a 
                            href="https://learn.microsoft.com/en-us/partner-center/announcements/2025-october#9" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="underline hover:text-red-900 ml-1"
                          >
                            Learn more about security requirements
                          </a>
                        </p>
                        <button className="px-4 py-2 bg-white border-2 border-red-600 text-red-600 rounded hover:bg-red-50 transition-colors font-medium text-sm whitespace-nowrap">
                          Contact Support
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
      </ExpandableSection>
      ) : null}

      {/* GDAP Relationships - For End Customers */}
      {!partnerInfo.isReseller && partnerInfo.isConfigured ? (
      <>
      <ExpandableSection
        title="GDAP Relationships"
        defaultOpen={false}
        className="mb-4 bg-white border border-gray-200 rounded-lg shadow p-4"
        helpContent="Granular Delegated Admin Privileges (GDAP) define the specific permissions your reseller has to manage your Microsoft 365 environment, including user management, license assignment, and security settings."
      >
        {/* Active GDAP Relationship */}
        <ExpandableSection
          title={
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="font-medium">Default_Partner_Admin</span>
                <span className="text-xs text-gray-600 mt-1">
                  Reseller: MPN ID {partnerInfo.mpnId}
                </span>
              </div>
              <span className="text-xs font-bold uppercase text-green-700 bg-green-100 rounded px-2 py-1 ml-2">Active</span>
            </div>
          }
          defaultOpen={false}
          className="mb-3 border border-gray-200 bg-gray-50"
        >
          <div className="text-xs text-gray-600 mb-2">This is a Default GDAP relationship and was assigned when your tenant was created.</div>
          <div className="text-xs text-gray-500 mb-2">
            Relationship is valid from Jan 15, 2024 to Jan 15, 2026
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1"></div>
            <div className="flex items-center">
              <span className="text-xs text-gray-700 mr-2">Renew every 180 days</span>
              <Toggle enabled={true} onChange={() => {}} size="sm" />
            </div>
          </div>
          <ul className="text-xs text-gray-700 space-y-1">
            <li className="flex items-center py-2">
              <span className="mr-2 text-green-400">✔</span> Global Administrator
            </li>
            <li className="flex items-center py-2">
              <span className="mr-2 text-green-400">✔</span> User Administrator
            </li>
            <li className="flex items-center py-2">
              <span className="mr-2 text-green-400">✔</span> Security Administrator
            </li>
          </ul>
        </ExpandableSection>

        {/* Pending GDAP Relationship */}
        <ExpandableSection
          title={
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="font-medium">Helpdesk_Support</span>
                <span className="text-xs text-gray-600 mt-1">
                  Reseller: MPN ID {partnerInfo.mpnId}
                </span>
              </div>
              <span className="text-xs font-bold uppercase text-yellow-700 bg-yellow-100 rounded px-2 py-1 ml-2">Pending</span>
            </div>
          }
          defaultOpen={false}
          className="mb-3 border border-gray-200 bg-gray-50"
        >
          <div className="text-xs text-gray-600 mb-2">This GDAP relationship request has been sent to you and is awaiting your approval.</div>
          <div className="text-xs text-gray-500 mb-2">
            Request sent on Nov 8, 2025 - awaiting approval
          </div>
          <ul className="text-xs text-gray-700 space-y-1 mb-3">
            <li className="flex items-center py-2">
              <span className="mr-2 text-green-400">✔</span> Helpdesk Administrator
            </li>
            <li className="flex items-center py-2">
              <span className="mr-2 text-green-400">✔</span> Password Administrator
            </li>
          </ul>
          <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-3">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-xs text-blue-800">
                <span className="font-semibold">Action Required:</span> To approve or reject this GDAP request, please sign in to your Microsoft 365 Admin Center and navigate to Partner relationships.
              </div>
            </div>
          </div>
        </ExpandableSection>
      </ExpandableSection>

      {/* Special Qualifications - For End Customers */}
      <ExpandableSection
        title={
          <div className="flex items-center w-full">
            <span className="flex-1">Special Qualifications</span>
            <div className="flex items-center space-x-2">
              {!showSpecialQualificationForm && (
                <ActionButton onClick={() => setShowSpecialQualificationForm(true)}>New</ActionButton>
              )}
              <ActionButton onClick={handleSpecialQualificationSync}>Sync</ActionButton>
              {pendingSpecialQualifications.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpecialQualificationDemoReset();
                  }}
                  className="flex items-center space-x-1.5 px-2 py-1 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-colors text-[10px] font-medium text-gray-600 uppercase tracking-wide"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Demo: Reset</span>
                </button>
              )}
            </div>
          </div>
        }
        defaultOpen={false}
        className="mb-4 bg-white border border-gray-200 rounded-lg shadow p-4"
        helpContent="Request a Special Qualification from Microsoft for your organization. These qualifications provide access to specialized pricing and programs for eligible organizations."
      >
        {/* Display Pending Qualifications */}
        {pendingSpecialQualifications.length > 0 && (
          <div className="space-y-2 mb-4">
            {pendingSpecialQualifications.map((qual, idx) => (
              <div key={idx} className="bg-amber-50 border-2 border-amber-200 rounded-lg p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 bg-amber-100 rounded-full">
                        <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-amber-800">
                        {qual.type}{qual.segment ? ` - ${qual.segment}` : ''}
                      </span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-semibold rounded uppercase">
                        {qual.status}
                      </span>
                    </div>
                    <div className="ml-8 space-y-1">
                      <div className="text-xs text-gray-700">
                        <span className="font-semibold">Website:</span> {qual.website}
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="font-semibold">Submitted:</span> {qual.submittedDate}
                      </div>
                      <div className="text-xs text-amber-700 mt-2 font-medium">
                        ⏳ Microsoft is reviewing your qualification request. This typically takes 5-7 business days.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!showSpecialQualificationForm && pendingSpecialQualifications.length === 0 ? (
          <div className="text-sm text-gray-600 text-center py-4">
            Click "New" to request a Special Qualification from Microsoft
          </div>
        ) : showSpecialQualificationForm ? (
        <div className="space-y-4">
          {/* Qualification Type Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="text-red-500 mr-1">*</span>
              Special Qualification
            </label>
            <select
              value={specialQualification}
              onChange={(e) => {
                setSpecialQualification(e.target.value);
                setSpecialQualificationSegment('');
                setSpecialQualificationWebsite('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">Select</option>
              <option value="Education">Education</option>
              <option value="Government Community Cloud">Government Community Cloud</option>
              <option value="State Owned Entity">State Owned Entity</option>
            </select>
          </div>

          {/* Segment Dropdown (only show for Education) */}
          {specialQualification === 'Education' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="text-red-500 mr-1">*</span>
                Segment
              </label>
              <select
                value={specialQualificationSegment}
                onChange={(e) => setSpecialQualificationSegment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select</option>
                <option value="K-12">K-12</option>
                <option value="Higher Education">Higher Education</option>
              </select>
            </div>
          )}

          {/* Website Field */}
          {specialQualification && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {specialQualification === 'Education' && <span className="text-red-500 mr-1">*</span>}
                Website
              </label>
              <input
                type="url"
                value={specialQualificationWebsite}
                onChange={(e) => setSpecialQualificationWebsite(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          )}

          {/* Information Box */}
          {specialQualification && (
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-xs text-blue-800">
                  {specialQualification === 'Education' && (
                    <div>
                      <span className="font-semibold">Education Qualification:</span> Microsoft will verify your organization's educational status. This process typically takes 5-7 business days. Upon approval, you'll gain access to special academic pricing and programs.
                    </div>
                  )}
                  {specialQualification === 'Government Community Cloud' && (
                    <div>
                      <span className="font-semibold">Government Community Cloud:</span> This qualification is for US government organizations at the federal, state, local, or tribal level. Microsoft will verify your government entity status before granting access to GCC services.
                    </div>
                  )}
                  {specialQualification === 'State Owned Entity' && (
                    <div>
                      <span className="font-semibold">State Owned Entity:</span> This qualification is for government-controlled organizations and state-owned enterprises. Microsoft will review your organization's ownership structure and governmental affiliation.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => {
                if (isSpecialQualificationFormValid()) {
                  // Add to pending qualifications
                  const newQualification = {
                    type: specialQualification,
                    segment: specialQualificationSegment || undefined,
                    website: specialQualificationWebsite,
                    status: 'pending' as const,
                    submittedDate: new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })
                  };
                  setPendingSpecialQualifications(prev => [...prev, newQualification]);
                  
                  notifications.show({
                    title: 'Request Submitted',
                    message: `Your ${specialQualification} qualification request has been submitted to Microsoft for review.`,
                    color: 'blue',
                  });
                  
                  // Clear form
                  setSpecialQualification('');
                  setSpecialQualificationSegment('');
                  setSpecialQualificationWebsite('');
                  setShowSpecialQualificationForm(false);
                }
              }}
              disabled={!isSpecialQualificationFormValid()}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                isSpecialQualificationFormValid()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit to Microsoft
            </button>
            <button
              onClick={() => {
                setSpecialQualification('');
                setSpecialQualificationSegment('');
                setSpecialQualificationWebsite('');
                setShowSpecialQualificationForm(false);
              }}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
        ) : null}
      </ExpandableSection>

      {/* Azure Settings - For End Customers */}
      <ExpandableSection
        title="Azure Cost Management"
        defaultOpen={false}
        className="mb-4 bg-white border border-gray-200 rounded-lg shadow p-4"
        helpContent="Monitor your Azure consumption and costs. Track spending patterns, set budgets, and receive alerts to optimize your cloud spending."
      >
        {/* Azure Plan Status */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-blue-800">Azure Plan Active</div>
                <div className="text-xs text-blue-600">Subscription ID: {tenantData.tenantId.substring(0, 8)}...</div>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">Active</span>
          </div>
        </div>

        {/* Cost Summary */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white border border-blue-200 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Today</div>
            <div className="text-lg font-bold text-gray-800">$42.15</div>
            <div className="text-xs text-gray-500 mt-1">+$12.45 from yesterday</div>
          </div>
          <div className="bg-white border border-blue-200 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">This Month (MTD)</div>
            <div className="text-lg font-bold text-gray-800">$892.47</div>
            <div className="text-xs text-gray-500 mt-1">Projected: $1,245</div>
          </div>
          <div className="bg-white border border-blue-200 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Budget Alert</div>
            <div className="text-lg font-bold text-amber-600">72%</div>
            <div className="text-xs text-amber-600 mt-1 font-medium">Budget: $1,500</div>
          </div>
        </div>

        {/* Cost Management Settings */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <h4 className="text-sm font-bold text-gray-800 mb-3">Cost Management Settings</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-gray-700">Monthly Budget</div>
                <div className="text-xs text-gray-600">Alert when 80% reached</div>
              </div>
              <span className="text-sm font-bold text-gray-800">$1,500.00</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-gray-700">Daily Spending Limit</div>
                <div className="text-xs text-gray-600">Suspend services if exceeded</div>
              </div>
              <span className="text-sm font-bold text-gray-800">$75.00</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-gray-700">Cost Alerts</div>
                <div className="text-xs text-gray-600">Email notifications enabled</div>
              </div>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded uppercase">Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-gray-700">Auto-shutdown VMs</div>
                <div className="text-xs text-gray-600">Non-production at 7 PM daily</div>
              </div>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded uppercase">Enabled</span>
            </div>
          </div>
        </div>

        {/* Top Azure Services by Cost */}
        <div className="mt-4">
          <h4 className="text-sm font-bold text-gray-800 mb-2">Top Services by Cost (This Month)</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded p-2">
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-700">Virtual Machines</div>
                <div className="text-xs text-gray-500">3 instances running</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-800">$445.20</div>
                <div className="text-xs text-gray-500">49.9%</div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded p-2">
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-700">Storage Accounts</div>
                <div className="text-xs text-gray-500">1.2 TB stored</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-800">$287.15</div>
                <div className="text-xs text-gray-500">32.2%</div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded p-2">
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-700">App Services</div>
                <div className="text-xs text-gray-500">5 web apps</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-800">$160.12</div>
                <div className="text-xs text-gray-500">17.9%</div>
              </div>
            </div>
          </div>
        </div>
      </ExpandableSection>
      </>
      ) : null}

      {/* Reseller View - Show Partner Centre Insights and GDAP */}
      {partnerInfo.isReseller && partnerInfo.isConfigured ? (
        <>
          {/* Customer Tenant Information - For Resellers */}
          <ExpandableSection
            title="Customer Tenant Information"
            defaultOpen={true}
            className="mb-4 bg-white border border-gray-200 rounded-lg shadow p-4"
            helpContent="Customer Tenant Information displays details about your end-customers' Microsoft 365 tenants, including domain information, authorization status, and reseller of record details."
          >
            <div className="space-y-2">
              {endCustomers.map((customer) => (
                <ExpandableSection
                  key={customer.id}
                  title={
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">{customer.companyName}</span>
                        <span className="text-xs text-gray-500 mt-1">{customer.domain}</span>
                      </div>
                    </div>
                  }
                  defaultOpen={false}
                  className="bg-white border border-gray-200"
                >
                  <div className="space-y-2">
                    {/* Customer Tenant Information Card */}
                    <div className="flex items-center justify-between bg-gray-50 border-2 border-gray-300 rounded-lg p-2">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-2">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-700 uppercase tracking-wide">Customer Tenant Information</div>
                          <div className="text-sm font-bold text-gray-900 mt-0.5">{customer.domain}</div>
                          <div className="text-xs text-gray-600 font-mono mt-0.5">Tenant ID: {customer.tenantId}</div>
                        </div>
                      </div>
                    </div>

                    {/* MCA Authorization Status */}
                    <div className="flex items-center justify-between bg-green-50 border-2 border-green-300 rounded-lg p-2">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-2">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-green-700 uppercase tracking-wide">MCA Authorization Status</div>
                          <div className="text-lg font-bold text-green-800">VALID</div>
                        </div>
                      </div>
                    </div>

                    {/* Reseller of Record (MPN ID) */}
                    <div className="flex items-center justify-between bg-blue-50 border-2 border-blue-300 rounded-lg p-2">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-blue-700 uppercase tracking-wide">Reseller of Record (MPN ID)</div>
                          <div className="text-lg font-bold text-blue-800 font-mono">{partnerInfo.mpnId}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ExpandableSection>
              ))}
            </div>
          </ExpandableSection>
          
          {/* GDAP Relationships for Resellers */}
          <ExpandableSection
            title={
              <div className="flex items-center w-full">
                <span className="flex-1">GDAP Relationships</span>
                <div className="flex items-center space-x-2">
                  <ActionButton onClick={handleGdapNew}>New</ActionButton>
                  <ActionButton onClick={handleGdapSync}>Sync</ActionButton>
                </div>
              </div>
            }
            open={gdapSectionOpen}
            onToggle={setGdapSectionOpen}
            className="mb-4 bg-white border border-gray-200 rounded-lg shadow p-4"
            helpContent="GDAP (Granular Delegated Admin Privileges) Relationships with your end-customers. These define the specific permissions your organization has to manage each customer's Microsoft 365 environment, including user management, license assignment, and security settings."
          >
            {gdapRelationships.map((rel, idx) => (
              <ExpandableSection
                key={rel.name}
                title={
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                      <span className="font-medium">{rel.name}</span>
                      {rel.customerName && (
                        <span className="text-xs text-gray-600 mt-1">
                          Customer: {rel.customerName} ({rel.customerDomain})
                        </span>
                      )}
                    </div>
                    {rel.active ? (
                      <span className="text-xs font-bold uppercase text-green-700 bg-green-100 rounded px-2 py-1 ml-2">Active</span>
                    ) : (
                      <span className="text-xs font-bold uppercase text-yellow-700 bg-yellow-100 rounded px-2 py-1 ml-2">Pending</span>
                    )}
                  </div>
                }
                defaultOpen={false}
                className="mb-3 ml-4 border border-gray-200 bg-gray-50"
              >
                {rel.name.startsWith('Default_') ? (
                  <div className="text-xs text-gray-600 mb-2">This is a Default GDAP relationship and assigned when the tenant was created.</div>
                ) : !rel.active ? (
                  <div className="text-xs text-gray-600 mb-2">This GDAP relationship request has been sent to the customer and is awaiting approval.</div>
                ) : (
                  <div className="text-xs text-gray-600 mb-2">This GDAP relationship was explicitly requested by &lt;partner&gt; and accepted by the customer.</div>
                )}
                <div className="text-xs text-gray-500 mb-2">
                  {!rel.active ? (
                    'Request sent to customer - awaiting approval'
                  ) : rel.autoExtend ? (
                    `Relationship is valid from ${rel.dateRange.split(' - ')[0]} to ${rel.dateRange.split(' - ')[1]}`
                  ) : (
                    `Relationship is valid from ${rel.dateRange.split(' - ')[0]} to ${rel.dateRange.split(' - ')[1]} and will NOT renew`
                  )}
                </div>
                {rel.active && (
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1"></div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-700 mr-2">Renew every 180 days</span>
                      <Toggle enabled={rel.autoExtend} onChange={(val) => handleAutoExtendToggle(idx, val)} size="sm" />
                    </div>
                  </div>
                )}
                <ul className="text-xs text-gray-700 space-y-1">
                  {rel.roles.map((role) => (
                    <li key={role} className="flex items-center py-2">
                      <span className="mr-2 text-green-400">✔</span> {role}
                    </li>
                  ))}
                </ul>
              </ExpandableSection>
            ))}
          </ExpandableSection>

          {/* Partner Centre Insights - For Resellers */}
          <ExpandableSection 
            title="Partner Centre Insights" 
            sectionId="microsoft-partner-insights"
            defaultOpen={true}
            className="mb-4 bg-white border border-gray-200 rounded-lg shadow p-4"
            helpContent="Comprehensive analytics and metrics from Microsoft Partner Center about your end-customers' Microsoft 365 usage, deployment, subscriptions, and revenue. Use these insights to understand customer engagement, identify optimization opportunities, and track revenue performance."
          >
            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-700 uppercase">Total Seats</span>
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-blue-800">{endCustomers.reduce((sum, c) => sum + c.totalSeats, 0)}</div>
                <div className="text-xs text-blue-600 mt-1">Across all customers</div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-green-700 uppercase">Assigned Seats</span>
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-green-800">{endCustomers.reduce((sum, c) => sum + c.assignedSeats, 0)}</div>
                <div className="text-xs text-green-600 mt-1">
                  {((endCustomers.reduce((sum, c) => sum + c.assignedSeats, 0) / endCustomers.reduce((sum, c) => sum + c.totalSeats, 0)) * 100).toFixed(1)}% deployment
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-purple-700 uppercase">Active Users</span>
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-purple-800">{endCustomers.reduce((sum, c) => sum + c.activeUsers, 0)}</div>
                <div className="text-xs text-purple-600 mt-1">
                  {((endCustomers.reduce((sum, c) => sum + c.activeUsers, 0) / endCustomers.reduce((sum, c) => sum + c.assignedSeats, 0)) * 100).toFixed(1)}% usage (28 days)
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-amber-700 uppercase">Monthly Revenue</span>
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-amber-800">${endCustomers.reduce((sum, c) => sum + c.monthlyRevenue, 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <div className="text-xs text-amber-600 mt-1">MRR from {endCustomers.length} customers</div>
              </div>
            </div>

            {/* End-Customer List */}
            <div className="space-y-4">
              {endCustomers.map((customer) => (
                <ExpandableSection
                  key={customer.id}
                  title={
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">{customer.companyName}</span>
                        <span className="text-xs text-gray-500 mt-1">{customer.domain}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-700">${customer.monthlyRevenue.toLocaleString('en-US', {minimumFractionDigits: 2})}/mo</div>
                          <div className="text-xs">
                            <span className="text-gray-500">{customer.totalSeats} seats | </span>
                            <span className={getMarginColor(customer.marginPercent)}>{customer.marginPercent}% margin</span>
                          </div>
                        </div>
                        <span className={`text-xs font-bold uppercase rounded px-2 py-1 ${getStatusColor(customer.status)}`}>
                          {customer.status === 'good' ? '✓' : customer.status === 'warning' ? '⚠' : '⚠'}
                        </span>
                      </div>
                    </div>
                  }
                  defaultOpen={false}
                  className="bg-white border border-gray-200"
                >
                  {/* Customer Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs text-gray-600 mb-1">Deployment</div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-gray-800">{customer.deploymentPercentage}%</span>
                        <span className="text-xs text-gray-600">{customer.assignedSeats}/{customer.totalSeats}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${customer.status === 'good' ? 'bg-green-600' : customer.status === 'warning' ? 'bg-yellow-600' : 'bg-red-600'}`}
                          style={{ width: `${customer.deploymentPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs text-gray-600 mb-1">Usage (28 days)</div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-gray-800">{customer.usagePercentage}%</span>
                        <span className="text-xs text-gray-600">{customer.activeUsers}/{customer.assignedSeats}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${customer.usagePercentage >= 80 ? 'bg-green-600' : customer.usagePercentage >= 60 ? 'bg-yellow-600' : 'bg-red-600'}`}
                          style={{ width: `${customer.usagePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs text-gray-600 mb-1">Monthly Revenue</div>
                      <div className="text-lg font-bold text-gray-800">${customer.monthlyRevenue.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                      <div className="text-xs mt-1">
                        <span className="text-gray-600">{customer.subscriptions.length} subscription(s) | </span>
                        <span className={getMarginColor(customer.marginPercent)}>{customer.marginPercent}% margin</span>
                      </div>
                    </div>
                  </div>

                  {/* Subscriptions */}
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Active Subscriptions</div>
                    <div className="space-y-2">
                      {customer.subscriptions.map((sub, idx) => {
                        const assignedPercentage = (sub.assigned / sub.seats) * 100;
                        const activePercentage = (sub.active / sub.assigned) * 100;
                        
                        // Helper function to get color classes for percentages
                        const getPercentageColor = (percentage: number, type: 'assigned' | 'active') => {
                          if (type === 'assigned') {
                            if (percentage >= 90) return 'text-green-700 font-semibold';
                            if (percentage >= 75) return 'text-yellow-700 font-semibold';
                            return 'text-red-700 font-semibold';
                          } else { // active
                            if (percentage >= 80) return 'text-green-700 font-semibold';
                            if (percentage >= 60) return 'text-yellow-700 font-semibold';
                            return 'text-red-700 font-semibold';
                          }
                        };
                        
                        return (
                          <ExpandableSection
                            key={idx}
                            title={
                              <div className="flex items-center justify-between w-full">
                            <span className="text-sm font-medium text-gray-800">{sub.name}</span>
                                <div className="flex items-center space-x-3">
                                  <div className="text-right flex flex-col">
                            <span className="text-sm font-semibold text-gray-700">${sub.revenue.toLocaleString('en-US', {minimumFractionDigits: 2})}/mo</span>
                                    <span className="text-xs">
                                      <span className="text-gray-600">{sub.seats} seats | </span>
                                      <span className={getMarginColor(sub.marginPercent)}>{sub.marginPercent}% margin</span>
                                    </span>
                          </div>
                                </div>
                              </div>
                            }
                            defaultOpen={false}
                            className="bg-gray-50 border border-gray-200"
                          >
                            {/* Overall Subscription Stats */}
                            <div className="grid grid-cols-3 gap-3 text-xs mb-3 pb-3 border-b border-gray-300">
                              <div className="bg-white rounded p-2">
                                <span className="text-gray-600 font-medium block mb-1">Total Seats</span>
                                <span className="text-lg font-bold text-gray-800">{sub.seats}</span>
                              </div>
                              <div className="bg-white rounded p-2">
                                <span className="text-gray-600 font-medium block mb-1">Assigned</span>
                                <div className="flex items-baseline space-x-1">
                                  <span className="text-lg font-bold text-gray-800">{sub.assigned}</span>
                                  <span className={getPercentageColor(assignedPercentage, 'assigned')}>
                                    ({assignedPercentage.toFixed(0)}%)
                                  </span>
                                </div>
                                {assignedPercentage < 90 && (
                                  <div className={`text-xs mt-1 ${assignedPercentage < 75 ? 'text-red-600' : 'text-yellow-600'}`}>
                                    {assignedPercentage < 75 ? '⚠️ High waste risk' : '⚠️ Unused licenses'}
                                  </div>
                                )}
                              </div>
                              <div className="bg-white rounded p-2">
                                <span className="text-gray-600 font-medium block mb-1">Active (28d)</span>
                                <div className="flex items-baseline space-x-1">
                                  <span className="text-lg font-bold text-gray-800">{sub.active}</span>
                                  <span className={getPercentageColor(activePercentage, 'active')}>
                                    ({activePercentage.toFixed(0)}%)
                                  </span>
                                </div>
                                {activePercentage < 80 && (
                                  <div className={`text-xs mt-1 ${activePercentage < 60 ? 'text-red-600' : 'text-yellow-600'}`}>
                                    {activePercentage < 60 ? '⚠️ Incentive risk' : '⚠️ Low adoption'}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Term Type Breakdown */}
                            <div className="text-xs font-medium text-gray-600 mb-2">Term Type Breakdown ({sub.termTypes.length} types):</div>
                            <div className="space-y-2">
                              {sub.termTypes.map((termType, termIdx) => {
                                const termAssignedPct = (termType.assigned / termType.seats) * 100;
                                const termActivePct = (termType.active / termType.assigned) * 100;
                                
                                return (
                                  <div key={termIdx} className="bg-white border border-gray-200 rounded p-2">
                                    <div className="flex items-center justify-between mb-2">
                            <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${
                                        termType.type === 'Annual billed Monthly' ? 'bg-blue-100 text-blue-700' :
                                        termType.type === 'Triannual Upfront' ? 'bg-purple-100 text-purple-700' :
                                        termType.type === 'Annual Upfront' ? 'bg-indigo-100 text-indigo-700' :
                              'bg-green-100 text-green-700'
                                      }`}>{termType.type}</span>
                                      <div className="text-right">
                                        <div className="text-xs font-semibold text-gray-700">${termType.revenue.toLocaleString('en-US', {minimumFractionDigits: 2})}/mo</div>
                                        <div className="text-xs">
                                          <span className={getMarginColor(termType.marginPercent)}>{termType.marginPercent}% margin</span>
                          </div>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                            <div>
                                        <span className="font-medium">Seats:</span> {termType.seats}
                            </div>
                            <div>
                                        <span className="font-medium">Assigned:</span> {termType.assigned} 
                                        <span className={` ml-1 ${getPercentageColor(termAssignedPct, 'assigned')}`}>
                                          ({termAssignedPct.toFixed(0)}%)
                                        </span>
                            </div>
                            <div>
                                        <span className="font-medium">Active:</span> {termType.active} 
                                        <span className={` ml-1 ${getPercentageColor(termActivePct, 'active')}`}>
                                          ({termActivePct.toFixed(0)}%)
                                        </span>
                            </div>
                          </div>
                        </div>
                                );
                              })}
                            </div>
                          </ExpandableSection>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recommendations */}
                  {customer.status !== 'good' && (
                    <div className={`rounded p-3 ${customer.status === 'warning' ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
                      <div className={`text-sm font-medium mb-2 ${customer.status === 'warning' ? 'text-yellow-800' : 'text-red-800'}`}>
                        💡 Recommendations
                      </div>
                      <ul className={`text-xs space-y-1 ${customer.status === 'warning' ? 'text-yellow-700' : 'text-red-700'}`}>
                        {customer.deploymentPercentage < 90 && (
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Low deployment: {customer.totalSeats - customer.assignedSeats} unused licenses. Consider reducing seat count or assign to more users.</span>
                          </li>
                        )}
                        {customer.usagePercentage < 80 && (
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Low usage: Recommend training programs and adoption campaigns to increase user engagement.</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </ExpandableSection>
              ))}
            </div>

            {/* Data Attribution */}
            <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600">
              <div className="flex items-start">
                <svg className="w-4 h-4 text-gray-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong>Data Source:</strong> Microsoft Partner Center Insights API | <strong>Updated:</strong> Daily | <strong>Usage Period:</strong> Last 28 days | 
                  <a href="https://learn.microsoft.com/en-us/partner-center/develop/partner-center-analytics-resources" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                    Learn more about Partner Center Insights
                  </a>
                </div>
              </div>
            </div>
          </ExpandableSection>

          {/* Azure Cost Management - For Resellers */}
          <ExpandableSection 
            title="Azure Cost Management" 
            sectionId="microsoft-azure-cost-mgmt"
            defaultOpen={true}
            className="mb-4 bg-white border border-gray-200 rounded-lg shadow p-4"
            helpContent="Monitor Azure spending for customers with active Azure Plans. Track daily costs, monthly projections, and cost management thresholds to ensure customers stay within budget and avoid unexpected charges."
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-xs font-medium text-blue-700 uppercase mb-1">Total Customers with Azure</div>
                <div className="text-2xl font-bold text-blue-800">
                  {endCustomers.filter(c => c.azurePlan?.active).length}
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-xs font-medium text-purple-700 uppercase mb-1">Total Monthly Projected</div>
                <div className="text-2xl font-bold text-purple-800">
                  ${endCustomers.filter(c => c.azurePlan?.active).reduce((sum, c) => sum + (c.azurePlan?.monthlyProjected || 0), 0).toLocaleString('en-US', {minimumFractionDigits: 2})}
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="text-xs font-medium text-amber-700 uppercase mb-1">Total Daily Cost</div>
                <div className="text-2xl font-bold text-amber-800">
                  ${endCustomers.filter(c => c.azurePlan?.active).reduce((sum, c) => sum + (c.azurePlan?.dailyCost || 0), 0).toLocaleString('en-US', {minimumFractionDigits: 2})}
                </div>
              </div>
            </div>

            {/* Customer Azure Plans */}
            <div className="space-y-3">
              {endCustomers.filter(c => c.azurePlan?.active).map((customer) => {
                const azure = customer.azurePlan!;
                const costStatus = getAzureCostStatus(azure.monthlyProjected, azure.costThreshold);
                const thresholdPercentage = (azure.monthlyProjected / azure.costThreshold) * 100;
                
                return (
                  <ExpandableSection
                    key={customer.id}
                    title={
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-800">{customer.companyName}</span>
                          <span className="text-xs text-gray-500 mt-1">{customer.domain}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="text-sm font-bold text-gray-700">${azure.dailyCost.toLocaleString('en-US', {minimumFractionDigits: 2})}/day</div>
                            <div className="text-xs text-gray-500">${azure.monthlyProjected.toLocaleString('en-US', {minimumFractionDigits: 2})} projected</div>
                          </div>
                          <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                            costStatus.color === 'green' ? 'bg-green-100 text-green-700' :
                            costStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {costStatus.label}
                          </span>
                        </div>
                      </div>
                    }
                    defaultOpen={costStatus.status !== 'under'}
                    className="bg-white border border-gray-200"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                      <div className="bg-gray-50 rounded p-3">
                        <div className="text-xs text-gray-600 mb-1">Daily Cost</div>
                        <div className="text-lg font-bold text-gray-800">${azure.dailyCost.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                        <div className="text-xs text-gray-500">Per day</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded p-3">
                        <div className="text-xs text-gray-600 mb-1">Current Month Spend</div>
                        <div className="text-lg font-bold text-gray-800">${azure.currentMonthSpend.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                        <div className="text-xs text-gray-500">Day {azure.currentDay} of {azure.daysInMonth}</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded p-3">
                        <div className="text-xs text-gray-600 mb-1">Monthly Projected</div>
                        <div className="text-lg font-bold text-gray-800">${azure.monthlyProjected.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                        <div className="text-xs text-gray-500">Based on daily rate</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded p-3">
                        <div className="text-xs text-gray-600 mb-1">Cost Threshold</div>
                        <div className="text-lg font-bold text-gray-800">${azure.costThreshold.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                        <div className="text-xs text-gray-500">Monthly limit</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700">Budget Utilization</span>
                        <span className={`text-xs font-bold ${
                          costStatus.color === 'green' ? 'text-green-700' :
                          costStatus.color === 'yellow' ? 'text-yellow-700' :
                          'text-red-700'
                        }`}>
                          {thresholdPercentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all ${
                            costStatus.color === 'green' ? 'bg-green-600' :
                            costStatus.color === 'yellow' ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${Math.min(thresholdPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Warnings/Recommendations */}
                    {costStatus.status !== 'under' && (
                      <div className={`rounded p-3 ${
                        costStatus.color === 'yellow' ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'
                      }`}>
                        <div className={`text-sm font-medium mb-1 ${
                          costStatus.color === 'yellow' ? 'text-yellow-800' : 'text-red-800'
                        }`}>
                          {costStatus.status === 'near' ? '⚠️ Approaching Threshold' : '🚨 Budget Exceeded'}
                        </div>
                        <div className={`text-xs ${
                          costStatus.color === 'yellow' ? 'text-yellow-700' : 'text-red-700'
                        }`}>
                          {costStatus.status === 'near' ? (
                            <>Projected spend is {thresholdPercentage.toFixed(1)}% of the cost threshold. Monitor usage closely and consider optimizing resources or adjusting the threshold.</>
                          ) : (
                            <>Projected spend will exceed the cost threshold by ${(azure.monthlyProjected - azure.costThreshold).toLocaleString('en-US', {minimumFractionDigits: 2})}. Immediate action required to reduce costs or increase threshold.</>
                          )}
                        </div>
                      </div>
                    )}
                  </ExpandableSection>
                );
              })}
            </div>

            {/* Info Footer */}
            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
              <div className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong>Cost Management Thresholds:</strong> Under Budget (&lt;80%), Near Threshold (80-95%), Over Budget (&gt;95%). 
                  Daily costs are calculated from actual Azure consumption. Monthly projections are based on current daily average spend. 
                  <a href="https://learn.microsoft.com/en-us/azure/cost-management-billing/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 ml-1">
                    Learn more about Azure Cost Management
                  </a>
                </div>
              </div>
            </div>
          </ExpandableSection>
        </>
      ) : null}

      {/* GDAP Options Modal */}
      <GdapOptionsModal
        open={showGdapOptions}
        onClose={() => setShowGdapOptions(false)}
        onSelectOption={handleOptionSelect}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleSendRequest}
        selectedOption={selectedOption}
      />

      {/* MPN Setup Modal */}
      <MpnSetupModal
        open={showMpnSetupModal}
        onClose={() => !isConfiguring && setShowMpnSetupModal(false)}
        mpnIdInput={mpnIdInput}
        setMpnIdInput={setMpnIdInput}
        onSave={handleSaveMpnId}
        isLoading={isConfiguring}
      />

      {/* MCA Attestation Modal */}
      <McaAttestationModal
        open={showMcaModal}
        onClose={() => {
          setShowMcaModal(false);
          setIsCreatingTenantFlow(false); // Reset tenant creation flow if modal is closed
          
          // Dismiss the persistent MCA notification if user cancels
          if (mcaNotificationId) {
            notifications.hide(mcaNotificationId);
            setMcaNotificationId(null);
          }
        }}
        mcaSignatory={mcaSignatory}
        setMcaSignatory={setMcaSignatory}
        onSubmit={handleMcaSubmit}
        isGenerateMode={mcaStatus === 'invalid' || isCreatingTenantFlow} // Generate mode for new tenant or invalid MCA
      />

      {/* Create Tenant Modal */}
      <CreateTenantModal
        open={showCreateTenantModal}
        onClose={() => setShowCreateTenantModal(false)}
        onConfirm={handleCreateTenantConfirm}
      />

      {/* Link Tenant Modal */}
      <LinkTenantModal
        open={showLinkTenantModal}
        onClose={() => setShowLinkTenantModal(false)}
        onConfirm={handleLinkTenantConfirm}
      />
    </div>
  );
};

// Make this a module for TypeScript isolatedModules
export {};
