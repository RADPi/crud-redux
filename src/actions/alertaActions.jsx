import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../types'

// Muestra alerta

export function mostrarAlertaAction(alerta) {
	return dispatch => {
		dispatch(crearAlerta(alerta))
	}
}

const crearAlerta = alerta => ({
	type: MOSTRAR_ALERTA,
	payload: alerta,
})

export function ocultarAlertaAction(alerta) {
	return dispatch => {
		dispatch(ocultarAlerta())
	}
}

const ocultarAlerta = alerta => ({
	type: OCULTAR_ALERTA,
})
