import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const SecondaryNavbar = () => {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path
  
  const tabClass = (path: string) => `
    text-sm text-gray-600 pb-2 cursor-pointer hover:text-gray-900 transition-colors
    ${isActive(path) ? 'border-b-2 border-gray-800 font-medium' : ''}
  `
  
  return (
    <div className="flex items-center border-b border-gray-200 px-4 py-2 bg-white">
      <div className="flex space-x-6">
        <span className="text-sm text-gray-600">Marketplace</span>
        <Link to="/company-details" className={tabClass('/company-details')}>
          Home
        </Link>
        <Link to="/company-details" className={tabClass('/company-details')}>
          Operations
        </Link>
        <span className="text-sm text-gray-600">Products</span>
        <Link to="/settings" className={tabClass('/settings')}>
          Settings
        </Link>
        <span className="text-sm text-gray-600">Reports</span>
        <span className="text-sm text-gray-600">Themes</span>
        <span className="text-sm text-gray-600">Programs</span>
      </div>
    </div>
  )
} 