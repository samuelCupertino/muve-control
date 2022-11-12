import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import type { PlasmoGetShadowHostId } from 'plasmo'

import { useStorage } from '@plasmohq/storage/hook'

import { TrackingCursor } from '~components/core'
import {
  KeyboardControl,
  MouseControl,
  SettingsControl,
} from '~components/templates'
import {
  KeyboardControlProvider,
  MouseControlProvider,
  MuveControlProvider,
  SettingsControlProvider,
  TrackingCursorProvider,
} from '~context'
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
  const [isMuveActive] = useStorage<boolean>('muve.isMuveActive')
  const [isMuveTracking] = useStorage<boolean>('muve.isMuveTracking')
  const [activatedScreenId] = useStorage<number>('muve.activatedScreenId', 0)

  if (!isMuveActive) return

  return (
    <CacheProvider value={styleCache}>
      <ThemeProvider theme={theme}>
        <MuveControlProvider>
          <TrackingCursorProvider>
            {isMuveTracking && <TrackingCursor />}

            {activatedScreenId === 0 && (
              <MouseControlProvider>
                <MouseControl />
              </MouseControlProvider>
            )}

            {activatedScreenId === 1 && (
              <KeyboardControlProvider>
                <KeyboardControl />
              </KeyboardControlProvider>
            )}

            {activatedScreenId === 2 && (
              <SettingsControlProvider>
                <SettingsControl />
              </SettingsControlProvider>
            )}
          </TrackingCursorProvider>
        </MuveControlProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default IndexContent
