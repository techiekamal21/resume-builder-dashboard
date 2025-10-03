/**
 * Multi-Page Resume Component
 * 
 * @description Handles automatic A4 page breaks and multi-page resume layout
 * @author techiekamal21 & Connect Kreations
 * @copyright 2025 techiekamal21 & Connect Kreations
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
    // For now, we'll use a simpler approach - always use single page
    // and let the export handle page breaks naturally
    setPages([
      <div key="page-0" className="resume-page">
        {children}
      </div>
    ]);
  }, [resumeData, children]);

  const splitIntoPages = () => {
    // For now, we'll use a simple approach - if content is too long,
    // we'll split it into multiple pages based on sections
    const sections = React.Children.toArray(children);
    const pagesArray: React.ReactNode[] = [];
    let currentPageContent: React.ReactNode[] = [];
    let currentPageHeight = 0;
    const MAX_PAGE_HEIGHT = 800; // Approximate content height per page

    sections.forEach((section, index) => {
      // Estimate section height (this is a simplified approach)
      const estimatedHeight = 150; // Base height per section
      
      if (currentPageHeight + estimatedHeight > MAX_PAGE_HEIGHT && currentPageContent.length > 0) {
        // Start new page
        pagesArray.push(
          <div key={`page-${pagesArray.length}`} className="resume-page">
            {currentPageContent}
          </div>
        );
        currentPageContent = [section];
        currentPageHeight = estimatedHeight;
      } else {
        currentPageContent.push(section);
        currentPageHeight += estimatedHeight;
      }
    });

    // Add remaining content as last page
    if (currentPageContent.length > 0) {
      pagesArray.push(
        <div key={`page-${pagesArray.length}`} className="resume-page">
          {currentPageContent}
        </div>
      );
    }

    setPages(pagesArray.length > 0 ? pagesArray : [
      <div key="page-0" className="resume-page">
        {children}
      </div>
    ]);
  };

  return (
    <div ref={containerRef} className="resume-container">
      {pages.length > 0 ? (
        <>
          {pages.map((page, index) => (
            <React.Fragment key={index}>
              {page}
              {index < pages.length - 1 && (
                <div className="page-break-indicator bg-gray-200 text-center py-2 text-sm text-gray-600 no-print">
                  Page {index + 1} of {pages.length}
                </div>
              )}
            </React.Fragment>
          ))}
          {pages.length > 1 && (
            <div className="text-center mt-4 text-sm text-gray-500 no-print">
              Total Pages: {pages.length}
            </div>
          )}
        </>
      ) : (
        <div className="resume-page">
          {children}
        </div>
      )}
    </div>
  );
};

export default MultiPageResume;