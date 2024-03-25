import type { CollectionBeforeChangeHook } from 'payload/types'
import type { FileData, FileToSave } from 'payload/dist/uploads/types'

export const getFilesToUpload: CollectionBeforeChangeHook = ({
  data,
  req,
}): Array<Partial<FileData & FileToSave>> => {
  const reqFile = req.files?.file ?? req.file ?? null
  if (reqFile == null) return []
  const files: Array<Partial<FileData & FileToSave>> = [
    {
      filename: data.filename,
      mimeType: data.mimeType,
      buffer: reqFile.data,
    },
  ]
  if (data.sizes != null) {
    Object.entries<FileData>(data.sizes).forEach(([key, sizeData]) => {
      const buffer = req.payloadUploadSizes[key]
      const { filename } = sizeData

      if (buffer != null || filename != null) {
        files.push({
          buffer,
          filename,
          mimeType: data.mimeType,
        })
      }
    })
  }
  return files
}

const beforeChange = (): CollectionBeforeChangeHook => {
  return ({ data }) => {
    return data
  }
}

export default beforeChange
