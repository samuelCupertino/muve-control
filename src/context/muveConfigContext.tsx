import * as React from 'react'
import { useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

interface IMuveConfigContext {
  isMuveActive: boolean
  isMuveTracking: boolean
  activatedScreenId: number
  setIsMuveActive: (setter: boolean) => Promise<void>
  setIsMuveTracking: (setter: boolean) => Promise<void>
  activeScreenById: (id: number) => void
}

export const MuveConfigContext = React.createContext<IMuveConfigContext | null>(
  null,
)

export const MuveControlProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [isMuveActive, setIsMuveActive] =
    useStorage<boolean>('muve.isMuveActive')
  const [isMuveTracking, setIsMuveTracking] = useStorage<boolean>(
    'muve.isMuveTracking',
  )
  const [activatedScreenId, setActivatedScreenId] = useStorage<number>(
    'muve.activatedScreenId',
    0,
  )

  const activeScreenById = (id: number) => {
    setActivatedScreenId(id)
  }

  return (
    <MuveConfigContext.Provider
      value={{
        isMuveActive,
        isMuveTracking,
        activatedScreenId,
        setIsMuveActive,
        setIsMuveTracking,
        activeScreenById,
      }}>
      {children}
    </MuveConfigContext.Provider>
  )
}
