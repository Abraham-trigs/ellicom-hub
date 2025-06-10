import React from 'react'
import { Link } from 'react-router-dom'

const ClientLoginButton = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Link to="Client/login">
        <button className='bg-sea px-15 py-4 rounded-lg text-center mb-0 text-ground 
        transition ease-in-out duration-100 hover:bg-high hover:scale-95
        font-bold text-2xl'>
          <span className=''>Client Login</span>
        </button>
      </Link>
    </div>
  )
}

export default ClientLoginButton
