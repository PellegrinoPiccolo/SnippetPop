import { ModalContext } from '@/context/ModalContext';
import { SnippetContext } from '@/context/SnippetContext';
import { Category } from '@/types/Category';
import { AVAILABLE_COLORS, getColorHex } from '@/utils/colors'
import { AVAILABLE_ICONS, getIconComponent } from '@/utils/icons';
import React from 'react'
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';

const CreateCategory = () => {

  const {closeModal} = React.useContext(ModalContext);
  const {createCategory} = React.useContext(SnippetContext);

  const [categoryName, setCategoryName] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleClose = () => {
    setCategoryName("");
    setSelectedColor(null);
    setSelectedIcon(null);
    setError(null);
    closeModal();
  }

  const handleCreateCategory = () => {
    try {
      const newCategory: Category = {
        id: uuidv4(),
        name: categoryName,
        color: selectedColor!,
        icon: selectedIcon!,
        snippets: [],
      };
      createCategory(newCategory);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while creating the category.");
    }
  }

  return (
    <div className='flex flex-col'>
        <section className='flex flex-col border-b border-[#161616] px-8 py-4'>
          <section className='flex items-center justify-between'>
              <h2 className='text-lg font-bold text-white'>Create New Category</h2>
              <button className='p-2 rounded-lg hover:bg-gray-400/30 cursor-pointer' onClick={handleClose}>
                  <IoClose size={16} className='text-gray-400'/>
              </button>
          </section>
          {error && <p className='text-sm text-red-500'>{error}</p>}
        </section>
        <form className='flex flex-col gap-4 px-8 py-4'>
            <div className='flex flex-col gap-1'>
                <label htmlFor='name' className='text-sm text-gray-400'>Category Name</label>
                <input type='text' id='name' className='px-3 py-2 bg-[#1A1A1A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter category name...' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
            </div>
        </form>
        <section className='flex flex-col gap-4 px-8 py-4'>
          <p className='text-sm text-gray-400'>Color</p>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
            {AVAILABLE_COLORS.map((color) => (
              <button
                key={color}
                className='py-2 px-4 rounded-sm flex items-center gap-2 transition-all duration-200 cursor-pointer'
                style={{ backgroundColor: selectedColor === color ? getColorHex(color, 0.1) : '#1A1A1A', border: selectedColor === color ? `2px solid ${getColorHex(color, 0.8)}` : '2px solid transparent' }}
                onClick={() => setSelectedColor(color)}
              >
                <div className='w-6 h-6 rounded-sm' style={{ backgroundColor: getColorHex(color) }}></div>
                <span className='text-sm text-white'>{color}</span>
              </button>
            ))}
          </div>
          <p className='text-sm text-gray-400'>Icon</p>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
            {AVAILABLE_ICONS.map((icon) => (
              <button
                key={icon}
                className='py-2 px-4 rounded-sm flex items-center gap-2 transition-all duration-200 cursor-pointer'
                style={{ backgroundColor: selectedIcon === icon ? getColorHex(selectedColor || 'gray', 0.1) : '#1A1A1A', border: selectedIcon === icon ? `2px solid ${getColorHex(selectedColor || 'gray', 0.8)}` : '2px solid transparent' }}
                onClick={() => setSelectedIcon(icon)}
              >
                <div className='w-6 h-6 flex items-center justify-center rounded-sm text-white'>{React.createElement(getIconComponent(icon))}</div>
                <span className='text-sm text-white'>{icon}</span>
              </button>
            ))}
          </div>
          <section className='flex justify-end gap-4 mt-4'>
              <button className='px-4 py-2 text-gray-400 rounded-lg hover:bg-gray-400/30 cursor-pointer' onClick={handleClose}>Cancel</button>
              <button className='px-4 py-2 bg-blue-500/10 border border-blue-500/50 text-blue-500 rounded-lg hover:bg-blue-500/20 cursor-pointer' onClick={handleCreateCategory}>Create</button>
          </section>
        </section>
    </div>
  )
}

export default CreateCategory