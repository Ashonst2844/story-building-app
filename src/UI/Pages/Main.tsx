import Navigation from "../Components/Navigation";
import Home from "./Home";
import World from "./World";
import Timeline from "./Timeline";
import Characters from "./Characters";
import Library from "./Library";
import Wiki from "./Wiki";
import Notes from "./Notes";

import * as ReactDOM from "react-router-dom"

function Main() {
    return(
        <div id="main" className="center">
            <Navigation/>
            <div id="page">
                <ReactDOM.Routes>
                    <ReactDOM.Route path="*" element={<Home/>}/>
                    <ReactDOM.Route path="world/*" element={<World/>}/>
                    <ReactDOM.Route path="timeline/*" element={<Timeline/>}/>
                    <ReactDOM.Route path="library" element={<Library/>}/>
                    <ReactDOM.Route path="characters" element={<Characters/>}/>
                    <ReactDOM.Route path="wiki" element={<Wiki/>}/>
                    <ReactDOM.Route path="notes" element={<Notes/>}/>
                </ReactDOM.Routes>
            </div>
        </div>
    )
}
export default Main;