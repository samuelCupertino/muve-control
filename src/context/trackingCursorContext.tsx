import React, { useCallback, useState } from 'react'

interface IPosition {
  x: number
  y: number
}

interface ITrackingCursorContext {
  position: IPosition
  hoveredElements: HTMLElement[]
  trackingClock: number
  isUnderControl: boolean
  clickedEl: HTMLElement
  setPosition: React.Dispatch<React.SetStateAction<IPosition>>
  handleTrackingEvent: (element: HTMLElement) => void
  setTrackingTime: React.Dispatch<React.SetStateAction<number>>
  clickByCoord: (x: number, y: number) => HTMLElement
}

export const TrackingCursorContext =
  React.createContext<ITrackingCursorContext | null>(null)

export const TrackingCursorProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [position, setPosition] = useState<IPosition>({ x: 0, y: 0 })
  const [hoveredElements, setHoveredElements] = useState<HTMLElement[]>([null])
  const [trackingTime, setTrackingTime] = useState(3)
  const [trackingClock, setTrackingClock] = useState(trackingTime)
  const [isUnderControl, setIsUnderControl] = useState(false)
  const [clickedEl, setClickedEl] = useState<HTMLElement>(null)

  const handleTrackingEvent = useCallback(
    (element?: HTMLElement) => {
      const restElements = hoveredElements.slice(0, trackingTime)
      const newHoveredElements = [element, ...restElements]
      setHoveredElements(newHoveredElements)

      const newIsUnderControl = newHoveredElements.some((el) => el)
      setIsUnderControl(newIsUnderControl)

      const [firstElement, secondElement] = newHoveredElements

      const isMouseover = firstElement !== secondElement
      if (isMouseover) {
        setTrackingClock(trackingTime)

        const otherElements = newHoveredElements.filter(
          (el) => el !== firstElement,
        )
        otherElements.forEach((el) => {
          el?.dispatchEvent(new Event('mouseout', { bubbles: true }))
        })

        firstElement?.dispatchEvent(new Event('mouseover', { bubbles: true }))
        return
      }

      if (!firstElement) return

      setTrackingClock(trackingClock - 1)
      const isClick = hoveredElements.every((el) => el === firstElement)
      if (isClick) {
        setTrackingClock(trackingTime)
        firstElement.dispatchEvent(new Event('click', { bubbles: true }))

        const [_, ...resetElements] = hoveredElements.map(() => null)
        return setHoveredElements([firstElement, ...resetElements])
      }
    },
    [
      hoveredElements,
      trackingTime,
      trackingClock,
      setHoveredElements,
      setTrackingTime,
      setTrackingClock,
    ],
  )

  const clickByCoord = useCallback(
    (x: number, y: number) => {
      const muveShadowEl = document.getElementById('muve-shadow')

      muveShadowEl.style.display = 'none'
      const hoveredEl = document.elementFromPoint(x, y) as HTMLElement
      muveShadowEl.style.display = 'block'

      hoveredEl.click()
      setClickedEl(hoveredEl)

      return hoveredEl
    },
    [setClickedEl],
  )

  return (
    <TrackingCursorContext.Provider
      value={{
        position,
        hoveredElements,
        trackingClock,
        isUnderControl,
        clickedEl,
        setPosition,
        handleTrackingEvent,
        setTrackingTime,
        clickByCoord,
      }}>
      {children}
    </TrackingCursorContext.Provider>
  )
}
