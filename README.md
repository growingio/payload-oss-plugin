# Upload files to AliYun OSS in Payload CMS

This plugin sends uploaded files to AliYun OSS instead of writing them to the server file system.

## Why should I use this module?

Payload team supports an official cloud storage plugin, different from this one.

The main difference is that this plugin allows configuring collection logic on the collection itself.

Payload implementation requires to define collection-specific stuff from plugins inside the global payload configuration
file, which is (imho) bad design.

## How to use in my project?

### Install

`npm install --save @gio/payload-oss-plugin --legacy-peer-deps`

Payload requires `legacy-peer-deps` because of conflicts on React and GraphQL dependencies (see
Payload [docs](https://payloadcms.com/docs/getting-started/installation)).

### Configure your payload config with oss plugin

```js
import OssPlugin from '@gio/payload-oss-plugin'

export default buildConfig({
  // ...
  plugins: [
    OssPlugin({
      enabled: true,
      region: process.env.PAYLOAD_PUBLIC_OSS_REGION,
      accessKeyId: process.env.PAYLOAD_PUBLIC_OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.PAYLOAD_PUBLIC_OSS_ACCESS_KEY_SECRET,
      bucketName: process.env.PAYLOAD_PUBLIC_OSS_BUCKET_NAME,
      bucketPath: process.env.PAYLOAD_PUBLIC_OSS_BUCKET_PATH,
    }),
  ],
});
```

### Configure your upload collections

```js

const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/assets',
    staticDir: 'assets',
    disableLocalStorage: true,
    adminThumbnail: ({doc}) =>
      `${process.env.PAYLOAD_PUBLIC_OSS_ENDPOINT}${process.env.PAYLOAD_PUBLIC_OSS_BUCKET_PATH}/${doc.filename}`,
  },
  fields: [
    {
      type: 'text',
      name: 'title'
    }
  ],
}

export default Media;
```

## At last

Thanks and that`s all.
