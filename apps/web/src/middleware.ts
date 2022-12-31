import { NextMiddleware, NextResponse } from 'next/server'

const middleware: NextMiddleware = (request) => {
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('X-Forwarded-Proto') === 'http'
  ) {
    console.log('REDIRECTING FROM UNSAFE', {
      requestUrl: request.url,
      base: `https://${request.headers.get('host')}`,
    })
    return NextResponse.redirect(
      new URL(request.url, `https://${request.headers.get('host')}`),
    )
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
