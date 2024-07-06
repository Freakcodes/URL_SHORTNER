import { useState } from 'react'
import './App.css'
import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import DashBoard from '@/pages/DashBoard'
import Auth from '@/pages/Auth'
import RedirectLink from '@/pages/RedirectLink'
import Link from '@/pages/Link'
import Layout from './layout/Layout'
import UrlProvider from './context'
import Protected from './components/Protected'

function App() {

  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route path="" element={<LandingPage/>}/>
        <Route path="dashboard" element={
          <Protected>
            <DashBoard/>
          </Protected>
          
          }/>
        <Route path="auth" element={<Auth/>}/>
        <Route path="link/:id" element={<Protected>
            <Link/>
            </Protected>
            }/>
        <Route path=":id" element={<RedirectLink/>}/> 
      </Route>
    )
  )
  return (
    <UrlProvider>
      <RouterProvider router={router}/>
    </UrlProvider>
    
  )
}

export default App
