import React from 'react'

const TopMenu = () => {
  return (
    <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-white">✨ SnippetPop</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all">
            Nuovo
          </button>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all">
            Importa
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <input 
          type="search" 
          placeholder="Cerca snippet..." 
          className="px-4 py-2 bg-white/20 text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 w-64"
        />
        <button className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all">
          ⚙️
        </button>
      </div>
    </div>
  )
}

export default TopMenu