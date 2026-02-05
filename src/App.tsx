import Content from "./components/Content"
import Menu from "./components/Menu"
import TopMenu from "./components/TopMenu"


function App() {

  return (
    <div className="grid grid-cols-10 grid-rows-10 gap-0 h-screen">
        <div className="col-span-2 row-span-10">
          <Menu />
        </div>
        <div className="col-span-8 row-span-1 col-start-3">
          <TopMenu />
        </div>
        <div className="col-span-8 row-span-9 col-start-3 row-start-2">
          <Content />
        </div>
    </div> 
  )
}

export default App
