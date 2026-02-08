import React from 'react'
import { ModalContext } from '../../context/ModalContext';
import { IoClose } from "react-icons/io5";
import { SnippetContext } from '../../context/SnippetContext';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { v4 as uuidv4 } from 'uuid';

const CreateSnippet = ({initialCategoryId} : {initialCategoryId?: string | null}) => {

    const [newSnippetTitle, setNewSnippetTitle] = React.useState("");
    const [newSnippetContent, setNewSnippetContent] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(initialCategoryId || null);
    const [error, setError] = React.useState<string | null>(null);

    const {closeModal} = React.useContext(ModalContext);
    const {categories, createSnippet} = React.useContext(SnippetContext);

    const handleClose = () => {
        setNewSnippetTitle("");
        setNewSnippetContent("");
        setSelectedCategory(null);
        setError(null);
        closeModal();
    }

    const handleCreateSnippet = () => {
        try {
            const newSnippet = {
                id: uuidv4(),
                title: newSnippetTitle,
                content: newSnippetContent,
                categoryId: selectedCategory!,
            };
            createSnippet(newSnippet);
            handleClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred while creating the snippet.");
        }
    };

  return (
    <div className='flex flex-col gap-4'>
        <section className='flex flex-col border-b border-[#161616] px-8 py-4'>
            <section className='flex items-center justify-between'>
                <h2 className='text-lg font-bold text-white'>Create New Snippet</h2>
                <button className='p-2 rounded-lg hover:bg-gray-400/30 cursor-pointer' onClick={handleClose}>
                    <IoClose size={16} className='text-gray-400'/>
                </button>
            </section>
            {error && <p className='text-sm text-red-500'>{error}</p>}
        </section>
        <div className='flex flex-col gap-4 px-8 py-4'>
            <div className='flex flex-col gap-1'>
                <label htmlFor='title' className='text-sm text-gray-400'>Title</label>
                <input type='text' id='title' className='px-3 py-2 bg-[#1A1A1A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter snippet title...' value={newSnippetTitle} onChange={(e) => setNewSnippetTitle(e.target.value)} />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor='content' className='text-sm text-gray-400'>Content</label>
                <textarea id='content' rows={6} className='px-3 py-2 bg-[#1A1A1A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter snippet content...' value={newSnippetContent} onChange={(e) => setNewSnippetContent(e.target.value)}></textarea>
            </div>
            <section className='flex flex-col gap-1 border-b border-[#161616] pb-4'>
                <label htmlFor='category' className='text-sm text-gray-400'>Category</label>
                <Select onValueChange={(value) => setSelectedCategory(value)} defaultValue={initialCategoryId || undefined}>
                    <SelectTrigger className='w-full text-gray-200'>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className='bg-[#1A1A1A] border border-gray-400/20 text-gray-200'>
                        <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </section>
            <section className='flex justify-end gap-4'>
                <button className='px-4 py-2 text-gray-400 rounded-lg hover:bg-gray-400/30 cursor-pointer' onClick={handleClose}>Cancel</button>
                <button className='px-4 py-2 bg-blue-500/10 border border-blue-500/50 text-blue-500 rounded-lg hover:bg-blue-500/20 cursor-pointer' onClick={handleCreateSnippet}>Create</button>
            </section>
        </div>
    </div>
  )
}

export default CreateSnippet