import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/core'

export const MouseJoystick: React.FC<IModuleProps> = (props) => (
  <Module
    Icon={<Icon src={require(`~assets/icons/mouse/joystick.svg`)} />}
    {...props}
  />
)
