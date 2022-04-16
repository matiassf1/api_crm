import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Spinner from '../components/Spinner'

const VerCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)

    const {id} = useParams()

    useEffect(() => {
        setCargando(!cargando)
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                setCliente(resultado)
            } catch (error) {
               console.log(error);
            }

            setCargando(false)
        }
        obtenerClienteAPI() 
    }, [])

  return (
        cargando ? <Spinner /> :
          Object.keys(cliente).length === 0 ?
           <p className='text-purple font-bold text-2xl'>No hay reulstados
        </p> : (

                <div>

                        <h1 
                        className='font-black text-4xl text-purple '
                        >Ver Cliente: {cliente.nombre}</h1>
                        <p
                        className='mt-3 font-semibold'
                        >Informacion del Cliente</p>


                        {cliente.nombre && (<p className="text-2xl text-graytext mt-10">
                                <span className="text-graydarktext uppercase font-bold">Cliente: </span>
                                {cliente.nombre}</p>)}
                        {cliente.email && (<p className="text-2xl text-graytext mt-4">
                                <span className="text-graydarktext uppercase font-bold">Email: </span>
                                {cliente.email}</p>)}
                        {cliente.telefono && (<p className="text-2xl text-graytext mt-4">
                                <span className="text-graydarktext uppercase font-bold">Telefono: </span>
                                {cliente.telefono}</p>)}
                        {cliente.empresa && (<p className="text-2xl text-graytext mt-4">
                                <span className="text-graydarktext uppercase font-bold">Empresa: </span>
                                {cliente.empresa}</p>)}
                        {cliente.notas && (<p className="text-2xl text-graytext mt-4">
                                <span className="text-graydarktext uppercase font-bold">Notas: </span>
                                {cliente.notas}</p>)}

                </div>
        ) 
  )
}

export default VerCliente