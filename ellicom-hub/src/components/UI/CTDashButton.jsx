import React from 'react'
import { Link } from 'react-router-dom'

const CTDashButton = () => {
  return (
    <div className='items-center justify-center'>
      <Link to="/User-login">
        <button className='bg-sea p-2 px-7 py-1 rounded-lg text-2xl text-center mb-0 text-ground 
        transition ease-in-out duration-100 hover:bg-high hover:scale-95'>
          My Dashboard
        </button>
      </Link>
    </div>
  )
}

export default CTDashButton;
