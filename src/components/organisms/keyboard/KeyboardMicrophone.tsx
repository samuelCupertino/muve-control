import { Box } from '@mui/system'
import { useCallback, useContext, useEffect, useState } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/core'
import { TrackingCursorContext } from '~context'

export const KeyboardMicrophone: React.FC<IModuleProps> = ({
  moduleId,
  activatedModuleId,
  ...props
}) => {
  const { clickedEl } = useContext(TrackingCursorContext)
  const [clickedElPrevStyle, setClickedElPrevStyle] = useState({})

  const handleActivatedModule = useCallback(() => {
    if (!clickedEl) return

    setClickedElPrevStyle({
      border: clickedEl.style.border,
      borderRadius: clickedEl.style.borderRadius,
    })

    Object.assign(clickedEl.style, {
      border: '2px solid red',
      borderRadius: '5px',
    })
  }, [clickedEl, setClickedElPrevStyle])

  const handleDisabledModule = useCallback(() => {
    if (!clickedEl) return

    Object.assign(clickedEl.style, clickedElPrevStyle)
  }, [clickedEl, clickedElPrevStyle])

  useEffect(() => {
    if (moduleId !== activatedModuleId) return
    handleActivatedModule()
    return handleDisabledModule
  }, [activatedModuleId])

  const { transcript, listening } = useSpeechRecognition()

  const handleToggleSpeech = () => {
    if (!clickedEl) return

    if (listening) return SpeechRecognition.stopListening()

    SpeechRecognition.startListening({ continuous: true })
  }

  useEffect(() => {
    console.log(transcript)
    if (!clickedEl) return

    Object.assign(clickedEl, { value: transcript })
  }, [transcript])

  return (
    <Module
      Icon={<Icon src={require(`~assets/icons/keyboard/microphone.svg`)} />}
      Content={
        <Icon
          src={require(`~assets/icons/keyboard/microphone.svg`)}
          size={66}
          tracking-event="true"
          onClick={handleToggleSpeech}
          sx={{ opacity: listening ? 1 : 0.3 }}
        />
      }
      moduleId={moduleId}
      activatedModuleId={activatedModuleId}
      {...props}
    />
  )
}
