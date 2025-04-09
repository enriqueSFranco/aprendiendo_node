import { sum } from "./suma.mjs"
import { initSO } from './os.mjs'
import { initFs } from "./file-system.mjs"
import { initReadFileSync, initReadFileAsync } from "./fs-readFile.mjs"
import { initReadFileAsyncPromise } from './fs-promise.mjs'
// .js -> por defecto usa common js
// .mjs -> para usar ES modules
// .cjs -> para usar common js

// console.log('suma: ', sum(10, 10))

// console.log('--------OS-----------')
// initSO()

// console.log('-------FS-------------')
// initFs()

// console.log('--------SYNC---------------')
// initReadFileSync()

// console.log('---------ASYNC-----------')
// initReadFileAsync()

console.log('---------PROMISE-----------')
initReadFileAsyncPromise()

