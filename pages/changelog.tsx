/**
 * Changelog Page
 * 
 * @description Complete version history and feature updates for Connect Kreations Resume Builder
 * @author techiekamal21 & Connect Kreations
 * @copyright 2025 techiekamal21 & Connect Kreations
 * @license MIT
 */

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Calendar, Plus, Bug, Sparkles, Zap, Target, Globe } from 'lucide-react';

const ChangelogPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Changelog - Connect Kreations Resume Builder</title>
        <meta name="description" content="Complete version history and feature updates for Connect Kreations Resume Builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between py-3 sm:py-0 sm:h-16 space-y-2 sm:space-y-0">
              <div className="flex items-center">
                <Link href="/">
                  <a className="flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Back to Resume Builder</span>
                    <span className="sm:hidden">Back</span>
                  </a>
                </Link>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2" />
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Changelog</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-sm p-6 mb-8 border border-blue-100">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 rounded-full p-2 mr-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Connect Kreations Resume Builder
              </h2>
            </div>
            <p className="text-gray-700 mb-4 text-lg">
              Track all the latest features, improvements, and bug fixes in our resume builder. 
              We're constantly working to make your resume building experience better!
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center text-sm text-gray-600 mb-2 sm:mb-0">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                <span>Last updated: January 3, 2025</span>
              </div>
              <div className="flex items-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Current: v1.3.0
                </span>
              </div>
            </div>
          </div>

          {/* Version 1.3.0 */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Version 1.3.0</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Latest
                </span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  Jan 3, 2025
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  <Plus className="w-4 h-4 text-green-600 mr-2" />
                  <span className="font-medium text-green-800">Added</span>
                </div>
                <ul className="ml-6 space-y-1 text-gray-700">
                  <li>• <strong>Drag-and-Drop Section Reordering</strong>: Complete drag-and-drop system for reordering resume sections</li>
                  <li>• <strong>Section Order Management</strong>: New "Section Order" tab with intuitive interface</li>
                  <li>• <strong>Visual Drag Feedback</strong>: Real-time visual indicators during drag operations</li>
                  <li>• <strong>Section Visibility Toggle</strong>: Eye icon for show/hide section control</li>
                  <li>• <strong>Professional Drag Interface</strong>: Grip handles and smooth transitions</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Bug className="w-4 h-4 text-red-600 mr-2" />
                  <span className="font-medium text-red-800">Fixed</span>
                </div>
                <ul className="ml-6 space-y-1 text-gray-700">
                  <li>• <strong>Custom Sections Functionality</strong>: Fixed custom sections not appearing in resume preview</li>
                  <li>• <strong>Section Rendering Logic</strong>: Improved custom section display with proper fallbacks</li>
                  <li>• <strong>Content Validation</strong>: Removed strict content requirements for section display</li>
                  <li>• <strong>Title Handling</strong>: Added fallback titles for empty custom sections</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800">Enhanced</span>
                </div>
                <ul className="ml-6 space-y-1 text-gray-700">
                  <li>• <strong>User Experience</strong>: Intuitive drag-and-drop interface with clear visual feedback</li>
                  <li>• <strong>Code Quality</strong>: Connect Kreations formatting improvements applied</li>
                  <li>• <strong>Component Architecture</strong>: Clean, reusable DraggableSectionList component</li>
                  <li>• <strong>TypeScript Integration</strong>: Type-safe drag and drop operations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Version 1.2.0 */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Version 1.2.0</h3>
              </div>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                Jan 3, 2025
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  <Plus className="w-4 h-4 text-green-600 mr-2" />
                  <span className="font-medium text-green-800">Added</span>
                </div>
                <ul className="ml-6 space-y-1 text-gray-700">
                  <li>• <strong>Smart Notification System</strong>: Temporary popup notifications instead of sticky indicators</li>
                  <li>• <strong>Auto-save Notifications</strong>: 3-second popup when data is saved</li>
                  <li>• <strong>Export Warnings</strong>: 2-second warning before export operations</li>
                  <li>• <strong>Browser Close Protection</strong>: beforeunload event listener to prevent data loss</li>
                  <li>• <strong>Fade-in Animations</strong>: Smooth CSS animations for notifications</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800">Enhanced</span>
                </div>
                <ul className="ml-6 space-y-1 text-gray-700">
                  <li>• <strong>Notification Timing</strong>: Context-aware notification durations</li>
                  <li>• <strong>Visual Design</strong>: Professional styling with appropriate colors and icons</li>
                  <li>• <strong>User Awareness</strong>: Clear messaging about temporary storage limitations</li>
                  <li>• <strong>Non-intrusive Interface</strong>: Notifications don't block user interaction</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Version 1.1.0 */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                  <Plus className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Version 1.1.0</h3>
              </div>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                Jan 3, 2025
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  <Zap className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="font-medium text-purple-800">Major Features</span>
                </div>
                <ul className="ml-6 space-y-1 text-gray-700">
                  <li>• <strong>Custom Sections Feature</strong>: Users can add unlimited custom sections (Languages, Hobbies, Awards, etc.)</li>
                  <li>• <strong>A4 Format Optimization</strong>: Exact A4 dimensions (210mm × 297mm) for professional printing</li>
                  <li>• <strong>Enhanced Header</strong>: "Connect Kreations Resume Builder" with clickable branding</li>
                  <li>• <strong>Professional Footer</strong>: Career opportunities and contact information</li>
                  <li>• <strong>Export Improvements</strong>: Enhanced PDF and Word export with A4 formatting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Version 1.0.0 */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-yellow-100 rounded-full p-2 mr-3">
                  <Globe className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Version 1.0.0</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Initial Release
                </span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  Jan 3, 2025
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  <Target className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800">Core Features</span>
                </div>
                <ul className="ml-6 space-y-1 text-gray-700">
                  <li>• <strong>Complete Resume Builder</strong>: Professional resume creation with real-time preview</li>
                  <li>• <strong>Multiple Sections</strong>: Personal info, summary, experience, education, skills, projects, certifications, achievements</li>
                  <li>• <strong>Export Functionality</strong>: PDF and Word export capabilities</li>
                  <li>• <strong>Font Customization</strong>: 5 professional fonts (Times New Roman, Arial, Calibri, Georgia, Helvetica)</li>
                  <li>• <strong>Auto-save</strong>: Local storage with automatic data persistence</li>
                  <li>• <strong>Responsive Design</strong>: Works on desktop and mobile devices</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Upcoming Features */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-blue-600" />
              Upcoming Features
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Planned for v1.4.0</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Resume Templates</li>
                  <li>• Color Themes</li>
                  <li>• Import/Export JSON</li>
                  <li>• Print Preview Mode</li>
                  <li>• Section Templates</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Future Enhancements</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Cloud Sync Integration</li>
                  <li>• Collaboration Features</li>
                  <li>• AI Content Suggestions</li>
                  <li>• Multi-language Support</li>
                  <li>• Analytics Dashboard</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Stay Updated</h3>
              <p className="text-gray-600 mb-4">
                Follow our development progress and get notified about new features.
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://www.connectkreations.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Visit Connect Kreations
                </a>
                <a
                  href="mailto:techiekamal21@gmail.com"
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 mt-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-300">
              © 2025 techiekamal21 & 
              <a 
                href="https://www.connectkreations.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors ml-1"
              >
                Connect Kreations
              </a>
              {' '}• Built with ❤️ for job seekers everywhere
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChangelogPage;