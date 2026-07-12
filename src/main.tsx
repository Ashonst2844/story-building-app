import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as ReactDOM from "react-router-dom"
import './index.css'
import './Responsive.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactDOM.BrowserRouter>
      <App />
    </ReactDOM.BrowserRouter>
  </StrictMode>,
)
