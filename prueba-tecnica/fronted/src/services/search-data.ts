import { customFetch } from "../helpers/custom-fetch"
import { ApiResponseUploadFile, Data } from "../shared/types.d"
import { HOST_URL, USERS_URL } from "../shared/constants.d"

export async function searchData (query: string): Promise<[Error?, Data?]> {
  try {
    const url = new URL(`${HOST_URL}/${USERS_URL}`)
    url.searchParams.set('q', query)
    const res = await customFetch(url)

    if (!res.ok) {
      const error = {
        err: 'Opps, ha ocurrido un error durante la petición',
        status: res.status || '00',
        stusText: res.statusText || 'Opps, ha ocurrido un error durante la búsqueda'
      }
      throw [error, undefined]
    }
    const json = await res.json() as ApiResponseUploadFile
    return [undefined, json.data]
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message)
    }
    throw new Error("Error Unknown");

  }
}