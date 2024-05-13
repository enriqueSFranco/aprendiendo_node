type Data = Array<Record<string, string>>

type ApiResponseUploadFile = {
  message: string
  data: Data
}

type ApiResponseSearch = {
  data: Data
}

type StatusAppType = typeof APP_STATUS[keyof typeof APP_STATUS]

export { ApiResponseUploadFile, ApiResponseSearch, Data, StatusAppType }