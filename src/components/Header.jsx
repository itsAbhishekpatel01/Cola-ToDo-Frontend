import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    const userId = JSON.parse(localStorage.getItem('userId'));
    if(userId) setIsAuthenticated(true);
  })

  const handleLogout = ()=>{
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    navigate('/login');
  }

  // return (
  //   <div>
  //       <nav className='flex justify-around items-center bg-gradient-to-tr from-pink-500 to-orange-500 text-white py-2'> 
  //           <h1>MyTodo</h1>
  //           {
  //             !isAuthenticated ? (
  //               <Link to={'/login'} className='border px-3 py-1 rounded-md hover:bg-blue-600'>Login</Link>
  //             ):(<button onClick={handleLogout} className='border px-3 py-1 rounded-md hover:bg-slate-200 hover:text-orange-500'>Logout</button>)
  //           }
  //       </nav>
  //   </div>
  // )

  return (
    <div>
        <nav className='fixed top-2 left-0 right-0  flex justify-between mx-10 px-10 rounded-full items-center backdrop-blur-md bg-white bg-opacity-5 text-white py-2'> 
            <h1 className='text-2xl font-semibold bg-gradient-to-r from-blue-600 via-pink-400 to-green-600 bg-clip-text text-transparent'>Cola Todo</h1>
            {
              !isAuthenticated ? (
                <Link to={'/login'} className='border px-3 py-1 rounded-md hover:bg-blue-600'>Login</Link>
              ):(<button onClick={()=>{handleLogout()}} className='border px-3 py-1 rounded-md hover:bg-slate-200 hover:text-orange-500'>Logout</button>)
            }
        </nav>
    </div>
  )
}

export default Header