import { useEffect, useState } from 'react'
import React from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/core'
import { CoordinateMap } from '~components/molecules'
import { speak } from '~utils/speak'

interface ICoordinate {
  x: number
  y: number
}

export const MouseMapping: React.FC<IModuleProps> = ({
  moduleId,
  activatedModuleId,
  ...props
}) => {
  const [coords, setCoords] = useState<ICoordinate>({ x: 10, y: 10 })
  const [activeCoord, setActiveCoord] = useState<ICoordinate>({ x: 0, y: 0 })
  const [IsTransitionCompleted, setIsTransitionCompleted] = useState(true)

  const { finalTranscript } = useSpeechRecognition({
    commands: [
      {
        command: ['x * y *', '* x * y', '* x y *', 'x * * y'],
        callback: (x, y) => {
          if (!(x >= 0) || !(y >= 0)) return
          setActiveCoord({ x: +x, y: +y })
        },
      },
      {
        command: 'coordenadas em * = *',
        callback: (xOrY: string, length: number) => {
          const coordName = xOrY.toLocaleLowerCase()

          console.log('* coordenadas em *', { length, xOrY })

          if (!['x', 'y'].includes(coordName) || !(length >= 0)) return

          setCoords({ ...coords, [coordName]: +length })
          speak(`ok, ${xOrY} redimensionado para ${length} coordenadas.`)
        },
      },
      {
        command: '* coordenadas em *',
        callback: (length: number, xOrY: string) => {
          const coordName = xOrY.toLocaleLowerCase()

          if (!['x', 'y'].includes(coordName) || !(length >= 0)) return

          setCoords({ ...coords, [coordName]: +length })
          speak(`redimensionando coordenadas em ${xOrY}.`)
        },
      },
      {
        command: 'clicar',
        callback: () => {
          const { x, y } = activeCoord
          if (!(x >= 0) || !(y >= 0)) return

          clickByCoordinate(x, y)
          speak(`ok, clicando.`)
        },
      },
      {
        command: ['clicar em *x *y', 'clicar em * x * y'],
        callback: (coordX, coordY) => {
          const [x, y] = [+coordX, +coordY]
          if (!(x >= 0) || !(y >= 0)) return

          setActiveCoord({ x, y })
          setTimeout(() => clickByCoordinate(x, y), 1000)
          speak(`ok, clicando.`)
        },
      },
      {
        command: ['descer (*%)', 'subir (*%)'],
        callback: (speech = '25', { command }) => {
          const patternPercent = /[^\d]*(\d+)(?:\.|,)?(\d*).*/
          const percent = speech.replace(patternPercent, '$1.$2')
          const decimal = isNaN(percent) ? 0.25 : percent / 100

          console.log({ command, speech, patternPercent, percent, decimal })
          if (!(decimal >= 0)) return

          const scrollHeight = window.pageYOffset
          const isUp = command.includes('subir')
          const scrollSize = isUp
            ? scrollHeight - window.innerHeight * decimal
            : scrollHeight + window.innerHeight * decimal

          window.scrollTo({ top: scrollSize, behavior: 'smooth' })

          const size = isNaN(percent) ? 25 : percent

          speak(`ok, ${isUp ? 'subindo' : 'descendo'} ${size}%`)
        },
      },
    ],
  })

  const handleActivatedModule = () => {
    SpeechRecognition.startListening({ continuous: true })
  }

  const handleDisabledModule = () => {
    SpeechRecognition.stopListening()
  }

  useEffect(() => {
    if (moduleId !== activatedModuleId) return
    handleActivatedModule()
    return handleDisabledModule
  }, [activatedModuleId])

  useEffect(() => {
    setIsTransitionCompleted(true)
    setTimeout(() => setIsTransitionCompleted(false), 0)
  }, [finalTranscript])

  return (
    <Module
      Icon={<Icon src={require(`~assets/icons/mouse/mapping.svg`)} size={22} />}
      insertHTML={{
        isReactive: IsTransitionCompleted,
        Component: <CoordinateMap coords={coords} activeCoord={activeCoord} />,
      }}
      moduleId={moduleId}
      activatedModuleId={activatedModuleId}
      {...props}
    />
  )
}

const clickByCoordinate = (coordX: number, coordY: number) => {
  const muveShadowEl = document.getElementById('muve-shadow')

  const x = muveShadowEl.shadowRoot.getElementById(
    `muveCoordinateX${coordX}`,
  ).clientWidth
  const y = muveShadowEl.shadowRoot.getElementById(
    `muveCoordinateY${coordY}`,
  ).clientHeight

  muveShadowEl.style.display = 'none'
  const hoveredEl = document.elementFromPoint(x, y) as HTMLElement
  muveShadowEl.style.display = 'block'

  hoveredEl.click()
}
