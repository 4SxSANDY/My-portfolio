import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ProjectsPage from './ProjectsPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './base.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
