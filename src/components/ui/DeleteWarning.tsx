import React from 'react'
import { ModalContext } from '../../context/ModalContext';
import { IoWarningOutline } from "react-icons/io5";

const DeleteWarning = ({ onDelete, numberOfItems, itemName }: { onDelete: () => void, numberOfItems: number | null, itemName: string | null }) => {

    const {closeModal} = React.useContext(ModalContext);

    const handleDelete = () => {
        onDelete();
        closeModal();
    }

  return (
    <div className="flex flex-col">
        <div className="flex items-center gap-4 p-8 border-b border-[#161616]">
            <div className="p-3 bg-red-500/20 rounded-full">
                <IoWarningOutline size={20} className="text-red-500"/>
            </div>
            <div>
                <h2 className="text-lg font-bold text-white">Are you sure?</h2>
                <p className="text-sm text-gray-400">This action cannot be undone.</p>
            </div>
        </div>
        <div className='flex flex-col border-b p-8 border-[#161616]'>
            {numberOfItems && !itemName ? (
                <p className="text-sm text-gray-400">{`This will delete ${numberOfItems} snippets.`}</p>
            ) : itemName ? (
                <p className="text-sm text-gray-400">{`This will delete the snippet "${itemName}".`}</p>
            ) : null}
        </div>
        <div className="flex justify-end gap-4 p-8">
            <button className="px-4 py-2 text-gray-400 rounded-lg hover:bg-gray-400/30 cursor-pointer" onClick={closeModal}>Cancel</button>
            <button className="px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500/20 cursor-pointer" onClick={handleDelete}>Delete</button>
        </div>
    </div>
  )
}

export default DeleteWarning