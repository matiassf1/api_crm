import React from 'react'
import Formulario from '../components/Formulario'

const NuevoCliente = () => {

  return (
    <>
        <h1 
        className='font-black text-4xl text-purple'
        >Nuevo Cliente</h1>
        <p
        className='mt-3 font-semibold'
        >Llena los siguientes campos para registar un cliente</p>

        <Formulario />
    </>
  )
}

export default NuevoCliente