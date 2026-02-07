import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import SnippetProvider from './context/SnippetContext'
import { SearchProvider } from './context/SearchContext'
import { ModalProvider } from './context/ModalContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnippetProvider>
      <SearchProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </SearchProvider>
    </SnippetProvider>
  </StrictMode>,
)
