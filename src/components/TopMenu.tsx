import React, { useEffect } from 'react'
import SearchBar from './ui/SearchBar'
import { FaPlus } from "react-icons/fa6";
import { SearchContext } from '../context/SearchContext';

const TopMenu = () => {

  const {setSearchQuery, searchQuery} = React.useContext(SearchContext)

  const onSearchTextChange = (text: string) => {
    setSearchQuery(text)
  }

  return (
    <div className="h-full bg-[#0A0A0A] flex items-center px-10 py-3 gap-4 justify-between border-l border-[#161616]">
      <div className='max-w-sm w-full'>
        <SearchBar searchText={searchQuery} onSearchTextChange={onSearchTextChange} textPlaceholder="Search snippets..." />
      </div>
      <button className="px-3 py-2 bg-[#1A1A1A] text-white rounded-xl hover:bg-[#1E1E1E] transition-colors duration-200 flex flex-row items-center bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg cursor-pointer">
        <FaPlus size={12} />
        <span className="ml-2 text-sm font-medium">New Snippet</span>
      </button>
    </div>
  )
}

export default TopMenu