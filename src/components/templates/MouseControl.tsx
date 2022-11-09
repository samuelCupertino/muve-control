import { useContext } from 'react'

import { MuveGrid } from '~components/layouts'
import { MouseMenu } from '~components/organisms'
import { MouseControlContext } from '~context/mouseControlContext'

export const MouseControl: React.FC = () => {
  const { mouseControl } = useContext(MouseControlContext)

  return (
    <MuveGrid
      Menu={MouseMenu}
      ActiveModule={mouseControl.module.active}
      RecentModules={mouseControl.module.recent}
    />
  )
}
