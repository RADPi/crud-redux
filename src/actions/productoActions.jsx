import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_ERROR,
	AGREGAR_PRODUCTO_EXITO,
	COMENZAR_DESCARGA_PRODUCTOS,
	COMENZAR_EDITAR_PRODUCTO,
	DESCARGA_PRODUCTOS_ERROR,
	DESCARGA_PRODUCTOS_EXITO,
	OBTENER_PRODUCTO_EDITAR,
	OBTENER_PRODUCTO_ELIMINAR,
	PRODUCTO_EDITADO_EXITO,
	PRODUCTO_ELIMINADO_ERROR,
	PRODUCTO_ELIMINADO_EXITO,
} from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
	return async dispatch => {
		dispatch(agregarProducto())
		try {
			await clienteAxios.post('/productos', producto)
			// si sale todo bien actualiza el state
			dispatch(agregarProductoExito(producto))
			//Alerta
			Swal.fire('Correcto', 'El producto se agregó correctamente', 'success')
		} catch (error) {
			// si hay un error cambiar el state
			dispatch(agregarProductoError(true))
			// Alerta
			Swal.fire({
				icon: 'error',
				title: 'Hubo un error',
				text: 'Hubo un error intente nuevamente',
			})
		}
	}
}

const agregarProducto = () => ({
	type: AGREGAR_PRODUCTO,
	payload: true,
})

const agregarProductoExito = producto => ({
	type: AGREGAR_PRODUCTO_EXITO,
	payload: producto,
})

const agregarProductoError = estado => ({
	type: AGREGAR_PRODUCTO_ERROR,
	payload: estado,
})

// Funcion que descarga los productos de la DB
export function obtenerProductosAction() {
	return async dispatch => {
		dispatch(descargarProductos())
		try {
			const respuesta = await clienteAxios.get('/productos')
			dispatch(descargarProductosExitosa(respuesta.data.productos))
		} catch (error) {
			console.error(error)
			dispatch(descargarProductosError())
		}
	}
}

const descargarProductos = () => ({
	type: COMENZAR_DESCARGA_PRODUCTOS,
	payload: true,
})

const descargarProductosExitosa = productos => ({
	type: DESCARGA_PRODUCTOS_EXITO,
	payload: productos,
})

const descargarProductosError = () => ({
	type: DESCARGA_PRODUCTOS_ERROR,
	payload: true,
})

// Funcion para borrar de la DB
export function borrarProductosAction(id) {
	return async dispatch => {
		dispatch(obtenerProductoEliminar(id))
		try {
			await clienteAxios.delete(`/productos/${id}`)
			dispatch(eliminarProductoExito())
			// ALerta
			Swal.fire(
				'Eliminado!',
				'El producto se eliminó correctamente.',
				'success',
			)
		} catch (error) {
			console.error(error)
			dispatch(eliminarProductoError())
		}
	}
}

const obtenerProductoEliminar = id => ({
	type: OBTENER_PRODUCTO_ELIMINAR,
	payload: id,
})

const eliminarProductoExito = productos => ({
	type: PRODUCTO_ELIMINADO_EXITO,
})

const eliminarProductoError = () => ({
	type: PRODUCTO_ELIMINADO_ERROR,
	payload: true,
})

// Colocar producto en edicion
export function obtenerProductoEditar(producto) {
	return async dispatch => {
		dispatch(obtenerProductoEditarAction(producto))
	}
}

const obtenerProductoEditarAction = producto => ({
	type: OBTENER_PRODUCTO_EDITAR,
	payload: producto,
})

// Colocar producto en edicion
export function editarProductoAction(producto) {
	return async dispatch => {
		dispatch(editarProducto())
		try {
			await clienteAxios.put(`/productos/${producto.id}`, producto)
			dispatch(editarProductoExito(producto))
		} catch (error) {
			dispatch(editarProductoError())
		}
	}
}

const editarProducto = producto => ({
	type: COMENZAR_EDITAR_PRODUCTO,
})

const editarProductoExito = producto => ({
	type: PRODUCTO_EDITADO_EXITO,
	payload: producto,
})

const editarProductoError = () => ({
	type: PRODUCTO_ELIMINADO_ERROR,
	payload: true,
})
