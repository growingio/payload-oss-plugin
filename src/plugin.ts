// @ts-expect-error
import AliOSS from 'ali-oss'
import type { Plugin } from 'payload/config'
import type { CollectionConfig } from 'payload/types'
import type { AliOSSPluginOptions } from './types'
import { getFilesToUpload } from './hooks/beforeChange'

type PluginType = (pluginOptions: AliOSSPluginOptions) => Plugin

const OssPlugin: PluginType =
  (pluginOptions: AliOSSPluginOptions): Plugin =>
  incomingConfig => {
    const config = { ...incomingConfig }

    if (pluginOptions.enabled === false) {
      return config
    }

    const client = new AliOSS({
      region: pluginOptions.region,
      accessKeyId: pluginOptions.accessKeyId,
      accessKeySecret: pluginOptions.accessKeySecret,
      bucket: pluginOptions.bucketName,
    })

    const uploadCollections = config?.collections?.filter(
      collection => (collection as CollectionConfig)?.upload,
    )

    uploadCollections?.forEach(uploadCollection => {
      const collection = uploadCollection
      if (!collection.hooks) collection.hooks = {}
      if (!collection.hooks.beforeChange) collection.hooks.beforeChange = []

      collection.hooks.beforeChange.push(async function upload(beforeChangeOptions) {
        const files = getFilesToUpload({ ...beforeChangeOptions })
        for (const file of files) {
          try {
            await client.put(`${pluginOptions.bucketPath}/${file.filename}`, file.buffer)
          } catch (error: unknown) {
            throw new Error('client push to oss failed.')
          }
        }
        return beforeChangeOptions.data
      })
    })

    return config
  }

export default OssPlugin
