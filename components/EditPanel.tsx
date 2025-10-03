/**
 * Edit Panel Component
 * 
 * @description Interactive editing interface for resume sections
 * @author techiekamal & Connect Kreations
 * @copyright 2024 techiekamal & Connect Kreations
 * @license MIT
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ResumeData, Experience, Education, Skill, Project, Certification, Achievement, CustomSection, FontFamily } from '../types/resume';
import { Plus, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';
import DraggableSectionList from './DraggableSectionList';

interface EditPanelProps {
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
}

const EditPanel: React.FC<EditPanelProps> = ({ resumeData, updateResumeData }) => {
  const [activeTab, setActiveTab] = useState('personal');

  const fontOptions: { value: FontFamily; label: string }[] = [
    { value: 'times', label: 'Times New Roman' },
    { value: 'arial', label: 'Arial' },
    { value: 'calibri', label: 'Calibri' },
    { value: 'georgia', label: 'Georgia' },
    { value: 'helvetica', label: 'Helvetica' },
  ];

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
    };
    updateResumeData({
      experience: [...resumeData.experience, newExp],
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updated = resumeData.experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateResumeData({ experience: updated });
  };

  const deleteExperience = (id: string) => {
    updateResumeData({
      experience: resumeData.experience.filter(exp => exp.id !== id),
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    };
    updateResumeData({
      education: [...resumeData.education, newEdu],
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const updated = resumeData.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateResumeData({ education: updated });
  };

  const deleteEducation = (id: string) => {
    updateResumeData({
      education: resumeData.education.filter(edu => edu.id !== id),
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
    };
    updateResumeData({
      skills: [...resumeData.skills, newSkill],
    });
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    const updated = resumeData.skills.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    updateResumeData({ skills: updated });
  };

  const deleteSkill = (id: string) => {
    updateResumeData({
      skills: resumeData.skills.filter(skill => skill.id !== id),
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
    };
    updateResumeData({
      projects: [...resumeData.projects, newProject],
    });
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    const updated = resumeData.projects.map(project =>
      project.id === id ? { ...project, [field]: value } : project
    );
    updateResumeData({ projects: updated });
  };

  const deleteProject = (id: string) => {
    updateResumeData({
      projects: resumeData.projects.filter(project => project.id !== id),
    });
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
    };
    updateResumeData({
      certifications: [...(resumeData.certifications || []), newCert],
    });
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    const updated = (resumeData.certifications || []).map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    updateResumeData({ certifications: updated });
  };

  const deleteCertification = (id: string) => {
    updateResumeData({
      certifications: (resumeData.certifications || []).filter(cert => cert.id !== id),
    });
  };

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
    };
    updateResumeData({
      achievements: [...(resumeData.achievements || []), newAchievement],
    });
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: any) => {
    const updated = (resumeData.achievements || []).map(achievement =>
      achievement.id === id ? { ...achievement, [field]: value } : achievement
    );
    updateResumeData({ achievements: updated });
  };

  const deleteAchievement = (id: string) => {
    updateResumeData({
      achievements: (resumeData.achievements || []).filter(achievement => achievement.id !== id),
    });
  };

  const addCustomSection = () => {
    const sectionId = Date.now().toString();
    const newCustomSection: CustomSection = {
      id: sectionId,
      title: '',
      content: '',
    };
    
    // Add to custom sections array
    const updatedCustomSections = [...(resumeData.customSections || []), newCustomSection];
    
    // Add to sections array for visibility control
    const newSection = {
      id: `custom-${sectionId}`,
      type: 'custom' as const,
      title: 'Custom Section',
      visible: true,
      order: resumeData.sections.length + 1,
    };
    const updatedSections = [...resumeData.sections, newSection];
    
    updateResumeData({
      customSections: updatedCustomSections,
      sections: updatedSections,
    });
  };

  const updateCustomSection = (id: string, field: keyof CustomSection, value: any) => {
    const updated = (resumeData.customSections || []).map(section =>
      section.id === id ? { ...section, [field]: value } : section
    );
    
    // If title is being updated, also update the section title
    if (field === 'title') {
      const updatedSections = resumeData.sections.map(section =>
        section.id === `custom-${id}` ? { ...section, title: value || 'Custom Section' } : section
      );
      updateResumeData({ 
        customSections: updated,
        sections: updatedSections 
      });
    } else {
      updateResumeData({ customSections: updated });
    }
  };

  const deleteCustomSection = (id: string) => {
    // Remove from custom sections array
    const updatedCustomSections = (resumeData.customSections || []).filter(section => section.id !== id);
    
    // Remove from sections array
    const updatedSections = resumeData.sections.filter(section => section.id !== `custom-${id}`);
    
    updateResumeData({
      customSections: updatedCustomSections,
      sections: updatedSections,
    });
  };

  const toggleSectionVisibility = (sectionId: string) => {
    const updated = resumeData.sections.map(section =>
      section.id === sectionId ? { ...section, visible: !section.visible } : section
    );
    updateResumeData({ sections: updated });
  };

  const handleSectionReorder = (reorderedSections: any[]) => {
    updateResumeData({ sections: reorderedSections });
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'custom', label: 'Custom Sections' },
    { id: 'sections', label: 'Section Order' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="w-full bg-white lg:border-r border-gray-200 lg:h-screen overflow-y-auto">
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Resume Builder</h2>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex flex-wrap overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-3 sm:p-4">
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={resumeData.personalInfo.fullName}
                onChange={(e) =>
                  updateResumeData({
                    personalInfo: { ...resumeData.personalInfo, fullName: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) =>
                  updateResumeData({
                    personalInfo: { ...resumeData.personalInfo, email: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={resumeData.personalInfo.phone}
                onChange={(e) =>
                  updateResumeData({
                    personalInfo: { ...resumeData.personalInfo, phone: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                value={resumeData.personalInfo.address}
                onChange={(e) =>
                  updateResumeData({
                    personalInfo: { ...resumeData.personalInfo, address: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn (Optional)
              </label>
              <input
                type="url"
                value={resumeData.personalInfo.linkedin || ''}
                onChange={(e) =>
                  updateResumeData({
                    personalInfo: { ...resumeData.personalInfo, linkedin: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website (Optional)
              </label>
              <input
                type="url"
                value={resumeData.personalInfo.website || ''}
                onChange={(e) =>
                  updateResumeData({
                    personalInfo: { ...resumeData.personalInfo, website: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {activeTab === 'summary' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professional Summary
            </label>
            <textarea
              value={resumeData.summary}
              onChange={(e) => updateResumeData({ summary: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a brief professional summary..."
            />
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Work Experience</h3>
              <button
                onClick={addExperience}
                className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-start mb-3">
                  <GripVertical className="w-4 h-4 text-gray-400 mt-1" />
                  <button
                    onClick={() => deleteExperience(exp.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Start Date"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="End Date"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      disabled={exp.current}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                      className="mr-2"
                    />
                    Currently working here
                  </label>
                  <textarea
                    placeholder="Job description (one bullet point per line)"
                    value={exp.description.join('\n')}
                    onChange={(e) =>
                      updateExperience(exp.id, 'description', e.target.value.split('\n'))
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Education</h3>
              <button
                onClick={addEducation}
                className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-start mb-3">
                  <GripVertical className="w-4 h-4 text-gray-400 mt-1" />
                  <button
                    onClick={() => deleteEducation(edu.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Start Date"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="End Date"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="GPA (Optional)"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Skills</h3>
              <button
                onClick={addSkill}
                className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            {resumeData.skills.map((skill) => (
              <div key={skill.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-start mb-3">
                  <GripVertical className="w-4 h-4 text-gray-400 mt-1" />
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Skill Name"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Projects</h3>
              <button
                onClick={addProject}
                className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            {resumeData.projects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-start mb-3">
                  <GripVertical className="w-4 h-4 text-gray-400 mt-1" />
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Technologies (comma separated)"
                    value={project.technologies.join(', ')}
                    onChange={(e) =>
                      updateProject(project.id, 'technologies', e.target.value.split(', ').filter(t => t.trim()))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="url"
                    placeholder="Project Link (Optional)"
                    value={project.link || ''}
                    onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Certifications</h3>
              <button
                onClick={addCertification}
                className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            {(resumeData.certifications || []).map((cert) => (
              <div key={cert.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-start mb-3">
                  <GripVertical className="w-4 h-4 text-gray-400 mt-1" />
                  <button
                    onClick={() => deleteCertification(cert.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Certification Name"
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Issuing Organization"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Date (Optional)"
                    value={cert.date || ''}
                    onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Achievements</h3>
              <button
                onClick={addAchievement}
                className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            {(resumeData.achievements || []).map((achievement) => (
              <div key={achievement.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-start mb-3">
                  <GripVertical className="w-4 h-4 text-gray-400 mt-1" />
                  <button
                    onClick={() => deleteAchievement(achievement.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <textarea
                    placeholder="Achievement Title"
                    value={achievement.title}
                    onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Description (Optional)"
                    value={achievement.description}
                    onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Date (Optional)"
                    value={achievement.date || ''}
                    onChange={(e) => updateAchievement(achievement.id, 'date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Custom Sections</h3>
              <button
                onClick={addCustomSection}
                className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Section
              </button>
            </div>
            {(resumeData.customSections || []).map((section) => (
              <div key={section.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-start mb-3">
                  <GripVertical className="w-4 h-4 text-gray-400 mt-1" />
                  <button
                    onClick={() => deleteCustomSection(section.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Section Title (e.g., Languages, Hobbies, Awards)"
                    value={section.title}
                    onChange={(e) => updateCustomSection(section.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Section Content (use bullet points or paragraphs)"
                    value={section.content}
                    onChange={(e) => updateCustomSection(section.id, 'content', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
            {(resumeData.customSections || []).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">No custom sections yet</p>
                <p className="text-sm">Add sections like Languages, Hobbies, Awards, or any other information</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'sections' && (
          <div className="space-y-4">
            <DraggableSectionList
              sections={resumeData.sections}
              onReorder={handleSectionReorder}
              onToggleVisibility={toggleSectionVisibility}
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Font Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Family
                  </label>
                  <select
                    value={resumeData.fontFamily}
                    onChange={(e) => updateResumeData({ fontFamily: e.target.value as FontFamily })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {fontOptions.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Size: {resumeData.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="16"
                    value={resumeData.fontSize}
                    onChange={(e) => updateResumeData({ fontSize: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Section Visibility</h3>
              <div className="space-y-2">
                {resumeData.sections.map((section) => (
                  <div key={section.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{section.title}</span>
                    <button
                      onClick={() => toggleSectionVisibility(section.id)}
                      className={`p-1 rounded ${
                        section.visible ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Changelog Section at Bottom */}
      <div className="border-t border-gray-200 bg-gray-50 p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700">Latest Updates</h3>
          <Link href="/changelog">
            <a className="text-xs text-blue-600 hover:text-blue-700 transition-colors">
              View All →
            </a>
          </Link>
        </div>
        
        <div className="space-y-2">
          <div className="bg-white rounded-md p-2 border border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">v1.3.0</span>
              <span className="text-xs text-gray-500">Latest</span>
            </div>
            <p className="text-xs text-gray-700 mb-1">🎯 Drag-and-Drop Section Reordering</p>
            <p className="text-xs text-gray-600">• Fixed custom sections functionality</p>
            <p className="text-xs text-gray-600">• Added visual drag feedback</p>
          </div>
          
          <div className="bg-white rounded-md p-2 border border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded">v1.2.0</span>
              <span className="text-xs text-gray-500">Jan 3</span>
            </div>
            <p className="text-xs text-gray-700 mb-1">🔔 Smart Notification System</p>
            <p className="text-xs text-gray-600">• Temporary popup notifications</p>
            <p className="text-xs text-gray-600">• Browser close protection</p>
          </div>
        </div>
        
        <div className="mt-3 pt-2 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            © 2025 techiekamal21 & 
            <a 
              href="https://www.connectkreations.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 ml-1"
            >
              Connect Kreations
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditPanel;