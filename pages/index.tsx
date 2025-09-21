/**
 * Resume Builder Dashboard - Main Page
 * 
 * @description Professional resume builder with real-time preview and export functionality
 * @author techiekamal & Connect Kreations
 * @copyright 2024 techiekamal & Connect Kreations
 * @license MIT
 */

import React, { useState } from 'react';
import Head from 'next/head';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Download, FileText, Eye, AlertCircle, X } from 'lucide-react';
import { ResumeData } from '../types/resume';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { exportToPDF, exportToWord } from '../utils/exportUtils';
import { trackExport } from '../utils/analytics';
import ResumePreview from '../components/ResumePreview';
import EditPanel from '../components/EditPanel';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: 'New York, NY, USA',
    linkedin: 'https://www.linkedin.com/in/johnsmith',
    website: 'https://johnsmith.dev',
  },
  summary: 'Experienced Software Engineer with 3+ years in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about creating scalable web applications and delivering exceptional user experiences. Proven track record of leading development teams and implementing best practices.',
  experience: [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Senior Software Engineer',
      startDate: 'January 2023',
      endDate: 'Present',
      current: true,
      description: [
        'Led development of scalable web applications using React, Node.js, and AWS, serving 100k+ users',
        'Implemented CI/CD pipelines reducing deployment time by 60% and improving code quality',
        'Mentored junior developers and conducted code reviews ensuring best practices and knowledge sharing',
        'Collaborated with product managers and designers to deliver user-centric features on time'
      ]
    },
    {
      id: '2',
      company: 'Digital Innovations Inc',
      position: 'Full Stack Developer',
      startDate: 'June 2021',
      endDate: 'December 2022',
      current: false,
      description: [
        'Developed and maintained multiple client projects using React, Vue.js, and Express.js',
        'Built RESTful APIs and integrated third-party services improving application functionality',
        'Optimized database queries and implemented caching strategies reducing load times by 40%',
        'Participated in agile development processes and sprint planning sessions'
      ]
    },
    {
      id: '3',
      company: 'StartupXYZ',
      position: 'Junior Developer',
      startDate: 'August 2020',
      endDate: 'May 2021',
      current: false,
      description: [
        'Contributed to front-end development using HTML, CSS, JavaScript, and React',
        'Assisted in debugging and testing applications ensuring high-quality deliverables',
        'Learned modern development practices including version control with Git and agile methodologies',
        'Collaborated with senior developers to implement new features and fix bugs'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2016',
      endDate: '2020',
      gpa: '3.8'
    },
    {
      id: '2',
      institution: 'Metro High School',
      degree: 'High School Diploma',
      field: 'General Studies',
      startDate: '2012',
      endDate: '2016',
      gpa: '3.9'
    }
  ],
  skills: [
    { id: '1', name: 'JavaScript', level: 'Advanced' },
    { id: '2', name: 'React', level: 'Advanced' },
    { id: '3', name: 'Node.js', level: 'Advanced' },
    { id: '4', name: 'TypeScript', level: 'Intermediate' },
    { id: '5', name: 'Python', level: 'Intermediate' },
    { id: '6', name: 'AWS', level: 'Intermediate' },
    { id: '7', name: 'Docker', level: 'Intermediate' },
    { id: '8', name: 'MongoDB', level: 'Intermediate' },
    { id: '9', name: 'PostgreSQL', level: 'Intermediate' },
    { id: '10', name: 'Git', level: 'Advanced' },
    { id: '11', name: 'Agile/Scrum', level: 'Advanced' }
  ],
  projects: [
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration. Built with modern web technologies and deployed on AWS.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'AWS'],
      link: 'https://github.com/johnsmith/ecommerce-platform'
    },
    {
      id: '2',
      name: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.',
      technologies: ['Vue.js', 'Express.js', 'Socket.io', 'PostgreSQL'],
      link: 'https://github.com/johnsmith/task-manager'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: '2023'
    },
    {
      id: '2',
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2022'
    },
    {
      id: '3',
      name: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: '2021'
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'Employee of the Year Award for outstanding contribution to product development and team leadership',
      description: 'Recognized for leading a critical project that improved system performance by 50%',
      date: '2023'
    },
    {
      id: '2',
      title: 'Best Innovation Award at TechCorp Hackathon for developing an AI-powered code review tool',
      description: 'Created a tool that automated code quality checks and reduced review time by 30%',
      date: '2022'
    },
    {
      id: '3',
      title: 'Dean\'s List for Academic Excellence',
      description: 'Maintained GPA above 3.7 for four consecutive semesters',
      date: '2018-2020'
    }
  ],
  sections: [
    { id: 'personal', type: 'personal', title: 'Contact Details', visible: true, order: 1 },
    { id: 'summary', type: 'summary', title: 'Profile Summary', visible: true, order: 2 },
    { id: 'education', type: 'education', title: 'Academic Details', visible: true, order: 3 },
    { id: 'experience', type: 'experience', title: 'Work Experience', visible: true, order: 4 },
    { id: 'skills', type: 'skills', title: 'Skills', visible: true, order: 5 },
    { id: 'certifications', type: 'certifications', title: 'Course Certification', visible: true, order: 6 },
    { id: 'projects', type: 'projects', title: 'Academic Projects', visible: true, order: 7 },
    { id: 'achievements', type: 'achievements', title: 'Academic Achievements', visible: true, order: 8 },
  ],
  fontFamily: 'times',
  fontSize: 11,
};

export default function Home() {
  const { 
    value: resumeData, 
    setValue: setResumeData, 
    isLoading, 
    error: storageError,
    clearStorage 
  } = useLocalStorage<ResumeData>('resumeData', initialResumeData);
  
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const updateResumeData = (updates: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...updates }));
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    setExportError(null);
    try {
      await exportToPDF('resume-preview', `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      trackExport('pdf');
    } catch (error) {
      console.error('PDF export failed:', error);
      setExportError(`PDF export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportWord = async () => {
    setIsExporting(true);
    setExportError(null);
    try {
      await exportToWord(resumeData, `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.docx`);
      trackExport('word');
    } catch (error) {
      console.error('Word export failed:', error);
      setExportError(`Word export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Head>
          <title>Resume Builder Dashboard</title>
          <meta name="description" content="Create professional resumes with ease - Build ATS-friendly resumes with real-time preview and export to PDF/Word" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="keywords" content="resume builder, CV maker, professional resume, ATS resume, job application" />
          <link rel="canonical" href="https://your-domain.com" />
        </Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-gray-600">Loading your resume builder...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <ErrorBoundary>
      <Head>
        <title>Resume Builder Dashboard - Create Professional Resumes</title>
        <meta name="description" content="Create professional resumes with ease - Build ATS-friendly resumes with real-time preview and export to PDF/Word" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="resume builder, CV maker, professional resume, ATS resume, job application" />
        <link rel="canonical" href="https://your-domain.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Resume Builder Dashboard - Create Professional Resumes" />
        <meta property="og:description" content="Build professional, ATS-friendly resumes with real-time preview and export options" />
        <meta property="og:url" content="https://your-domain.com" />
        <meta property="og:image" content="https://your-domain.com/og-image.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content="Resume Builder Dashboard" />
        <meta name="twitter:description" content="Create professional resumes with ease" />
        <meta name="twitter:image" content="https://your-domain.com/twitter-image.png" />
      </Head>

      <DndProvider backend={HTML5Backend}>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-blue-600 mr-3" />
                  <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      isPreviewMode
                        ? 'bg-gray-200 text-gray-700'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleExportPDF}
                      disabled={isExporting}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {isExporting ? 'Exporting...' : 'Export PDF'}
                    </button>
                    
                    <button
                      onClick={handleExportWord}
                      disabled={isExporting}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {isExporting ? 'Exporting...' : 'Export Word'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex">
            {/* Edit Panel */}
            {!isPreviewMode && (
              <div className="w-96 flex-shrink-0">
                <EditPanel
                  resumeData={resumeData}
                  updateResumeData={updateResumeData}
                />
              </div>
            )}

            {/* Resume Preview */}
            <div className={`flex-1 ${isPreviewMode ? 'flex justify-center' : ''}`}>
              <div className="p-8">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      Resume Preview
                    </h2>
                    <p className="text-gray-600">
                      {isPreviewMode 
                        ? 'This is how your resume will look when exported'
                        : 'Edit your information on the left to see changes here'
                      }
                    </p>
                  </div>
                  
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <ResumePreview resumeData={resumeData} />
                  </div>
                  
                  {isPreviewMode && (
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-500 mb-4">
                        Ready to export? Use the buttons in the header above.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Error Messages */}
          {(storageError || exportError) && (
            <div className="fixed bottom-4 left-4 max-w-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Error</p>
                  <p className="text-sm">{storageError || exportError}</p>
                </div>
                <button
                  onClick={() => setExportError(null)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Auto-save indicator */}
          {!storageError && !isLoading && (
            <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-3 py-2 rounded-md text-sm shadow-lg">
              ✓ Auto-saved to local storage
            </div>
          )}

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-4 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                {/* Left - Copyright */}
                <div className="text-sm text-gray-300">
                  © 2024 techiekamal21 & Connect Kreations • Built with ❤️ for job seekers
                </div>

                {/* Middle - Connect Kreations Message */}
                <div className="text-center">
                  <p className="text-sm font-medium text-blue-300">
                    🚀 Career Opportunities Available!
                  </p>
                  <p className="text-xs text-gray-400">
                    Visit Connect Kreations for latest Job Opportunities and updates
                  </p>
                </div>

                {/* Right - Action Buttons */}
                <div className="flex space-x-3">
                  <a
                    href="https://www.connectkreations.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    View Jobs
                  </a>
                  <a
                    href="mailto:techiekamal21@gmail.com"
                    className="border border-gray-600 hover:border-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </DndProvider>
    </ErrorBoundary>
  );
}