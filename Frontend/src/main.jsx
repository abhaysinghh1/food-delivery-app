
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StoreContextProvider } from './Context/StoreContext.jsx'
import { ThemeProvider } from './Context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <ThemeProvider>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </ThemeProvider>
  </BrowserRouter>
)

