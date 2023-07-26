const { suma } = require('./suma.cjs')

console.log('hola 👋')
// el objeto window no existe en node
// el obejeto global en node es globalThis (variable global en toda la app)
globalThis.console.log(globalThis)

console.log('suma: ', suma(1, 2))