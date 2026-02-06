import React from 'react'
import { SnippetContext } from '../context/SnippetContext';
import type { Snippet } from '../types/Snippet';
import type { Category } from '../types/Category';
import SnippetCard from './ui/SnippetCard';
import { getColorHex } from '../utils/colors';

const Content = () => {

  const {currentView, selectedCategoryId, categories} = React.useContext(SnippetContext);
  const [actualCategory, setActualCategory] = React.useState(null as Category | null);

  React.useEffect(() => {
    if (currentView === 'snippets') {
      let category = categories.find((cat) => cat.id === selectedCategoryId);
      if (!category) {
        category = {
          id: '',
          name: 'All Snippets',
          icon: '',
          color: '',
          snippets: categories.reduce((acc: Snippet[], cat) => [...acc, ...(cat.snippets || [])], [])
        }
      }
      setActualCategory(category);
    } else {
      setActualCategory(null);
    }
  }, [currentView, selectedCategoryId, categories]);

  if (currentView === 'settings') {
    return (
      <div className="h-full bg-black py-8 px-10">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>
    )
  }

  const RenderSnippet = (snippet: Snippet) => {

    const category = categories.find(cat => cat.id === snippet.categoryId);
    const categoryName = category ? category.name : 'Uncategorized';
    const categoryColor = getColorHex(category ? category.color : 'gray');

    return (
      <SnippetCard key={snippet.id} snippet={snippet} categoryName={categoryName} categoryColor={categoryColor} />
    )
  }

  return (
    <div className="h-full bg-black py-8 px-10 overflow-y-auto">
      <h1 className="text-2xl font-bold text-white">{actualCategory?.name}</h1>
      <span className="text-sm text-gray-400">{actualCategory?.snippets?.length || 0} snippets</span>
    
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actualCategory?.snippets?.map((snippet) => (
          <RenderSnippet key={snippet.id} {...snippet} />
        ))}
      </div>
    </div>
  )
}

export default Content