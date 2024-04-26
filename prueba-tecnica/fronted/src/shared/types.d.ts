type Data = Array<Record<string, string>>

type ApiResponseUploadFile = {
  message: string
  data: Data
}

type ApiResponseSearch = {
  data: Data
}

export { ApiResponseUploadFile, ApiResponseSearch, Data }