import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
	borrarProductosAction,
	obtenerProductoEditar,
} from '../actions/productoActions'

const Producto = ({ producto }) => {
	const { nombre, precio, id } = producto

	const dispatch = useDispatch()
	const history = useHistory()

	//Confirmar si se ha eliminado
	const confirmarEliminarProducto = id => {
		// Preguntar al usuario
		Swal.fire({
			title: 'Estas seguro?',
			text: 'Un producto que se elimnina no se puede recuperar!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar!',
			cancelButtonText: 'Cancelar',
		}).then(result => {
			if (result.isConfirmed) {
				//pasarlo al action
				dispatch(borrarProductosAction(id))
			}
		})
	}

	// Funcion que rediirige de forma programada
	const redireccionarEdicion = producto => {
		dispatch(obtenerProductoEditar(producto))
		history.push(`/productos/editar/${producto.id}`)
	}

	return (
		<tr>
			<td>{nombre}</td>
			<td className='font-weight-bold'>
				<span>$ {precio}</span>
			</td>
			<td className='acciones'>
				<button
					type='button'
					className='btn btn-primary mr-2'
					onClick={() => redireccionarEdicion(producto)}
				>
					Editar
				</button>
				<button
					type='button'
					className='btn btn-danger'
					onClick={() => confirmarEliminarProducto(id)}
				>
					Eliminar
				</button>
			</td>
		</tr>
	)
}

export default Producto
