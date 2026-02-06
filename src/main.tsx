import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import SnippetProvider from './context/SnippetContext.tsx'
import { SearchProvider } from './context/SearchContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnippetProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </SnippetProvider>
  </StrictMode>,
)
