import { SnippetContext } from '@/context/SnippetContext';
import { getColorHex } from '@/utils/colors';
import { getIconComponent } from '@/utils/icons';
import React, { useRef, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { HiOutlineTag } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModalContext } from '@/context/ModalContext';
import DeleteWarning from '../ui/DeleteWarning';
import { MdOutlineEdit } from "react-icons/md";
import { Snippet } from '@/types/Snippet';
import UpdateCategory from '../ui/UpdateCategory';
import { Category } from '@/types/Category';
import { MdDragIndicator } from "react-icons/md";
import {DragDropProvider} from '@dnd-kit/react';
import {useSortable} from '@dnd-kit/react/sortable';
import { move } from '@dnd-kit/helpers';

const SettingsSection = () => {

    const isMac = window.electronAPI.platform === 'darwin';

    const {categories, deleteCategory, reorderCategories} = React.useContext(SnippetContext)
    const {openModal} = React.useContext(ModalContext)

    const handleCreateNewCategory = () => {
        openModal(
            <UpdateCategory type="create" />
        )
    }

    const handleEditCategory = (category: Category) => {
        openModal(
            <UpdateCategory type="edit" id={category.id} name={category.name} color={category.color} icon={category.icon} snippets={category.snippets} />
        )
    }

    const handleDeleteCategory = (category: Category) => {
        openModal(
            <DeleteWarning onDelete={() => deleteCategory(category.id)} numberOfItems={null} itemName={category.name} type="category" />
        )
    }

    const RenderCategory = ({ category, index }: { category: Category, index: number }) => {

        const [element, setElement] = useState<Element | null>(null);
        const handleRef = useRef<HTMLButtonElement | null>(null);
        const {isDragging} = useSortable({id: category.id, index, element, handle: handleRef});

        return (
            <div ref={setElement} key={category.id} className='p-4 bg-[#0A0A0A] border border-gray-400/20 rounded-lg flex items-center justify-between group' style={{opacity: isDragging ? 0.5 : 1}}>
                <div className='flex items-center gap-2'>
                    <button className='cursor-move text-gray-400 hidden group-hover:flex' ref={handleRef}>
                        <MdDragIndicator size={18} />
                    </button>
                    <span
                        className='text-lg rounded-xl p-2 flex items-center justify-center text-white'
                        style={{backgroundColor: getColorHex(category.color) }}
                    >
                        {React.createElement(getIconComponent(category.icon))}
                    </span>
                    <div className='flex flex-col'>
                        <p className='text-gray-200'>{category.name}</p>
                    </div>
                </div>
                <div className='flex items-center'>
                    <button className='hidden group-hover:flex bg-gray-500/10 border border-gray-500/30 text-gray-400 p-2 rounded-sm transition-colors duration-200 cursor-pointer hover:bg-gray-500/20 mr-2' onClick={() => handleEditCategory(category)}>
                        <MdOutlineEdit size={14} />
                    </button>
                    <button className='hidden group-hover:flex bg-red-500/10 border border-red-500/30 text-red-400 p-2 rounded-sm transition-colors duration-200 cursor-pointer hover:bg-red-500/20' onClick={() => handleDeleteCategory(category)}>
                        <FaRegTrashAlt size={14} />
                    </button>
                </div>
            </div>
        )
    }

  return (
    <div className={`${isMac ? '' : 'pt-18'} h-full bg-black py-8 px-10 overflow-y-auto`}>
        <h1 className="text-2xl font-bold text-white">Category Settings</h1>
        <div className='p-4 bg-[#0A0A0A] border border-gray-400/20 mt-10 rounded-lg flex flex-col'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4 mb-4'>
                    <div className='bg-gray-400/10 p-3 rounded-lg border border-gray-400/20 text-gray-200'>
                        <HiOutlineTag size={20} />
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-gray-200'>Categories</p>
                        <p className='text-sm text-gray-400'>Organize your snippets with categories</p>
                    </div>
                </div>
                <button className="px-3 py-2 bg-[#1A1A1A] text-white rounded-xl hover:bg-[#1E1E1E] transition-colors duration-200 flex flex-row items-center bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg cursor-pointer" onClick={handleCreateNewCategory}>
                    <FaPlus size={12} />
                    <span className="ml-2 text-sm font-medium">Add Category</span>
                </button>
            </div>
            <DragDropProvider
                onDragEnd={(event) => {
                    reorderCategories(event);
                }}
            >
                <div className='flex flex-col gap-2 mt-4'>
                    {categories.map((category, index) => (
                        <RenderCategory key={category.id} category={category} index={index} />
                    ))}
                </div>
            </DragDropProvider>
        </div>
    </div>
  )
}

export default SettingsSection