import React from 'react'
import { Link } from 'react-router-dom'

const ClientLoginButton = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Link to="Client/login">
        <button className='bg-sea p-2 px-7 py-1 rounded-lg text-2xl text-center mb-0 text-ground 
        transition ease-in-out duration-100 hover:bg-high hover:scale-95'>
          Client Login
        </button>
      </Link>
    </div>
  )
}

export default ClientLoginButton
