import * as React from 'react'
import { useState } from 'react'

import {
  MouseClick,
  MouseJoystick,
  MouseMapping,
  MouseTouchpad,
  MouseTracking,
} from '~components/organisms'

export interface IModuleItem {
  id: number
  component: React.ElementType
}

interface IMouseControlContext {
  modules: IModuleItem[]
  activatedModuleId: number
  activeModuleById: (id: number) => void
  rotateRecentModules: () => void
}

export const MouseControlContext =
  React.createContext<IMouseControlContext | null>(null)

export const MouseControlProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [modules, setModules] = useState<IModuleItem[]>([
    { id: 1, component: MouseTracking },
    { id: 2, component: MouseTouchpad },
    { id: 3, component: MouseJoystick },
    { id: 4, component: MouseClick },
    { id: 5, component: MouseMapping },
  ])
  const activatedModuleId = modules[0].id

  const activeModuleById = (id: number) => {
    const activatedModule = modules.find((module) => module.id === id)
    const recentModules = modules.filter((module) => module.id !== id)

    setModules([activatedModule, ...recentModules])
  }

  const rotateRecentModules = () => {
    const [active, ...recent] = modules
    const firstRecent = recent[3]
    const restRecent = recent.filter((_, index) => index !== 3)

    setModules([active, firstRecent, ...restRecent])
  }

  return (
    <MouseControlContext.Provider
      value={{
        modules,
        activatedModuleId,
        activeModuleById,
        rotateRecentModules,
      }}>
      {children}
    </MouseControlContext.Provider>
  )
}
