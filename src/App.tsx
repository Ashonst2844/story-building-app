import Navigation from "./UI/Components/Navigation"

import Home from "./UI/Pages/Home";
import World from "./UI/Pages/World";
import Timeline from "./UI/Pages/Timeline";
import Library from "./UI/Pages/Library";
import Characters from "./UI/Pages/Characters";
import Wiki from "./UI/Pages/Wiki";
import Notes from "./UI/Pages/Notes";

import * as ReactDOM from "react-router-dom"
import './App.css'

function App() {
  return <main className="flex flex-col-reverse lg:flex-row">
    <Navigation/>
    <div className="w-screen h-[calc(100vh-4rem)] lg:h-screen lg:w-[70%]">
        <ReactDOM.Routes>
            <ReactDOM.Route path="/" element={<Home/>}/>
            <ReactDOM.Route path="world/*" element={<World/>}/>
            <ReactDOM.Route path="timeline/*" element={<Timeline/>}/>
            <ReactDOM.Route path="library" element={<Library/>}/>
            <ReactDOM.Route path="characters" element={<Characters/>}/>
            <ReactDOM.Route path="wiki" element={<Wiki/>}/>
            <ReactDOM.Route path="notes" element={<Notes/>}/>
        </ReactDOM.Routes>
    </div>
  </main>
}

export default App
