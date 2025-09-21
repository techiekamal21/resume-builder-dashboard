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
    fullName: 'Kamal Patel',
    email: 'kamalpatel@pts@gmail.com',
    phone: '+ 91 7406673930',
    address: '',
    linkedin: 'https://www.linkedin.com/in/kamal-patel-61a8201a0/',
    website: '',
  },
  summary: 'Software Engineer with experience 2 year in the Telecom industry, skilled in Python, PACE automation, and DWDM, OTN technologies. Proficient in data analysis using Tableau, MongoDB, and SQL to deliver actionable insights. Experienced in building automation frameworks and ensuring optimized network solutions through effective testing.',
  experience: [
    {
      id: '1',
      company: 'Company 1: Infinera',
      position: 'Software QA Engineer I',
      startDate: 'November 2024',
      endDate: 'Present',
      current: true,
      description: [
        'Automated testing workflows using Python (Pytest), maintained and scaled test cases, and executed regression testing',
        'Worked on PACE automation, JIRA scripting, and developed robust automation frameworks for efficient testing',
        'Gained expertise in SQL, Spring Boot, MVC, Django, debugging and optical technologies like OTN, OTDR, and DWDM, while analyzing performance monitoring (PMIs)',
        'Automated the integration and execution of Python-based test suites within Docker containers, Kubernetes and Helm ensuring consistent environments for test automation and script execution across teams'
      ]
    },
    {
      id: '2',
      company: 'Company 2: Tejas Network',
      position: 'R&D PV-PE Engineer',
      startDate: 'August 2023',
      endDate: 'October 2024',
      current: false,
      description: [
        'Developed a web-based Tester Reservation platform using Python Flask, Django, HTML, CSS and SQL, optimizing the allocation of testers and device requirements for DWDM and WSON setups. This solution enhanced resource management and improved overall efficiency, ensuring timely project completion',
        'Worked on DWDM/OTN multiple-division multiplexing and WSON (Wavelength switched optical network) for an environment of Network Planning tool software and protection cases for traffic flow through the network',
        'Developed selenium python framework and Robot Framework for testing testcases and regression testing for ROADM, DWDM and multi-purpose network for Laser',
        'Developed an RESTful API to map logs for testcase and Integrated with Planning tool',
        'Worked on multiple systems for JIRA and Jenkins for setting the server for web based planning tool',
        'Experience with tracking system JIRA, version control system Git, CI/CD Jenkins, UI/UX concerns',
        'Undertook the development of an Automation Framework from Scratch which involved using several Object Oriented Programming concepts in Python. Experienced in Python and familiar with various libraries'
      ]
    },
    {
      id: '3',
      company: 'Tejas Network',
      position: 'R&D PV-PE Intern Trainee',
      startDate: 'March 2023',
      endDate: 'July 2023',
      current: false,
      description: [
        'Worked on Networking Technologies and Software development life cycle following the agile methodology',
        'Hands on the testing in SQL, Spring Boot, Scrum, Setup, Optimization of the power loss',
        'Using data analysis technique to make analysis of the network BOM/BOQ requirements',
        'Collaborated with cross-functional teams to ensure seamless integration backend database and verification of product results and data analysis'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'KLS Gogte Institute of Technology',
      degree: 'Electronics and Communication Engineering',
      field: 'Engineering',
      startDate: '2019',
      endDate: '2023',
      gpa: '8.47'
    },
    {
      id: '2',
      institution: 'Vijayanand Residential PU College, Pre-University',
      degree: 'PCMB',
      field: 'Science',
      startDate: '2017',
      endDate: '2019',
      gpa: '88.5%'
    },
    {
      id: '3',
      institution: 'The Aditya Birla Public School, High School',
      degree: 'High School',
      field: 'General',
      startDate: '2016',
      endDate: '2017',
      gpa: '9.2'
    }
  ],
  skills: [
    { id: '1', name: 'Python', level: 'Advanced' },
    { id: '2', name: 'C/C++', level: 'Intermediate' },
    { id: '3', name: 'Linux', level: 'Intermediate' },
    { id: '4', name: 'Agile Methodology', level: 'Intermediate' },
    { id: '5', name: 'Computer Networking', level: 'Advanced' },
    { id: '6', name: 'Bitbucket, CI/CD', level: 'Intermediate' },
    { id: '7', name: 'Bugzilla, Jira', level: 'Intermediate' },
    { id: '8', name: 'AI & ML Tools/Methodologies', level: 'Beginner' },
    { id: '9', name: 'SQL, MongoDB', level: 'Intermediate' },
    { id: '10', name: 'Software Development Life Cycle(SDLC)', level: 'Advanced' },
    { id: '11', name: 'Data Analysis tool Tableau', level: 'Intermediate' }
  ],
  projects: [
    {
      id: '1',
      name: 'Image Compression using AI Intelligence Techniques –Lossy Compression with AI & GANs',
      description: 'Programming Languages : Python, Tensorflow, sci-kit-learn, numpy, pandas. Built a lossy image compression model using AI and GANs to reduce storage needs while preserving image quality.',
      technologies: ['Python', 'TensorFlow', 'scikit-learn', 'numpy', 'pandas'],
      link: ''
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'Tableau Fundamentals, Tableau Academy',
      issuer: 'Tableau Academy',
      date: ''
    },
    {
      id: '2',
      name: 'Professional DevOps, Infosys Springboard',
      issuer: 'Infosys Springboard',
      date: ''
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'Second 1st Prize Paper Presentation titled "Human and Animal Detection using Sensor" during Flagship Technical Festival "Avalanche" Organized by KLS Gogte Institute of Technology',
      description: '',
      date: ''
    },
    {
      id: '2',
      title: 'NCC - A Certificate holder and attended "International Day Of Yoga 2016"',
      description: '',
      date: ''
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
        </div>
      </DndProvider>
    </ErrorBoundary>
  );
}