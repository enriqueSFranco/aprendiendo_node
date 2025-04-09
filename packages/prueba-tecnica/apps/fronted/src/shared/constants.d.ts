const { VITE_HOST_URL: HOST_URL, VITE_UPLOAD_FILES_URL: UPLOAD_FILES_URL, VITE_USERS_URL: USERS_URL } = import.meta.env

const APP_STATUS = {
  IDLE: 'idle',
  ERROR: 'error',
  READY_UPLOAD: 'ready_upload',
  UPLOADING: 'uploading',
  READY_USAGE: 'ready_usage'
}

const BUTTON_TEXT = {
  [APP_STATUS.IDLE]: 'Seleccionar archivo',
  [APP_STATUS.ERROR]: 'Error al cargar el archivo',
  [APP_STATUS.READY_UPLOAD]: 'Subir archivo',
  [APP_STATUS.UPLOADING]: 'Subiendo archivo...',
  [APP_STATUS.READY_USAGE]: 'Archivo subido correctamente'
}

const SHOW_BUTTON = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING
const SHOW_FORM = appStatus !== APP_STATUS.READY_USAGE
const SHOW_SARCH = appStatus === APP_STATUS.READY_USAGE


export { HOST_URL, UPLOAD_FILES_URL, USERS_URL, APP_STATUS, BUTTON_TEXT, SHOW_BUTTON, SHOW_FORM, SHOW_SARCH }