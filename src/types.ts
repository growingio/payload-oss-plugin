export interface AliOSSPluginOptions {
  /**
   * Enable or disable plugin
   * @default false
   */
  enabled?: boolean

  /**
   * 区域，eg: oss-cn-hangzhou
   */
  region: string

  /**
   *
   */
  accessKeyId: string

  /**
   *
   */
  accessKeySecret: string

  /**
   * bucket 名称
   */
  bucketName: string

  /**
   * 文件路径
   */
  bucketPath?: string
}
