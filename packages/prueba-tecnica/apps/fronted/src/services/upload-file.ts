import { HOST_URL, UPLOAD_FILES_URL } from "../shared/constants"
import { ApiResponseUploadFile, Data } from "../shared/types"
import { customFetch } from "../helpers/custom-fetch"

export async function uploadFile (file: File): Promise<[Error?, Data?]> {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const endpoint = new URL(`${HOST_URL}/${UPLOAD_FILES_URL}`)
    const res = await customFetch(endpoint, {
      method: 'POST',
      body: formData
    })
    console.log({ res })
    if (!res.ok) {
      const error = {
        err: 'Opps, ha ocurrido un error durante la petición',
        status: res.status || '00',
        stusText: res.statusText || 'Opps, ha ocurrido un error durante la petición'
      }
      throw [error, undefined]
    }
    const json = await res.json() as ApiResponseUploadFile
    return [undefined, json.data]
  } catch (error) {
    if (error instanceof Error) {
      throw error.message
    }
    throw new Error('Error Unknown')
  }
}