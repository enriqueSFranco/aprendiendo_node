import { sum } from "./suma.mjs"
import { initSO } from './os.mjs'
import { initFs } from "./file-system.mjs"
// .js -> por defecto usa common js
// .mjs -> para usar ES modules
// .cjs -> para usar common js

console.log('suma: ', sum(10, 10))
initSO()
console.log('------------------------------')
initFs()

