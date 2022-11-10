import { useEffect, useState } from 'react'
import React from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/layouts'
import { CoordinateMap } from '~components/molecules'

interface ICoordinate {
  x: number
  y: number
}

SpeechRecognition.startListening({ continuous: true })

export const MouseMapping: React.FC<IModuleProps> = (props) => {
  const [coords, setCoords] = useState<ICoordinate>({ x: 10, y: 10 })
  const [activeCoord, setActiveCoord] = useState<ICoordinate>({ x: 0, y: 0 })
  const [updateInsertedHTML, setUpdateInsertedHTML] = useState(true)

  const { finalTranscript } = useSpeechRecognition({
    commands: [
      {
        command: ['x * y *', '* x * y', '* x y *', 'x * * y'],
        callback: (x, y) => setActiveCoord({ x: +x, y: +y }),
      },
      {
        command: '* coordenadas em *',
        callback: (length: number, xOrY: string) => {
          const coordName = xOrY.toLocaleLowerCase()
          setCoords({ ...coords, [coordName]: +length })
        },
      },
      {
        command: 'clicar',
        callback: () => clickByCoordinate(activeCoord.x, activeCoord.y),
      },
      {
        command: ['clicar em *x *y', 'clicar em * x * y'],
        callback: (x, y) => {
          setActiveCoord({ x: +x, y: +y })
          setTimeout(() => clickByCoordinate(+x, +y), 1000)
        },
      },
    ],
  })

  useEffect(() => {
    setUpdateInsertedHTML(true)
    setTimeout(() => setUpdateInsertedHTML(false), 0)
  }, [finalTranscript])

  return (
    <Module
      Icon={<Icon src={require(`~assets/icons/mapping.svg`)} size={22} />}
      insertHTML={{
        isReactive: updateInsertedHTML,
        Component: (
          <CoordinateMap
            coords={[coords.x, coords.y]}
            activeCoord={[activeCoord.x, activeCoord.y]}
          />
        ),
      }}
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
