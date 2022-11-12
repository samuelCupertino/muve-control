import { useContext } from 'react'

import { FolderCircle } from '~components/molecules'
import { KeyboardControlContext, MuveConfigContext } from '~context'

export const KeyboardMenu: React.FC = () => {
  const { rotateRecentModules } = useContext(KeyboardControlContext)
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
          iconSrc: require(`~assets/icons/keyboard/settings.svg`),
          onClick: () => activeScreenById(2),
        },
      ]}
    />
  )
}
