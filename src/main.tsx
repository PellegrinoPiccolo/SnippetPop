import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import SnippetProvider from './context/SnippetContext'
import { SearchProvider } from './context/SearchContext'
import { ModalProvider } from './context/ModalContext'
import TitleBar from './components/ui/TitleBar'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnippetProvider>
      <SearchProvider>
        <ModalProvider>
          {window.electronAPI.platform !== 'darwin' && <TitleBar />}
          <div className={`${window.electronAPI.platform !== 'darwin' ? 'main-content' : ''}`}>
            <App />
          </div>
        </ModalProvider>
      </SearchProvider>
    </SnippetProvider>
  </StrictMode>,
)
