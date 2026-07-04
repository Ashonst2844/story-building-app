import Navigation from "../Components/Navigation";
import Home from "./Home";
import Characters from "./Characters";
import Library from "./Library";
import Wiki from "./Wiki";

import * as ReactDOM from "react-router-dom"

function Main() {
    return(
        <div id="main" className="center">
            <Navigation/>
            <div id="page">
                <ReactDOM.Routes>
                    <ReactDOM.Route path="*" element={<Home/>}/>
                    <ReactDOM.Route path="library" element={<Library/>}/>
                    <ReactDOM.Route path="characters" element={<Characters/>}/>
                    <ReactDOM.Route path="wiki" element={<Wiki/>}/>
                </ReactDOM.Routes>
            </div>
        </div>
    )
}
export default Main;