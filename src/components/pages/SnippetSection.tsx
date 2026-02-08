import React from 'react'
import SnippetCard from '../ui/SnippetCard';
import DeleteWarning from '../ui/DeleteWarning';
import { ModalContext } from '@/context/ModalContext';
import { SearchContext } from '@/context/SearchContext';
import { Category } from '@/types/Category';
import { SnippetContext } from '@/context/SnippetContext';
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Snippet } from '@/types/Snippet';
import { getColorHex } from '@/utils/colors';

const SnippetSection = () => {

    const {currentView, selectedCategoryId, categories, selectedSnippetIds, isActiveSelectionMode, setIsActiveSelectionMode, setSelectedSnippetIds, deleteMultipleSnippets, actualCategory, setActualCategory} = React.useContext(SnippetContext);
    const {snippetsFiltered, searchQuery} = React.useContext(SearchContext);
    const {openModal} = React.useContext(ModalContext)

    React.useEffect(() => {
        if (currentView === 'snippets') {
            let category = categories.find((cat) => cat.id === selectedCategoryId);
            if (!category) {
                category = {
                    id: '',
                    name: 'All Snippets',
                    icon: '',
                    color: '',
                    snippets: snippetsFiltered || [],
                }
            }
            setActualCategory(category);
        } else {
            setActualCategory(null);
        }
    }, [currentView, selectedCategoryId, categories, snippetsFiltered]);

    const handleCloseSelectionMode = () => {
        setIsActiveSelectionMode(false);
        setSelectedSnippetIds([]);
    }

    const handleSelectAll = () => {
        const allSnippetIds = snippetsFiltered?.map(snippet => snippet.id) || [];
        setSelectedSnippetIds(allSnippetIds);
    }

    const handleDeselectAll = () => {
        setSelectedSnippetIds([]);
    }

    const toggleSelectAll = () => {
        if (selectedSnippetIds.length === snippetsFiltered?.length) {
        handleDeselectAll();
        } else {
        handleSelectAll();
        }
    }

    const handleDelete = () => {
        openModal(
            <DeleteWarning onDelete={() => {deleteMultipleSnippets(selectedSnippetIds), setSelectedSnippetIds([]), setIsActiveSelectionMode(false)}} numberOfItems={selectedSnippetIds.length} itemName={null} type="snippet" />
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
        <div className="h-full w-full bg-black relative flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto py-8 px-10">
                <h1 className="text-2xl font-bold text-white">{actualCategory?.name}</h1>
                <span className="text-sm text-gray-400">{snippetsFiltered?.length || 0} snippets {searchQuery && `matching "${searchQuery}"`}</span>
                
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {snippetsFiltered?.map((snippet) => (
                        <RenderSnippet key={snippet.id} {...snippet} />
                    ))}
                </div>

            </div>
            {isActiveSelectionMode && (
                <div className='absolute bottom-6 inset-x-0 flex justify-center pointer-events-none'>
                <div className='pointer-events-auto bg-[#0A0A0A] border border-[#212121] py-2 px-4 rounded-xl shadow-2xl flex items-center gap-2'>
                    <div className='flex items-center gap-2 border-r border-gray-500/20 px-4 py-2'>
                    <IoMdCheckboxOutline size={22} className='text-blue-500'/>
                    <span className='text-sm text-gray-200 font-bold'>{selectedSnippetIds.length} snippet{selectedSnippetIds.length > 1 ? 's' : ''} selected</span>
                    </div>
                    <div className='flex items-center gap-2 px-10'>
                    <button className='text-gray-300 hover:bg-gray-400/10 border border-transparent hover:border-gray-400/30 px-3 py-2 rounded-lg cursor-pointer text-sm  transition-all duration-200' onClick={toggleSelectAll}>
                        {selectedSnippetIds.length === snippetsFiltered?.length ? 'Deselect all' : 'Select all'}
                    </button>
                    <button className='bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer text-sm  transition-all duration-200' onClick={handleDelete}>
                        <FaRegTrashAlt size={16} />
                        Delete Selected
                    </button>
                    <button className='text-gray-300 bg-gray-400/5 hover:bg-gray-400/10 px-2 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-all duration-200' onClick={handleCloseSelectionMode}>
                        <IoClose size={18} />
                    </button>
                    </div>
                </div>
                </div>
            )}
        </div>
    )
}

export default SnippetSection