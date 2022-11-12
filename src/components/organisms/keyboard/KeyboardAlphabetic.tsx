import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/core'

export const KeyboardAlphabetic: React.FC<IModuleProps> = (props) => (
  <Module
    Icon={<Icon src={require(`~assets/icons/keyboard/alphabetic.svg`)} />}
    {...props}
  />
)
