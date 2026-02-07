import { SnippetContext } from '@/context/SnippetContext';
import { getColorHex } from '@/utils/colors';
import { getIconComponent } from '@/utils/icons';
import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { HiOutlineTag } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModalContext } from '@/context/ModalContext';
import DeleteWarning from '../ui/DeleteWarning';
import CreateCategory from '../ui/CreateCategory';

const SettingsSection = () => {

    const {categories, deleteCategory} = React.useContext(SnippetContext)
    const {openModal} = React.useContext(ModalContext)

    const handleCreateNewCategory = () => {
        openModal(
            <CreateCategory />
        )
    }

    const handleDeleteCategory = (category: { id: string; name: string }) => {
        openModal(
            <DeleteWarning onDelete={() => deleteCategory(category.id)} numberOfItems={null} itemName={category.name} type="category" />
        )
    }

  return (
    <div className="h-full bg-black py-8 px-10">
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
            <div className='flex flex-col gap-2 mt-4'>
                {categories.map((category) => (
                    <div key={category.id} className='p-4 bg-[#0A0A0A] border border-gray-400/20 rounded-lg flex items-center justify-between group'>
                        <div className='flex items-center gap-2'>
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
                        <button className='hidden group-hover:flex bg-red-500/10 border border-red-500/30 text-red-400 p-2 rounded-sm transition-colors duration-200 cursor-pointer hover:bg-red-500/20' onClick={() => handleDeleteCategory(category)}>
                            <FaRegTrashAlt size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default SettingsSection