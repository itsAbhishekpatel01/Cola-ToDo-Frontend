import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <nav className='flex justify-around items-center bg-gradient-to-tr from-pink-500 to-orange-500 text-white py-2'> 
            <h1>MyTodo</h1>
            <button className='border px-3 py-1 rounded-md hover:bg-blue-600'>Login</button>
        </nav>
    </div>
  )
}

export default Header