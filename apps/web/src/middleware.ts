import { NextMiddleware, NextResponse } from 'next/server'

const middleware: NextMiddleware = (request) => {
  const forwardedProto = request.headers.get('X-Forwarded-Proto')
  const nodeEnv = process.env.NODE_ENV

  if (nodeEnv === 'production' && forwardedProto === 'http') {
    const httpsBase = `https://${request.headers.get('host')}`
    const requestUrl = new URL(request.url)
    const path = `${requestUrl.pathname}${requestUrl.search}`
    const redirectTo = `${httpsBase}${path}`

    console.log('REDIRECTING FROM UNSAFE HTTP', {
      httpsBase,
      path,
      redirectTo,
    })
    return NextResponse.redirect(redirectTo)
  }

  const response = NextResponse.next()
  response.headers.append('X-Frame-Options', 'DENY')
  response.headers.append('X-Content-Type-Options', 'nosniff')
  response.headers.append('X-XSS-Protection', '1; mode=block')
  response.headers.delete('X-Powered-By')

  // TODO Redirect to HTTPS
  // On clevercloud http or https is in the X-Forwarded-Proto header

  // TODO This CSP policy is too restrictive an account has been created in report-uri.com. Make this in another deployment.
  // https://report-uri.com
  // response.headers.append(
  //   'Content-Security-Policy',
  //   "default-src 'self'; script-src 'self'; script-src-elem 'self'; script-src-attr 'self'; style-src 'self'; style-src-elem 'self'; style-src-attr 'self'; img-src *; font-src 'self'; connect-src 'self'; media-src *; object-src 'self'; prefetch-src 'self'; child-src 'self'; frame-src 'self'; worker-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; manifest-src 'self'",
  // )
  return response
}

export default middleware
