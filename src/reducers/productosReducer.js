import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_ERROR,
	AGREGAR_PRODUCTO_EXITO,
	COMENZAR_DESCARGA_PRODUCTOS,
	DESCARGA_PRODUCTOS_ERROR,
	DESCARGA_PRODUCTOS_EXITO,
	OBTENER_PRODUCTO_EDITAR,
	OBTENER_PRODUCTO_ELIMINAR,
	PRODUCTO_EDITADO_ERROR,
	PRODUCTO_EDITADO_EXITO,
	PRODUCTO_ELIMINADO_ERROR,
	PRODUCTO_ELIMINADO_EXITO,
} from '../types'

// cada reducer tiene su propio state
const initialState = {
	productos: [],
	error: null,
	loading: false,
	productoEliminar: null,
	productoEditar: null,
}

export default function (state = initialState, action) {
	switch (action.type) {
		case AGREGAR_PRODUCTO:
		case COMENZAR_DESCARGA_PRODUCTOS:
			return {
				...state,
				loading: true,
			}
		case AGREGAR_PRODUCTO_EXITO:
			return {
				...state,
				loading: false,
				productos: [...state.productos, action.payload],
			}
		case AGREGAR_PRODUCTO_ERROR:
		case DESCARGA_PRODUCTOS_ERROR:
		case PRODUCTO_ELIMINADO_ERROR:
		case PRODUCTO_EDITADO_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case DESCARGA_PRODUCTOS_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				productos: action.payload,
			}
		case OBTENER_PRODUCTO_ELIMINAR:
			return {
				...state,
				productoEliminar: action.payload,
			}
		case PRODUCTO_ELIMINADO_EXITO:
			return {
				...state,
				productos: state.productos.filter(
					producto => producto.id !== state.productoEliminar,
				),
				productoEliminar: null,
			}
		case OBTENER_PRODUCTO_EDITAR:
			return {
				...state,
				productoEditar: action.payload,
			}
		case PRODUCTO_EDITADO_EXITO:
			return {
				...state,
				productoEditar: null,
				productos: state.productos.map(producto =>
					producto.id === action.payload.id ? action.payload : producto,
				),
			}
		default:
			return state
	}
}
