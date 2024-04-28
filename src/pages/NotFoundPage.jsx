import React from 'react'

function NotFoundPage() {
  return (
    <div className='h-screen flex justify-center items-center text-gray-400'>
      <div className='flex items-center'>
        <h6 className='text-5xl pe-2 border-e-2 border-gray-400'>404</h6>
        <p className='ms-3'>Page not found.</p>
      </div>
    </div>
  )
}

export default NotFoundPage