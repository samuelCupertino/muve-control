import { useContext } from 'react'

import { MuveGrid } from '~components/layouts'
import { KeyboardMenu } from '~components/organisms'
import { KeyboardControlContext } from '~context/keyboardControlContext'

export const KeyboardControl: React.FC = () => {
  const { modules, activatedModuleId, activeModuleById } = useContext(
    KeyboardControlContext,
  )

  return (
    <MuveGrid
      Menu={KeyboardMenu}
      modules={modules}
      activatedModuleId={activatedModuleId}
      activeModuleById={activeModuleById}
    />
  )
}
