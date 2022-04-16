import { useState, useEffect} from "react"
import Cliente from "../components/Cliente"
import swal from 'sweetalert';

const Inicio = () => {

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    const obtenerClientesAPI = async() => {
      try {
        const url = 'https://my-json-server.typicode.com/matiassf1/api_crm/clientes'
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }

    }

    obtenerClientesAPI()
  }, [])

  const handleEliminar = async id => {
      
    swal({
      title: "Estas seguro?",
      text: "Una vez eliminado no podras recuperar a este cliente",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willDelete) => {
      if (willDelete) {
        try {
          const url = `http://localhost:4000/clientes/${id}`
          const respuesta = await fetch(url, {
            method: 'DELETE'
          })
          await respuesta.json()
          swal("El cliente fue eliminado correctamente", {
            icon: "success",
          })
          const arrayClientes = clientes.filter( cliente => cliente.id !== id)
          setClientes(arrayClientes)
        } catch (error) {
          console.log(error);
        }

      } else {
        swal("El cliente no fue eliminado");
      }
    });
  }

  return (
    <>
        <h1 
        className='font-black text-4xl text-purple'
        >Clientes</h1>
        <p
        className='mt-3 font-semibold'
        >Administra tus clientes</p>

        <table 
        className='w-full mt-5 table-auto shadow bg-white'
        >
          <thead 
          className='bg-purple text-white '
          >
              <tr>
                <th className='p-2'>Nombre</th>
                <th className='p-2'>Contacto</th>
                <th className='p-2'>Empresa</th>
                <th className='p-2'>Acciones</th>
              </tr>
          </thead>

          <tbody>
            {clientes.map(cliente => (
              <Cliente 
                key={cliente.id}
                cliente={cliente}
                handleEliminar={handleEliminar}
              />
            ))}

          </tbody>
        </table>

    </>
  )
}

export default Inicio