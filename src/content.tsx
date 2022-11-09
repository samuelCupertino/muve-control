import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import type { PlasmoGetShadowHostId } from 'plasmo'

import { useStorage } from '@plasmohq/storage/hook'

import { TrackingCursor } from '~components/layouts'
import { MouseControl } from '~components/templates'
import { MouseControlProvider, TrackingCursorProvider } from '~context'
import { theme } from '~theme'

const styleElement = document.createElement('style')

const styleCache = createCache({
  key: 'plasmo-mui-cache',
  prepend: true,
  container: styleElement,
})

export const getStyle = () => styleElement

export const getShadowHostId: PlasmoGetShadowHostId = () => 'muve-shadow'

const IndexContent: React.FC = () => {
  const [isMuveActive] = useStorage<boolean>('isMuveActive')
  const [isMuveTracking] = useStorage<boolean>('isMuveTracking')

  return (
    <CacheProvider value={styleCache}>
      <ThemeProvider theme={theme}>
        <TrackingCursorProvider>
          <MouseControlProvider>
            {isMuveTracking && <TrackingCursor />}
            {isMuveActive && <MouseControl />}
          </MouseControlProvider>
        </TrackingCursorProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default IndexContent
