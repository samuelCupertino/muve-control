import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

import { MouseControl } from '~components/templates/MouseControl'

const styleElement = document.createElement('style')

const styleCache = createCache({
  key: 'plasmo-mui-cache',
  prepend: true,
  container: styleElement,
})

export const getStyle = () => styleElement

const Content: React.FC = () => (
  <CacheProvider value={styleCache}>
    <MouseControl />
  </CacheProvider>
)

export default Content
