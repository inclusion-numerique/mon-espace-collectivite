const NodeEnv = process.env.NODE_ENV

export const PrivateConfig = {
  NodeEnv,
  Auth: {
    Email: {
      server: process.env.EMAIL_SERVER ?? '',
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
    },
  },
  Grist: {
    apiKey: process.env.GRIST_API_KEY ?? '',
    documentId: process.env.GRIST_DOCUMENT_ID ?? '',
    tableId: process.env.GRIST_TABLE_ID ?? '',
  },
  S3: {
    host: process.env.SCALEWAY_S3_HOST ?? '',
    bucketId: `${process.env.SCALEWAY_BUCKET_ID}`,
    bucketLocation: process.env.SCALEWAY_S3_BUCKET_LOCATION ?? '',
    accessKey: process.env.SCALEWAY_ACCESS_KEY ?? '',
    secretKey: process.env.SCALEWAY_SECRET_KEY ?? '',
  },
}

export const PublicConfig = {
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
}
