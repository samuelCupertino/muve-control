import * as React from 'react'

import {
  MouseClick,
  MouseJoystick,
  MouseMapping,
  MouseTouchpad,
  MouseTracking,
} from '~components/organisms'

interface IMouseControl {
  module: {
    active: React.ElementType
    recent: React.ElementType[]
  }
}

interface IMouseControlContext {
  mouseControl: IMouseControl
  activeModule: (module: React.ElementType) => void
  rotateRecentModules: () => void
}

export const MouseControlContext =
  React.createContext<IMouseControlContext | null>(null)

export const MouseControlProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [mouseControl, setMouseControl] = React.useState<IMouseControl>({
    module: {
      active: MouseClick,
      recent: [MouseTouchpad, MouseJoystick, MouseMapping, MouseTracking],
    },
  })

  const activeModule = (module: React.ElementType) => {
    const filteredRecent = mouseControl.module.recent.filter(
      (recent) => recent !== module,
    )
    const recent = [mouseControl.module.active, ...filteredRecent]

    setMouseControl((prev) => ({
      ...prev,
      module: { active: module, recent },
    }))
  }

  const rotateRecentModules = () => {
    const lastModules = mouseControl.module.recent.at(-1)
    const restModules = mouseControl.module.recent.slice(0, -1)
    const recent = [lastModules, ...restModules]

    setMouseControl((prev) => ({
      ...prev,
      module: { ...prev.module, recent },
    }))
  }

  return (
    <MouseControlContext.Provider
      value={{
        mouseControl,
        activeModule,
        rotateRecentModules,
      }}>
      {children}
    </MouseControlContext.Provider>
  )
}
