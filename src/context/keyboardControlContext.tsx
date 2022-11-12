import * as React from 'react'
import { useState } from 'react'

import {
  KeyboardAlphabetic,
  KeyboardEmoji,
  KeyboardFunctional,
  KeyboardMicrophone,
  KeyboardNumber,
} from '~components/organisms'

import type { IModuleItem } from './types'

interface IKeyboardControlContext {
  modules: IModuleItem[]
  activatedModuleId: number
  activeModuleById: (id: number) => void
  rotateRecentModules: () => void
}

export const KeyboardControlContext =
  React.createContext<IKeyboardControlContext | null>(null)

export const KeyboardControlProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [modules, setModules] = useState<IModuleItem[]>([
    { id: 1, component: KeyboardMicrophone },
    { id: 2, component: KeyboardAlphabetic },
    { id: 3, component: KeyboardEmoji },
    { id: 4, component: KeyboardFunctional },
    { id: 5, component: KeyboardNumber },
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
    <KeyboardControlContext.Provider
      value={{
        modules,
        activatedModuleId,
        activeModuleById,
        rotateRecentModules,
      }}>
      {children}
    </KeyboardControlContext.Provider>
  )
}
