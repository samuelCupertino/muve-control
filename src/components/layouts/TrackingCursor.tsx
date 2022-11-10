import { Box } from '@mui/material'
import * as ml5 from 'ml5'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'

import { TrackingCursorContext } from '~context'

const poseNet = ml5.poseNet()

export const TrackingCursor: React.FC = () => {
  const webcamRef = useRef(null)
  const containerRef = useRef(null)
  const [screenSize, setScreenSize] = useState({ x: 0, y: 0 })
  const { position, setPosition, trackingClock, handleTrackingEvent } =
    useContext(TrackingCursorContext)

  useEffect(() => {
    setScreenSize({ x: window.innerWidth, y: window.innerHeight })
  }, [])

  useEffect(() => {
    const { shadowRoot } = document.getElementById('muve-shadow')

    const detect = async () => {
      if (!webcamRef.current?.video) return

      const [result] = await poseNet.singlePose(webcamRef.current.video)
      const x = screenSize.x - result.pose.nose.x
      const y = result.pose.nose.y

      setPosition({ x, y })

      containerRef.current.style.display = 'none'
      const hoveredEl = shadowRoot.elementFromPoint(x, y) as HTMLElement
      containerRef.current.style.display = 'block'

      let dynamicEl = hoveredEl
      while (dynamicEl?.parentElement) {
        if (dynamicEl?.getAttribute('tracking-event')) {
          handleTrackingEvent(dynamicEl)
          return (dynamicEl = null)
        }
        dynamicEl = dynamicEl.parentElement
      }
      dynamicEl && handleTrackingEvent(null)
    }

    setTimeout(detect, position.x ? 1000 : 3000)
  }, [position])

  return (
    <Box ref={containerRef}>
      <Webcam
        ref={webcamRef}
        width={screenSize.x}
        height={screenSize.y}
        mirrored={true}
        style={{ position: 'fixed', opacity: 0.25, objectFit: 'cover' }}
      />
      <Box
        width={25}
        height={25}
        display="flex"
        justifyContent="center"
        alignItems="center"
        border="2px solid white"
        bgcolor="red"
        borderRadius="50%"
        position="fixed"
        left={position.x ? `${position.x}px` : 'calc(50% + 13px)'}
        top={position.y ? `${position.y}px` : 'calc(50% + 150px)'}
        zIndex={1}
        sx={{ transform: 'translate(-50%, -100%)', transition: '0.5s' }}>
        {trackingClock}
      </Box>
    </Box>
  )
}
