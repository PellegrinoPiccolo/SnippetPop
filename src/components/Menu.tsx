import React from 'react'
import { SnippetContext } from '../context/SnippetContext';
import { getIconComponent } from '../utils/icons';
import { LuFiles } from "react-icons/lu";
import { getColorHex } from '../utils/colors';
import { LuSettings } from "react-icons/lu";

const Menu = () => {
  const {categories, selectedCategoryId, setSelectedCategoryId, currentView, setCurrentView} = React.useContext(SnippetContext);

  const CategoryButtonRender = ({category}: {category: {id: string, name: string, icon: string, color: string}}) => {
    return (
      <button className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 group cursor-pointer ${selectedCategoryId === category.id && currentView === 'snippets' ? 'bg-[#232323] text-white' : 'hover:bg-[#232323] text-[#8B8B8B]'}`} onClick={() => { setSelectedCategoryId(category.id); setCurrentView('snippets'); }}>
        <div className="flex items-center gap-3 w-full overflow-hidden">
          <span className='text-xl rounded-lg p-2' style={{backgroundColor: (selectedCategoryId === category.id && currentView === 'snippets') ? getColorHex(category.color) : '#161616' }}>{React.createElement(getIconComponent(category.icon))}</span>
          <span className="text-xs truncate">{category.name}</span>
        </div>
      </button>
    )
  }

  return (
    <div className="h-full bg-[#0A0A0A] flex flex-col">
      <div className="p-4 flex flex-row items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 mb-2" />
        <h2 className="text-lg font-semibold mb-2 text-white">SnippetPop</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
        <button className={`w-full flex items-center justify-between p-3 rounded-lg group transition-all duration-300 cursor-pointer ${selectedCategoryId === null && currentView === 'snippets' ? 'bg-[#232323] text-white' : 'hover:bg-[#232323] text-[#8B8B8B]'}`} onClick={() => { setSelectedCategoryId(null); setCurrentView('snippets'); }}>
          <div className="flex items-center gap-3">
            <span className={`text-xl rounded-lg p-2 ${selectedCategoryId === null && currentView === 'snippets' ? 'bg-blue-500' : 'bg-[#161616]'}`}><LuFiles /></span>
            <span className="text-xs">All Snippets</span>
          </div>
        </button>
        {categories.map((category, index) => (
          <CategoryButtonRender key={index} category={category} />
        ))}
      </div>

      <div className="p-4 border-t border-gray-700">
        <button className={`w-full flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-all cursor-pointer ${currentView === 'settings' ? 'bg-[#232323] text-white' : 'text-[#8B8B8B]'}`} onClick={() => setCurrentView('settings')}>
            <span className={`text-xl rounded-lg p-2 ${currentView === 'settings' ? 'bg-gradient-to-br from-blue-500 to-pink-500' : 'bg-[#161616]'}`}><LuSettings /></span>
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </div>
  )
}

export default Menu