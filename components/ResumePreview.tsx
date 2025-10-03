/**
 * Resume Preview Component
 * 
 * @description Professional resume preview with real-time rendering
 * @author techiekamal & Connect Kreations
 * @copyright 2024 techiekamal & Connect Kreations
 * @license MIT
 */

'use client';

import React from 'react';
import { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const fontClass = `font-${resumeData.fontFamily}`;
  
  const visibleSections = resumeData.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);

  const renderSection = (section: any) => {
    switch (section.type) {
      case 'personal':
        return (
          <div className="resume-section">
            {/* Header with name centered and underlined */}
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold tracking-wider border-b-2 border-black pb-1 inline-block">
                {resumeData.personalInfo.fullName.toUpperCase()}
              </h1>
            </div>
            
            {/* Contact Details Section */}
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-2">Contact Details</h2>
              <div className="flex flex-wrap items-center text-xs space-x-4">
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-gray-800 rounded-full inline-block mr-2"></span>
                  {resumeData.personalInfo.email}
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-gray-800 rounded-full inline-block mr-2"></span>
                  {resumeData.personalInfo.phone}
                </div>
                {resumeData.personalInfo.linkedin && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-blue-600 rounded-full inline-block mr-2"></span>
                    <a href={resumeData.personalInfo.linkedin} className="text-blue-600 underline">
                      {resumeData.personalInfo.linkedin}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'summary':
        return resumeData.summary ? (
          <div className="resume-section">
            <h2 className="text-sm font-bold mb-2">Profile Summary</h2>
            <ul className="text-xs leading-relaxed space-y-1">
              {resumeData.summary.split('.').filter(s => s.trim()).map((sentence, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{sentence.trim()}.</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null;

      case 'education':
        return resumeData.education.length > 0 ? (
          <div className="resume-section">
            <h2 className="text-sm font-bold mb-2">Academic Details</h2>
            <div className="space-y-2">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex items-start">
                    <span className="mr-2">•</span>
                    <div>
                      <span className="font-semibold">{edu.institution}</span>
                      <span className="mx-2">|</span>
                      <span>{edu.degree} in {edu.field}</span>
                      {edu.gpa && (
                        <>
                          <span className="mx-2">|</span>
                          <span>{edu.gpa} (CGPA)</span>
                        </>
                      )}
                      <span className="mx-2">|</span>
                      <span>{edu.startDate}-{edu.endDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'experience':
        return resumeData.experience.length > 0 ? (
          <div className="resume-section">
            <h2 className="text-sm font-bold mb-2">Work Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <span className="font-bold">{exp.company}</span>
                      <span className="mx-4">Role: </span>
                      <span className="font-semibold">{exp.position}</span>
                    </div>
                    <span className="font-semibold">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <ul className="space-y-1 ml-0">
                    {exp.description.map((desc, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'skills':
        return resumeData.skills.length > 0 ? (
          <div className="resume-section">
            <h2 className="text-sm font-bold mb-2">Skills</h2>
            <div className="grid grid-cols-4 gap-x-8 gap-y-1 text-xs">
              {resumeData.skills.map((skill) => (
                <div key={skill.id} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'certifications':
        return resumeData.certifications && resumeData.certifications.length > 0 ? (
          <div className="resume-section">
            <h2 className="text-sm font-bold mb-2">Course Certification</h2>
            <div className="space-y-1">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className="text-xs flex items-start">
                  <span className="mr-2">•</span>
                  <span>{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return resumeData.projects.length > 0 ? (
          <div className="resume-section">
            <h2 className="text-sm font-bold mb-2">Academic Projects</h2>
            <div className="space-y-3">
              {resumeData.projects.map((project, index) => (
                <div key={project.id} className="text-xs">
                  <div className="mb-1">
                    <span className="font-bold">{index + 1}. {project.name}</span>
                    {project.technologies.length > 0 && (
                      <>
                        <span className="mx-2">–</span>
                        <span className="italic">{project.technologies.join(', ')}</span>
                      </>
                    )}
                  </div>
                  <ul className="space-y-1">
                    {project.description.split('.').filter(s => s.trim()).map((desc, descIndex) => (
                      <li key={descIndex} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{desc.trim()}.</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'achievements':
        return resumeData.achievements && resumeData.achievements.length > 0 ? (
          <div className="resume-section">
            <h2 className="text-sm font-bold mb-2">Academic Achievements</h2>
            <div className="space-y-1">
              {resumeData.achievements.map((achievement, index) => (
                <div key={achievement.id} className="text-xs flex items-start">
                  <span className="mr-2">{index + 1}.</span>
                  <span>{achievement.title}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'custom':
        // Find the custom section that matches this section ID
        const customSectionId = section.id.replace('custom-', '');
        const customSection = resumeData.customSections?.find(cs => cs.id === customSectionId);
        
        return customSection && customSection.title && customSection.content ? (
          <div className="resume-section">
            <h2 className="text-sm font-bold mb-2">{customSection.title.toUpperCase()}</h2>
            <div className="text-xs leading-relaxed">
              {customSection.content.split('\n').map((line, index) => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return null;
                
                return (
                  <div key={index} className="mb-1">
                    {trimmedLine.startsWith('•') || trimmedLine.startsWith('-') ? (
                      <div className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{trimmedLine.replace(/^[•\-]\s*/, '')}</span>
                      </div>
                    ) : (
                      <div>{trimmedLine}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div 
      id="resume-preview" 
      className={`resume-container ${fontClass} text-black bg-white`}
      style={{ fontSize: `${resumeData.fontSize}px`, lineHeight: '1.4' }}
    >
      {visibleSections.map((section) => (
        <React.Fragment key={section.id}>
          {renderSection(section)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ResumePreview;