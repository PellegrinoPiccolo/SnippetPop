import { useContext } from "react";
import Content from "./components/Content"
import Menu from "./components/Menu"
import TopMenu from "./components/TopMenu"
import { SnippetContext } from "./context/SnippetContext";
import './index.css'
import { Group, Panel, Separator, useDefaultLayout } from "react-resizable-panels";

function App() {

  const {currentView} = useContext(SnippetContext);

  const isMac = window.electronAPI.platform === 'darwin';

  const { defaultLayout, onLayoutChange } = useDefaultLayout({
    groupId: "unique-group-id",
    storage: {
      getItem: (key) => {
        return window.electronAPI.getLayout(key);
      },
      setItem: (key, value) => {
        window.electronAPI.setLayout(key, value);
      }
    }
  });

  return (
    <Group className="flex h-screen w-full bg-[#0a0a0a]" orientation="horizontal" autoSave="main-panels" defaultLayout={defaultLayout} onLayoutChange={onLayoutChange}>
      <Panel className={`w-1/4 flex-1 h-screen ${isMac ? '' : 'main-content'}`} defaultSize="25%" minSize="20%" maxSize="50%">
        <Menu />
      </Panel>
      <Separator className="w-0.5 bg-white/10 focus-visible:outline-none" />
      <Panel className="flex flex-col flex-3 h-full">
        {currentView !== 'settings' && (
          <div className={`h-16 border-b border-white/10 ${isMac ? '' : 'mt-[37px]'}`}> 
            <TopMenu />
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <Content />
        </div>
      </Panel>
    </Group>
  )
}

export default App
