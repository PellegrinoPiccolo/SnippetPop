import React, { useEffect } from 'react';
import { SnippetContext } from './SnippetContext';
import type { Snippet } from '../types/Snippet';

export const SearchContext = React.createContext<{
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    snippetsFiltered?: Snippet[];
}>({
    searchQuery: '',
    setSearchQuery: (query: string) => {},
    snippetsFiltered: [],
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [snippetsFiltered, setSnippetsFiltered] = React.useState<Snippet[]>([]);
    const {selectedCategoryId, categories} = React.useContext(SnippetContext)

    useEffect(() => {
        if(searchQuery.trim() === '') {
            if(selectedCategoryId === null) {
                const allSnippets = categories.reduce((acc: Snippet[], cat) => [...acc, ...(cat.snippets || [])], []);
                setSnippetsFiltered(allSnippets);
            } else {
                const category = categories.find(cat => cat.id === selectedCategoryId);
                setSnippetsFiltered(category?.snippets || []);
            }
            return;
        }
        if(selectedCategoryId === null) {
            const allSnippets = categories.reduce((acc: Snippet[], cat) => [...acc, ...(cat.snippets || [])], []);
            setSnippetsFiltered(allSnippets.filter(snippet => snippet.title.toLowerCase().includes(searchQuery.toLowerCase())));
        } else {
            const category = categories.find(cat => cat.id === selectedCategoryId);
            if(category) {
                setSnippetsFiltered((category.snippets || []).filter(snippet => snippet.title.toLowerCase().includes(searchQuery.toLowerCase())));
            } else {
                setSnippetsFiltered([]);
            }
        }
    }, [searchQuery, selectedCategoryId, categories]);

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery, snippetsFiltered }}>
            {children}
        </SearchContext.Provider>
    );
}