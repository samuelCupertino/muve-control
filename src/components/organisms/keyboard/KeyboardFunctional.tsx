import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/core'

export const KeyboardFunctional: React.FC<IModuleProps> = (props) => (
  <Module
    Icon={<Icon src={require(`~assets/icons/keyboard/functional.svg`)} />}
    {...props}
  />
)
