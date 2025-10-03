/**
 * Draggable Section List Component
 * 
 * @description Drag and drop interface for reordering resume sections
 * @author techiekamal21 & Connect Kreations
 * @copyright 2025 techiekamal21 & Connect Kreations
 * @license MIT
 */

'use client';

import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ResumeSection } from '../types/resume';
import { GripVertical, Eye, EyeOff } from 'lucide-react';

interface DraggableSectionProps {
  section: ResumeSection;
  index: number;
  moveSection: (dragIndex: number, hoverIndex: number) => void;
  toggleVisibility: (sectionId: string) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DraggableSection: React.FC<DraggableSectionProps> = ({
  section,
  index,
  moveSection,
  toggleVisibility,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'section',
    item: { index, id: section.id, type: 'section' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'section',
    hover: (item: DragItem) => {
      if (!item) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveSection(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md cursor-move hover:bg-gray-50 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center">
        <GripVertical className="w-4 h-4 text-gray-400 mr-3" />
        <span className="text-sm font-medium text-gray-700">{section.title}</span>
      </div>
      <button
        onClick={() => toggleVisibility(section.id)}
        className={`p-1 rounded transition-colors ${
          section.visible 
            ? 'text-green-600 hover:text-green-700' 
            : 'text-gray-400 hover:text-gray-500'
        }`}
      >
        {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      </button>
    </div>
  );
};

interface DraggableSectionListProps {
  sections: ResumeSection[];
  onReorder: (sections: ResumeSection[]) => void;
  onToggleVisibility: (sectionId: string) => void;
}

const DraggableSectionList: React.FC<DraggableSectionListProps> = ({
  sections,
  onReorder,
  onToggleVisibility,
}) => {
  const moveSection = (dragIndex: number, hoverIndex: number) => {
    const draggedSection = sections[dragIndex];
    const newSections = [...sections];
    
    // Remove the dragged section
    newSections.splice(dragIndex, 1);
    // Insert it at the new position
    newSections.splice(hoverIndex, 0, draggedSection);
    
    // Update order numbers
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));
    
    onReorder(updatedSections);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium mb-4">Section Order</h3>
      <p className="text-sm text-gray-600 mb-4">
        Drag sections to reorder them. Click the eye icon to show/hide sections.
      </p>
      {sections
        .sort((a, b) => a.order - b.order)
        .map((section, index) => (
          <DraggableSection
            key={section.id}
            section={section}
            index={index}
            moveSection={moveSection}
            toggleVisibility={onToggleVisibility}
          />
        ))}
    </div>
  );
};

export default DraggableSectionList;