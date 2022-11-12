import { useContext } from 'react'

import { FolderCircle } from '~components/molecules'
import { MuveConfigContext, SettingsControlContext } from '~context'

export const SettingsMenu: React.FC = () => {
  const { rotateRecentModules } = useContext(SettingsControlContext)
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
          iconSrc: require(`~assets/icons/settings/mouse.svg`),
          onClick: () => activeScreenById(0),
        },
      ]}
    />
  )
}
