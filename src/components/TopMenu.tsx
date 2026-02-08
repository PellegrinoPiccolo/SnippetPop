import React, { useEffect } from 'react'
import SearchBar from './ui/SearchBar'
import { FaPlus } from "react-icons/fa6";
import { SearchContext } from '../context/SearchContext';
import { FaRegTrashAlt } from "react-icons/fa";
import { SnippetContext } from '../context/SnippetContext';
import { ModalContext } from '../context/ModalContext';
import CreateSnippet from './ui/CreateSnippet';

const TopMenu = () => {

  const {setSearchQuery, searchQuery} = React.useContext(SearchContext)
  const {isActiveSelectionMode, setIsActiveSelectionMode, actualCategory} = React.useContext(SnippetContext)
  const {openModal} = React.useContext(ModalContext)

  const onSearchTextChange = (text: string) => {
    setSearchQuery(text)
  }

  const handleCreateNewSnippet = () => {
    openModal(
      <CreateSnippet initialCategoryId={actualCategory?.id || null} />
    )
  }

  return (
    <div className="h-full bg-[#0A0A0A] flex items-center px-10 py-3 gap-4 justify-between border-l border-[#161616]">
      <div className='max-w-sm w-full'>
        <SearchBar searchText={searchQuery} onSearchTextChange={onSearchTextChange} textPlaceholder="Search snippets..." />
      </div>
      <div className='flex flex-ro gap-2'>
        {!isActiveSelectionMode && (
          <button className='py-2 px-4 bg-gray-400/30 text-gray-200 flex gap-2 items-center rounded-xl hover:bg-gray-400/50 transition-colors duration-200 cursor-pointer' onClick={() => setIsActiveSelectionMode(!isActiveSelectionMode)}>
            <FaRegTrashAlt size={14} />
            Select
          </button>
        )}
        <button className="px-3 py-2 bg-[#1A1A1A] text-white rounded-xl hover:bg-[#1E1E1E] transition-colors duration-200 flex flex-row items-center bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg cursor-pointer" onClick={handleCreateNewSnippet}>
          <FaPlus size={12} />
          <span className="ml-2 text-sm font-medium">New Snippet</span>
        </button>
      </div>
    </div>
  )
}

export default TopMenu