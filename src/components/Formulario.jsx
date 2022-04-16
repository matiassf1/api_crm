import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Alerta  from './Alerta'
import Spinner  from './Spinner'

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                        .min(3, 'El nombre es muy corto')
                            .max(20, 'El nombre es muy largo')
                                .required('El Nombre del Cliente es Obligatorio'),
        empresa: Yup.string()
                        .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
                        .email('Email no valido')
                            .required('El email es obligatorio'),
        telefono: Yup.number()
                        .integer('Numero no valido')
                            .typeError('Ingresa un numero valido')
                                .positive('Numero no valido'),
    })

    const handleSubmit = async(valores) => {
        try {
            let respuesta
            if (cliente.id) {
                // Editando - Method PUT
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                    respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                       'Content-Type' : 'application/json'
                    }
                })
            } else {
                // Nuevo registro
                const url = `${import.meta.env.VITE_API_URL}`
                    respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                       'Content-Type' : 'application/json'
                    }
                })
            }

            await respuesta.json()
            navigate('/clientes')
        } catch (error) {
            console.log(error);
        }
    }

  return (
      cargando ? <Spinner /> : (
            <div 
            className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'
            >
                <h1 
                className='text-graytext font-bold text-xl uppercase text-center'
                >{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? ''
                    }}
                    enableReinitialize={true}
                    onSubmit={ async(values, {resetForm}) => {
                        await handleSubmit(values);

                        resetForm()
                    }}
                    validationSchema={nuevoClienteSchema}
                >
                    {({errors, touched}) => {
                        
                    
                    return (

                    <Form 
                    className='mt-10'
                    >
                        <div
                        className='mb-4'
                        >
                            <label
                            className='text-graytext'
                            htmlFor='nombre'
                            >Nombre: </label>
                            <Field 
                            id='nombre'
                            type='text'
                            className='mt-2 block w-full p-3 bg-graybg'
                            placeholder='Nombre del Cliente'
                            name='nombre'
                            />

                            {errors.nombre && touched.nombre ? (
                            <Alerta>{errors.nombre}</Alerta>
                            ) : null}

                        </div>

                        <div
                        className='mb-4'
                        >
                            <label
                            className='text-graytext'
                            htmlFor='empresa'
                            >Empresa: </label>
                            <Field 
                            id='empresa'
                            type='text'
                            className='mt-2 block w-full p-3 bg-graybg'
                            placeholder='Empresa del Cliente'
                            name='empresa'

                            />
                            {errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta>
                            ) : null}

                        </div>

                        <div
                        className='mb-4'
                        >
                            <label
                            className='text-graytext'
                            htmlFor='email'
                            >E-mail: </label>
                            <Field 
                            id='email'
                            type='email'
                            className='mt-2 block w-full p-3 bg-graybg'
                            placeholder='Email del Cliente'
                            name='email'

                            />

                            {errors.email && touched.email ? (
                            <Alerta>{errors.email}</Alerta>
                            ) : null}
                        </div>

                        <div
                        className='mb-4'
                        >
                            <label
                            className='text-graytext'
                            htmlFor='telefono'
                            >Telefono: </label>
                            <Field 
                            id='telefono'
                            type='tel'
                            className='mt-2 block w-full p-3 bg-graybg'
                            placeholder='Telefono del Cliente'
                            name='telefono'

                            />
                            {errors.telefono && touched.telefono ? (
                            <Alerta>{errors.telefono}</Alerta>
                            ) : null}
                        </div>

                        <div
                        className='mb-4'
                        >
                            <label
                            className='text-graytext'
                            htmlFor='notas'
                            >Notas: </label>
                            <Field 
                            as='textarea'
                            id='notas'
                            type='text'
                            className='mt-2 block w-full p-3 bg-graybg h-30'
                            placeholder='Notas del cliente'
                            name='notas'

                            />
                        </div>

                        <input type="submit" 
                            value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                            className='mt-5 w-full bg-purple p-3 text-white uppercase font-bold rounded-md text-lg'
                        />
                    </Form>

                    )}}
                    
                </Formik>

            </div>
    )
  )
}

Formulario.defaultProps = {
    cliente: {},
}

export default Formulario