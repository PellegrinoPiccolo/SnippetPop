import React from 'react'
import { SnippetContext } from '../context/SnippetContext';
import { getIconComponent } from '../utils/icons';
import { LuFiles } from "react-icons/lu";
import { getColorHex } from '../utils/colors';
import { LuSettings } from "react-icons/lu";
import { LuFolderSync } from "react-icons/lu";
import logoPng from '../../public/logo.png';

const Menu = () => {
  const {categories, selectedCategoryId, setSelectedCategoryId, currentView, setCurrentView, changeLibraryPath} = React.useContext(SnippetContext);

  const handleChangeLibraryPath = async () => {
    await changeLibraryPath();
  }

  const CategoryButtonRender = ({category}: {category: {id: string, name: string, icon: string, color: string}}) => {
    const isActive = selectedCategoryId === category.id && currentView === 'snippets';
    return (
      <button
        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 group cursor-pointer
        ${isActive ? 'bg-[#1E1E1E] text-white shadow-[0_6px_20px_rgba(0,0,0,0.35)]' : 'text-[#9B9B9B] hover:bg-[#1A1A1A] hover:text-white'}`}
        onClick={() => { setSelectedCategoryId(category.id); setCurrentView('snippets'); }}
      >
        <div className="flex items-center gap-3 w-full overflow-hidden">
          <span
            className='text-lg rounded-xl p-2 flex items-center justify-center'
            style={{backgroundColor: isActive ? getColorHex(category.color) : '#141414' }}
          >
            {React.createElement(getIconComponent(category.icon))}
          </span>
          <span className="text-xs font-medium truncate">{category.name}</span>
        </div>
        <span className={`h-6 w-1 rounded-full ${isActive ? 'bg-gradient-to-b from-blue-500 to-purple-500' : 'bg-transparent'}`} />
      </button>
    )
  }

  const isAllActive = selectedCategoryId === null && currentView === 'snippets';

  return (
    <div className="h-full bg-[#0A0A0A] flex flex-col text-white">
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg bg-[#1A1A1A]">
            <img src={logoPng} alt="Logo" className="w-6 h-6" />
          </div>
          <div className="leading-tight">
            <h2 className="text-base font-semibold">SnippetPop</h2>
            <p className="text-[10px] text-[#8B8B8B]">Manage snippets</p>
          </div>
        </div>
      </div>

      <div className="px-2">
        <div className="h-px bg-gradient-to-r from-transparent via-[#1F1F1F] to-transparent" />
      </div>

      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1.5 mt-2">
        <button
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl group transition-all duration-200 cursor-pointer
          ${isAllActive ? 'bg-[#1E1E1E] text-white shadow-[0_6px_20px_rgba(0,0,0,0.35)]' : 'text-[#9B9B9B] hover:bg-[#1A1A1A] hover:text-white'}`}
          onClick={() => { setSelectedCategoryId(null); setCurrentView('snippets'); }}
        >
          <div className="flex items-center gap-3">
            <span className={`text-lg rounded-xl p-2 flex items-center justify-center ${isAllActive ? 'bg-blue-500' : 'bg-[#141414]'}`}>
              <LuFiles />
            </span>
            <span className="text-xs font-medium">All Snippets</span>
          </div>
          <span className={`h-6 w-1 rounded-full ${isAllActive ? 'bg-gradient-to-b from-blue-500 to-purple-500' : 'bg-transparent'}`} />
        </button>

        {categories.map((category, index) => (
          <CategoryButtonRender key={index} category={category} />
        ))}
      </div>

      <div className="p-4 border-t border-[#1F1F1F] flex items-center gap-2">
        <button
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer
          ${currentView === 'settings' ? 'bg-[#1E1E1E] text-white shadow-[0_6px_20px_rgba(0,0,0,0.35)]' : 'text-[#9B9B9B] hover:bg-[#1A1A1A] hover:text-white'}`}
          onClick={() => setCurrentView('settings')}
        >
          <span className={`text-lg rounded-xl p-2 ${currentView === 'settings' ? 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg' : 'bg-[#141414]'}`}>
            <LuSettings />
          </span>
          <span className="text-xs font-medium">Category Settings</span>
        </button>
        <button
          className='flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer text-[#9B9B9B] hover:bg-[#1A1A1A] hover:text-white'
          onClick={handleChangeLibraryPath}
        >
          <LuFolderSync size={20} />
        </button>
      </div>
    </div>
  )
}

export default Menu