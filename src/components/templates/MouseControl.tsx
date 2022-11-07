import { Box } from '@mui/material'
import * as ml5 from 'ml5'
import { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { clearInterval } from 'timers'

export const MouseControl: React.FC = () => {
  const webcamRef = useRef(null)
  const [tracking, setTracking] = useState({ x: 110, y: 0 })

  useEffect(() => {
    let intervalId = null
    const poseNet = ml5.poseNet(() => (intervalId = setInterval(detect, 1000)))

    const detect = async () => {
      const [result] = await poseNet.singlePose(webcamRef.current.video)
      const { x = 0, y = 0 } = result.pose.nose

      setTracking({ x: 800 - x, y })
    }

    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <Webcam ref={webcamRef} width={800} height={800} mirrored={true} />
      <Box
        width={30}
        height={30}
        border="2px solid white"
        bgcolor="blue"
        borderRadius="50%"
        position="absolute"
        left={tracking.x + 'px'}
        top={tracking.y + 'px'}
        style={{ transform: 'translate(-50%, -100%)', transition: '0.25s' }}
      />
    </>
  )
}
