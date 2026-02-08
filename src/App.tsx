import { useContext } from "react";
import Content from "./components/Content"
import Menu from "./components/Menu"
import TopMenu from "./components/TopMenu"
import { SnippetContext } from "./context/SnippetContext";
import './index.css'

function App() {

  const {currentView} = useContext(SnippetContext);

  const isMac = window.electronAPI.platform === 'darwin';

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a]">
      <aside className={`w-1/4 flex-1 h-screen ${isMac ? '' : 'main-content'}`}>
        <Menu />
      </aside>

      <main className="flex flex-col flex-3 h-full">
        {currentView !== 'settings' && (
          <div className={`h-16 border-b border-white/10 ${isMac ? '' : 'mt-[37px]'}`}> 
            <TopMenu />
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <Content />
        </div>
      </main>
    </div>
  )
}

export default App
