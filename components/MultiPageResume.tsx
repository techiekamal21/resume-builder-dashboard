/**
 * Multi-Page Resume Component
 * 
 * @description Handles automatic A4 page breaks with footer space and intelligent content splitting
 * @author techiekamal & Connect Kreations
 * @copyright 2024 techiekamal & Connect Kreations
 * @license MIT
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ResumeData } from '../types/resume';

interface MultiPageResumeProps {
  resumeData: ResumeData;
  children: React.ReactNode;
}

const MultiPageResume: React.FC<MultiPageResumeProps> = ({ resumeData, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    splitIntoPages();
  }, [resumeData, children]);

  const splitIntoPages = () => {
    const sections = React.Children.toArray(children);
    
    // For now, let's use a single page approach to fix export issues
    // We can enhance this later with better page splitting logic
    const singlePage = (
      <div key="page-0" className="resume-page">
        <div className="resume-content">
          {children}
        </div>
      </div>
    );

    setPages([singlePage]);
    
    // TODO: Implement intelligent page splitting based on actual content height
    // This would require measuring DOM elements and calculating optimal break points
  };

  return (
    <div ref={containerRef} className="resume-container">
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page}
          {index < pages.length - 1 && (
            <div className="page-break-indicator bg-gray-200 text-center py-2 text-sm text-gray-600 no-print">
              Page Break - Page {index + 1} of {pages.length}
            </div>
          )}
        </React.Fragment>
      ))}
      {pages.length > 1 && (
        <div className="text-center mt-4 text-sm text-gray-500 no-print">
          Total Pages: {pages.length}
        </div>
      )}
    </div>
  );
};

export default MultiPageResume;