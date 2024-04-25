import { useEffect, useState } from "react"
import { Data } from "../../../shared/types.d"

type Props = {
  initialData: Data
}

export default function Search ({ initialData }: Props) {
  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const newPath = search === '' ? window.location.pathname : `?q=${search}`

    window.history.replaceState({}, '', newPath)
  }, [search])

  function handleChangeInput (e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  function handleSearch (e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    // peticion a api/users
  }

  return (
    <div>
      <h1>Buscar información</h1>
      <form onSubmit={handleSearch} className='form'>
        <input defaultValue={search} onChange={handleChangeInput} type='search' placeholder='Buscar' />
        <button>buscar</button>
      </form>
    </div>
  )
}