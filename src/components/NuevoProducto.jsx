import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
	mostrarAlertaAction,
	ocultarAlertaAction,
} from '../actions/alertaActions'
import { crearNuevoProductoAction } from '../actions/productoActions'

// Actions de Redux

const NuevoProducto = ({ history }) => {
	const [nombre, setNombre] = useState('')
	const [precio, setPrecio] = useState(0)

	// utilizar use dispacth y te crea una funcion
	const dispatch = useDispatch()

	// Acceder al state del store
	const cargando = useSelector(state => state.productos.loading)
	const error = useSelector(state => state.productos.error)
	const alerta = useSelector(state => state.alerta.alerta)

	// mandar llamar el action de productAction
	const agregarProducto = producto =>
		dispatch(crearNuevoProductoAction(producto))

	const submitNuevoProducto = e => {
		e.preventDefault()

		//Validar el formulario
		if (nombre.trim() === '' || precio <= 0) {
			const alerta = {
				msg: 'Ambos campos son obligatorios',
				classes: 'alert alert-danger text-center text-uppercase p3',
			}
			dispatch(mostrarAlertaAction(alerta))
			return
		}

		// Si no hay errores
		dispatch(ocultarAlertaAction())

		// crear el nuevo proyecto
		agregarProducto({
			nombre,
			precio,
		})

		//redireccionar
		history.push('/')
	}

	return (
		<div className='row justify-content-center'>
			<div className='col-md-8'>
				<div className='card'>
					<div className='card-body'>
						<h2 className='text-center mb-4 font-weight-bold'>
							Agregar Nuevo Producto
						</h2>

						{alerta && <p className={alerta.classes}>{alerta.msg}</p>}

						<form onSubmit={submitNuevoProducto}>
							<div className='form-group'>
								<label>Nombre Producto</label>
								<input
									type='text'
									className='form-control'
									placeholder='Nombre Producto'
									name='nombre'
									value={nombre}
									onChange={e => setNombre(e.target.value)}
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
									onChange={e => setPrecio(Number(e.target.value))}
								/>
							</div>
							<button
								className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
								type='submit'
							>
								Agregar
							</button>
						</form>
						{cargando && <p>Cargando</p>}
						{error && (
							<p className='alert alert-danger p2 mt-4 text-center'>
								Hubo un error
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default NuevoProducto
