import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Data } from "../../../shared/types.d"
import { searchData } from "../../../services/search-data"
import Card from "../card/card"

type Props = {
  initialData: Data | undefined
}

export default function Search ({ initialData = [] }: Props) {
  const [data, setData] = useState<Data | undefined>(initialData)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const newPath = search === '' ? window.location.pathname : `?q=${search}`

    window.history.replaceState({}, '', newPath)
  }, [search])

  function handleChangeInput (e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (!search) {
      setData(initialData)
      return
    }

    // peticion a api/users
    searchData(search)
      .then(res => {
        const [error, data] = res
        if (error) {
          toast.error(error.message)
        }
        if (data) setData(data)
      })
  }, [search, initialData])

  function handleSearch (e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <div>
      <h1>Buscar información</h1>
      <form onSubmit={handleSearch} className='form'>
        <input defaultValue={search} onChange={handleChangeInput} type='search' placeholder='Buscar' />
        <button>buscar</button>
      </form>
      <section>
        <ul className="list">
          {data && data.map(it => (
            <li key={`item-${crypto.randomUUID()}`}>
              <Card item={it} />
            </li>
          ))
          }
        </ul>
      </section>
    </div>
  )
}