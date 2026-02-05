import React from 'react'
import { SnippetContext } from '../context/SnippetContext';
import { getIconComponent } from '../utils/icons';
import { LuFiles } from "react-icons/lu";

const Menu = () => {
  const {categories} = React.useContext(SnippetContext);

  const CategoryButtonRender = ({category}: {category: {name: string, icon: string}}) => {
    return (
      <button className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-all mb-1 group">
        <div className="flex items-center gap-3">
          <span className="text-xl bg-[#161616] rounded-lg p-2">{React.createElement(getIconComponent(category.icon))}</span>
          <span className="font-medium">{category.name}</span>
        </div>
      </button>
    )
  }

  return (
    <div className="h-full bg-[#0A0A0A] flex flex-col">
      <div className="p-4 flex flex-row items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 mb-2" />
        <h2 className="text-lg font-semibold mb-2">SnippetPop</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-all mb-4 group">
          <div className="flex items-center gap-3">
            <span className="text-xl"><LuFiles /></span>
            <span className="font-medium">Tutti gli snippet</span>
          </div>
        </button>
        {categories.map((category, index) => (
          <CategoryButtonRender key={index} category={category} />
        ))}
      </div>

      <div className="p-4 border-t border-gray-700">
        <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-all">
          <span className="text-xl">🗑️</span>
          <span className="font-medium">Cestino</span>
        </button>
      </div>
    </div>
  )
}

export default Menu