import { useState } from 'react'
import { Toaster, toast } from 'sonner'

import Search from './components/ui/search/search'
import { uploadFile } from './services/upload-file'
import { Data, StatusAppType } from './shared/types'
import { APP_STATUS, BUTTON_TEXT, SHOW_BUTTON, SHOW_FORM, SHOW_SARCH } from './shared/constants'
import './App.css'

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

  return (
    <>
      <Toaster richColors />
      {SHOW_FORM && (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className='form'>
          <input onChange={handleInputChange} name='file' type='file' accept='.csv' disabled={appStatus === APP_STATUS.UPLOADING} />
          {SHOW_BUTTON && <button disabled={appStatus === APP_STATUS.UPLOADING}>{BUTTON_TEXT[appStatus]}</button>}
        </form>
      )}
      {SHOW_SARCH && (<Search initialData={data} />)}
    </>
  )
}

export default App
