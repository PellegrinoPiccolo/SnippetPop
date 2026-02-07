import { createContext, useEffect, useState } from "react";
import type { Category } from "../types/Category";
import type { Snippet } from "../types/Snippet";
import { v4 as uuidv4 } from 'uuid';

export const SnippetContext = createContext({
    categories : [] as Category[],
    setCategories: (categories: Category[]) => {},
    saveCategories: (categories: Category[]) => {},
    createSnippet: (snippet: Snippet) => {},
    updateSnippet: (snippet: Snippet) => {},
    deleteSnippet: (snippetId: string) => {},
    deleteMultipleSnippets: (snippetIds: string[]) => {},
    createCategory: (category: Category) => {},
    updateCategory: (category: Category) => {},
    deleteCategory: (categoryId: string) => {},
    selectedCategoryId: null as string | null,
    setSelectedCategoryId: (categoryId: string | null) => {},
    currentView: 'snippets' as 'snippets' | 'settings',
    setCurrentView: (view: 'snippets' | 'settings') => {},
    isActiveSelectionMode: false,
    setIsActiveSelectionMode: (isActive: boolean) => {},
    selectedSnippetIds: [] as string[],
    setSelectedSnippetIds: (snippetIds: string[]) => {},
    changeLibraryPath: async () => {},
});

const categoryId1 = uuidv4();
const categoryId2 = uuidv4();
const categoryId3 = uuidv4();

const DEFAULT_CATEGORIES: Category[] = [
    {
        id: categoryId1,
        name: 'Work',
        icon: 'work',
        color: 'purple',
        snippets: [
            { id: uuidv4(), title: 'Office WiFi Password', content: 'a1b2c3d4', categoryId: categoryId1 },
            { id: uuidv4(), title: 'Meeting Zoom Link', content: 'https://zoom.us/j/1234567890', categoryId: categoryId1 },
            { id: uuidv4(), title: 'Email Signature', content: 'Best regards, John Doe | Senior Developer | john@company.com', categoryId: categoryId1 },
            { id: uuidv4(), title: 'SQL Connection String', content: 'Server=localhost;Database=mydb;User Id=admin;Password=***', categoryId: categoryId1 },
            { id: uuidv4(), title: 'API Key - Production', content: 'sk_prod_1234567890abcdefg...', categoryId: categoryId1 },
        ],
    },
    {
        id: categoryId2,
        name: 'Home',
        icon: 'home',
        color: 'yellow',
        snippets: [
            { id: uuidv4(), title: 'Home Router Password', content: 'HomeNetwork2024!', categoryId: categoryId2 },
            { id: uuidv4(), title: 'Grocery List Template', content: '– Milk – Eggs – Bread', categoryId: categoryId2 },
        ],
    },
    {
        id: categoryId3,
        name: 'Personal',
        icon: 'person',
        color: 'red',
        snippets: [
            { id: uuidv4(), title: 'Favorite Quote', content: 'The only way to do great work is to love what you do. — Steve Jobs', categoryId: categoryId3 },
            { id: uuidv4(), title: 'GitHub Profile URL', content: 'https://github.com/johndoe', categoryId: categoryId3 },
            { id: uuidv4(), title: 'Doctor Appointment Reminder', content: 'Dr. Smith — Thursday 3:00 PM — 555-0123', categoryId: categoryId3 },
        ],
    },
];

const SnippetProvider = ({ children }: { children: React.ReactNode }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [currentView, setCurrentView] = useState<'snippets' | 'settings'>('snippets');
    const [isActiveSelectionMode, setIsActiveSelectionMode] = useState(false);
    const [selectedSnippetIds, setSelectedSnippetIds] = useState<string[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const saved = await window.electronAPI.getStoreValue('categories');
                
                if (Array.isArray(saved)) {
                    setCategories(saved);
                } else if (typeof saved === 'string') {
                    try {
                        setCategories(JSON.parse(saved));
                    } catch (e) {
                        console.error("Errore parsing JSON:", e);
                        setCategories(DEFAULT_CATEGORIES);
                    }
                } else {
                    setCategories(DEFAULT_CATEGORIES);
                }
            } catch (error) {
                console.error("Errore critico caricamento dati:", error);
                setCategories(DEFAULT_CATEGORIES);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            window.electronAPI.setStoreValue('categories', categories);
        }
    }, [categories]);

    const changeLibraryPath = async () => {
        const result = await window.electronAPI.selectFolder();

        if (!result || !result.path) return;

        const { path, existingData } = result;
        
        let dataToFinalize = categories; 

        if (existingData && Array.isArray(existingData) && existingData.length > 0) {
            
            const userChoice = window.confirm(
                `Ho trovato dei dati esistenti nella cartella "${path}".\n\n` +
                "PREMI OK per CARICARE i dati dal Cloud (i tuoi snippet locali attuali verranno persi).\n" +
                "PREMI ANNULLA per SOVRASCRIVERE il Cloud con i tuoi dati locali."
            );

            if (userChoice) {
                dataToFinalize = existingData;
            } else {
                const confirmOverwrite = window.confirm(
                    "Sei sicuro? Stai per cancellare i dati nel cloud e sostituirli con i tuoi.\n" +
                    "Questa operazione è irreversibile."
                );
                
                if (!confirmOverwrite) {
                    return; 
                }
            }
        }
        
        await window.electronAPI.migrateData({
            newPath: path,
            currentData: dataToFinalize
        });
    };

    const saveCategories = (newCategories: Category[]) => {
        setCategories(newCategories);
    }

    const createSnippet = (newSnippet: Snippet) => {
        if(newSnippet.title.trim() === "") {
            throw new Error("Snippet title cannot be empty.");
        } else if (newSnippet.title.length > 100) {
            throw new Error("Snippet title cannot exceed 100 characters.");
        } else if (newSnippet.content.trim() === "") {
            throw new Error("Snippet content cannot be empty.");
        } else if (newSnippet.content.length > 1000) {
            throw new Error("Snippet content cannot exceed 1000 characters.");
        } else if (!newSnippet.categoryId) {
            throw new Error("Snippet must belong to a category.");
        } else if (!categories.some(category => category.id === newSnippet.categoryId)) {
            throw new Error("The specified category does not exist.");
        } else if (categories.some(category => category.snippets && category.snippets.some(snippet => snippet.title.toLowerCase() === newSnippet.title.toLowerCase()))) {
            throw new Error("A snippet with this title already exists in the category.");
        }
        const updatedCategories = categories.map(category => {
            if (category.id === newSnippet.categoryId) {
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
        if(newCategory.name.trim() === "") {
            throw new Error("Category name cannot be empty.");
        } else if (newCategory.name.length > 50) {
            throw new Error("Category name cannot exceed 50 characters.");
        } else if (!newCategory.color) {
            throw new Error("Category color is required.");
        } else if (!newCategory.icon) {
            throw new Error("Category icon is required.");
        } else if (categories.some(category => category.name.toLowerCase() === newCategory.name.toLowerCase())) {
            throw new Error("A category with this name already exists.");
        }
        setCategories([...categories, newCategory]);
        
    }

    const updateCategory = (updatedCategory: Category) => {
        if(updatedCategory.name.trim() === "") {
            throw new Error("Category name cannot be empty.");
        } else if (updatedCategory.name.length > 50) {
            throw new Error("Category name cannot exceed 50 characters.");
        } else if (!updatedCategory.color) {
            throw new Error("Category color is required.");
        } else if (!updatedCategory.icon) {
            throw new Error("Category icon is required.");
        } else if (categories.some(category => category.id !== updatedCategory.id && category.name.toLowerCase() === updatedCategory.name.toLowerCase())) {
            throw new Error("A category with this name already exists.");
        } else if (!categories.some(category => category.id === updatedCategory.id)) {
            throw new Error("The category you are trying to update does not exist.");
        }
        const updatedCategories = categories.map(category =>
            category.id === updatedCategory.id ? updatedCategory : category
        );
        setCategories(updatedCategories);
    }
    
    const deleteCategory = (categoryId: string) => {
        const updatedCategories = categories.filter(category => category.id !== categoryId);
        setCategories(updatedCategories);
    }

    const deleteMultipleSnippets = (snippetIds: string[]) => {
        const updatedCategories = categories.map(category => {
            if (category.snippets) {
                const filteredSnippets = category.snippets.filter(snippet => !snippetIds.includes(snippet.id));
                return { ...category, snippets: filteredSnippets };
            }
            return category;
        });
        setCategories(updatedCategories);
    }

    return (
        <SnippetContext.Provider value={{ categories, setCategories, saveCategories, createSnippet, updateSnippet, deleteSnippet, createCategory, updateCategory, deleteCategory, deleteMultipleSnippets, selectedCategoryId, setSelectedCategoryId, currentView, setCurrentView, isActiveSelectionMode, setIsActiveSelectionMode, selectedSnippetIds, setSelectedSnippetIds, changeLibraryPath }}>
            {children}
        </SnippetContext.Provider>
    )
}

export default SnippetProvider;