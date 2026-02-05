import { createContext, useEffect, useState } from "react";
import type { Category } from "../types/Category";
import type { Snippet } from "../types/Snippet";

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
});

const SnippetProvider = ({ children }: { children: React.ReactNode }) => {
    const [categories, setCategories] = useState<Category[]>(() => {
        const saved = window.electronAPI.getStoreValue('categories');
        return saved ? JSON.parse(saved) : [];
    });

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
        <SnippetContext.Provider value={{ categories, setCategories, saveCategories, createSnippet, updateSnippet, deleteSnippet, createCategory, updateCategory, deleteCategory }}>
            {children}
        </SnippetContext.Provider>
    )
}

export default SnippetProvider;