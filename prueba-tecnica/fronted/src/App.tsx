import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import './App.css'
import { uploadFile } from './services/upload-file'
import { Data } from './shared/types.d'
import Search from './components/ui/search/search'
import Card from './components/ui/card/card'

const APP_STATUS = {
  IDLE: 'idle',
  ERROR: 'error',
  READY_UPLOAD: 'ready_upload',
  UPLOADING: 'uploading',
  READY_USAGE: 'ready_usage'
}

const BUTTON_TEXT = {
  [APP_STATUS.IDLE]: 'Seleccionar archivo',
  [APP_STATUS.ERROR]: 'Error al cargar el archivo',
  [APP_STATUS.READY_UPLOAD]: 'Subir archivo',
  [APP_STATUS.UPLOADING]: 'Subiendo archivo...',
  [APP_STATUS.READY_USAGE]: 'Archivo subido correctamente'
}

type StatusAppType = typeof APP_STATUS[keyof typeof APP_STATUS]

function App () {
  const [data, setData] = useState<Data | undefined>([])
  const [appStatus, setAppStatus] = useState<StatusAppType>(APP_STATUS.IDLE)
  const [file, setFile] = useState<File | null>(null)

  function handleInputChange (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const [file] = e.target.files ?? []

    if (file) {
      setFile(file)
      setAppStatus(APP_STATUS.READY_UPLOAD)
    }
  }

  async function handleSubmit (e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!file || appStatus !== APP_STATUS.READY_UPLOAD) {
      return
    }
    setAppStatus(APP_STATUS.UPLOADING)
    const [err, data] = await uploadFile(file)

    if (err) {
      setAppStatus(APP_STATUS.ERROR)
      toast.error(err.message)
    }

    setAppStatus(APP_STATUS.READY_USAGE)
    toast.success('Archivo subido correctamente')
    setData(data)
  }
  const showButton = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING
  const showForm = appStatus !== APP_STATUS.READY_USAGE
  const showSearch = appStatus === APP_STATUS.READY_USAGE
  return (
    <>
      <Toaster richColors />
      {showForm && (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className='form'>
          <input onChange={handleInputChange} name='file' type='file' accept='.csv' disabled={appStatus === APP_STATUS.UPLOADING} />
          {showButton && <button disabled={appStatus === APP_STATUS.UPLOADING}>{BUTTON_TEXT[appStatus]}</button>}
        </form>
      )}
      {
        showSearch && (
          <>
            <Search />
            {
              data && (
                <section>
                  <h2>Resultados</h2>

                  <Card />
                </section>
              )
            }
          </>
        )
      }
    </>
  )
}

export default App
