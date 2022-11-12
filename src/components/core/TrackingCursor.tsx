import { Box, Typography } from '@mui/material'
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
  const { shadowRoot } = document.getElementById('muve-shadow')

  useEffect(() => {
    setScreenSize({ x: window.innerWidth, y: window.innerHeight })
  }, [])

  useEffect(() => {
    const detect = async () => {
      if (!webcamRef.current?.video) return

      const [result] = await poseNet.singlePose(webcamRef.current.video)
      const x = screenSize.x - result.pose.nose.x
      const y = result.pose.nose.y

      setPosition({
        x: x < 0 ? 0 : x,
        y: y < 0 ? 0 : y,
      })

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
    <Box ref={containerRef} id="muveTrackingCursor">
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
        left={position.x > 0 ? `${position.x}px` : '-100%'}
        top={position.x > 0 ? `${position.y}px` : '-100%'}
        zIndex={1}
        sx={{ transform: 'translate(-50%, -50%)', transition: '0.5s' }}>
        <Typography color="white" fontSize={16} fontWeight="bold">
          {trackingClock}
        </Typography>
      </Box>
    </Box>
  )
}
