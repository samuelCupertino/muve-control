import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/layouts'

export const MouseTouchpad: React.FC<IModuleProps> = (props) => (
  <Module
    Icon={<Icon src={require(`~assets/icons/mouse/touchpad.svg`)} />}
    {...props}
  />
)
