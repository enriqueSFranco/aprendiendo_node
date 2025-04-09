import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useDebounce } from "@uidotdev/usehooks"

import { Data } from "../../../shared/types"
import { searchData } from "../../../services/search-data"
import Card from "../card/card"

type Props = {
  initialData: Data | undefined
}

const DELAY = 300

export default function Search ({ initialData = [] }: Props) {
  const [data, setData] = useState<Data | undefined>(initialData)
  const [search, setSearch] = useState(new URLSearchParams(window.location.search).get('q') || '')

  const debouncedSearchTerm = useDebounce(search, DELAY)

  useEffect(() => {
    const newPath = debouncedSearchTerm === '' ? window.location.pathname : `?q=${debouncedSearchTerm}`

    window.history.replaceState({}, '', newPath)
  }, [debouncedSearchTerm])

  function handleChangeInput (e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setData(initialData)
      return
    }

    // peticion a api/users
    searchData(debouncedSearchTerm)
      .then(res => {
        const [error, data] = res
        if (error) {
          toast.error(error.message)
        }
        if (data) setData(data)
      })
  }, [debouncedSearchTerm, initialData])

  function handleSearch (e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <div>
      <h1>Buscar información</h1>
      <form onSubmit={handleSearch} className='form'>
        <input defaultValue={debouncedSearchTerm} onChange={handleChangeInput} type='search' placeholder='Buscar' />
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