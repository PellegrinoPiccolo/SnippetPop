import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import SnippetProvider from './context/SnippetContext'
import { SearchProvider } from './context/SearchContext'
import { ModalProvider } from './context/ModalContext'
import TitleBar from './components/ui/TitleBar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnippetProvider>
      <SearchProvider>
        <ModalProvider>
          {window.electronAPI.platform !== 'darwin' && <TitleBar />}
          <App />
        </ModalProvider>
      </SearchProvider>
    </SnippetProvider>
  </StrictMode>,
)
