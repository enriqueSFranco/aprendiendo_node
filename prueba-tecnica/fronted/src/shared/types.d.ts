type Data = Array<Record<string, string>>

type ApiResponseUploadFile = {
  message: string
  data: Data
}

export { ApiResponseUploadFile, Data }