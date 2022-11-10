import { Box, Button, Divider, Stack } from '@mui/material'
import { useContext, useEffect, useState } from 'react'

import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/layouts'
import { TimeCursor } from '~components/molecules'
import { TrackingCursorContext } from '~context'

export const MouseTracking: React.FC<IModuleProps> = (props) => {
  const [time, setTime] = useState(5)
  const [storeCoord, setStoreCoord] = useState([{ x: 100, y: 100 }])
  const coord = storeCoord[0]
  const { position, isUnderControl } = useContext(TrackingCursorContext)
  const [countDown, setCountDown] = useState(time)

  const muveShadowEl = document.getElementById('muve-shadow')
  const timeCursorEl = muveShadowEl.shadowRoot.getElementById('muviTimeCursor')

  useEffect(() => {
    if (isUnderControl || !position.x) return

    const restPositions = storeCoord.slice(0, 2)
    setStoreCoord([position, ...restPositions])

    const averageX = storeCoord.reduce((acc, { x }) => acc + x, 0) / 3
    const averageY = storeCoord.reduce((acc, { y }) => acc + y, 0) / 3
    const diffX = Math.abs(averageX - storeCoord[0].x)
    const diffY = Math.abs(averageY - storeCoord[0].y)
    const isWaiting = diffX < 10 && diffY < 10

    if (!isWaiting) return setCountDown(time)

    setTimeout(() => setCountDown(countDown === 0 ? time : countDown - 1), 1000)

    if (countDown > 0) return
    const { x, y } = timeCursorEl.getBoundingClientRect()

    muveShadowEl.style.display = 'none'
    const hoveredEl = document.elementFromPoint(x, y) as HTMLElement
    muveShadowEl.style.display = 'block'

    hoveredEl.click()
  }, [position, setCountDown])

  return (
    <Module
      Icon={<Icon src={require(`~assets/icons/tracking.svg`)} size={38} />}
      Content={
        <Stack height="100%" width="100%">
          <Box flex={1}>
            <TimeCursor
              coord={{ x: '50%', y: '32%' }}
              time={time}
              sx={{
                position: 'absolute',
                opacity: isUnderControl ? 1 : 0.3,
                transform: 'translate(-50%, -50%)',
                transition: '1s',
              }}
            />
          </Box>
          <Stack
            direction="row"
            borderTop="1px solid"
            borderColor="primary.200"
            divider={<Divider orientation="vertical" />}>
            <Button
              tracking-event="true"
              onClick={() => setTime(Math.min(time + 1, 60))}>
              <Icon
                src={require(`~assets/icons/plus.svg`)}
                size={26}
                py={1}
                px={2}
              />
            </Button>
            <Button
              tracking-event="true"
              onClick={() => setTime(Math.max(time - 1, 3))}>
              <Icon
                src={require(`~assets/icons/less.svg`)}
                size={26}
                py={1}
                px={2}
              />
            </Button>
          </Stack>
        </Stack>
      }
      insertHTML={{
        Component: <TimeCursor id="muviTimeCursor" coord={coord} time={time} />,
        imperativeProps: {
          '#muviTimeCursor': {
            style: {
              top: `${coord.y}px`,
              left: `${coord.x}px`,
              opacity: isUnderControl ? 0 : 1,
            },
          },
          '#muviTimeCursor > p': {
            textContent: countDown,
          },
        },
      }}
      {...props}
    />
  )
}
