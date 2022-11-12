import { useContext } from 'react'

import { MuveGrid } from '~components/core'
import { SettingsMenu } from '~components/organisms'
import { SettingsControlContext } from '~context/settingsControlContext'

export const SettingsControl: React.FC = () => {
  const { modules, activatedModuleId, activeModuleById } = useContext(
    SettingsControlContext,
  )

  return (
    <MuveGrid
      Menu={SettingsMenu}
      modules={modules}
      activatedModuleId={activatedModuleId}
      activeModuleById={activeModuleById}
    />
  )
}
