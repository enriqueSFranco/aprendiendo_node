import { users } from './api.js'
import { flujoDeEventos } from './flujo_eventos.js'
import { renderUserList } from './users.js'
import { stopPropagationPreventDefault } from './stopPropagation_preventDefault.js'
import { delegacionEventos } from './delegacion_eventos.js'

const $main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', function () {
  renderUserList($main, users)
  flujoDeEventos()
  stopPropagationPreventDefault()
  delegacionEventos()
})
