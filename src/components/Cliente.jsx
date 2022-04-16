import { useNavigate } from "react-router-dom"

const Cliente = ({cliente, handleEliminar}) => {
  const navigate = useNavigate()

  const {nombre, empresa, email, telefono, notas, id} = cliente

  return (
    <tr className='border-b hover:bg-greybg'>
        <td 
          className='p-3'
        >{nombre}</td>
        <td 
          className='p-3'
        > 
          <p><span className='text-gray uppercase font-bold'>Email: </span>{email}</p>
          <p><span className='text-gray uppercase font-bold'>Tel: </span>{telefono}</p>

        </td>
        <td 
          className='p-3'
        >{empresa}</td>
        <td 
          className='p-3'
        >
          <button 
              className='mt-3 bg-btnver hover:bg-btnverhover block w-full text-white p-2 rounded-md uppercase font-bold text-xs' 
              type='button'
              onClick={() => navigate(`/clientes/${id}`)}
            >Ver Cliente</button>

          <button
              className='mt-3 bg-btnedit hover:bg-btnedithover block w-full text-white p-2 rounded-md uppercase font-bold text-xs' 
              type='button'
              onClick={() => navigate(`/clientes/editar/${id}`)}
            >Editar</button>

          <button
              className='mt-3 bg-btndelete hover:bg-btndeletehover block w-full text-white p-2 rounded-md uppercase font-bold text-xs' 
              type='button'
              onClick={() => handleEliminar(id)}
            >Eliminar</button>

        </td>
    </tr>
  )
}

export default Cliente