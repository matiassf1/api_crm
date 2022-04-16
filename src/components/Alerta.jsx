import React from 'react'

const Alerta = ({children}) => {
  return (
        <div 
        className='text-center my-4 rounded-sm bg-alertcolor text-white font-bold uppercase p-3'
        >
                {children}
        </div>
  )
}

export default Alerta