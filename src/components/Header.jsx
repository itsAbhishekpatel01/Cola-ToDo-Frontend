import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(()=>{
    const userId = JSON.parse(localStorage.getItem('userId'));
    if(userId) setIsAuthenticated(true);
  })

  const handleLogout = ()=>{
    localStorage.removeItem('userId');
  }

  return (
    <div>
        <nav className='flex justify-around items-center bg-gradient-to-tr from-pink-500 to-orange-500 text-white py-2'> 
            <h1>MyTodo</h1>
            {
              !isAuthenticated ? (
                <Link to={'/login'} className='border px-3 py-1 rounded-md hover:bg-blue-600'>Login</Link>
              ):(<button onClick={handleLogout} className='border px-3 py-1 rounded-md hover:bg-slate-200 hover:text-orange-500'>Logout</button>)
            }
        </nav>
    </div>
  )
}

export default Header