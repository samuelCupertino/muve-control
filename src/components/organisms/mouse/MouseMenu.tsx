import { useContext } from 'react'

import { FolderCircle } from '~components/molecules'
import { MouseControlContext, MuveConfigContext } from '~context'

export const MouseMenu: React.FC = () => {
  const { rotateRecentModules } = useContext(MouseControlContext)
  const { activeScreenById } = useContext(MuveConfigContext)

  return (
    <FolderCircle
      items={[
        {
          iconSrc: require(`~assets/icons/modules.svg`),
        },
        {
          iconSrc: require(`~assets/icons/rotate.svg`),
          onClick: rotateRecentModules,
        },
        {
          iconSrc: require(`~assets/icons/mouse/keyboard.svg`),
          onClick: () => activeScreenById(1),
        },
      ]}
    />
  )
}
