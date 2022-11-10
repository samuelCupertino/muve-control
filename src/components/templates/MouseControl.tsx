import { useContext } from 'react'

import { MuveGrid } from '~components/layouts'
import { MouseMenu } from '~components/organisms'
import { MouseControlContext } from '~context/mouseControlContext'

export const MouseControl: React.FC = () => {
  const { modules, activeModuleById } = useContext(MouseControlContext)

  return (
    <MuveGrid
      Menu={MouseMenu}
      modules={modules}
      activeModuleById={activeModuleById}
    />
  )
}
