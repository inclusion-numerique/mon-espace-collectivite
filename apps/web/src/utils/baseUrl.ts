import { isBrowser } from '@mec/web/utils/isBrowser'

export const getBaseUrl = () => {
  if (isBrowser) {
    // browser should use relative path
    return ''
  }
  if (process.env.BASE_URL) {
    return `https://${process.env.BASE_URL}`
  }
  if (process.env.APP) {
    // for Scalingo

    // If the app is the prod app (not a preview app for a PR or other branch)
    // The base URL is the production url, else it is the preview deployment url
    if (process.env.APP === process.env.PRODUCTION_APP) {
      return `https://${process.env.PRODUCTION_URL}`
    }

    return `https://${process.env.APP}.osc-fr1.scalingo.io`
  }
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const getUrl = (path: string) => {
  return `${getBaseUrl()}${path}`
}
