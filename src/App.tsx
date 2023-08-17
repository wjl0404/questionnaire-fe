import React from 'react'
// import List from './pages/manage/List'
import { RouterProvider } from 'react-router-dom'
import routerConfig from './router'
import './App.css'
export default function App() {
  return (
    // <div>
    //   <h2 style={{ background: 'yellow' }}>QUESTIONNAIRE FE</h2>
    //   <List></List>
    // </div>

    <RouterProvider router={routerConfig}></RouterProvider>
  )
}
