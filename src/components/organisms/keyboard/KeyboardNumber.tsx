import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/layouts'

export const KeyboardNumber: React.FC<IModuleProps> = (props) => (
  <Module
    Icon={<Icon src={require(`~assets/icons/keyboard/number.svg`)} />}
    {...props}
  />
)
