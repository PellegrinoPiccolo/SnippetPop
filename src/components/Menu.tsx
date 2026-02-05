import React from 'react'

const Menu = () => {
  const categories = [
    { name: 'Tutti', icon: '📁', count: 24 },
    { name: 'JavaScript', icon: '🟨', count: 8 },
    { name: 'TypeScript', icon: '🔷', count: 6 },
    { name: 'React', icon: '⚛️', count: 5 },
    { name: 'CSS', icon: '🎨', count: 3 },
    { name: 'HTML', icon: '🌐', count: 2 },
  ]

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Categorie</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-all mb-1 group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </div>
            <span className="text-sm text-gray-400 group-hover:text-white">
              {category.count}
            </span>
          </button>
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