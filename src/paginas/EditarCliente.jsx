import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Spinner from '../components/Spinner'

const EditarCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)

    const {id} = useParams()

    useEffect(() => {
        setCargando(!cargando)
        const obtenerClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
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
      <>  
        <h1 
        className='font-black text-4xl text-purple'
        >Editar Cliente</h1>
        <p
        className='mt-3 font-semibold'
        >Utiliza este formulario para editar datos de un cliente</p>

         <Formulario 
            cliente={cliente}
            cargando={cargando}
        />
      </>  
  )
  )
}

export default EditarCliente