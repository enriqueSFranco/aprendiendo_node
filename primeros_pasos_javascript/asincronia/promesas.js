/*
  PROMESAS
*/

const myFirstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('exito')
  }, 2000)
})

myFirstPromise.then(successMessage => {
  console.log('¡Hurra! ' + successMessage)
})

function getPokemon () {
  const url = new URL('https://pokeapi.co/api/v2/pokemon/dito')
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('')
      }
      return response.json()
    })
    .catch(error => {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    })
}

getPokemon()
  .then(pokemon => console.log(pokemon))
  .catch(() => console.log('error al obtener el pokemon'))
