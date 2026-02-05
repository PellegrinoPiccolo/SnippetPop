import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import SnippetProvider from './context/SnippetContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnippetProvider>
      <App />
    </SnippetProvider>
  </StrictMode>,
)
