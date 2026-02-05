import { createContext, useEffect, useState } from "react";
import type { Category } from "../types/Category";
import type { Snippet } from "../types/Snippet";
import { v4 as uuidv4 } from 'uuid';

export const SnippetContext = createContext({
    categories : [] as Category[],
    setCategories: (categories: Category[]) => {},
    saveCategories: (categories: Category[]) => {},
    createSnippet: (snippet: Snippet, categoryId: string) => {},
    updateSnippet: (snippet: Snippet) => {},
    deleteSnippet: (snippetId: string) => {},
    createCategory: (category: Category) => {},
    updateCategory: (category: Category) => {},
    deleteCategory: (categoryId: string) => {},
    selectedCategoryId: null as string | null,
    setSelectedCategoryId: (categoryId: string | null) => {},
    currentView: 'snippets' as 'snippets' | 'settings',
    setCurrentView: (view: 'snippets' | 'settings') => {},
});

const DEFAULT_CATEGORIES: Category[] = [
    {
        id: uuidv4(),
        name: 'Work',
        icon: 'work',
        color: 'purple',
        snippets: [
            { id: uuidv4(), title: 'Office WiFi Password', content: 'a1b2c3d4' },
            { id: uuidv4(), title: 'Meeting Zoom Link', content: 'https://zoom.us/j/1234567890' },
            { id: uuidv4(), title: 'Email Signature', content: 'Best regards, John Doe | Senior Developer | john@company.com' },
            { id: uuidv4(), title: 'SQL Connection String', content: 'Server=localhost;Database=mydb;User Id=admin;Password=***' },
            { id: uuidv4(), title: 'API Key - Production', content: 'sk_prod_1234567890abcdefg...' },
        ],
    },
    {
        id: uuidv4(),
        name: 'Home',
        icon: 'home',
        color: 'yellow',
        snippets: [
            { id: uuidv4(), title: 'Home Router Password', content: 'HomeNetwork2024!' },
            { id: uuidv4(), title: 'Grocery List Template', content: '– Milk – Eggs – Bread' },
        ],
    },
    {
        id: uuidv4(),
        name: 'Personal',
        icon: 'person',
        color: 'red',
        snippets: [
            { id: uuidv4(), title: 'Favorite Quote', content: 'The only way to do great work is to love what you do. — Steve Jobs' },
            { id: uuidv4(), title: 'GitHub Profile URL', content: 'https://github.com/johndoe' },
            { id: uuidv4(), title: 'Doctor Appointment Reminder', content: 'Dr. Smith — Thursday 3:00 PM — 555-0123' },
        ],
    },
];

const SnippetProvider = ({ children }: { children: React.ReactNode }) => {
    const [categories, setCategories] = useState<Category[]>(() => {
        const saved = window.electronAPI.getStoreValue('categories');
        return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    });
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [currentView, setCurrentView] = useState<'snippets' | 'settings'>('snippets');

    useEffect(() => {
        window.electronAPI.setStoreValue('categories', JSON.stringify(categories));
    }, [categories]);

    const saveCategories = (newCategories: Category[]) => {
        setCategories(newCategories);
    }

    const createSnippet = (newSnippet: Snippet, categoryId: string) => {
        const updatedCategories = categories.map(category => {
            if (category.id === categoryId) {
                return {
                    ...category,
                    snippets: category.snippets ? [...category.snippets, newSnippet] : [newSnippet],
                };
            }
            return category;
        });
        setCategories(updatedCategories);
    }

    const updateSnippet = (updatedSnippet: Snippet) => {
        const updatedCategories = categories.map(category => {
            if (category.snippets) {
                const updatedSnippets = category.snippets.map(snippet =>
                    snippet.id === updatedSnippet.id ? updatedSnippet : snippet
                );
                return { ...category, snippets: updatedSnippets };
            }
            return category;
        });
        setCategories(updatedCategories);
    }

    const deleteSnippet = (snippetId: string) => {
        const updatedCategories = categories.map(category => {
            if (category.snippets) {
                const filteredSnippets = category.snippets.filter(snippet => snippet.id !== snippetId);
                return { ...category, snippets: filteredSnippets };
            }
            return category;
        });
        setCategories(updatedCategories);
    }

    const createCategory = (newCategory: Category) => {
        setCategories([...categories, newCategory]);
    }

    const updateCategory = (updatedCategory: Category) => {
        const updatedCategories = categories.map(category =>
            category.id === updatedCategory.id ? updatedCategory : category
        );
        setCategories(updatedCategories);
    }
    
    const deleteCategory = (categoryId: string) => {
        const updatedCategories = categories.filter(category => category.id !== categoryId);
        setCategories(updatedCategories);
    }


    return (
        <SnippetContext.Provider value={{ categories, setCategories, saveCategories, createSnippet, updateSnippet, deleteSnippet, createCategory, updateCategory, deleteCategory, selectedCategoryId, setSelectedCategoryId, currentView, setCurrentView }}>
            {children}
        </SnippetContext.Provider>
    )
}

export default SnippetProvider;