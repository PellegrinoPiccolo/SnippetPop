import React from 'react'
import { SnippetContext } from '../context/SnippetContext';
import type { Category } from '../types/Category';
import { SearchContext } from '../context/SearchContext';
import { ModalContext } from '../context/ModalContext';
import SnippetSection from './pages/SnippetSection';
import SettingsSection from './pages/SettingsSection';

const Content = () => {

  const {currentView} = React.useContext(SnippetContext);

  // Settings section
  if (currentView === 'settings') {
    return (
      <SettingsSection />
    )
  }

  // Snippet section
  return (
    <SnippetSection />
  )
}

export default Content