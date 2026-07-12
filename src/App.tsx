import Main from "./UI/Pages/Main"

import * as ReactDOM from "react-router-dom"
import './App.css'
import './Responsive.css'

function App() {
  return (
    <>
      <ReactDOM.Routes>
        <ReactDOM.Route path="/*" element={<Main/>}/>
      </ReactDOM.Routes>
    </>
  )
}

export default App
