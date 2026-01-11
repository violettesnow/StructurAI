
import React, { useState } from 'react';
import { ICONS, MOCK_TEMPLATES } from '../constants';

interface TemplateLibraryProps {
  onShowToast: (msg: string) => void;
  onPreviewShared: (template: any) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onShowToast, onPreviewShared }) => {
  const [search, setSearch] = useState('');

  const filteredTemplates = MOCK_TEMPLATES.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleShare = (e: React.MouseEvent, template: any) => {
    e.stopPropagation