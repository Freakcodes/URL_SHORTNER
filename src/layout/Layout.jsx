import Header from '../components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      {/* Header */}
      
      

        <main className='min-h-screen container mt-2'>
            <Header/>
            <Outlet/>
        </main>
        <div className='p-10 text-center bg-gray-800 mt-10'>
          Made with ❤️ by FreakCodes
        </div>
        {/* Footer */}
    </div>
  )
}

export default Layout