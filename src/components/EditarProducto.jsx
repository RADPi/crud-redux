import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { editarProductoAction } from '../actions/productoActions'

const EditarProducto = () => {
	const dispatch = useDispatch()
	const history = useHistory()

	// nuevo estate de producto
	const [producto, setProducto] = useState({
		nombre: '',
		precio: '',
	})

	// producto a editar
	const productoEditar = useSelector(state => state.productos.productoEditar)
	const { nombre, precio } = producto

	// llenar el state automaticamente
	useEffect(() => {
		setProducto(productoEditar)
	}, [productoEditar])

	// Leer los datos del formulario
	const onChangeFormulario = e => {
		setProducto({
			...producto,
			[e.target.name]: e.target.value,
		})
	}

	const submitEditarProducto = e => {
		e.preventDefault()
		dispatch(editarProductoAction(producto))
		history.push('/')
	}

	return (
		<div className='row justify-content-center'>
			<div className='col-md-8'>
				<div className='card'>
					<div className='card-body'>
						<h2 className='text-center mb-4 font-weight-bold'>
							Editar Producto
						</h2>

						<form onSubmit={submitEditarProducto}>
							<div className='form-group'>
								<label>Nombre Producto</label>
								<input
									type='text'
									className='form-control'
									placeholder='Nombre Producto'
									name='nombre'
									value={nombre}
									onChange={onChangeFormulario}
								/>
							</div>
							<div className='form-group'>
								<label>Precio Producto</label>
								<input
									type='number'
									className='form-control'
									placeholder='Precio Producto'
									name='precio'
									value={precio}
									onChange={onChangeFormulario}
								/>
							</div>
							<button
								className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
								type='submit'
							>
								Guardar Cambios
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditarProducto
