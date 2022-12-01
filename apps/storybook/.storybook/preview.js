import { useEffect, useState } from '@storybook/addons'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // nextRouter: {
  //   query: {
  //     foo: 'this-is-a-global-override'
  //   }
  // }
}

const loadDsfrJs = () => {
  const existing = document.getElementById('dsfr-js')
  if (existing) {
    return
  }

  const script = document.createElement('script')
  script.id = 'dsfr-js'
  script.src = '/dsfr/dsfr.module.min.js'
  document.body.appendChild(script)
  return () => {
    document.body.removeChild(script)
  }
}

const loadDsfrCss = () => {
  const existing = document.getElementById('dsfr-css')
  if (existing) {
    return
  }

  const link = document.createElement('link')
  link.id = 'dsfr-css'
  link.href = '/dsfr/dsfr.min.css'
  link.rel = 'stylesheet'
  link.type = 'text/css'
  document.body.appendChild(link)

  const utilityLink = document.createElement('link')
  utilityLink.id = 'dsfr-utility-css'
  utilityLink.href = '/dsfr/utility/utility.min.css'
  link.rel = 'stylesheet'
  link.type = 'text/css'

  document.body.appendChild(utilityLink)

  return () => {
    document.body.removeChild(link)
    document.body.removeChild(utilityLink)
  }
}

export const decorators = [
  (Story) => {
    // const [isLoaded, setIsLoaded] = useState(false)
    useEffect(loadDsfrJs, [])
    useEffect(loadDsfrCss, [])

    return <Story />
  },
]
