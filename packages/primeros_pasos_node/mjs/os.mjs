import { clear } from 'node:console'
import os from 'node:os' // desde la v16 ya se debe poner el prefijo "node" y no el nombre del modulo nativo

// MODULO NATIVO PARA OBTENER INFORMACION DE NUESTRA COMPUTADORA
export function initSO () {
  console.log('Información del sistema operativo')
  console.log('----------------------------------')
  console.log('nombre del so: ', os.platform())
  console.log('version del so: ', os.release())
  console.log('arquitectua del so: ', os.arch())
  console.log('CPUs del so: ', os.cpus())
  console.log('Memoria libre del so: ', os.freemem() / 1024 / 1024)
  console.log('Memoria total del so: ', os.totalmem() / 1024 / 1024)
  console.log('cuanto tiempo lleva encendida la pc: ', os.uptime() / 60 / 60)
}
