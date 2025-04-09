export const checkTypeFile = (file: Express.Multer.File | undefined) => {
  if (!file) return false

  if (!file.originalname.endsWith('.csv')) {
    console.log('the file type invalid')
    return false
  }

  return true
}