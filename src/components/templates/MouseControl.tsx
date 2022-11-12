import { useContext } from 'react'

import { MuveGrid } from '~components/core'
import { MouseMenu } from '~components/organisms'
import { MouseControlContext } from '~context/mouseControlContext'

export const MouseControl: React.FC = () => {
  const { modules, activatedModuleId, activeModuleById } =
    useContext(MouseControlContext)

  return (
    <MuveGrid
      Menu={MouseMenu}
      modules={modules}
      activatedModuleId={activatedModuleId}
      activeModuleById={activeModuleById}
    />
  )
}
