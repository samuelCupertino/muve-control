import * as React from 'react'
import { useState } from 'react'

import {
  SettingsColors,
  SettingsMove,
  SettingsSize,
  SettingsStore,
  SettingsTracking,
} from '~components/organisms'

import type { IModuleItem } from './types'

interface ISettingsControlContext {
  modules: IModuleItem[]
  activatedModuleId: number
  activeModuleById: (id: number) => void
  rotateRecentModules: () => void
}

export const SettingsControlContext =
  React.createContext<ISettingsControlContext | null>(null)

export const SettingsControlProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [modules, setModules] = useState<IModuleItem[]>([
    { id: 1, component: SettingsColors },
    { id: 2, component: SettingsMove },
    { id: 3, component: SettingsSize },
    { id: 4, component: SettingsStore },
    { id: 5, component: SettingsTracking },
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
    <SettingsControlContext.Provider
      value={{
        modules,
        activatedModuleId,
        activeModuleById,
        rotateRecentModules,
      }}>
      {children}
    </SettingsControlContext.Provider>
  )
}
