import Content from "./components/Content"
import Menu from "./components/Menu"
import TopMenu from "./components/TopMenu"


function App() {

  return (
    <div className="grid grid-cols-12 grid-rows-10 gap-0 h-screen">
        <div className="col-span-3 row-span-10">
          <Menu />
        </div>
        <div className="col-span-9 row-span-1 col-start-4">
          <TopMenu />
        </div>
        <div className="col-span-9 row-span-9 col-start-4 row-start-2">
          <Content />
        </div>
    </div> 
  )
}

export default App
