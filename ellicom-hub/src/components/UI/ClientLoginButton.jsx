import React from 'react'
import { Link } from 'react-router-dom'

const ClientLoginButton = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Link to="/login">
        <button className='bg-sea p-2 px-7 py-1 rounded-lg text-2xl text-center mb-0 text-ground'>
          Client Login
        </button>
      </Link>
    </div>
  )
}

export default ClientLoginButton
