import { useContext } from 'react'

import { FolderCircle } from '~components/molecules'
import { MouseControlContext } from '~context'

export const MouseMenu: React.FC = () => {
  const { rotateRecentModules } = useContext(MouseControlContext)

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
          iconSrc: require(`~assets/icons/keyboard.svg`),
        },
      ]}
    />
  )
}
