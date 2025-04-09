/*
  callbacks -> funciones que se ejecutan al terminar un tarea asincrona
*/
function myPow (value, callback) {
  setTimeout(() => {
    callback(value, value * value)
  }, 0 | Math.random() * 100)
}

myPow(2, (value, result) => {
  console.log(`${value}^${value} = ${result}`)
  myPow(3, (value, result) => {
    console.log(`${value}^${value} = ${result}`)
  })
  myPow(4, (value, result) => {
    console.log(`${value}^${value} = ${result}`)
  })
})
